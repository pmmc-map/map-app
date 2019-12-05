import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DonatePopup from './DonatePopup';
import Survey from '../Survey/Survey';

import { pluralize } from '../../utils';

/*
 * this is the default overlay that shows when we're not dropping a pin
 * should be shown when nobody's interacting with the screen
 * TODO: add commas to numbers when digits > 3
 */
const DefaultOverlay = ({
	numVisitors,
	numCountries,
	numStates,
	numRescues,
	onStartPinDrop,
	toggleMapLayers,
	nextMapLayerName,
}) => {
	const [displayDonatePopup, setDisplayDonatePopup] = useState(false);
	const d = new Date();
	return (
		<div className='default-overlay'>
			<div className='bigstats'>
				<h1 className='header-visitors'>{numVisitors} visitors</h1>
				<h3 className='visitor-substats'>
					{numCountries} countr{pluralize(numCountries, true)}
				</h3>
				<h3 className='visitor-substats'>
					{numStates} state{pluralize(numStates)}
				</h3>
				<h3 className='visitor-substats'>
					{numRescues} animal{pluralize(numRescues)} rescued
				</h3>
				<h1 className='header-visitors'>since {d.getFullYear()}</h1>
			</div>

			<button
				className='button button-next button-top-left'
				onClick={toggleMapLayers}
			>
				Use {nextMapLayerName} view
			</button>

			<div className='bottom-cta'>
				<h1 className='header-visitors'>
					Show us where you&#39;re from!
				</h1>
			</div>

			<button
				className='button button-donate'
				onClick={() => {
					setDisplayDonatePopup(true);
				}}
			>
				Donate
			</button>
			<button
				className='button button-next button-bottom-right'
				onClick={onStartPinDrop}
			>
				Start
			</button>
			{displayDonatePopup ? (
				<DonatePopup
					onReturnClick={() => setDisplayDonatePopup(false)}
				/>
			) : null}
		</div>
	);
};

DefaultOverlay.propTypes = {
	numVisitors: PropTypes.number.isRequired,
	numCountries: PropTypes.number.isRequired,
	numStates: PropTypes.number.isRequired,
	numRescues: PropTypes.number.isRequired,
	onStartPinDrop: PropTypes.func.isRequired,
	toggleMapLayers: PropTypes.func.isRequired,
	nextMapLayerName: PropTypes.string.isRequired,
};

export default DefaultOverlay;
