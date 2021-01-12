<?php
/**
 * HM Utility Taxonomy main entrypoint
 */

declare( strict_types=1 );

namespace HM\Utility_Taxonomy;

const TAXONOMY = 'hm-utility';

/**
 * Bootstrapper
 *
 * @since 1.0.0
 *
 * @return void
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_tax' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_assets' );
	add_action( 'save_post', __NAMESPACE__ . '\\set_default_post_terms' );
}

/**
 * Get post types to support
 *
 * @since 1.0.0
 *
 * @return array Array of post type names.
 */
function get_post_types() : array {
	$taxonomy = get_taxonomy( TAXONOMY );

	return $taxonomy->object_type;
}

/**
 * Register taxonomy
 *
 * @since 1.0.0
 *
 * TODO: Log error if registration fails.
 */
function register_tax() : void {
	register_taxonomy(
		TAXONOMY,
		[],
		[
			'public'       => false,
			'rest_base'    => TAXONOMY,
			'rewrite'      => false,
			'show_in_rest' => true,
			'labels'       => [
				'singular' => __( 'Utility', 'humanmade' ),
				'plural'   => __( 'Utilities', 'humanmade' ),
			],
		]
	);

	/**
	 * Fires after the hm-utility taxonomy has been registered.
	 *
	 * @param string $taxonomy Taxonomy name.
	 */
	do_action( 'hm_utility_init', TAXONOMY );
}

/**
 * Get groups
 *
 * @since 1.0.0
 *
 * @param string $post_type Post type name.
 *
 * @return array Array of utility groups.
 */
function get_options( string $post_type ) : array {
	/**
	 * Allow plugins to add their options
	 *
	 * @param array $options Array of all utility options.
	 */
	$terms = apply_filters( 'hm_utility_options', [], $post_type );

	return $terms;
}

/**
 * Enqueue editor assets
 *
 * @since 1.0.0
 *
 * @return void
 */
function enqueue_editor_assets() : void {
	$screen = get_current_screen();

	if ( $screen->base !== 'post' ) {
		return;
	}

	if ( ! in_array( $screen->post_type, get_post_types(), true ) ) {
		return;
	}

	$options = get_options( $screen->post_type );

	if ( empty( $options ) ) {
		return;
	}

	wp_enqueue_script(
		TAXONOMY,
		plugin_dir_url( dirname( __FILE__ ) ) . 'assets/dist/main.js',
		[
			'wp-api-fetch',
			'wp-compose',
			'wp-components',
			'wp-data',
			'wp-dom-ready',
			'wp-edit-post',
			'wp-plugins',
			'wp-url',
		],
		'1.3.0',
		true
	);

	$data = [
		'options'  => $options,
		'taxonomy' => TAXONOMY,
	];

	wp_add_inline_script(
		TAXONOMY,
		sprintf(
			'var hmUtilities = %s;',
			wp_json_encode( $data )
		),
		'before'
	);
}

/**
 * Get raw term from options array
 *
 * @since 1.2.0
 *
 * @param string $slug    Term slug.
 * @param array  $options Array of option arrays, each containing 'label' and 'value'.
 *
 * @return array|null
 */
function get_raw_term_from_options( string $slug, array $options ) : ? array {
	$result = null;

	foreach ( $options as $option ) {
		if ( $option['value'] === $slug ) {
			$result = $option;
			break;
		}
	}

	return $result;
}

/**
 * Get or create term
 *
 * @since 1.2.0
 * @since 1.3.1 Fixed term creation.
 *
 * @param array $raw_term Raw term array, containing 'label' and 'value'.
 *
 * @return array
 */
function get_or_create_term( array $raw_term ) : array {
	$term = get_term_by( 'slug', $raw_term['value'], TAXONOMY, ARRAY_A );

	if ( ! empty( $term ) ) {
		return $term;
	}

	$term = wp_insert_term( $raw_term['label'], TAXONOMY, [
		'slug' => $raw_term['value'],
	] );

	return $term;
}

/**
 * Get post's default term IDs
 *
 * @since 1.2.0
 *
 * @param int $post_id Post ID.
 *
 * @return array Array of term IDs based on defaults set in options.
 */
function get_post_default_term_ids( int $post_id ) : array {
	$post  = get_post( $post_id );
	$terms = [];

	if ( ! $post ) {
		return $terms;
	}

	if ( ! in_array( $post->post_type, get_post_types(), true ) ) {
		return $terms;
	}

	$options = get_options( $post->post_type );

	if ( empty( $options ) ) {
		return $terms;
	}

	foreach ( $options as $group ) {
		if ( empty( $group['defaults'] ) ) {
			continue;
		}

		foreach ( $group['defaults'] as $slug ) {
			$raw_term = get_raw_term_from_options( $slug, $group['options'] );

			if ( ! $raw_term ) {
				continue;
			}

			$term = get_or_create_term( $raw_term );

			if ( is_array( $term ) && ! empty( $term['term_id'] ) ) {
				$terms[] = $term['term_id'];
			}
		}
	}

	return $terms;
}

/**
 * Set default post terms
 *
 * @since 1.2.0
 *
 * @param int $post_id Post ID.
 *
 * @return void
 */
function set_default_post_terms( int $post_id ) : void {
	if ( get_post_status( $post_id ) !== 'auto-draft' ) {
		return;
	}

	if ( ! in_array( get_post_type( $post_id ), get_post_types(), true ) ) {
		return;
	}

	$term_ids = get_post_default_term_ids( $post_id );

	if ( empty( $term_ids ) ) {
		return;
	}

	wp_set_post_terms( $post_id, $term_ids, TAXONOMY, true );
}
