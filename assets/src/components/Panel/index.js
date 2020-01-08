import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import addSelectors from './selectors';
import addDispatchers from './dispatchers';
import Option from '../Option';

export function Panel( props ) {
	const {
		className,
		defaults,
		getPostTerms,
		id,
		isEditedPostNew,
		options,
		taxonomy,
		title,
		updateTerms,
	} = props;

	const optionProps = {
		taxonomy,
		isNewPost: isEditedPostNew(),
		onChange: updateTerms,
		selected: isEditedPostNew() ? defaults : getPostTerms(),
		type: options.length > 1 ? 'checkbox' : 'toggle',
	};

	return (
		<PluginDocumentSettingPanel className={ className } name={ id } title={ title }>
			{ options.map( ( item, index ) => (
				<Option
					{ ...item }
					{ ...optionProps }
					key={ `${ className }-${ item.value }-${ index }` }
					className={ `${ className }__choice` }
				/>
			) ) }
		</PluginDocumentSettingPanel>
	);
}

Panel.defaultProps = {
	defaults: [],
};

Panel.propTypes = {
	className: PropTypes.string.isRequired,
	defaults: PropTypes.arrayOf( PropTypes.string ),
	id: PropTypes.string.isRequired,
	isCleanNewPost: PropTypes.func.isRequired,
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
