import React, { useEffect, useState } from 'react';
import {
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
		"options": [
			{
				"oid": "12345",
				"qid": "12345",
				"text": "animal"
			}
		]
	}
]
 */

const QuestionCard = ({ onReturnClick, onSelect, onNext, onCancel, currentQuestion, questionList }) => {

	useEffect(()=>{
		document.getElementById('question-options').reset();
	}, [currentQuestion]);

	//todo {bug}: inputs for form visually resets but does not seem to actually reset
	return (
		<div
			className='question-card'
			onClick={(e)=>{
				e.stopPropagation();
			}}
		>
			<div className='title-container'>
				<h1>
					{
						questionList === null ? ('Loading ...') :
							questionList.length === 0 ? ('Error Loading Questions') :
								(questionList[currentQuestion].text)
					}
				</h1>
			</div>
			<div className='question-body'>
				<form id='question-options'>
					{
						questionList === null || questionList.length === 0 ? null:
							questionList[currentQuestion].options.map((option)=>
								[
									(<input type="radio" name={option.qid} value={JSON.stringify(option)} onChange={onSelect}/>),
									option.text,
									(<br/>)
								]
							)
					}
				</form>
				{
					questionList === null || questionList.length === 0 ? null :
						(<button onClick={()=>onNext(questionList[currentQuestion].qid)}>
							{currentQuestion === questionList.length-1 ? 'Submit' : 'Next'}
						</button>)
				}
			</div>
		</div>
	);
};

QuestionCard.defaultProps = {
	onReturnClick: ()=>{},
	onSelect: ()=>{},
	onNext: ()=>{},
	onCancel: ()=>{},
	currentQuestion: 0,
	questionList: [],
}

QuestionCard.propTypes = {
	onReturnClick: PropTypes.func,
	onSelect: PropTypes.func,
	onNext: PropTypes.func,
	onCancel: PropTypes.func,
	currentQuestion: PropTypes.number,
	questionList: PropTypes.oneOfType([PropTypes.shape([
		{
			qid: PropTypes.any.isRequired,
			text: PropTypes.any.isRequired,
			options: [
				{
					oid: PropTypes.any.isRequired,
					qid: PropTypes.any.isRequired,
					text: PropTypes.any.isRequired
				}
			]
		}
	]), PropTypes.any]),
};

export default QuestionCard;
