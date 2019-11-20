import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LoadingScreen from '../LoadingScreen';
import DetailedPinInfo from '../DetailedPinInfo';
import * as API from '../../api';

import streamToBlob from 'stream-to-blob';

const InfoPopup = ({
	onClickCancel,
	onClickConfirm,
	onClickDismiss,
	pinPosition,
}) => {
	const [cityImgSrc, setCityImgSrc] = useState('');
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
					console.log(locationImgResp);
					const cityImg = await locationImgResp;
					console.log(cityImg);
					const blob = await cityImg.image;
					console.log(blob);
					setCityImgSrc(`data:image; base64, ${blob}`);
				} catch (error) {
					console.log(error);
					setCityImgSrc('../../../public/defaultcity.jpg');
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
	if (isPinLocationDataLoading && !isResponseSuccessful)
		return <div>error in getting response</div>;

	if (isPinLocationDataLoading) return <LoadingScreen />;

	if (isConfirmClicked && !isLocationStatsLoading)
		return (
			<DetailedPinInfo
				{...locationData}
				{...locationStats}
				cityImg={cityImgSrc}
				onClickDismiss={onClickDismiss}
			/>
		);

	return (
		<div className='pin-info-popup'>
			<div
				style={{
					background: cityImgSrc ? `url("${cityImgSrc}")` : '#cacaca',
				}}
				className='pin-info-image'
			/>
			<div className='pin-info-content'>
				<h1 className='city-state-header'>{`${
					locationData.city ? locationData.city + ', ' : ''
				}${locationData.state}`}</h1>
				<h2 className='country-header'>{locationData.country}</h2>
				<div className='pin-info-text'></div>
				<div className='confirmation-button-container'>
					<>
						<button
							onClick={() => {
								onClickConfirm();
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
	pinPosition: PropTypes.object.isRequired,
};

export default InfoPopup;
