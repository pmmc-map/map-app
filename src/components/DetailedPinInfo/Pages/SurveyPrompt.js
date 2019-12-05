import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const PROMPT_MODE = {
	FIRST_QUESTION: 0,
	PRE_SURVEY: 1,
	START_SURVEY: 2,
};

const SurveyPrompt = ({ children, onClickNo, onClickYes }) => (
	<div className='location-stats survey-prompt-container'>
		<div className='survey-prompt'>{children}</div>
	</div>
);

SurveyPrompt.propTypes = {
	children: PropTypes.node.isRequired,
	onClickNo: PropTypes.func.isRequired,
	onClickYes: PropTypes.func.isRequired,
};

// TODO: do not start survey when 'no' is clicked
// const SurveyPrompt = ({ showSurvey }) => {
//     const [promptMode, setPromptMode] = useState(PROMPT_MODE.FIRST_QUESTION);

//     useEffect(() => {
//         if (promptMode === PROMPT_MODE.START_SURVEY) showSurvey();
//     }, [promptMode, showSurvey]);

//     return (
//         <div className='location-stats survey-prompt-container'>
//             <div className='survey-prompt'>
//                 <h1 className='question'>
//                     {promptMode === PROMPT_MODE.FIRST_QUESTION
//                         ? 'Did you enjoy your visit?'
//                         : 'Would you like to share more about your experience today?'}
//                 </h1>
//             </div>
//         </div>
//     );
// };

// SurveyPrompt.propTypes = {
//     showSurvey: PropTypes.func.isRequired,
// };

export default SurveyPrompt;
