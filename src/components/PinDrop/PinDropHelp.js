import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const HelpModal = ({ onClick }) => (
	<div
		className='pin-help-modal'
		onClick={e => e.stopPropagation() && onClick()}
	>
		<ul className='pin-help-list'>
			<li className='pin-help-instr'>
				Zoom in on the globe with two fingers
			</li>
			<li className='pin-help-instr'>
				Drop an pin by tapping on an area on the map
			</li>
		</ul>
	</div>
);

HelpModal.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default HelpModal;
