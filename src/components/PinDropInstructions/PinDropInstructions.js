import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * this will show instructions on how to place a pin,
 */
const PinDropInstructions = ({ onClick }) => {
	return (
		<div
			className='pin-drop-instr-background'
			onClick={e => {
				e.stopPropagation();
				onClick();
			}}
		>
			<ul>
				<li className='instr'>Zoom in on the globe with two fingers</li>
				<li className='instr'>
					Drop an pin by tapping on an area on the map
				</li>
			</ul>
			<h1 className='pin-drop-cta'>
				Tap anywhere to begin dropping your pin!
			</h1>
			<button className='button button-next'>Okay</button>
		</div>
	);
};

PinDropInstructions.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default PinDropInstructions;
