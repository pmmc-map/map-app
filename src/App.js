import React, { useEffect, useState, useRef } from 'react';
import Globe from 'worldwind-react-globe';
import './App.css';
import {
	APP_MODE,
	MOUSE_MODE,
	GLOBE_LAYERS,
	GLOBE_BACKGROUND_COLOR,
	PMMC_POSITION,
} from './constants';

import DefaultOverlay from './components/DefaultOverlay';
import PinDropInstructions from './components/PinDropInstructions';
import PinDrop from './components/PinDrop';

const layers = [
	{
		layer: 'renderables',
		options: {
			category: 'data',
			enabled: true,
			displayName: 'VisitorPins',
		},
	},
	{
		layer: 'eox-openstreetmap',
		options: { category: 'overlay', enabled: false, opacity: 0.8 },
	},
	{
		layer: 'bing-roads',
		options: { category: 'overlay', enabled: true, opacity: 1 },
	},
	{
		layer: 'stars',
		options: { category: 'overlay', enabled: true, opacity: 0.8 },
	},
];

const App = props => {
	const globeRef = useRef(null);

	// fake values
	const [numVisitors, setNumVisitors] = useState(20123);
	const [numCountries, setNumCountries] = useState(3);

	// toggle whether or not we are dropping a pin or viewing the default stats overlay
	const [pinDropMode, setPinDropMode] = useState(APP_MODE.DEFAULT_SCREEN);
	const [lastDroppedPlacemark, setLastDroppedPlacemark] = useState(null);

	// check if the user is dragging the screen
	// only  trigger pin drop mode if the screen is clicked, not dragged
	const [isMoving, setIsMoving] = useState(false);
	// set of pins to display on globe
	const [pinPositions, setPinPositions] = useState([]);
	const [oldPinsLoaded, setOldPinsLoaded] = useState(false);
	const [mouseMode, setMouseMode] = useState(APP_MODE.MOUSE_NONE);

	const [focusedPosition, setFocusedPosition] = useState({
		latitude: 0,
		longitude: 0,
	});

	useEffect(() => {
		// fetch all the initial data from the database
		console.log('loading previously dropped pins');
		setPinPositions([]);
		console.log('loading number of visitors');
		setNumVisitors(12345);
		console.log('loading number of countries');
		setNumCountries(5);
	}, []);

	// to be implemented
	const drawPin = position => {
		let attributes = new WorldWind.PlacemarkAttributes(null);
		attributes.imageScale = 0.8;
		attributes.imageOffset = new WorldWind.Offset(
			WorldWind.OFFSET_FRACTION,
			0.3,
			WorldWind.OFFSET_FRACTION,
			0.0
		);
		attributes.imageColor = WorldWind.Color.WHITE;
		attributes.labelAttributes.offset = new WorldWind.Offset(
			WorldWind.OFFSET_FRACTION,
			0.5,
			WorldWind.OFFSET_FRACTION,
			1.0
		);
		attributes.labelAttributes.color = WorldWind.Color.YELLOW;
		attributes.drawLeaderLine = true;
		attributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
		attributes.imageSource = 'https://i.imgur.com/Qur0t5s.png';
		// attributes.imageSource = '/pin.png';

		let placemark = new WorldWind.Placemark(
			position,
			/*eyeDistanceScaling*/ true,
			attributes
		);
		placemark.label =
			'Lat ' +
			position.latitude.toPrecision(4).toString() +
			'\nLon ' +
			position.longitude.toPrecision(5).toString();
		placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
		placemark.eyeDistanceScalingThreshold = 2500000;
		setPinPositions(pinPositions => pinPositions.concat([position]));

		// Add the placemark to the layer and to the Markers component
		const globe = globeRef.current;
		const layer = globe.getLayer('Renderables');
		if (layer) {
			// Add the placemark to the globe
			layer.addRenderable(placemark);
		} else {
			console.warn(
				'Renderable layer for markers not found: ' + 'VisitorPins'
			);
		}
		return placemark;
	};

	const dropNewPin = position => {
		drawPin(position);
		setPinDropMode(APP_MODE.PIN_DROP_CONFIRM);
	};

	useEffect(() => {
		console.log('loading previously dropped pins');
		console.log('loading number of visitors');
		console.log('loading number of countries');
	}, []);

	useEffect(() => {
		if (globeRef && !oldPinsLoaded) {
			pinPositions.map(position => drawPin(position));
			drawPin(PMMC_POSITION);
			setOldPinsLoaded(true);
		}
	}, [globeRef, oldPinsLoaded, pinPositions]);

	useEffect(() => {
		if (pinDropMode === APP_MODE.PIN_DROP_INSTRUCTIONS) {
			return;
		}

		if (mouseMode === APP_MODE.MOUSE_DOWN) {
			setIsMoving(false);
		}

		if (mouseMode == APP_MODE.MOUSE_MOVE) {
			setIsMoving(true);
		}

		if (mouseMode === APP_MODE.MOUSE_UP) {
			if (isMoving) return;
			if (pinDropMode === APP_MODE.DEFAULT_SCREEN)
				setPinDropMode(APP_MODE.PIN_DROP_INSTRUCTIONS);
			if (pinDropMode === APP_MODE.PIN_DROP_BEGIN)
				globeRef.current.armClickDrop(position => {
					const placemark = drawPin(position);
					// TODO: add loading state while pin is drawing
					// offset focused position so that we have room to display popup for confirmation
					setFocusedPosition({
						longitude: position.longitude + 1,
						latitude: position.latitude,
					});
					setPinDropMode(APP_MODE.PIN_DROP_CONFIRM);
					setLastDroppedPlacemark(placemark);
				});
		}
	}, [mouseMode, isMoving, pinDropMode]);

	const onClickInstructions = () => {
		setMouseMode(APP_MODE.MOUSE_NONE);
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	const deleteDroppedPin = () => {
		const layer = globeRef.current.getLayer('Renderables');
		layer.removeRenderable(lastDroppedPlacemark);
		layer.refresh();
	};

	const onClickCancelPinDrop = () => {
		deleteDroppedPin();
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	return (
		<div className='page'>
			<div
				onMouseDown={() => setMouseMode(APP_MODE.MOUSE_DOWN)}
				onMouseUp={() => setMouseMode(APP_MODE.MOUSE_UP)}
				onMouseMove={() => setMouseMode(APP_MODE.MOUSE_MOVE)}
			>
				<Globe
					ref={globeRef}
					layers={layers}
					{...focusedPosition}
					backgroundColor='#2d2d2d'
				/>
			</div>
			<div className='fullscreen-item'>
				{pinDropMode === APP_MODE.DEFAULT_SCREEN ? (
					<DefaultOverlay
						numVisitors={numVisitors}
						numCountries={numCountries}
					/>
				) : pinDropMode === APP_MODE.PIN_DROP_INSTRUCTIONS ? (
					<PinDropInstructions onClick={onClickInstructions} />
				) : (
					<PinDropOverlay
						onClickCancel={() => {
							deleteDroppedPin();
							setPinDropMode(APP_MODE.DEFAULT_SCREEN);
						}}
						isConfirmPopupShowing={
							pinDropMode === APP_MODE.PIN_DROP_CONFIRM
						}
						onClickCancelPinDrop={onClickCancelPinDrop}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
