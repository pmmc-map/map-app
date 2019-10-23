import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HelpModal from './PinDropHelp';
import InfoPopup from './InfoPopup';

const PinDropOverlay = ({
	onClickCancel,
	isConfirmPopupShowing,
	isConfirmPinLoading,
	onClickCancelPinDrop,
	locationData,
}) => {
	const [isHelpShowing, setIsHelpShowing] = useState(false);
	return (
		<div className='pin-drop-overlay'>
			<div className='default-overlay'>
				<div className='bigstats'>
					<h1 className='header-visitors'>Where are you from?</h1>
				</div>
			</div>

			{isHelpShowing && !isConfirmPopupShowing ? (
				<HelpModal onClick={() => setIsHelpShowing(false)} />
			) : null}
			{isConfirmPopupShowing ? (
				<InfoPopup
					loading={isConfirmPinLoading}
					{...locationData}
					onClickCancel={onClickCancelPinDrop}
					onClickConfirm={() => console.log('hi')}
				/>
			) : null}
			<button
				className='button button-cancel button-pin-drop-cancel'
				onClick={onClickCancel}
			>
				Cancel
			</button>
			<button
				disabled={isConfirmPopupShowing}
				className='button button-help'
				onClick={() =>
					setIsHelpShowing(isHelpShowing => !isHelpShowing)
				}
			>
				{isHelpShowing && !isConfirmPopupShowing ? 'Dismiss' : 'Help'}
			</button>
		</div>
	);
};

PinDropOverlay.propTypes = {
	onClickCancel: PropTypes.func.isRequired,
	isConfirmPopupShowing: PropTypes.bool.isRequired,
	isConfirmPinLoading: PropTypes.bool.isRequired,

	onClickCancelPinDrop: PropTypes.func.isRequired,
	locationData: PropTypes.object,
};

PinDropOverlay.defaultProps = {
	locationData: {
		city: '',
		country: '',
		state: '',
	},
};

export default PinDropOverlay;
