import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@wordpress/compose';
import { CheckboxControl, ToggleControl } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import addSelectors from './selectors';
import addDispatchers from './dispatchers';

export function Panel( props ) {
	const {
		className,
		default: defaultValue, // TODO.
		finalOptions,
		id,
		// multiple, // TODO.
		options,
		postTerms,
		title,
		taxObject,
		updateTerms,
	} = props;

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
	updateTerms: PropTypes.func.isRequired,
};

const ComposedPanel = compose( [
	withSelect( addSelectors ),
	withDispatch( addDispatchers ),
] )( Panel );

export default ComposedPanel;
