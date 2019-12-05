import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const SurveyPrompt = ({ children }) => (
	<div className='location-stats survey-prompt-container'>
		<div className='survey-prompt'>{children}</div>
	</div>
);

SurveyPrompt.propTypes = {
	children: PropTypes.node.isRequired,
};

export default SurveyPrompt;
