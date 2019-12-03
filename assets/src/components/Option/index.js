import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxControl, ToggleControl } from '@wordpress/components';

import withTerm from '../with-term';

export function Option( props ) {
	const {
		className,
		onChange,
		selected,
		term,
		type,
		...rest
	} = props;

	if ( ! term ) {
		return null;
	}

	const { id, name } = term;

	const Component = type === 'toggle' ? ToggleControl : CheckboxControl;
	const controlProps = {
		...rest,
		checked: selected.indexOf( id ) >= 0,
		label: name,
		onChange: checked => onChange( checked, id ),
	};

	return (
		<div className={ className }>
			<Component { ...controlProps } />
		</div>
	);
}

Option.propTypes = {
	className: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf( PropTypes.number ).isRequired,
	type: PropTypes.oneOf( [
		'checkbox',
		'toggle',
	] ).isRequired,
};

const OptionWithTerm = withTerm()( Option );

export default OptionWithTerm;
