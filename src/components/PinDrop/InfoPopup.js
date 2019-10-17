import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const InfoPopup = ({
	imgSrc,
	cityState,
	country,
	onClickCancel,
	onClickConfirm,
}) => {
	return (
		<div className='pin-info-popup'>
			<img src={imgSrc} alt='test' />
			<div className='pin-info-content'>
				<h1 className='city-state-header'>{cityState}</h1>
				<h2 className='country-header'>{country}</h2>
				<div className='pin-info-text'>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
				</div>
				<button onClick={onClickConfirm} className='button'>
					Confirm
				</button>
				<button onClick={onClickCancel} className='button'>
					Cancel
				</button>
			</div>
		</div>
	);
};

InfoPopup.propTypes = {
	imgSrc: PropTypes.string,
	cityState: PropTypes.string,
	country: PropTypes.string,
	onClickCancel: PropTypes.func.isRequired,
	onClickConfirm: PropTypes.func.isRequired,
};

InfoPopup.defaultProps = {
	imgSrc: 'https://i.imgur.com/zMSSREb.jpg',
	cityState: 'Los Angeles, California',
	country: 'United States',
};

export default InfoPopup;
