<?php
/**
 * HM Utility Taxonomy CLI: Assign default terms to existing published posts
 */

declare( strict_types=1 );

namespace HM\Utility_Taxonomy\CLI;

use WP_CLI;
use WP_Post;
use WP_Query;

/**
 * Assign default terms
 */
class Assign_Defaults_Command {
	/**
	 * Number of found posts
	 *
	 * @var int
	 */
	protected $found_posts = 0;

	/**
	 * Maximum number of pages
	 *
	 * @var int
	 */
	protected $max_pages = 0;

	/**
	 * Current paged number
	 *
	 * @var int
	 */
	protected $paged = 1;

	/**
	 * Default posts per page
	 *
	 * @var int
	 */
	protected $posts_per_page = 100;

	/**
	 * Used to check whether we're dry-running or not
	 *
	 * @var bool
	 */
	protected $is_dry_running = false;

	/**
	 * Process post
	 *
	 * @param WP_Post $post Post object.
	 *
	 * @return void
	 */
	protected function process( WP_Post $post ) {}

	/**
	 * Get query
	 *
	 * @return WP_Query
	 */
	protected function get_query() : WP_Query {
		$query_args = [
			'paged'          => $this->paged,
			'post_status'    => 'publish',
			'post_type'      => 'post',
			'posts_per_page' => $this->posts_per_page,
		];

		$query = new WP_Query( $query_args );

		return $query;
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
	 * ## EXAMPLES
	 *
	 * wp hm-utility-taxonomy assign-defaults --dry-run
	 * wp hm-utility-taxonomy assign-defaults
	 *
	 * @param array $args       Positional arguments passed to the command.
	 * @param array $args_assoc Associative arguments passed to the command.
	 *
	 * @return void
	 */
	public function __invoke( array $args, array $args_assoc ) : void {
		// Indicate that we're dry-running, and not actually updating.
		if ( isset( $args_assoc['dry-run'] ) && (bool) $args_assoc['dry-run'] === true ) {
			$this->is_dry_running = true;
		}

		$query             = $this->get_query();
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
				$query = $this->get_query();
			}

			array_walk( $query->posts, [ $this, 'process' ] );

			$this->paged ++;
		} while ( $this->paged <= $this->max_pages );
	}
}