import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import LoadingScreen from '../LoadingScreen';
import DetailedPinInfo from '../DetailedPinInfo';
import * as API from '../../api';

const InfoPopup = ({
	onClickCancel,
	onClickConfirm,
	onClickDismiss,
	onInvalidPinDrop,
	pinPosition,
	showSurvey,
}) => {
	const [cityImgSrc, setCityImgSrc] = useState(null);
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

	useEffect(() => {
		const fetchPinInfo = async () => {
			const pinDropResponse = await API.getPinInfo(pinPosition);
			const pinLocationData = await pinDropResponse;

			if (pinLocationData.success) {
				setLocationData(pinLocationData);
			} else {
				setIsResponseSuccessful(false);
				return;
			}

			const fetchLocationImg = async () => {
				const city = await pinLocationData.city;
				try {
					const locationImgResp = await API.getCityImg(city);
					const cityImg = await locationImgResp;
					const blob = await cityImg.image;
					setCityImgSrc(`data:image;base64,${blob}`);
				} catch (error) {
					console.log(error);
					setCityImgSrc('../../../assets/defaultcity.jpg');
				}
			};

			fetchLocationImg();
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
		onClickCancel();
		return null;
	}

	if (isPinLocationDataLoading) return <LoadingScreen />;

	if (isConfirmClicked && !isLocationStatsLoading)
		return (
			<DetailedPinInfo
				{...locationData}
				{...locationStats}
				cityImg={cityImgSrc}
				onClickDismiss={onClickDismiss}
				showSurvey={showSurvey}
			/>
		);

	return (
		<div className='pin-info-popup'>
			<div className='pin-info-image'>
				<img src={cityImgSrc || '../../../assets/loading.gif'} />
			</div>
			<div className='pin-info-content'>
				<h1 className='header-1 city-state-header'>{`${
					locationData.city ? locationData.city + ', ' : ''
				}${locationData.state ? locationData.state : ''}`}</h1>
				<h2 className='header-2 country-header'>
					{locationData.country}
				</h2>
				<div className='pin-info-text'>
					Would you like to drop your pin here?
				</div>
				<div className='centered-button-container'>
					<>
						<button
							onClick={() => {
								onClickConfirm(locationData);
								setIsConfirmClicked(true);
							}}
							className='button button-confirm'
						>
							Confirm
						</button>
						<button
							onClick={onClickCancel}
							className='button button-cancel'
						>
							Cancel
						</button>
					</>
				</div>
			</div>
		</div>
	);
};

InfoPopup.propTypes = {
	onClickCancel: PropTypes.func.isRequired,
	onClickConfirm: PropTypes.func.isRequired,
	onClickDismiss: PropTypes.func.isRequired,
	onInvalidPinDrop: PropTypes.func.isRequired,
	pinPosition: PropTypes.object.isRequired,
	showSurvey: PropTypes.func.isRequired,
};

export default InfoPopup;
