import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SelectedPinInfo from './SelectedPinInfo';
import { useCityImg } from '../../hooks';

const VisitorInfo = ({ city, country, state, onClickDismiss, isShowing }) => {
	const cityImg = useCityImg(city);

	return (
		<SelectedPinInfo
			headerImg={cityImg}
			onClickDismiss={onClickDismiss}
			isShowing={isShowing}
		>
			<>
				<h1 className='header-1'>
					{city ? `${city}, ` : ''}
					{state}
				</h1>
				<h2 className='header-2'>{country}</h2>
			</>
		</SelectedPinInfo>
	);
};

VisitorInfo.propTypes = {
	city: PropTypes.string,
	country: PropTypes.string,
	state: PropTypes.string,
	onClickDismiss: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
};

VisitorInfo.defaultProps = {
	city: '',
	state: '',
	country: '',
};

export default VisitorInfo;
