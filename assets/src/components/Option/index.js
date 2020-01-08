import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckboxControl, ToggleControl } from '@wordpress/components';

import withTerm from '../with-term';

export function Option( props ) {
	const {
		className,
		isNewPost,
		onChange,
		selected,
		term,
		type,
		...rest
	} = props;
	const Component = type === 'toggle' ? ToggleControl : CheckboxControl;
	const [ checked, setChecked ] = useState( false );

	// After the term has been fetched, we need to set `checked` again.
	useEffect( () => {
		if ( term ) {
			setChecked(
				selected.indexOf( term.id ) >= 0 // Using post terms array.
				|| selected.indexOf( term.slug ) >= 0 // Using `defaults` array.
			);
		}
	}, [ term ] );

	/*
	 * Each time the checkbox is clicked, the `checked` state will be updated.
	 * We need to propagate this change to the editor, but only when the term
	 * has been fetched and we're editing an existing post, or a new post with
	 * pending changes.
	 */
	useEffect( () => {
		if ( term && ! isNewPost ) {
			onChange( checked, term.id );
		}
	}, [ checked, term, isNewPost ] );

	return (
		<div className={ className }>
			<Component
				{ ...rest }
				checked={ checked }
				disabled={ term ? false : true }
				label={ term ? term.name : 'Loading…' }
				onChange={ nextChecked => setChecked( nextChecked ) }
			/>
		</div>
	);
}

Option.propTypes = {
	className: PropTypes.string.isRequired,
	isNewPost: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf( PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ) ).isRequired,
	type: PropTypes.oneOf( [
		'checkbox',
		'toggle',
	] ).isRequired,
};

const OptionWithTerm = withTerm()( Option );

export default OptionWithTerm;
