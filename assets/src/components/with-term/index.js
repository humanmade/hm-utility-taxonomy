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

export function createTerm( taxonomy, name, slug ) {
	return apiFetch( {
		method: 'POST',
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
					.catch( error => {
						if ( error.code === 'term_exists' ) {
							return searchTerms( taxonomy, value )
								.then( terms => {
									if ( terms.length ) {
										setTerm( terms[0] );
									}
								} );
						}

						return Promise.reject( error );
					} )
					.then( newTerm => {
						if ( newTerm ) {
							const { id, name, slug } = newTerm;

							setTerm( {
								id,
								name,
								slug,
							} );
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
