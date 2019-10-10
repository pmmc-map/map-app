import React, { useEffect, useState, useRef } from 'react';
import Globe from 'worldwind-react-globe';
import './App.css';

const App = props => {
	const globeRef = useRef(null);
	const [initialized, setInitialized] = useState(false);

	const onClickGlobe = item => {
		console.log(item);
	};

	const onUpdate = data => {
		console.log(data);
	};

	useEffect(() => {
		console.log(globeRef.current);
		globeRef.current.armClickDrop(onClickGlobe);
	}, [globeRef]);

	return (
		<div className='page'>
			<Globe ref={globeRef} onUpdate={onUpdate} />
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
