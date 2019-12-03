<?php

declare( strict_types=1 );

namespace HM\Utility_Taxonomy;

const TAXONOMY = 'hm-utility';

/**
 * Bootstrapper
 *
 * @return void
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_tax', 11 );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_assets' );
}

/**
 * Get post types to support
 *
 * @return array Array of post type names.
 */
function get_post_types() : array {
	$post_types = get_post_types_by_support( TAXONOMY );

	return $post_types;
}

/**
 * Register taxonomy
 *
 * TODO: Log error if registration fails.
 */
function register_tax() : void {
	$post_types = get_post_types();

	if ( empty( $post_types ) ) {
		return;
	}

	register_taxonomy(
		TAXONOMY,
		$post_types,
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
}

/**
 * Get groups
 *
 * @param string $post_type Post type name.
 *
 * @return array Array of utility groups.
 */
function get_options( string $post_type ) : array {
	/**
	 * Allow plugins to add their options
	 *
	 * @param array $group
	 */
	$terms = apply_filters( 'hm-utility-options', [], $post_type );

	return $terms;
}

/**
 * Enqueue editor assets
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
		'1.0.0',
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
