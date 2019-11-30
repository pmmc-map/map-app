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

			<div className='card-body'>
				<p>Welcome to the survey</p>
				<button className='button button-next' onClick={onNext}>
					Next
				</button>
			</div>
		</div>
	);
};

SurveyIntro.defaultProps = {};

SurveyIntro.propTypes = {};

export default SurveyIntro;
