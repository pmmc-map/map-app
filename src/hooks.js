import React, { useState, useEffect } from 'react';

import { getCityImg, getLocationCounts } from './api';

export const useCityImg = city => {
	const [img, setImg] = useState('../assets/loading.gif');

	useEffect(() => {
		const makeImageRequest = async () => {
			try {
				const locationImgResp = await getCityImg(city);
				const cityImg = locationImgResp;
				const blob = cityImg.image;
				setImg(`data:image; base64, ${blob}`);
			} catch (error) {
				console.log(error);
				setImg('../assets/defaultcity.jpg');
			}
		};
		if (city) {
			makeImageRequest();
		}
	}, [city]);

	return img;
};

export const useLocationStats = (country, state = '') => {
	const [countryCount, setCountryCount] = useState(0);
	const [stateCount, setStateCount] = useState(0);

	useEffect(() => {
		const makeLocationCountsRequest = async () => {
			try {
				const countsResponse = await getLocationCounts(country, state);
				const {
					success,
					this_country_count,
					this_state_count,
				} = await countsResponse;

				if (!success) throw 'Cant fetch country and state counts';
				setCountryCount(this_country_count);
				setStateCount(this_state_count);
			} catch (err) {
				console.log(err);
			}
		};

		makeLocationCountsRequest();
	}, [country, state]);

	return [countryCount, stateCount];
};

export const useTransitionDelay = (
	isVisible,
	timeout = 300,
	initVisible = true,
	isReverse = false
) => {
	const [isAnimationEntering, setIsAnimationEntering] = useState(initVisible);

	useEffect(() => {
		if (!isVisible) {
			if (isReverse) setIsAnimationEntering(false);
			else setTimeout(() => setIsAnimationEntering(false), timeout);
		} else {
			if (isReverse)
				setTimeout(() => setIsAnimationEntering(true), timeout);
			else setIsAnimationEntering(true);
		}
	}, [isVisible, timeout, isReverse]);

	return isAnimationEntering;
};
