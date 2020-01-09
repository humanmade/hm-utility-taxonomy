export default function addSelectors( select, ownProps ) {
	const { taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute, isEditedPostDirty, isEditedPostNew } = select( 'core/editor' );
	const { _links: postLinks } = getCurrentPost();

	return {
		isPostDirty: isEditedPostDirty(),
		isPostNew: isEditedPostNew(),
		getPostTerms: () => getEditedPostAttribute( taxonomy ),
		hasAssignAction: 'wp:action-assign-' + taxonomy in postLinks,
		postStatus: getEditedPostAttribute( 'status' ),
	};
}
