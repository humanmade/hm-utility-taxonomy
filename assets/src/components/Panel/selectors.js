export default function addSelectors( select, ownProps ) {
	const { options, taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute } = select( 'core/editor' );
	const { getEntityRecords, getTaxonomy } = select( 'core' );
	const { _links: postLinks } = getCurrentPost();
	const taxObject = getTaxonomy( taxonomy );

	// Taxonomy object hasn't been fetched yet.
	if ( ! taxObject ) {
		return {
			taxObject,
			hasAssignAction: false,
			postTerms: [],
			taxTerms: [],
		};
	}

	const { rest_base: restBase } = taxObject;
	const termSlugs = options.map( ( { value } ) => value );

	return {
		taxObject,
		hasAssignAction: 'wp:action-assign-' + restBase in postLinks,
		postTerms: getEditedPostAttribute( restBase ),
		taxTerms: getEntityRecords( 'taxonomy', restBase, {
			slug: termSlugs,
		} ),
	};
}

