import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { useTransitionDelay } from '../../hooks';
import './style.css';

/**
 * this will show instructions on how to place a pin,
 */
const PinDropInstructions = ({ onClick, isShowing }) => {
	const isVisible = useTransitionDelay(isShowing, 300, false, true);

	return (
		<CSSTransition
			in={isVisible}
			timeout={300}
			classNames='pin-drop-instr-animate'
			unmountOnExit
		>
			<div
				className='pin-drop-instr-background'
				onClick={e => {
					e.stopPropagation();
					onClick();
				}}
			>
				<h1 className='pin-drop-cta'>
					Tap anywhere to begin dropping your pin!
				</h1>
				<ul>
					<li className='instr'>
						Zoom in on the globe with two fingers
					</li>
					<li className='instr'>
						Drop a pin by double tapping on an area on the map
					</li>
				</ul>
				<button className='button button-next'>Okay</button>
			</div>
		</CSSTransition>
	);
};

PinDropInstructions.propTypes = {
	onClick: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
};

export default PinDropInstructions;
