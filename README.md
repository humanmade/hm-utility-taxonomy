# Utility Taxonomy

A hidden taxonomy, used for filtering of posts/pages etc. in a way that is more performant than using the likes of post meta.

## Usage

A plugin or theme can add their options by adding the `hm-utility` taxonomy to desired post type(s) and registering the options:

```php
/**
 * Register custom post type
 */
function register_my_post_type() : void {
	register_post_type(
		'my-post-type',
		[
			// ... other arguments.
			'taxonomies' => [ 'hm-utility' /* more taxonomies */ ],
		]
	);
}
add_action( 'init, 'register_my_post_type' );
```

To add support for built-in post types or other post types that you don't have control over their registration, use `hm_utility_init` hook:

```php
/**
 * Add hm-utility taxonomy to `page` post type
 *
 * @param string $taxonomy HM Utility's taxonomy name.
 */
function my_add_utility_support( string $taxonomy ) : void {
	register_taxonomy_for_object_type( $taxonomy, 'page' );
}
add_action( 'hm_utility_init', 'my_add_utility_support' );
```

The options can then be registered via `hm_utility_options`:

```php
/**
 * Add utility options for page post type
 *
 * @param array  $options   All options.
 * @param string $post_type Post type name.
 *
 * @return array.
 */
function my_utility_options( $options, $post_type ) : array {
	if ( $post_type !== 'page' ) {
		return $options;
	}

	$options[] = [
		'id'       => 'my-utility-options',
		'title'    => __( 'Something Extra', 'my-textdomain' ),
		'defaults' => [ // Optional. This will assign new posts to the terms set here.
			'option-one',
		],
		'options'  => [
			[
				'label' => __( 'Option One', 'my-textdomain' ),
				'value' => 'option-one', // Must be slug-formatted.
			],
			[
				'label' => __( 'Option Two', 'my-textdomain' ),
				'value' => 'option-two',
			],
		],
	];

	return $options;
}
add_filter( 'hm_utility_options', 'my_utility_options', 10, 2 );
```

The block editor should now provide a Panel titled "Something Extra" on the Document sidebar that contains a list of checkboxes (or a toggle if there's only one option) based on the options registered above.

It is up to the plugin or theme to use the automatically created terms to [filter their queries](https://developer.wordpress.org/reference/classes/wp_query/#taxonomy-parameters). See also [Tom J Nowell's post](https://tomjn.com/2018/03/16/utility-taxonomies/) for example use cases. It's actually the inspiration behind this plugin ;-)

## CLI

This plugin provides a WP CLI command to assign default terms on existing posts:

```
wp hm-utility-taxonomy assign-defaults
```

Pass `--help` to the command to see available options.
