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
import * as API from './api';

import DefaultOverlay from './components/DefaultOverlay';
import PinDropInstructions from './components/PinDropInstructions';
import PinDropOverlay from './components/PinDrop';

const App = props => {
	const globeRef = useRef(null);

	// values will be fetched from backend and loaded into state
	const [numVisitors, setNumVisitors] = useState(0);
	const [numCountries, setNumCountries] = useState(0);
	// set of pins to display on globe
	const [pinPositions, setPinPositions] = useState([]);
	const [oldPinsLoaded, setOldPinsLoaded] = useState(false);

	// toggle whether or not we are dropping a pin or viewing the default stats overlay
	const [pinDropMode, setPinDropMode] = useState(APP_MODE.DEFAULT_SCREEN);
	const [lastDroppedPlacemark, setLastDroppedPlacemark] = useState({
		placemark: {
			position: {
				longitude: 0,
				latitude: 0,
			},
		},
	});
	const [lastDroppedStats, setLastDroppedStats] = useState({});

	// check if the user is dragging the screen
	// only  trigger pin drop mode if the screen is clicked, not dragged
	const [isMouseMoving, setIsMouseMoving] = useState(false);
	const [mouseMode, setMouseMode] = useState(MOUSE_MODE.NONE);

	// position at which the globe will be centered on
	const [globeFocusedPosition, setGlobeFocusedPosition] = useState({
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
		// prevent from dropping a new pin after a pin has been dropped
		setPinDropMode(APP_MODE.PIN_DROP_CONFIRM);
	};

	useEffect(() => {
		if (globeRef && !oldPinsLoaded) {
			pinPositions.map(position => drawPin(position));
			drawPin(PMMC_POSITION);
			setOldPinsLoaded(true);
		}
	}, [globeRef, oldPinsLoaded, pinPositions]);

	useEffect(() => {
		if (pinDropMode === APP_MODE.PIN_DROP_INSTRUCTIONS) {
			// disable all clicks when in pin drop mode
			return;
		}

		if (mouseMode === MOUSE_MODE.DOWN) {
			setIsMouseMoving(false);
		}

		if (mouseMode == MOUSE_MODE.MOVE) {
			setIsMouseMoving(true);
		}

		if (mouseMode === MOUSE_MODE.UP) {
			if (isMouseMoving) return;
			if (pinDropMode === APP_MODE.DEFAULT_SCREEN)
				setPinDropMode(APP_MODE.PIN_DROP_INSTRUCTIONS);
			if (pinDropMode === APP_MODE.PIN_DROP_BEGIN)
				globeRef.current.armClickDrop(position => {
					const placemark = drawPin(position);
					// offset focused position so that we have room to display popup for confirmation
					setLastDroppedPlacemark({
						placemark: placemark,
					});
					setPinDropMode(APP_MODE.PIN_DROP_CONFIRM);

					setGlobeFocusedPosition({
						longitude: position.longitude + 1,
						latitude: position.latitude,
					});
				});
		}
	}, [mouseMode, isMouseMoving, pinDropMode]);

	const onClickInstructions = () => {
		setMouseMode(MOUSE_MODE.NONE);
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	const deleteDroppedPin = () => {
		const layer = globeRef.current.getLayer('Renderables');
		layer.removeRenderable(lastDroppedPlacemark.placemark);
		layer.refresh();
	};

	const onClickCancelPinDrop = () => {
		globeRef.current.armClickDrop(null);
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	const onClickConfirmPinDrop = () => {};

	return (
		<div className='page'>
			<div
				className='globe-container'
				onMouseDown={() => setMouseMode(MOUSE_MODE.DOWN)}
				onMouseUp={() => setMouseMode(MOUSE_MODE.UP)}
				onMouseMove={() => setMouseMode(MOUSE_MODE.MOVE)}
				onTouchStart={() => setMouseMode(MOUSE_MODE.DOWN)}
				onTouchEnd={() => setMouseMode(MOUSE_MODE.UP)}
				onTouchMove={() => setMouseMode(MOUSE_MODE.MOVE)}
			>
				<Globe
					ref={globeRef}
					layers={GLOBE_LAYERS}
					{...globeFocusedPosition}
					backgroundColor={GLOBE_BACKGROUND_COLOR}
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
							pinDropMode !== APP_MODE.PIN_DROP_BEGIN
						}
						onClickCancelPinDrop={onClickCancelPinDrop}
						onClickConfirmPinDrop={onClickConfirmPinDrop}
						pinPosition={lastDroppedPlacemark.placemark.position}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
