import React from 'react';
import './style.css';

const HelpModal = ({ onClick }) => (
	<div
		className='pin-help-modal'
		onClick={e => e.stopPropagation() && onClick()}
	>
		sjdfh dsjf h sdjfh sdfjh sdkjfhkjsdhfskdjf sjdfh skd sjdfh{' '}
	</div>
);

export default HelpModal;
