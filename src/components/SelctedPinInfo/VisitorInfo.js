import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SelectedPinInfo from './SelectedPinInfo';
import { useCityImg } from '../../hooks';

/*
 *      "city": "Santa Fe County",
      "coordinates": {
        "latitude": 35.76473475558005,
        "longitude": -105.98370769790841
      },
      "country": "USA",
      "state": "New Mexico",
	  "visit_date": "Mon, 02 Dec 2019 00:37:53 GMT"
	  */

const VisitorInfo = ({ city, country, state, onClickDismiss }) => {
	const cityImg = useCityImg(city);

	return (
		<SelectedPinInfo headerImg={cityImg} onClickDismiss={onClickDismiss}>
			<>
				<h1 className='header-1'>
					{city}, {state}
				</h1>
				<h2 className='header-2 dark'>{country}</h2>
			</>
		</SelectedPinInfo>
	);
};

VisitorInfo.propTypes = {
	city: PropTypes.string,
	country: PropTypes.string.isRequired,
	state: PropTypes.string,
	onClickDismiss: PropTypes.func.isRequired,
};

VisitorInfo.defaultProps = {
	city: '',
	state: '',
};

export default VisitorInfo;
