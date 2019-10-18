import React from 'react';
import PropTypes from 'prop-types';

/*
 * this is the default overlay that shows when we're not dropping a pin
 * should be shown when nobody's interacting with the screen
 * TODO: add commas to numbers when digits > 3
 */
const DefaultOverlay = ({ numVisitors, numCountries }) => (
	<div className='default-overlay'>
		<div className='bigstats'>
			<h1 className='header-visitors'>{numVisitors} visitors</h1>
			<h3 className='visitor-substats'>{numCountries} countries</h3>
		</div>
		<h1 className='drop-pin-cta'>Touch anywhere to start pin drop</h1>

		<button className='button button-donate'>Donate</button>
	</div>
);

DefaultOverlay.propTypes = {
	numVisitors: PropTypes.number.isRequired,
	numCountries: PropTypes.number.isRequired,
};

export default DefaultOverlay;
