export default function addSelectors( select, ownProps ) {
	const { taxonomy } = ownProps;
	const { getCurrentPost, getEditedPostAttribute } = select( 'core/editor' );
	const { _links: postLinks } = getCurrentPost();

	return {
		getPostTerms: () => getEditedPostAttribute( taxonomy ),
		hasAssignAction: 'wp:action-assign-' + taxonomy in postLinks,
		postStatus: getEditedPostAttribute( 'status' ),
	};
}
