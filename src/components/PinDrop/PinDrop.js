import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import HelpModal from './PinDropHelp';
import InfoPopup from './InfoPopup';

const PinDropOverlay = ({
	onClickCancel,
	isConfirmPopupShowing,
	onClickCancelPinDrop,
	onClickConfirmPinDrop,
	onClickDismissPinDrop,
	onInvalidPinDrop,
	pinPosition,
	showSurvey,
}) => {
	const [isHelpShowing, setIsHelpShowing] = useState(false);
	return (
		<div className='pin-drop-overlay'>
			<div className='default-overlay'>
				<div className='bigstats'>
					<h1 className='header-visitors'>Where are you from?</h1>
				</div>
			</div>
			<CSSTransition
				in={isHelpShowing && !isConfirmPopupShowing}
				timeout={300}
				classNames='help'
				unmountOnExit
			>
				<HelpModal onClick={() => setIsHelpShowing(false)} />
			</CSSTransition>
			{isConfirmPopupShowing ? (
				<InfoPopup
					onClickCancel={onClickCancelPinDrop}
					onClickConfirm={onClickConfirmPinDrop}
					onClickDismiss={onClickDismissPinDrop}
					pinPosition={pinPosition}
					showSurvey={showSurvey}
					onInvalidPinDrop={onInvalidPinDrop}
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
				className='button button-help button-bottom-right'
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
	onClickDismissPinDrop: PropTypes.func.isRequired,
	onInvalidPinDrop: PropTypes.func.isRequired,
	pinPosition: PropTypes.object,
	showSurvey: PropTypes.func.isRequired,
};

PinDropOverlay.defaultProps = {
	pinPosition: {
		longitude: 0,
		latitude: 0,
	},
};

export default PinDropOverlay;
