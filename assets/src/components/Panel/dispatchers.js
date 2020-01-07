export default function addDispatchers( dispatch, ownProps ) {
	const { editPost } = dispatch( 'core/editor' );
	const { getPostTerms, taxonomy } = ownProps;
	const postTerms = getPostTerms();

	const updateTerms = ( checked, termId ) => {
		const nextPostTerms = checked
			? postTerms.concat( termId )
			: postTerms.filter( item => item !== termId );

		editPost( { [ taxonomy ]: nextPostTerms } );
	};

	return {
		updateTerms,
	};
}
