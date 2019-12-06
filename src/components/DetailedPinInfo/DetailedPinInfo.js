import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { MapContext } from '../../MapContext';
import { getLocationCounts } from '../../api';
import { pluralize, pluralizeIsAre } from '../../utils.js';
import './style.css';
import './Pages/animations.css';

import VisitorData from './Pages/VisitorData';
import DistanceTravelled from './Pages/DistanceTravelled';
import SurveyPrompt from './Pages/SurveyPrompt';

const InfoPageTransition = ({ isVisible, children, classNames }) => {
	const [transitionIn, setTransitionIn] = useState(false);

	useEffect(() => {
		if (isVisible) setTimeout(() => setTransitionIn(true), 350);
		else setTransitionIn(false);
	}, [isVisible]);

	return (
		<CSSTransition
			in={transitionIn}
			timeout={300}
			classNames={classNames}
			unmountOnExit
		>
			{children}
		</CSSTransition>
	);
};

InfoPageTransition.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	classNames: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

const DetailedPinInfo = ({
	city,
	cityImg,
	state,
	country,
	city_count,
	country_count,
	distance,
	showSurvey,
}) => {
	const { returnToHomeScreen } = useContext(MapContext);
	const [curPage, setCurPage] = useState(0);
	const [graphData, setGraphData] = useState({
		success:false,
		total_visitors:0,
		unique_states:0,
		unqiue_countries:0,
		this_state_count:0,
		this_country_count:0
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
					<InfoPageTransition
						classNames='distance-animate'
						isVisible={curPage === 0}
					>
						<DistanceTravelled distance={distance} />
					</InfoPageTransition>
					<InfoPageTransition
						classNames='survey-prompt-animate'
						isVisible={curPage === 1}
					>
						<VisitorData
							country_count={country_count}
							city_count={city_count}
							city={city}
							state={state}
							country={country}
							graphData={graphData}
						/>
					</InfoPageTransition>

					<InfoPageTransition
						classNames='distance-animate'
						isVisible={curPage === 2}
					>
						<SurveyPrompt>
							<h1 className='question'>
								Did you enjoy your visit?
							</h1>
						</SurveyPrompt>
					</InfoPageTransition>
					<InfoPageTransition
						classNames='survey-prompt-animate'
						isVisible={curPage === 3}
					>
						<SurveyPrompt>
							<>
								<h1 className='question'>
									Would you like to share more about your
									experience today?
								</h1>

								<p>
									Your feedback is very important to us and
									helps our organization grow!
								</p>
							</>
						</SurveyPrompt>
					</InfoPageTransition>
					<div className='button-nav'>
						<button
							onClick={() =>
								curPage === 2
									? setCurPage(curPage => curPage + 1)
									: returnToHomeScreen()
							}
							className='button button-cancel'
						>
							{curPage < 2 ? 'Close' : 'No'}
						</button>
						<button
							onClick={() =>
								curPage === 3
									? showSurvey()
									: setCurPage(curPage => curPage + 1)
							}
							className='button button-confirm'
						>
							{curPage < 2 ? 'Next' : 'Yes'}
						</button>
					</div>
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
	showSurvey: PropTypes.func.isRequired,
};

DetailedPinInfo.defaultProps = {
	city: '',
};

export default DetailedPinInfo;
