<?php

declare( strict_types=1 );

namespace HM\Utility_Taxonomy;

const TAXONOMY  = 'hm-utility';

/**
 * Bootstrapper
 *
 * @return void
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_tax', 11 );
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
 * Get utility options
 *
 * @param string $post_type Post type name.
 *
 * @return array Array of utility options.
 */
function get_utility_options( string $post_type ) : array {
	/**
	 * Allow plugins to add their utility options
	 *
	 * @param array $group
	 */
	$terms = apply_filters( 'hm-utility-data', [], $post_type );

	return $terms;
}
