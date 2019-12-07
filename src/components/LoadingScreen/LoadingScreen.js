import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LoadingScreen = () => (
	<div className='loader-page'>
		<img className='loader-circle' src='/assets/loading.gif' />
	</div>
);

const LoadingText = ({ width, height }) => (
	<div className='loading-container' style={{ width: width, height: height }}>
		<div className='loader-thing'></div>
	</div>
);

LoadingText.propTypes = {
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
};

export { LoadingText };

export default LoadingScreen;
