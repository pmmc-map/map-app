import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HelpModal from './PinDropHelp';
import InfoPopup from './InfoPopup';

const PinDrop = ({
	onClickCancel,
	isConfirmPopupShowing,
	toggleConfirmPopupShowing,
}) => {
	const [isHelpShowing, setIsHelpShowing] = useState(false);
	return (
		<div className='pin-drop-overlay'>
			{isHelpShowing ? (
				<HelpModal onClick={() => setIsHelpShowing(false)} />
			) : null}
			{isConfirmPopupShowing ? (
				<InfoPopup
					onClickCancel={toggleConfirmPopupShowing}
					onClickConfirm={() => console.log('hi')}
				/>
			) : null}
			<button
				className='button button-cancel'
				onClick={() => onClickCancel()}
			>
				Cancel
			</button>
			<button
				className='button button-help'
				onClick={() =>
					setIsHelpShowing(isHelpShowing => !isHelpShowing)
				}
			>
				{isHelpShowing ? 'Dismiss' : 'Help'}
			</button>
		</div>
	);
};

PinDrop.propTypes = {
	onClickCancel: PropTypes.func.isRequired,
	isConfirmPopupShowing: PropTypes.bool.isRequired,
	toggleConfirmPopupShowing: PropTypes.func.isRequired,
};

export default PinDrop;
