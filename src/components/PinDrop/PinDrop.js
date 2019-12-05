import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { useTransitionDelay } from '../../hooks';
import { MapContext } from '../../MapContext';
import MapToggle from '../MapToggle';
import HelpModal from './PinDropHelp';
import InfoPopup from './InfoPopup';

const PinDropOverlay = ({
	onClickCancel,
	isConfirmPopupShowing,
	onInvalidPinDrop,
	showSurvey,
	isShowing,
}) => {
	const isVisible = useTransitionDelay(isShowing, 300, false);
	const { returnToHomeScreen } = useContext(MapContext);
	const [isHelpShowing, setIsHelpShowing] = useState(false);
	return (
		<>
			<CSSTransition
				in={isVisible}
				timeout={300}
				classNames='confirmation-popup-animate'
				unmountOnExit
			>
				<div className='pin-drop-overlay'>
					<InfoPopup
						isShowing={isConfirmPopupShowing}
						showSurvey={showSurvey}
						onInvalidPinDrop={onInvalidPinDrop}
					/>
					{isShowing && <MapToggle />}
				</div>
			</CSSTransition>
			<CSSTransition
				in={isVisible}
				timeout={300}
				classNames='default-overlay-bottom-animate'
				unmountOnExit
			>
				<>
					<div className='bottom-cta'>
						<h1 className='header-visitors'>Where are you from?</h1>
					</div>
					<CSSTransition
						in={isHelpShowing && !isConfirmPopupShowing}
						timeout={300}
						classNames='help'
						unmountOnExit
					>
						<HelpModal onClick={() => setIsHelpShowing(false)} />
					</CSSTransition>
					<button
						className='button button-cancel button-pin-drop-cancel'
						onClick={returnToHomeScreen}
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
						{isHelpShowing && !isConfirmPopupShowing
							? 'Dismiss'
							: 'Help'}
					</button>
				</>
			</CSSTransition>
		</>
	);
};

PinDropOverlay.propTypes = {
	onClickCancel: PropTypes.func.isRequired,
	isConfirmPopupShowing: PropTypes.bool.isRequired,
	onInvalidPinDrop: PropTypes.func.isRequired,
	showSurvey: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
};

export default PinDropOverlay;
