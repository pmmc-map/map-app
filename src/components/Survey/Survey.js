import React, {useState, useEffect } from 'react';
import SurveyBackground from "./SurveyBackground";
import QuestionCard from "./QuestionCard";
import {
	getQuestions,
	submitResponse,
	getQuestionOptions
} from '../../api';
import PropTypes from 'prop-types';
import './style.css';

/*
Question list format

[
	{
		"qid": "12345",
		"text": "what is a seal?"
	}
]
 */

const Survey = ({onReturnClick}) => {
	const [init, _] = useState(true);
	const [questions, setQuestions] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [responses, setResponses] = useState({});

	useEffect(()=>{
		// component just loaded
		getQuestions().then((questions)=>{
			setQuestions(questions);
		}).catch(()=>{
			setQuestions([]);
		});
	}, [init]);

	// go to next question
	let onNext = async (qid)=>{
		if(!(qid in responses)){
			// no response was selected
			console.log('qid is not in response');
			return;
		}

		if(currentQuestion < questions.length-1){
			console.log('incrementing');
			setCurrentQuestion(currentQuestion+1);
		}
		else{
			// last question was just submitted so submit all responses
			console.log('submitting');
			let keys = Object.keys(responses);
			for(let i = 0; i < keys.length; i++){
				await submitResponse(responses[keys[i]].oid);
			}
			onReturnClick();
		}
	};

	// selection is an option object
	let onSelect = (e)=>{
		let selection = JSON.parse(e.target.value);
		console.log(selection);
		let temp = responses;
		temp[selection.qid] = selection;
		setResponses(temp);
		e.stopPropagation();
	};

	return (
		<div>
			<SurveyBackground onReturnClick={onReturnClick}>
				<QuestionCard
					currentQuestion={currentQuestion}
					questionList={questions}
					onReturnClick={onReturnClick}
					onNext={onNext}
					onSelect={onSelect}
					onCancel={onReturnClick}
				/>
			</SurveyBackground>
		</div>
	);
};

Survey.propTypes = {
	onReturnClick: PropTypes.func.isRequired
};

export default Survey;
