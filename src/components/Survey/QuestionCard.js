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
	const [options, setOptions] = useState([]);
	const [isOptionSelected, setIsOptionSelected] = useState(false);

	useEffect(() => {
		const uncheckedOptions =
			questionList && questionList[currentQuestion]
				? questionList[currentQuestion].options
				: [];
		setOptions(
			uncheckedOptions.map(opt => {
				opt.isChecked = false;
				return opt;
			})
		);
		setIsOptionSelected(false);
	}, [questionList, currentQuestion]);

	console.log('x');
	console.log(options);

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

	const markOptionSelected = option => {
		setOptions(options =>
			options.map(opt => {
				if (opt.oid === option.oid) opt.isChecked = true;
				else opt.isChecked = false;
				return opt;
			})
		);
		setIsOptionSelected(true);
	};

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
								{options.map(option => (
									<div
										onClick={() => {
											markOptionSelected(option);
											onSelect(option);
										}}
										key={JSON.stringify(option)}
									>
										<input
											type='radio'
											id={option.oid}
											name={
												'surveyQuestion' +
												currentQuestion
											}
											value={JSON.stringify(option)}
											onChange={e => {
												// e.target.checked = !e.`t;
												e.stopPropagation();
											}}
											checked={option.isChecked}
										/>
										{option.text}
										<br />
									</div>
								))}
							</form>
						</div>
						<div className={'survey-buttons'}>
							<button
								className={'button button-cancel'}
								onClick={onReturnClick}
							>
								Cancel
							</button>

							<button
								className={
									'button ' +
									(currentQuestion === questionList.length - 1
										? 'button-confirm'
										: 'button-next')
								}
								disabled={!isOptionSelected}
								onClick={() =>
									isOptionSelected
										? onNext(
												questionList[currentQuestion]
													.qid
										  )
										: null
								}
							>
								{currentQuestion === questionList.length - 1
									? 'Submit'
									: 'Next'}
							</button>
						</div>

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
