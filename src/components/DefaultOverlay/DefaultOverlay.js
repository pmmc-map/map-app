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
	onStartPinDrop,
}) => {
	const [displayDonatePopup, setDisplayDonatePopup] = useState(false);
	const d = new Date();
	return (
		<div className='default-overlay'>
			<div className='bigstats'>
				<h1 className='header-visitors'>{numVisitors} visitors </h1>
				<h3 className='visitor-substats'>
					{numCountries} countr{pluralize(numCountries, true)}
				</h3>
				<h3 className='visitor-substats'>
					{numStates} state{pluralize(numStates)}
				</h3>
				<h1 className='header-visitors'>{d.getFullYear()}</h1>
			</div>

			{/*<h1 className='drop-pin-cta'>Touch anywhere to start pin drop</h1> */}

			<button
				className='button button-donate'
				onClick={() => {
					setDisplayDonatePopup(true);
				}}
			>
				Donate
			</button>
			<button
				className='button button-bottom-right'
				onClick={onStartPinDrop}
			>
				Start
			</button>
			{displayDonatePopup ? (
				<Survey
					onReturnClick={() => {
						setDisplayDonatePopup(false);
					}}
				/>
			) : null}
		</div>
	);
};

DefaultOverlay.propTypes = {
	numVisitors: PropTypes.number.isRequired,
	numCountries: PropTypes.number.isRequired,
	numStates: PropTypes.number.isRequired,
	onStartPinDrop: PropTypes.func.isRequired,
};

export default DefaultOverlay;
