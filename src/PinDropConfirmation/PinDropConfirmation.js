import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { useCityImg } from '../hooks';
import { MapContext } from '../MapContext';
import { useTransitionDelay } from '../hooks';
import './style.css';
import LoadingScreen, { LoadingText } from '../components/LoadingScreen';
import DetailedPinInfo from '../DetailedPinInfo';
import * as API from '../api';

const PinDropConfirmation = ({ onInvalidPinDrop, showSurvey, isShowing }) => {
	const isVisible = useTransitionDelay(isShowing, 300, false);

	const { pinPosition, confirmDroppedPin, cancelDroppedPin } = useContext(
		MapContext
	);
	const [isConfirmClicked, setIsConfirmClicked] = useState(false);
	const [isPinLocationDataLoading, setIsPinLocationDataLoading] = useState(
		true
	);
	const [isResponseSuccessful, setIsResponseSuccessful] = useState(true);
	const [locationData, setLocationData] = useState({
		city: '',
		state: '',
		country: '',
	});
	const [locationStats, setLocationStats] = useState({});
	const [isLocationStatsLoading, setIsLocationStatsLoading] = useState(true);
	const cityImgSrc = useCityImg(locationData.city);

	useEffect(() => {
		setIsPinLocationDataLoading(true);
		const fetchPinInfo = async () => {
			const pinDropResponse = await API.getPinInfo(pinPosition);
			const { success, ...locationData } = await pinDropResponse;

			if (success) {
				setLocationData(locationData);
			} else {
				setIsResponseSuccessful(false);
				return;
			}

			setIsPinLocationDataLoading(false);
		};
		fetchPinInfo();
	}, [pinPosition]);

	useEffect(() => {
		if (!isConfirmClicked) return;

		const makeRecordRequest = async () => {
			const response = await API.recordVisitorLocation(pinPosition);
			const {
				city_count,
				state_count,
				country_count,
				distance,
			} = response;

			setLocationStats({
				city_count: city_count,
				state_count: state_count,
				country_count: country_count,
				distance: distance,
			});
			setIsLocationStatsLoading(false);
		};

		makeRecordRequest();
	}, [isConfirmClicked, pinPosition]);

	// TODO: clean this up
	if (isPinLocationDataLoading && !isResponseSuccessful) {
		cancelDroppedPin();
		return null;
	}

	if (isConfirmClicked && !isLocationStatsLoading)
		return (
			<DetailedPinInfo
				{...locationData}
				{...locationStats}
				cityImg={cityImgSrc}
				showSurvey={showSurvey}
			/>
		);

	return (
		<>
			{isPinLocationDataLoading && isVisible ? <LoadingScreen /> : null}
			<CSSTransition
				in={!isPinLocationDataLoading && isVisible}
				timeout={300}
				classNames='confirmation-popup-animate'
				unmountOnExit
			>
				<div className='pin-info-popup'>
					<div className='pin-info-image'>
						<img src={cityImgSrc} />
					</div>
					<div className='pin-info-content'>
						{locationData && locationData.country ? (
							<>
								<h1 className='header-1 city-state-header'>{`${
									locationData.city
										? locationData.city + ', '
										: ''
								}${
									locationData.state ? locationData.state : ''
								}`}</h1>
								<h2 className='header-2 country-header'>
									{locationData.country}
								</h2>
							</>
						) : (
							<>
								<LoadingText width='100%' height='2.5rem' />
								<LoadingText width='80%' height='2rem' />
							</>
						)}

						<div className='pin-info-text'>
							Would you like to drop your pin at this location?
						</div>
						<div className='centered-button-container'>
							<>
								<button
									onClick={cancelDroppedPin}
									className='button button-cancel'
								>
									Cancel
								</button>
								<button
									onClick={() => {
										confirmDroppedPin(locationData);
										setIsConfirmClicked(true);
									}}
									className='button button-confirm'
								>
									Drop pin
								</button>
							</>
						</div>
					</div>
				</div>
			</CSSTransition>
		</>
	);
};

PinDropConfirmation.propTypes = {
	onInvalidPinDrop: PropTypes.func.isRequired,
	showSurvey: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
};

export default PinDropConfirmation;
