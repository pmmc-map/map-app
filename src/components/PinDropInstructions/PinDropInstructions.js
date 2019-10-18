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
			<h1>drop a pin instructions</h1>
		</div>
	);
};

PinDropInstructions.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default PinDropInstructions;
