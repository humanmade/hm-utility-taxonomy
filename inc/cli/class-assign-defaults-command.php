<?php
/**
 * HM Utility Taxonomy CLI: Assign default terms to existing published posts
 */

declare( strict_types=1 );

namespace HM\Utility_Taxonomy\CLI;

use HM\Utility_Taxonomy as HMUT;
use WP_CLI;
use WP_Post;
use WP_Query;

/**
 * Assign default terms
 *
 * @since 1.4.0
 */
class Assign_Defaults_Command {
	/**
	 * Number of found posts
	 *
	 * @since 1.4.0
	 *
	 * @var int
	 */
	protected $found_posts = 0;

	/**
	 * Maximum number of pages
	 *
	 * @since 1.4.0
	 *
	 * @var int
	 */
	protected $max_pages = 0;

	/**
	 * Current paged number
	 *
	 * @since 1.4.0
	 *
	 * @var int
	 */
	protected $paged = 1;

	/**
	 * Default posts per page
	 *
	 * @since 1.4.0
	 *
	 * @var int
	 */
	protected $posts_per_page = 100;

	/**
	 * Used to check whether we're dry-running or not
	 *
	 * @since 1.4.0
	 *
	 * @var bool
	 */
	protected $is_dry_running = false;

	/**
	 * Map term IDs to term names
	 *
	 * @since 1.4.0
	 *
	 * @param array $term_ids Array of term IDs.
	 *
	 * @return array
	 */
	protected function term_ids_to_names( array $term_ids ) : array {
		return array_map( function ( int $id ) : string {
			return get_term( $id, HMUT\TAXONOMY )->name;
		}, $term_ids );
	}

	/**
	 * Process post
	 *
	 * @since 1.4.0
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	protected function process( WP_Post $post ) : void {
		$term_ids = HMUT\get_post_default_term_ids( $post->ID );

		if ( empty( $term_ids ) ) {
			WP_CLI::log( sprintf( 'No default terms found for %d.', $post->ID ) );
			return;
		}

		if ( ! $this->is_dry_running ) {
			wp_set_post_terms( $post->ID, $term_ids, HMUT\TAXONOMY, true );
		}

		WP_CLI::log(
			sprintf(
				'Setting default terms of post %d: %s.',
				$post->ID,
				join( ', ', $this->term_ids_to_names( $term_ids ) )
			)
		);
	}

	/**
	 * Get query
	 *
	 * @since 1.4.0
	 *
	 * @param array $args Array of query arguments to pass to WP_Query.
	 *
	 * @return WP_Query
	 */
	protected function get_query( array $args ) : WP_Query {
		$query_args = wp_parse_args( $args, [
			'paged'          => $this->paged,
			'post_status'    => 'publish',
			'posts_per_page' => $this->posts_per_page,
		] );

		$query = new WP_Query( $query_args );

		return $query;
	}

	/**
	 * Get supported post types
	 *
	 * @since 1.4.0
	 *
	 * @return array|null Array of supported post type names. NULL otherwise.
	 */
	protected function get_supported_post_types() :? array {
		$taxonomy = get_taxonomy( HMUT\TAXONOMY );

		if ( ! $taxonomy ) {
			return null;
		}

		return $taxonomy->object_type;
	}

	/**
	 * Assign default terms to existing posts
	 *
	 * This assign default terms from the utility taxonomy to published posts.
	 *
	 * ## OPTIONS
	 *
	 * [--dry-run]
	 * : Run the entire operation and show report, but don't save changes to the database.
	 *
	 * [--post_status=<post_statuses>]
	 * : Limit post search to specific post statuses, separated by comma. Defaults to 'publish'.
	 *
	 * [--post_type=<post_types>]
	 * : Limit post search to specific post types, separated by comma.
	 *
	 * ## EXAMPLES
	 *
	 *     # Dry run
	 *     $ wp hm-utility-taxonomy assign-defaults --dry-run
	 *
	 *     # Limit operation to pages only
	 *     $ wp hm-utility-taxonomy assign-defaults --post_type=page
	 *
	 *     # Limit operation to draft posts & pages only
	 *     $ wp hm-utility-taxonomy assign-defaults --post_type=page,post --post_status=draft
	 *
	 * @since 1.4.0
	 *
	 * @param array $args       Positional arguments passed to the command.
	 * @param array $args_assoc Associative arguments passed to the command.
	 *
	 * @return void
	 */
	public function __invoke( array $args, array $args_assoc ) : void {
		$supported_post_types = $this->get_supported_post_types();

		if ( empty( $supported_post_types ) ) {
			WP_CLI::error( 'No supported post types found.' );
		}

		// Indicate that we're dry-running, and not actually updating.
		if ( isset( $args_assoc['dry-run'] ) && (bool) $args_assoc['dry-run'] === true ) {
			$this->is_dry_running = true;
		}

		$query_args = [];

		if ( isset( $args_assoc['post_type'] ) ) {
			$query_args['post_type'] = explode( ',', $args_assoc['post_type'] );
			$query_args['post_type'] = array_intersect( $query_args['post_type'], $supported_post_types );
		} else {
			$query_args['post_type'] = $supported_post_types;
		}

		if ( empty( $query_args['post_type'] ) ) {
			WP_CLI::error( 'The specified post types are not supported by Utility Taxonomy.' );
		}

		if ( ! empty( $args_assoc['post_status'] ) ) {
			$query_args['post_status'] = explode( ',', $args_assoc['post_status'] );
		}

		$query             = $this->get_query( $query_args );
		$this->found_posts = absint( $query->found_posts );
		$this->max_pages   = $query->max_num_pages;

		if ( empty( $this->found_posts ) ) {
			WP_CLI::log( 'No Posts Found.' );
			return;
		}

		WP_CLI::log(
			sprintf(
				'Found %s. Beginning to %s.',
				// translators: %s: Number of items found.
				sprintf( _n( '%s item', '%s items', $this->found_posts ), $this->found_posts ),
				$this->is_dry_running ? 'perform dry run' : 'assign default terms'
			)
		);

		do {
			if ( $query->query_vars['paged'] !== $this->paged ) {
				$query = $this->get_query( $query_args );
			}

			array_walk( $query->posts, [ $this, 'process' ] );

			$this->paged ++;
		} while ( $this->paged <= $this->max_pages );
	}
}
