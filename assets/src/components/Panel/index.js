import PropTypes from 'prop-types';
import React from 'react';

import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import Option from '../Option';

import addDispatchers from './dispatchers';
import addSelectors from './selectors';

export function Panel( props ) {
	const {
		className,
		getPostTerms,
		id,
		options,
		taxonomy,
		title,
		updateTerms,
	} = props;

	return (
		<PluginDocumentSettingPanel className={ className } name={ id } title={ title }>
			{ options.map( ( item, index ) => (
				<Option
					{ ...item }
					key={ `${ className }-${ item.value }-${ index }` }
					className={ `${ className }__choice` }
					selected={ getPostTerms() }
					taxonomy={ taxonomy }
					type={ options.length > 1 ? 'checkbox' : 'toggle' }
					onChange={ updateTerms }
				/>
			) ) }
		</PluginDocumentSettingPanel>
	);
}

Panel.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
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
