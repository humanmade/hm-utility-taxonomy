export default function addSelectors( select, ownProps ) {
	const { options, taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute } = select( 'core/editor' );
	const { getEntityRecords } = select( 'core' );
	const { _links: postLinks } = getCurrentPost();
	const getPostTerms = () => getEditedPostAttribute( taxonomy );

	const termSlugs = options.map( ( { value } ) => value );
	const taxTerms = getEntityRecords( 'taxonomy', taxonomy, {
		slug: termSlugs,
	} );

	// Terms haven't been fetched yet, or the taxonomy has no terms.
	if ( ! taxTerms || ! taxTerms.length ) {
		return {
			getPostTerms,
			finalOptions: [],
			hasAssignAction: false,
		};
	}

	const finalOptions = taxTerms.map( term => {
		const { slug } = term;
		const option = options.find( item => item.value === slug );

		if ( ! option ) {
			return null;
		}

		return {
			...term,
			label: option.label,
		};

	} ).filter( Boolean );

	return {
		finalOptions,
		getPostTerms,
		hasAssignAction: 'wp:action-assign-' + taxonomy in postLinks,
	};
}

