import React from 'react';
import PropTypes from 'prop-types';

const PinInfo = ({ onClickDismiss, headerImg, children }) => {
	return (
		<div className='pin-info-popup'>
			<div className='pin-info-image'>
				<img src={headerImg} />
			</div>
			<div className='pin-info-content'>
				{children}
				<div className='centered-button-container'>
					<button className='button' onClick={onClickDismiss}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

PinInfo.propTypes = {
	onClickDismiss: PropTypes.func.isRequired,
	headerImg: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default PinInfo;
