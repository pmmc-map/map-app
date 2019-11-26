import React, { useEffect, useState } from 'react';
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

const QuestionCard = ({
	onReturnClick,
	onSelect,
	onNext,
	onCancel,
	currentQuestion,
	questionList,
}) => {
	useEffect(() => {
		let temp = document.getElementsByTagName('input');
		for (let i = 0; i < temp.length; i++) {
			// just in case other radio buttons are added to the application
			// we dont want to reset those by accident
			if (temp[i].name === 'surveyQuestion' + currentQuestion) {
				temp[i].checked = false;
			}
		}
	}, [currentQuestion]);

	const ready = questionList === null || questionList.length === 0;
	return (
		<div
			className='card'
			onClick={e => {
				e.stopPropagation();
			}}
		>
			<div className='title-container'>
				<h1>PMMC Survey</h1>
			</div>

			<div className='card-body'>
				<h1>
					{questionList === null
						? 'Loading ...'
						: questionList.length === 0
							? 'Error Loading Questions'
							: questionList[currentQuestion].text}
				</h1>

				{ready ? null : (
					<div>
						<div className='option-container'>
							<form className='question-options'>
								{questionList[currentQuestion].options.map(
									option => (
										<div>
											<input
												type='radio'
												id={option.oid}
												name={
													'surveyQuestion' + currentQuestion
												}
												value={JSON.stringify(option)}
												onChange={onSelect}
											/>
											{option.text}
											<br/>
										</div>
									)
								)}
							</form>
						</div>
						<button
							className={'button ' + (currentQuestion === questionList.length - 1?'button-confirm':'button-next')}
							onClick={() =>
								onNext(questionList[currentQuestion].qid)
							}
						>
							{currentQuestion === questionList.length - 1
								? 'Submit'
								: 'Next'}
						</button>
						<br />
						<div className='progress-bar-container'>
							<progress
								className='progressBar'
								max={questionList.length}
								value={currentQuestion}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

QuestionCard.defaultProps = {
	onReturnClick: () => {},
	onSelect: () => {},
	onNext: () => {},
	onCancel: () => {},
	currentQuestion: 0,
	questionList: [],
};

QuestionCard.propTypes = {
	onReturnClick: PropTypes.func,
	onSelect: PropTypes.func,
	onNext: PropTypes.func,
	onCancel: PropTypes.func,
	currentQuestion: PropTypes.number,
	questionList: PropTypes.oneOfType([
		PropTypes.shape([
			{
				qid: PropTypes.any.isRequired,
				text: PropTypes.any.isRequired,
				options: [
					{
						oid: PropTypes.any.isRequired,
						qid: PropTypes.any.isRequired,
						text: PropTypes.any.isRequired,
					},
				],
			},
		]),
		PropTypes.any,
	]),
};

export default QuestionCard;
