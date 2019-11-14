import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const DetailedPinInfo = ({
	city,
	state,
	country,
	city_count,
	country_count,
	distance,
	onClickDismiss,
}) => {
	return (
		<div className='modal-big-background'>
			<div className='modal-big'>
				<div className='modal-big-header'></div>
				<div className='modal-big-body'>
					<h1 className='city-state-header'>
						{(city ? city + ', ' : '') + state}
					</h1>
					<h2 className='country-header'>{country}</h2>
					<div className='distance-info'>
						You have travelled{' '}
						<span className='distance'>
							{distance.toPrecision(4)} miles
						</span>{' '}
						to visit the{' '}
						<span className='pmmc'>
							Pacific Marine Mammal Center!
						</span>
					</div>
					<button
						onClick={onClickDismiss}
						className='button button-cancel'
					>
						Dismiss
					</button>
				</div>
			</div>
		</div>
	);
};

DetailedPinInfo.propTypes = {
	city: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	city_count: PropTypes.number.isRequired,
	country_count: PropTypes.number.isRequired,
	distance: PropTypes.number.isRequired,
	onClickDismiss: PropTypes.func.isRequired,
};

export default DetailedPinInfo;
