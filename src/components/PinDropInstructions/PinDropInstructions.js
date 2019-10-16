import React from 'react';
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
		</div>
	);
};

export default PinDropInstructions;
