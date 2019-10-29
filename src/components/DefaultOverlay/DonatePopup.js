import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const DonatePopup = ({ onReturnClick }) => {
	useEffect(() => {
		console.log('test');

		return () => console.log('goodbye');
	}, []);
	return (
		<div
			className={'donate-background'}
			onClick={e => {
				onReturnClick();
				e.stopPropagation();
			}}
		>
			<div className='donate-container'>
				<div className='popup-title-container'>
					<h1>Donate to PMMC</h1>
				</div>
				<div className='popup-body'>
					<p>
						Open the <strong>Camera app on your smartphone</strong>{' '}
						and <strong>scan the QR code below</strong> to donate to
						the Pacific Marine Mammal Center
					</p>
					<div>
						<img src={'../../../public/donateQRcode.png'} />
					</div>

					<p>
						Your donation will help to xxx, xxxxxx, and xxxxxxxxx
						xxxx xxxxxxx.
					</p>

					<button onClick={onReturnClick} className='button'>
						Return to Map
					</button>
				</div>
			</div>
		</div>
	);
};

DonatePopup.propTypes = {
	onReturnClick: PropTypes.func.isRequired,
};

export default DonatePopup;
