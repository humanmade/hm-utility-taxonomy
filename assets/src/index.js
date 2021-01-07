/* global hmUtilities:false */

import React from 'react';

import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';

import Panel from './components/Panel';

const { options, taxonomy } = hmUtilities;

domReady( () => {
	options.forEach( group => {
		const { id, icon = null } = group;
		const pluginId = `${ taxonomy }-${ id }`;
		const className = `${ taxonomy }__${ id }`;

		registerPlugin( pluginId, {
			icon,
			render: () => (
				<Panel className={ className } taxonomy={ taxonomy } { ...group } />
			),
		} );
	} );
} );

