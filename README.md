# Utility Taxonomy
A hidden taxonomy, used for filtering of posts/pages etc. in a way that is more performant than using the likes of post meta.

## Usage
A plugin or theme can add their options by adding support of this feature to the desired post type(s):

```php
add_action( 'registered_post_type', function ( $post_type ) : void {
	if ( $post_type !== 'page' ) {
		return;
	}

	add_post_type_support( $post_type, 'hm-utility' );
} );
```

The options can then be registered via `hm_utility_options`:

```php
add_filter( 'hm_utility_options', function ( $data, $post_type ) : array {
	if ( $post_type !== 'page' ) {
		return $data;
	}

	$data[] = [
		'id'      => 'my-utility-options',
		'title'   => __( 'Something Extra' ),
		'options' => [
			[
				'label' => __( 'Option One' ),
				'value' => 'option-two', // Must be slug-formatted.
			],
			[
				'label' => __( 'Option Two' ),
				'value' => 'option-two',
			],
		],
	];

	return $data;
}, 10, 2 );
```

The block editor should now provide a Panel titled "Something Extra" on the Document sidebar that contains a list of checkboxes (or a toggle if there's only one option) based on the options registered above.

It is up to the plugin or theme to use the automatically created terms to [filter their queries](https://developer.wordpress.org/reference/classes/wp_query/#taxonomy-parameters). See also [Tom J Nowell's post](https://tomjn.com/2018/03/16/utility-taxonomies/) for example use cases. It's actually the inspiration behind this plugin ;-)
