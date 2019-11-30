import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const PROMPT_MODE = {
	FIRST_QUESTION: 0,
	PRE_SURVEY: 1,
	START_SURVEY: 2,
};

// TODO: do not start survey when 'no' is clicked
const SurveyPrompt = ({ showSurvey }) => {
	const [promptMode, setPromptMode] = useState(PROMPT_MODE.FIRST_QUESTION);

	useEffect(() => {
		if (promptMode === PROMPT_MODE.START_SURVEY) showSurvey();
	}, [promptMode, showSurvey]);

	return (
		<div className='location-stats survey-prompt-container'>
			<div className='survey-prompt'>
				<h1 className='question'>
					{promptMode === PROMPT_MODE.FIRST_QUESTION
						? 'Did you enjoy your visit?'
						: 'Would you like to share more about your experience today?'}
				</h1>
				<div className='button-nav'>
					<button
						onClick={() =>
							setPromptMode(promptMode => promptMode + 1)
						}
						className='button button-cancel'
					>
						No
					</button>
					<button
						onClick={() =>
							setPromptMode(promptMode => promptMode + 1)
						}
						className='button button-confirm'
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

SurveyPrompt.propTypes = {
	showSurvey: PropTypes.func.isRequired,
};

export default SurveyPrompt;
