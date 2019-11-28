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
		getPostTerms,
		id,
		// multiple, // TODO.
		options,
		title,
		updateTerms,
	} = props;

	if ( ! finalOptions.length ) {
		return null;
	}

	const postTerms = getPostTerms();
	const Control = options.length > 1
		? CheckboxControl
		: ToggleControl;


	return (
		<PluginDocumentSettingPanel className={ className } name={ id } title={ title }>
			{ finalOptions.map( ( { label, value } ) => (
				<Control
					key={ `${ className }-${ id }-${ value }` }
					checked={ postTerms.indexOf( value ) >= 0 }
					label={ label }
					onChange={ checked => updateTerms( checked, value ) }
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
	taxonomy: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	// Props below are supplied by `addSelectors()`.
	getPostTerms: PropTypes.func.isRequired,
	hasAssignAction: PropTypes.bool.isRequired,
	// Props below are supplied by `addDispatchers()`.
	updateTerms: PropTypes.func.isRequired,
};

const ComposedPanel = compose( [
	withSelect( addSelectors ),
	withDispatch( addDispatchers ),
] )( Panel );

export default ComposedPanel;
