import React from 'react';
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
		postTerms,
		title,
		taxObject,
		taxTerms,
		updateTerms,
	} = props;

	if ( ! taxTerms || ! taxTerms.length ) {
		return null;
	}

	const finalOptions = taxTerms.map( ( { id, slug } ) => {
		const option = options.find( item => item.value === slug );

		if ( ! option ) {
			return null;
		}

		return {
			...option,
			value: id,
		};

	} ).filter( Boolean );

	if ( ! finalOptions.length ) {
		return null;
	}

	const Control = options.length > 1
		? CheckboxControl
		: ToggleControl;

	const onChange = ( checked, value ) => {
		const nextPostTerms = checked
			? postTerms.concat( value )
			: postTerms.filter( item => item !== value );

		updateTerms( nextPostTerms, taxObject.rest_base );
	};

	return (
		<PluginDocumentSettingPanel className={ className } name={ id } title={ title }>
			{ finalOptions.map( ( { label, value } ) => (
				<Control
					key={ `${ className }-${ id }-${ value }` }
					checked={ postTerms.indexOf( value ) >= 0 }
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
	postTerms: PropTypes.arrayOf( PropTypes.number ).isRequired,
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
