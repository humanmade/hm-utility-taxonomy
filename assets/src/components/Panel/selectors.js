const defaultProps = {
	taxObject: null,
	finalOptions: [],
	hasAssignAction: false,
	postTerms: [],
	taxTerms: [],
};

export default function addSelectors( select, ownProps ) {
	const { options, taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute } = select( 'core/editor' );
	const { getEntityRecords, getTaxonomy } = select( 'core' );
	const { _links: postLinks } = getCurrentPost();
	const taxObject = getTaxonomy( taxonomy );

	// Taxonomy object hasn't been fetched yet.
	if ( ! taxObject ) {
		return defaultProps;
	}

	const { rest_base: restBase } = taxObject;
	const termSlugs = options.map( ( { value } ) => value );
	const taxTerms = getEntityRecords( 'taxonomy', restBase, {
		slug: termSlugs,
	} );

	// Terms haven't been fetched yet, or the taxonomy has no terms.
	if ( ! taxTerms || ! taxTerms.length ) {
		return defaultProps;
	}

	const finalOptions = taxTerms.map( ( { id, slug } ) => {
		const option = options.find( item => item.value === slug );

		if ( ! option ) {
			return null;
		}

		return {
			...option,
			value: id,
		};

	} ).filter( Boolean );

	return {
		finalOptions,
		taxObject,
		taxTerms,
		hasAssignAction: 'wp:action-assign-' + restBase in postLinks,
		postTerms: getEditedPostAttribute( restBase ),
	};
}

