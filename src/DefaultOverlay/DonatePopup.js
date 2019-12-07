import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const DonationCard = ({ onReturnClick }) => {
	return (
		<div className='donate-container'>
			<div className='popup-title-container'>
				<h1>Donate to PMMC</h1>
			</div>
			<div className='popup-body'>
				<p>
					Open the <strong>Camera app on your smartphone</strong> and{' '}
					<strong>scan the QR code below</strong> to donate to the
					Pacific Marine Mammal Center
				</p>
				<div>
					<img src={'/assets/donateQRcode.png'} />
				</div>

				<p>
					Your donation will provide life saving medication and fish
					for our patients. $1 is equivalent to 1 pound of fish for
					our animals!
				</p>

				<button onClick={onReturnClick} className='button'>
					Return to Map
				</button>
			</div>
		</div>
	);
};

DonationCard.propTypes = {
	onReturnClick: PropTypes.func.isRequired,
};

const DonatePopup = ({ onReturnClick }) => {
	return (
		<div
			className={'donate-background'}
			onClick={e => {
				onReturnClick();
				e.stopPropagation();
			}}
		>
			<DonationCard onReturnClick={onReturnClick} />
		</div>
	);
};

DonatePopup.propTypes = {
	onReturnClick: PropTypes.func.isRequired,
};

export default DonatePopup;
