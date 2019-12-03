import PropTypes from 'prop-types';
import { CheckboxControl, RadioControl, ToggleControl } from '@wordpress/components';

import withTerm from '../with-term';

export function Option( props ) {
	const { onChange, selected, term, type, ...rest } = props;

	if ( ! term ) {
		return null;
	}

	const { id, name } = term;
	const controlProps = {
		...rest,
		checked: selected.indexOf( id ) >= 0,
		label: name,
		onChange: checked => onChange( checked, id ),
	};

	let Component;

	if ( type === 'radio' ) {
		Component = RadioControl;
	} else if ( type === 'toggle' ) {
		Component = ToggleControl;
	} else {
		Component = CheckboxControl;
	}

	return <Component { ...controlProps } />;
}

Option.propTypes = {
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf( PropTypes.number ).isRequired,
	type: PropTypes.oneOf( [
		'checkbox',
		'radio',
		'toggle',
	] ).isRequired,
};

const OptionWithTerm = withTerm()( Option );

export default OptionWithTerm;
