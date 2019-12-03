import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export function searchTerms( taxonomy, slug ) {
	return apiFetch( {
		path: addQueryArgs( `/wp/v2/${ taxonomy }`, {
			slug,
			_fields: 'id,name,slug',
		} ),
	} );
}

export default function withTerm() {
	return WrappedComponent => {
		function WithTerm( props ) {
			const { taxonomy, value, ...rest } = props;
			const [ term, setTerm ] = useState( null );

			useEffect( () => {
				searchTerms( taxonomy, value )
					.catch( err => { /* TODO */ } )
					.then( result => {
						if ( result.length ) {
							setTerm( result[0] );
						}
					} );

			}, [ taxonomy, value ] );

			return <WrappedComponent term={ term } { ...rest } />;
		}

		WithTerm.propTypes = {
			taxonomy: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		};

		return WithTerm;
	}
}
