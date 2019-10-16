import React from 'react';

const PinDrop = ({ onClickCancel }) => {
	return (
		<div className='pin-drop-overlay'>
			<div className='button' onClick={() => onClickCancel()}>
				Cancel
			</div>
		</div>
	);
};

export default PinDrop;
