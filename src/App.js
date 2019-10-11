import React, { useEffect, useState, useRef } from 'react';
import Globe from 'worldwind-react-globe';
import './App.css';

import DefaultOverlay from './components/DefaultOverlay';
import PinDropOverlay from './components/PinDropOverlay';

const App = props => {
	const globeRef = useRef(null);

	// toggle whether or not we are dropping a pin or viewing the default stats overlay
	const [pinDropMode, setPinDropMode] = useState(false);

	// check if the user is dragging the screen
	// only  trigger pin drop mode if the screen is clicked, not dragged
	const [isMoving, setIsMoving] = useState(false);

	// to be implemented
	const onClickGlobe = item => console.log('got here', item);

	const triggerPinDropMode = () => {
		if (isMoving) return;
		setPinDropMode(true);
	};

	return (
		<div
			className='page'
			onMouseDown={() => !pinDropMode && setIsMoving(false)}
			onMouseUp={() => triggerPinDropMode()}
			onMouseMove={() => !pinDropMode && setIsMoving(true)}
		>
			<Globe ref={globeRef} />
			<div className='fullscreen-item'>
				{!pinDropMode ? <DefaultOverlay /> : <PinDropOverlay />}
			</div>
		</div>
	);
};

export default App;
