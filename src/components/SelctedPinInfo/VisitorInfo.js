import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import SelectedPinInfo from './SelectedPinInfo';
import { useCityImg, useLocationStats } from '../../hooks';
import { pluralizeIsAre, pluralize } from '../../utils';

const VisitorInfo = ({ city, country, state, onClickDismiss, isShowing }) => {
	const cityImg = useCityImg(city);
	const [countryCount, stateCount] = useLocationStats(country, state);

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
				<p className='visitor-count-text'>
					<span className='blue-number'>
						{`${countryCount} visitor${pluralize(countryCount)} `}
					</span>
					{pluralizeIsAre(countryCount)} from this country
				</p>
				{state && (
					<p className='visitor-count-text'>
						<span className='blue-number'>
							{`${stateCount} visitor${pluralize(stateCount)} `}
						</span>
						{pluralizeIsAre(stateCount)} from this state
					</p>
				)}
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
