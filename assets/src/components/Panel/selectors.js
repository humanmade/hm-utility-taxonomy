export default function addSelectors( select, ownProps ) {
	const { taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute, isEditedPostNew } = select( 'core/editor' );
	const { _links: postLinks } = getCurrentPost();
	const getPostTerms = () => getEditedPostAttribute( taxonomy );

	return {
		getPostTerms,
		hasAssignAction: 'wp:action-assign-' + taxonomy in postLinks,
		isEditedPostNew,
	};
}
