import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export function searchTerms( taxonomy, slug ) {
	return apiFetch( {
		parse: false,
		path: addQueryArgs( `/wp/v2/${ taxonomy }`, {
			slug,
			_fields: 'id,name,slug',
		} ),
	} );
}

export function createTerm( taxonomy, name, slug ) {
	return apiFetch( {
		method: 'POST',
		parse: false,
		path: `/wp/v2/${ taxonomy }`,
		data: {
			name,
			slug,
		},
	} );
}

export default function withTerm() {
	return WrappedComponent => {
		function WithTerm( props ) {
			const { label, taxonomy, value, ...rest } = props;
			const [ term, setTerm ] = useState( null );

			useEffect( () => {
				createTerm( taxonomy, label, value )
					.catch( response => {
						response.json().then(
							error => {
								if ( error.code !== 'term_exists' ) {
									return Promise.reject( error );
								}

								return searchTerms( taxonomy, value ).then( searchTermsResponse => {
									searchTermsResponse.json().then(
										terms => {
											if ( terms.length ) {
												setTerm( terms[ 0 ] );
											}
										}
									);
								} );
							}
						);
					} )
					.then( response => {
						if ( ! response ) {
							return;
						}

						response.json().then(
							newTerm => {
								const { id, name, slug } = newTerm;

								setTerm( {
									id,
									name,
									slug,
								} );
							}
						);
					} );
			}, [ label, taxonomy, value ] );

			return <WrappedComponent term={ term } { ...rest } />;
		}

		WithTerm.propTypes = {
			taxonomy: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		};

		return WithTerm;
	};
}
