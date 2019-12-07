import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SurveyIntro = ({ onNext }) => {
	return (
		<div
			className='card'
			onClick={e => {
				e.stopPropagation();
			}}
		>
			<div className='title-container'></div>

			<div className='card-body survey-intro'>
				<h1>Welcome to the PMMC feedback survey!</h1>
				<p>
					Thank you for taking the time to provide your thoughts about
					your visit. Your responses will be used to improve our
					visitor experience in the future.
				</p>
				<img src='/assets/animals/unused/Triscuit.jpg' />

				<button className='button button-next' onClick={onNext}>
					Next
				</button>
			</div>
		</div>
	);
};

SurveyIntro.propTypes = {
	onNext: PropTypes.func.isRequired,
};

export default SurveyIntro;
