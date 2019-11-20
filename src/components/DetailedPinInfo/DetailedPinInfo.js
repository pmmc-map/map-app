import React from 'react';
import PropTypes from 'prop-types';

import { pluralize, pluralizeIsAre } from '../../utils.js';
import './style.css';

const DetailedPinInfo = ({
	city,
	cityImg,
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
				<div
					className='modal-big-header pin-info-image'
					style={{
						background: cityImg ? `url("${cityImg}")` : '#cacaca',
					}}
				></div>
				<div className='modal-big-body'>
					<h1 className='header-1'>
						{(city ? city + ', ' : '') + state}
					</h1>
					<h2 className='header-2'>{country}</h2>
					{/*
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
					*/}
					<div className='location-stats'>
						<div className='left'>
							<div className='stats-graph'>
								<img src='../../../public/statsplaceholder.png' />
							</div>
						</div>
						<div className='right'>
							<div className='visitor-count'>
								<h1 className='big-number visitors-country'>
									{`${country_count} visitor${pluralize(
										country_count
									)}`}
								</h1>
								<span className='visitor-stats'>
									{`${pluralizeIsAre(country_count)} `} from
									your country
								</span>

								<h1 className='big-number visitors-city'>
									{`${city_count} visitor${pluralize(
										city_count
									)}`}
								</h1>
								<span className='visitor-stats'>
									{`${pluralizeIsAre(city_count)} `} from your
									city
								</span>
							</div>
						</div>
					</div>
					<div className='button-nav'>
						<button
							onClick={onClickDismiss}
							className='button button-cancel'
						>
							Dismiss
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

DetailedPinInfo.propTypes = {
	city: PropTypes.string.isRequired,
	cityImg: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	city_count: PropTypes.number.isRequired,
	country_count: PropTypes.number.isRequired,
	distance: PropTypes.number.isRequired,
	onClickDismiss: PropTypes.func.isRequired,
};

export default DetailedPinInfo;
