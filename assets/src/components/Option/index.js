import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxControl, ToggleControl } from '@wordpress/components';

import withTerm from '../with-term';

export function Option( props ) {
	const {
		className,
		defaults,
		isNewPost,
		onChange,
		selected,
		term,
		type,
		...rest
	} = props;
	const Component = type === 'toggle' ? ToggleControl : CheckboxControl;

	if ( ! term ) {
		return (
			<div className={ className }>
				<Component { ...rest } checked={ false } disabled={ true } label='Loading…' />
			</div>
		);
	}

	const { id, name, slug } = term;
	const isChecked = isNewPost
		? defaults.indexOf( slug ) >= 0
		: selected.indexOf( id ) >= 0;

	return (
		<div className={ className }>
			<Component
				{ ...rest }
				checked={ isChecked }
				label={ name }
				onChange={ checked => onChange( checked, id ) }
			/>
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
