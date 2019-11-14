import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LoadingScreen from '../LoadingScreen';
import * as API from '../../api';

const InfoPopup = ({ onClickCancel, onClickConfirm, pinPosition }) => {
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

			console.log('why');
			const fetchLocationImg = async () => {
				console.log('ssssfhoh');
				const city = await pinLocationData.city;
				// try {
				// console.log('hey');
				// const locationImgResp = await API.getCityImg(city);
				// const cityImg = await locationImgResp.body;
				// console.log(cityImg);
				// setCityImgSrc(cityImg);
				// } catch (error) {
				// console.log(error);
				setCityImgSrc('../../../public/defaultcity.jpg');
				// }
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
				<div className='pin-info-text'>
					{isConfirmClicked ? (
						<p>
							country visits:{' '}
							{isLocationStatsLoading
								? '...'
								: locationStats.country_count}
							<br />
							state visits:{' '}
							{isLocationStatsLoading
								? '...'
								: locationStats.state_count}
						</p>
					) : null}
				</div>
				<div className='confirmation-button-container'>
					{isConfirmClicked ? (
						<button
							onClick={onClickCancel}
							className='button button-cancel'
						>
							Dismiss
						</button>
					) : (
						<>
							<button
								onClick={() => setIsConfirmClicked(true)}
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
					)}
				</div>
			</div>
		</div>
	);
};

InfoPopup.propTypes = {
	onClickCancel: PropTypes.func.isRequired,
	onClickConfirm: PropTypes.func.isRequired,
	pinPosition: PropTypes.object.isRequired,
};

export default InfoPopup;
