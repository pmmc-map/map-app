import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const HelpModal = ({ onClick }) => (
	<div
		className='pin-help-modal'
		onClick={e => e.stopPropagation() && onClick()}
	>
		sjdfh dsjf h sdjfh sdfjh sdkjfhkjsdhfskdjf sjdfh skd sjdfh
	</div>
);

HelpModal.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default HelpModal;
