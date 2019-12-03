import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { getLocationCounts } from '../../api';
import { pluralize, pluralizeIsAre } from '../../utils.js';
import './style.css';
import './Pages/animations.css';

import VisitorData from './Pages/VisitorData';
import DistanceTravelled from './Pages/DistanceTravelled';
import SurveyPrompt from './Pages/SurveyPrompt';

const DetailedPinInfo = ({
	city,
	cityImg,
	state,
	country,
	city_count,
	country_count,
	distance,
	onClickDismiss,
	showSurvey,
}) => {
	const [curPage, setCurPage] = useState(0);
	const [graphData, setGraphData] = useState({
		this_state_count: 0,
		this_country_count: 0,
	});

	useEffect(() => {
		getLocationCounts(country, state).then(response => {
			setGraphData(response);
		});
	}, [country, state]);

	return (
		<div className='modal-big-background'>
			<div className='modal-big'>
				<div className='modal-big-header pin-info-image blur'>
					<img src={cityImg || '../../../assets/defaultcity.jpg'} />
				</div>
				<div className='modal-big-body'>
					<div className='title'>
						<h1 className='header-1'>
							{(city ? city + ', ' : '') + state}
						</h1>
						<h2 className='header-2'>{country}</h2>
					</div>
					<CSSTransition
						in={curPage === 0}
						timeout={300}
						classNames='distance-animate'
						unmountOnExit
					>
						<DistanceTravelled distance={distance} />
					</CSSTransition>
					<CSSTransition
						in={curPage === 1}
						timeout={300}
						classNames='survey-prompt-animate'
						unmountOnExit
					>
						<VisitorData
							country_count={country_count}
							city_count={city_count}
							city={city}
							state={state}
							country={country}
							graphData={graphData}
						/>
					</CSSTransition>

					<CSSTransition
						in={curPage !== 1 && curPage !== 0}
						timeout={300}
						classNames='survey-prompt-animate'
						unmountOnExit
					>
						<SurveyPrompt showSurvey={showSurvey} />
					</CSSTransition>
					{curPage < 2 ? (
						<div className='button-nav'>
							<button
								onClick={onClickDismiss}
								className='button button-cancel'
							>
								Close
							</button>
							{/*
							<button
								onClick={() =>
									setCurPage(curPage => curPage - 1)
								}
								className='button button-cancel'
							>
								Back
							</button>
							*/}
							<button
								onClick={() => {
									setCurPage(curPage => curPage + 1);
								}}
								disabled={curPage > 1}
								className='button button-confirm'
							>
								Next
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

DetailedPinInfo.propTypes = {
	city: PropTypes.string,
	cityImg: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	city_count: PropTypes.number.isRequired,
	country_count: PropTypes.number.isRequired,
	distance: PropTypes.number.isRequired,
	onClickDismiss: PropTypes.func.isRequired,
	showSurvey: PropTypes.func.isRequired,
};

DetailedPinInfo.defaultProps = {
	city: '',
};

export default DetailedPinInfo;
