import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckboxControl, ToggleControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

export default function Panel( props ) {
	const {
		className,
		default: defaultValue,
		id,
		// multiple, // TODO.
		options,
		title,
	} = props;

	const [ selected, select ]= useState( defaultValue );
	const Control = options.length > 1
		? CheckboxControl
		: ToggleControl;

	const onChange = ( checked, value ) => {
		const nextSelected = checked
			? selected.concat( value )
			: selected.filter( item => item !== value );

		select( nextSelected );
	};

	return (
		<PluginDocumentSettingPanel className={ className } name={ id } title={ title }>
			{ options.map( ( { label, value } ) => (
				<Control
					key={ `${ className }-${ id }-${ value }` }
					checked={ selected.indexOf( value ) >= 0 }
					label={ label }
					onChange={ checked => onChange( checked, value ) }
				/>
			) ) }
		</PluginDocumentSettingPanel>
	);
}

Panel.defaultProps = {
	multiple: true,
};

Panel.propTypes = {
	className: PropTypes.string.isRequired,
	defaultValue: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.string ).isRequired,
		PropTypes.string,
	] ),
	id: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	} ) ).isRequired,
	title: PropTypes.string.isRequired,
};

