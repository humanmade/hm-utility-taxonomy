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
	const Component = type === 'toggle' ? ToggleControl : CheckboxControl;
	let controlProps;

	if ( term ) {
		const { id, name } = term;
		controlProps = {
			checked: selected.indexOf( id ) >= 0,
			label: name,
			onChange: checked => onChange( checked, id ),
		};
	} else {
		controlProps = {
			checked: false,
			disabled: true,
			label: 'Loading…',
		};
	}

	return (
		<div className={ className }>
			<Component { ...rest } { ...controlProps } />
		</div>
	);
}

Option.propTypes = {
	className: PropTypes.string.isRequired,
	defaults: PropTypes.arrayOf( PropTypes.string ).isRequired,
	isNewPost: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf( PropTypes.number ).isRequired,
	type: PropTypes.oneOf( [
		'checkbox',
		'toggle',
	] ).isRequired,
};

const OptionWithTerm = withTerm()( Option );

export default OptionWithTerm;
