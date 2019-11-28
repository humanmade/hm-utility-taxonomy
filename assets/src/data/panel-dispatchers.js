export default function panelDispatchers( dispatch ) {
	const { editPost } = dispatch( 'core/editor' );

	return {
		updateTerms( terms, taxonomy ) {
			editPost( { [ taxonomy ]: terms } );
		},
	}
}
