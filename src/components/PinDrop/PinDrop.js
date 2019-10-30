import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HelpModal from './PinDropHelp';
import InfoPopup from './InfoPopup';

const PinDropOverlay = ({
	onClickCancel,
	isConfirmPopupShowing,
	onClickCancelPinDrop,
	onClickConfirmPinDrop,
	pinPosition,
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
					onClickCancel={onClickCancelPinDrop}
					onClickConfirm={onClickConfirmPinDrop}
					pinPosition={pinPosition}
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
	onClickCancelPinDrop: PropTypes.func.isRequired,
	onClickConfirmPinDrop: PropTypes.func.isRequired,
	pinPosition: PropTypes.object,
};

PinDropOverlay.defaultProps = {
	pinPosition: {
		longitude: 0,
		latitude: 0,
	},
};

export default PinDropOverlay;
