import React, { useEffect, useState } from 'react';
import {Button, Form, ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
		let temp = document.getElementsByTagName('input');
		for(let i = 0; i < temp.length; i++){
			// just in case other radio buttons are added to the application
			// we dont want to reset those by accident
			if(temp[i].name === 'surveyQuestion'+currentQuestion){
				temp[i].checked = false;
			}
		}
	}, [currentQuestion]);

	const ready = questionList === null || questionList.length === 0;
	return (
		<div
			className='question-card'
			onClick={(e)=>{
				e.stopPropagation();
			}}
		>
			<div className='title-container'>
				<h1>PMMC Survey</h1>
			</div>

			<div className='question-body'>
				<h1>
					{
						questionList === null ? ('Loading ...') :
							questionList.length === 0 ? ('Error Loading Questions') :
								(questionList[currentQuestion].text)
					}
				</h1>
				
				{
					ready ? null:(
						<div>
							<Form.Group className='question-options'>
								{
									questionList[currentQuestion].options.map((option)=>
										(
											<Form.Check
												custom
												type='radio'
												id={option.oid}
												name={'surveyQuestion'+currentQuestion}
												value={JSON.stringify(option)} onChange={onSelect}
												label={option.text}
											/>
										)
									)
								}
							</Form.Group>
							<Button variant={currentQuestion === questionList.length-1 ? 'success' : 'primary'} size='lg' onClick={()=>onNext(questionList[currentQuestion].qid)}>
								{currentQuestion === questionList.length-1 ? 'Submit' : 'Next'}
							</Button>
							<br/>
							<div className='progress-bar-container'>
								<ProgressBar
									now={Math.floor((currentQuestion/questionList.length)*100)}
									label={Math.floor((currentQuestion/questionList.length)*100)+'%'}
								/>
							</div>
						</div>
					)
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
};

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
