import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const testImage =
	'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.manatt.com%2FManatt%2Fmedia%2FMedia%2FImages%2FOffices%2FOffice-Los-Angeles.jpg%3Fext%3D.jpg';

const InfoPopup = ({ imgSrc = testImage, onClickCancel, onClickConfirm }) => {
	return (
		<div className='pin-info-popup'>
			<img src={imgSrc} alt='test' />
			<div className='pin-info-content'>
				<div>
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
	msg: PropTypes.string,
	onClickCancel: PropTypes.func.isRequired,
	onClickConfirm: PropTypes.func.isRequired,
};

export default InfoPopup;
