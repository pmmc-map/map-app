import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const InfoPopup = ({
	imgSrc,
	city,
	state,
	country,
	onClickCancel,
	onClickConfirm,
	loading,
}) => {
	console.log('loading', loading);
	if (loading)
		return (
			<div className='popup-loading'>
				<h1 className='popup-loading-message'>loading</h1>
			</div>
		);
	return (
		<div className='pin-info-popup'>
			<img className='pin-info-img' src={imgSrc} alt='test' />
			<div className='pin-info-content'>
				<h1 className='city-state-header'>{`${
					city ? city + ', ' : ''
				}${state}`}</h1>
				<h2 className='country-header'>{country}</h2>
				<div className='pin-info-text'>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					industry&apos;s standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and scrambled
					it to make a type specimen book. It has survived not only
					five centuries,
				</div>
				<div className='confirmation-button-container'>
					<button
						onClick={onClickConfirm}
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
				</div>
			</div>
		</div>
	);
};

InfoPopup.propTypes = {
	imgSrc: PropTypes.string,
	city: PropTypes.string,
	state: PropTypes.string,
	country: PropTypes.string.isRequired,
	onClickCancel: PropTypes.func.isRequired,
	onClickConfirm: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

InfoPopup.defaultProps = {
	imgSrc: 'https://i.imgur.com/zMSSREb.jpg',
	city: '',
	state: '',
};

export default InfoPopup;
