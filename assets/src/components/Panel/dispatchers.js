export default function addDispatchers( dispatch ) {
	const { editPost } = dispatch( 'core/editor' );

	return {
		updateTerms( terms, taxonomy ) {
			editPost( { [ taxonomy ]: terms } );
		},
	}
}
