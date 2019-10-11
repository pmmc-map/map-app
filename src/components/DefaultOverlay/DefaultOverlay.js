import React from 'react';

/*
 * this is the default overlay that shows when we're not dropping a pin
 * should be shown when nobody's interacting with the screen
 */
const DefaultOverlay = props => (
	<>
		<div className='bigstats'>
			<h1>20,123 visitors</h1>
			<h3>3 countries</h3>
			<h3>23 numbers</h3>
		</div>
		<h1 className='drop-pin-cta'>Touch anywhere to start pin drop</h1>
	</>
);

export default DefaultOverlay;
