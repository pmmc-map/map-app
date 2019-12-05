import React, { useState, useEffect } from 'react';

import { getCityImg } from './api';

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

export const useTransitionDelay = (
	isVisible,
	timeout = 300,
	initVisible = true
) => {
	const [isAnimationEntering, setIsAnimationEntering] = useState(initVisible);

	useEffect(() => {
		if (!isVisible)
			setTimeout(() => setIsAnimationEntering(false), timeout);
		else setIsAnimationEntering(true);
	}, [isVisible, timeout]);

	return isAnimationEntering;
};
