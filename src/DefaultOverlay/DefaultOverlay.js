import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { useTransitionDelay } from '../hooks';
import DonatePopup from './DonatePopup';
import Survey from '../Survey/Survey';
import MapToggle from '../components/MapToggle';
import ZoomControls from '../components/ZoomControls';
import { pluralize } from '../utils';

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
	isShowing,
	showSurvey,
}) => {
	const [displayDonatePopup, setDisplayDonatePopup] = useState(false);
	const isVisible = useTransitionDelay(isShowing, 300, false);
	const d = new Date();

	return (
		<>
			<CSSTransition
				in={isVisible}
				timeout={300}
				classNames='default-overlay-top-animate'
				unmountOnExit
			>
				<div className='default-overlay'>
					<div className='bigstats'>
						<h1 className='header-visitors'>
							{numVisitors} visitors
						</h1>
						<h3 className='visitor-substats'>
							{numCountries} countr{pluralize(numCountries, true)}
						</h3>
						<h3 className='visitor-substats'>
							{numStates} state{pluralize(numStates)}
						</h3>
						<h3 className='visitor-substats'>
							{numRescues} animal{pluralize(numRescues)} rescued
						</h3>
						<h1 className='header-visitors'>
							since {d.getFullYear()}
						</h1>
					</div>
				</div>
			</CSSTransition>
			<CSSTransition
				in={isVisible}
				timeout={300}
				classNames='default-overlay-bottom-animate'
				unmountOnExit
			>
				<>
					<div className='bottom-cta'>
						<h1 className='header-visitors'>
							Show us where you&#39;re from!
						</h1>
					</div>

					<MapToggle />
					<ZoomControls />
					<div className='button-container'>
						<button
							className='button button-next'
							onClick={showSurvey}
						>
							Survey
						</button>

						<button
							className='button button-donate'
							onClick={() => {
								setDisplayDonatePopup(true);
							}}
						>
							Donate
						</button>
					</div>
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
				</>
			</CSSTransition>
		</>
	);
};

DefaultOverlay.propTypes = {
	numVisitors: PropTypes.number.isRequired,
	numCountries: PropTypes.number.isRequired,
	numStates: PropTypes.number.isRequired,
	numRescues: PropTypes.number.isRequired,
	onStartPinDrop: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
	showSurvey: PropTypes.func.isRequired,
};

export default DefaultOverlay;
