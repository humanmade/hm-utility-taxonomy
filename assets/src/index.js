/* global hmUtilities:false */

import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';

import Panel from './components/Panel';

const {groups, taxonomy } = hmUtilities;

domReady( () => {
	groups.forEach( group => {
		const { id, icon = null } = group;
		const pluginId = `${ taxonomy }-${ id }`;

		registerPlugin( pluginId, {
			icon,
			render: () => <Panel className={ pluginId } { ...group } />,
		} );
	} );
} );

