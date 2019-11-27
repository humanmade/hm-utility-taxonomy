/* global hmUtilities:false */

import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';

import Panel from './components/Panel';

const PLUGIN = 'hm-utilities';

domReady( () => {
	hmUtilities.forEach( group => {
		const { id, icon = null } = group;
		const pluginId = `${ PLUGIN }-${ id }`;

		registerPlugin( pluginId, {
			icon,
			render: () => <Panel className={ pluginId } { ...group } />,
		} );
	} );
} );

