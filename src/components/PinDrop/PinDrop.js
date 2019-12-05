import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import HelpModal from './PinDropHelp';
import InfoPopup from './InfoPopup';

const PinDropOverlay = ({
	onClickCancel,
	isConfirmPopupShowing,
	onInvalidPinDrop,
	showSurvey,
}) => {
	const [isHelpShowing, setIsHelpShowing] = useState(false);
	return (
		<div className='pin-drop-overlay'>
			<CSSTransition
				in={isHelpShowing && !isConfirmPopupShowing}
				timeout={300}
				classNames='help'
				unmountOnExit
			>
				<HelpModal onClick={() => setIsHelpShowing(false)} />
			</CSSTransition>
			<InfoPopup
				isShowing={isConfirmPopupShowing}
				showSurvey={showSurvey}
				onInvalidPinDrop={onInvalidPinDrop}
			/>
			<div className='bottom-cta'>
				<h1 className='header-visitors'>Where are you from?</h1>
			</div>
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
	onInvalidPinDrop: PropTypes.func.isRequired,
	showSurvey: PropTypes.func.isRequired,
};

export default PinDropOverlay;
