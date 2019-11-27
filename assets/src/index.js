/* global hmUtilities:false */

import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';

import Panel from './components/Panel';

const PLUGIN = 'hm-utilities';

function Utilities() {
	return (
		<>
			{ hmUtilities.map( group => (
				<Panel
					key={ group.id }
					className={ PLUGIN }
					{ ...group }
				/>
			) ) }
		</>
	);
}

domReady( () => {
	registerPlugin( PLUGIN, {
		icon: null,
		render: Utilities,
	} );
} );

