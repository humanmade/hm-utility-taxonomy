import PropTypes from 'prop-types';
import { CheckboxControl, RadioControl, ToggleControl } from '@wordpress/components';

import withTerm from '../with-term';

export function Option( props ) {
	const { term, type, ...rest } = props;

	if ( ! term ) {
		return null;
	}

	const { name } = term;
	const controlProps = {
		...rest,
		label: name,
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
	type: PropTypes.oneOf( [
		'checkbox',
		'radio',
		'toggle',
	] ).isRequired,
};

const OptionWithTerm = withTerm()( Option );

export default OptionWithTerm;
