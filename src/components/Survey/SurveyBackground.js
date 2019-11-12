import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SurveyBackground = ({ onReturnClick, children }) => {
	return (
		<div
			className={'survey-background'}
			onClick={e => {
				//onReturnClick();
				e.stopPropagation();
			}}
		>
			{children}
		</div>
	);
};

SurveyBackground.propTypes = {
	onReturnClick: PropTypes.func.isRequired,
	children: PropTypes.element,
};

export default SurveyBackground;
