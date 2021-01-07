import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import { CheckboxControl, ToggleControl } from '@wordpress/components';

import withTerm from '../with-term';

export function Option( props ) {
	const { className, onChange, selected, term, type, ...rest } = props;

	const Component = type === 'toggle' ? ToggleControl : CheckboxControl;

	const setInitialChecked = useCallback( () => {
		return term ? selected.indexOf( term.id ) >= 0 : false;
	}, [ selected, term ] );
	const [ checked, setChecked ] = useState( setInitialChecked );

	const update = () => {
		setChecked( ! checked );

		if ( term ) {
			onChange( ! checked, term.id );
		}
	};

	/*
	 * After the term has been fetched, we need to set `checked` again.
	 * This effect should only run once, right after the term is available.
	 */
	useEffect( () => {
		if ( term ) {
			setChecked( setInitialChecked );
		}
	}, [ setInitialChecked, term ] );

	return (
		<div className={ className }>
			<Component
				{ ...rest }
				checked={ checked }
				disabled={ term ? false : true }
				label={ term ? term.name : 'Loading…' }
				onChange={ update }
			/>
		</div>
	);
}

Option.propTypes = {
	className: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf( PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ) ).isRequired,
	type: PropTypes.oneOf( [ 'checkbox', 'toggle' ] ).isRequired,
};

const OptionWithTerm = withTerm()( Option );

export default OptionWithTerm;
