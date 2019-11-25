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
