import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@wordpress/compose';
import { CheckboxControl, ToggleControl } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import panelSelectors from '../data/panel-selectors';
import panelDispatchers from '../data/panel-dispatchers';

export function Panel( props ) {
	const {
		className,
		default: defaultValue,
		id,
		// multiple, // TODO.
		options,
		title,
		taxTerms,
	} = props;

	if ( ! taxTerms || ! taxTerms.length ) {
		return null;
	}

	const finalOptions = taxTerms.map( ( { slug } ) => {
		return options.find( item => item.value === slug );
	} ).filter( Boolean );

	if ( ! finalOptions.length ) {
		return null;
	}

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
			{ finalOptions.map( ( { label, value } ) => (
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
	taxObject: null,
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
	taxonomy: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	// Props below are supplied by `addSelectors()`.
	hasAssignAction: PropTypes.bool.isRequired,
	postTerms: PropTypes.array.isRequired, // TODO.
	taxObject: PropTypes.shape( {
		name: PropTypes.string.isRequired,
		rest_base: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
	} ),
	taxTerms: PropTypes.arrayOf( PropTypes.shape( {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
	} ) ),
	updateTerms: PropTypes.func.isRequired,
};

const ComposedPanel = compose( [
	withSelect( panelSelectors ),
	withDispatch( panelDispatchers ),
] )( Panel );

export default ComposedPanel;
