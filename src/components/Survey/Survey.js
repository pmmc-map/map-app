import React, { useState, useEffect } from 'react';
import SurveyBackground from './SurveyBackground';
import QuestionCard from './QuestionCard';
import { getQuestions, submitResponse, getQuestionOptions } from '../../api';
import PropTypes from 'prop-types';
import './style.css';
import { DonationCard } from '../DefaultOverlay/DonatePopup';
import SurveyIntro from './SurveyIntro';

/*
Question list format

[
	{
		"qid": "12345",
		"text": "what is a seal?"
	}
]
 */

const Survey = ({ onReturnClick, initialCard, isShowing }) => {
	const [init, _] = useState(true);
	const [questions, setQuestions] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [responses, setResponses] = useState({});
	const [currentCard, setCurrentCard] = useState(initialCard);

	useEffect(() => {
		// component just loaded
		getQuestions()
			.then(questions => {
				setQuestions(questions);
			})
			.catch(() => {
				setQuestions([]);
			});
	}, [init]);

	// go to next question
	let onNext = async qid => {
		if (!(qid in responses)) {
			// no response was selected
			return;
		}

		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			// last question was just submitted so submit all responses
			let keys = Object.keys(responses);
			for (let i = 0; i < keys.length; i++) {
				await submitResponse(responses[keys[i]].oid);
			}
			setCurrentCard('donation');
		}
	};

	// selection is an option object
	let onSelect = e => {
		let selection = JSON.parse(e.target.value);
		let temp = responses;
		temp[selection.qid] = selection;
		setResponses(temp);
		e.stopPropagation();
	};

	if (!isShowing) return null;

	return (
		<div>
			<SurveyBackground onReturnClick={onReturnClick}>
				{currentCard === 'intro' ? (
					<SurveyIntro
						onNext={() => {
							setCurrentCard('questions');
						}}
					/>
				) : currentCard === 'questions' ? (
					<QuestionCard
						currentQuestion={currentQuestion}
						questionList={questions}
						onReturnClick={onReturnClick}
						onNext={onNext}
						onSelect={onSelect}
						onCancel={onReturnClick}
					/>
				) : (
					<DonationCard onReturnClick={onReturnClick} />
				)}
			</SurveyBackground>
		</div>
	);
};

Survey.defaultProps = {
	initialCard: 'questions',
};

Survey.propTypes = {
	onReturnClick: PropTypes.func.isRequired,
	initialCard: PropTypes.string,
	isShowing: PropTypes.bool.isRequired,
};

export default Survey;
