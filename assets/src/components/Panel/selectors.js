const defaultProps = {
	finalOptions: [],
	hasAssignAction: false,
	postTerms: [],
	taxTerms: [],
};

export default function addSelectors( select, ownProps ) {
	const { options, taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute } = select( 'core/editor' );
	const { getEntityRecords } = select( 'core' );
	const { _links: postLinks } = getCurrentPost();

	const termSlugs = options.map( ( { value } ) => value );
	const taxTerms = getEntityRecords( 'taxonomy', taxonomy, {
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
		taxTerms,
		hasAssignAction: 'wp:action-assign-' + taxonomy in postLinks,
		postTerms: getEditedPostAttribute( taxonomy ),
	};
}

