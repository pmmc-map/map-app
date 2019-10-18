import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const InfoPopup = ({ imgSrc, onClickCancel, onClickConfirm }) => {
	return (
		<div className='pin-info-popup'>
			<img className='pin-info-img' src={imgSrc} alt='test' />
			<div className='pin-info-content'>
				<div>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					industry&apos;s standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and scrambled
					it to make a type specimen book. It has survived not only
					five centuries,
				</div>
				<div className='confirmation-button-container'>
					<button onClick={onClickConfirm} className='button'>
						Confirm
					</button>
					<button onClick={onClickCancel} className='button'>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

InfoPopup.propTypes = {
	imgSrc: PropTypes.string,
	onClickCancel: PropTypes.func.isRequired,
	onClickConfirm: PropTypes.func.isRequired,
};

InfoPopup.defaultProps = {
	imgSrc: 'https://i.imgur.com/zMSSREb.jpg',
};

export default InfoPopup;
