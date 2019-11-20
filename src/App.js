import React, { useEffect, useState, useRef } from 'react';
import Globe from 'worldwind-react-globe';
import './App.css';
import {
	APP_MODE,
	MOUSE_MODE,
	GLOBE_LAYERS,
	GLOBE_BACKGROUND_COLOR,
	PMMC_POSITION,
	CLICK_MODE,
} from './constants';
import * as API from './api';

import DefaultOverlay from './components/DefaultOverlay';
import PinDropInstructions from './components/PinDropInstructions';
import PinDropOverlay from './components/PinDrop';
import AnimalInfo from './components/AnimalInfo';

const App = props => {
	const globeRef = useRef(null);

	// values will be fetched from backend and loaded into state
	const [numVisitors, setNumVisitors] = useState(0);
	const [numCountries, setNumCountries] = useState(0);
	const [numStates, setNumStates] = useState(0);
	// set of pins to display on globe
	const [pinPositions, setPinPositions] = useState([]);
	const [oldPinsLoaded, setOldPinsLoaded] = useState(false);

	const [animalsLoaded, setAnimalsLoaded] = useState(false);
	const [allAnimalInfo, setAllAnimalInfo] = useState([]);
	const [selectedAnimal, setSelectedAnimal] = useState({});

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
		// fetch all the initial animal info!!
		const initAnimalInfo = async () => {
			const animalsResponse = await API.getAllAnimalData();
			const animalLocations = await animalsResponse.animal_locations;
			setAllAnimalInfo(animalLocations);
			setAnimalsLoaded(true);
		};
		initAnimalInfo();
		// fetch all the initial data from the database
		const initLocationCounts = async () => {
			const countsResponse = await API.getLocationCounts();
			const {
				total_visitors,
				unique_states,
				unique_countries,
			} = await countsResponse.body;
			setNumVisitors(total_visitors);
			setNumCountries(unique_countries);
			setNumStates(unique_states);
		};
		initLocationCounts();

		console.log('loading previously dropped pins');
		setPinPositions([]);
		// console.log('loading number of visitors');
		// setNumVisitors(12345);
		// console.log('loading number of countries');
		// setNumCountries(5);
	}, []);

	const drawPin = (position, pinImg = '../public/pin.png', info = null) => {
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
		attributes.imageSource = pinImg;

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

		// pin hover
		const highlightAttributes = new WorldWind.PlacemarkAttributes(null);
		highlightAttributes.imageScale = 1.2;
		placemark.highlightAttributes = highlightAttributes;

		placemark.info = info;

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

	const selectPin = selectedPins => {
		if (selectedPins.length < 1) return;
		const selected = selectedPins[0];

		if (!selected.userObject || !selected.userObject.info) return;

		setSelectedAnimal(selected.userObject.info);
		setPinDropMode(APP_MODE.ANIMAL_CLICKED);
	};

	useEffect(() => {
		if (globeRef && !oldPinsLoaded && animalsLoaded) {
			globeRef.current.clickMode = CLICK_MODE.DROP;
			pinPositions.map(position => drawPin(position));
			drawPin(PMMC_POSITION, '../public/star.png');
			allAnimalInfo.map(animal => {
				const { longitude, latitude } = animal.coordinates;
				const position = {
					longitude: longitude,
					latitude: latitude,
					altitude: 263.3237286340391,
				};

				let icon = '../public/sealion.png';
				if (animal.animal_type.indexOf('Seal') >= 0) {
					icon = '../public/seal.png';
				}

				drawPin(position, icon, animal);
			});
			globeRef.current.clickMode = CLICK_MODE.PICK;
			setOldPinsLoaded(true);
			setAnimalsLoaded(false);
		}
	}, [globeRef, oldPinsLoaded, pinPositions, allAnimalInfo, animalsLoaded]);

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
			if (
				pinDropMode === APP_MODE.DEFAULT_SCREEN ||
				pinDropMode === APP_MODE.ANIMAL_CLICKED
			) {
				globeRef.current.armClickDrop(selectPin);
				globeRef.current.clickMode = CLICK_MODE.PICK;
				return;
			}
			if (pinDropMode === APP_MODE.PIN_DROP_CONFIRMED) {
				globeRef.current.armClickDrop(null);
				return;
			}
			// if (pinDropMode === APP_MODE.DEFAULT_SCREEN)
			// setPinDropMode(APP_MODE.PIN_DROP_INSTRUCTIONS);
			if (pinDropMode === APP_MODE.PIN_DROP_BEGIN)
				globeRef.current.clickMode = CLICK_MODE.DROP;
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

	const onStartPinDrop = () => {
		setPinDropMode(APP_MODE.PIN_DROP_INSTRUCTIONS);
	};

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
		const layer = globeRef.current.getLayer('Renderables');
		layer.removeRenderable(lastDroppedPlacemark.placemark);
		layer.refresh();

		globeRef.current.armClickDrop(null);
		// setPinDropMode(APP_MODE.PIN_DROP_INSTRUCTIONS);
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	const onClickDismissPinDrop = () => {
		globeRef.current.armClickDrop(null);
		setPinDropMode(APP_MODE.DEFAULT_SCREEN);
	};

	const onClickConfirmPinDrop = () => {
		setPinDropMode(APP_MODE.PIN_DROP_CONFIRMED);
	};

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
						numStates={numStates}
						onStartPinDrop={onStartPinDrop}
					/>
				) : pinDropMode === APP_MODE.PIN_DROP_INSTRUCTIONS ? (
					<PinDropInstructions onClick={onClickInstructions} />
				) : pinDropMode !== APP_MODE.ANIMAL_CLICKED ? (
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
						onClickDismissPinDrop={onClickDismissPinDrop}
						pinPosition={lastDroppedPlacemark.placemark.position}
					/>
				) : (
					<AnimalInfo
						{...selectedAnimal}
						onClickDismiss={() => {
							setPinDropMode(APP_MODE.DEFAULT_SCREEN);
							setMouseMode(MOUSE_MODE.NONE);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
