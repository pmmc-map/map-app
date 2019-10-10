import React, { useState } from 'react';
import Globe from 'worldwind-react-globe';
import './App.css';

const App = props => {
	return (
		<div className='page'>
			<Globe arm />
			<div className='fullscreen-item'>
				<div className='bigstats'>
					<h1>20,123 visitors</h1>
					<h3>3 countries</h3>
					<h3>23 numbers</h3>
				</div>
			</div>
		</div>
	);
};

export default App;
