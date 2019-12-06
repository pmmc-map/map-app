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
	REFETCH_DATA_INTERVAL,
} from './constants';
import * as API from './api';
import { BING_API_KEY } from './keys';
import { MapContext } from './MapContext';

import DefaultOverlay from './components/DefaultOverlay';
import PinDropInstructions from './components/PinDropInstructions';
import PinDropOverlay from './components/PinDrop';
import { AnimalInfo, VisitorInfo } from './components/SelctedPinInfo';
import Survey from './components/Survey/Survey';

const App = props => {
	const globeRef = useRef(null);
	const [isLayerMaps, setIsLayerMaps] = useState(false);
	// values will be fetched from backend and loaded into state
	const [numCountries, setNumCountries] = useState(0);
	const [numStates, setNumStates] = useState(0);
	const [numRescues, setNumRescues] = useState(0);

	// set of pins to display on globe
	const [pinPositions, setPinPositions] = useState([]);
	const [oldPinsLoaded, setOldPinsLoaded] = useState(false);

	const [animalsLoaded, setAnimalsLoaded] = useState(false);
	const [allAnimalInfo, setAllAnimalInfo] = useState([]);
	const [selectedPin, setSelectedPin] = useState({});

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

	setTimeout(() => {
		const initAnimalInfo = async () => {
			const animalsResponse = await API.getAllAnimalData();
			const animalLocations = await animalsResponse.animal_locations;
			setAllAnimalInfo(animalLocations);
		};

		initAnimalInfo();

		const initRescueCounts = async () => {
			try {
				const rescueCountsResponse = await API.getRescueCounts();
				const counts = await rescueCountsResponse.counts;
				const rescueCounts = counts.filter(
					count => count.name === 'num_rescues'
				);
				setNumRescues(rescueCounts[0].total);
			} catch (err) {
				setNumRescues(0);
			}
		};
		initRescueCounts();
	}, REFETCH_DATA_INTERVAL);

	useEffect(() => {
		// fetch all the initial animal info!!
		const initAnimalInfo = async () => {
			const animalsResponse = await API.getAllAnimalData();
			const animalLocations = await animalsResponse.animal_locations;
			setAllAnimalInfo(animalLocations);
			setAnimalsLoaded(true);
		};
		initAnimalInfo();

		const initRescueCounts = async () => {
			try {
				const rescueCountsResponse = await API.getRescueCounts();
				const counts = await rescueCountsResponse.counts;
				const rescueCounts = counts.filter(
					count => count.name === 'num_rescues'
				);
				setNumRescues(rescueCounts[0].total);
			} catch (err) {
				setNumRescues(0);
			}
		};
		initRescueCounts();

		// fetch all the initial data from the database
		const initLocationCounts = async () => {
			try {
				const countsResponse = await API.getLocationCounts();
				const {
					success,
					total_visitors,
					unique_states,
					// unique_countries,
					unqiue_countries,
				} = await countsResponse;
				if (!success) throw 'error';
				setNumCountries(unqiue_countries);
				setNumStates(unique_states);
			} catch (err) {
				setNumCountries(0);
				setNumStates(0);
			}
		};
		initLocationCounts();

		const initPreviousPins = async () => {
			try {
				const pinsResponse = await API.getAllLocationData();
				const prevLocations = await pinsResponse.locations;
				setPinPositions(prevLocations);
			} catch (err) {
				setPinPositions([]);
			}
			setOldPinsLoaded(true);
		};
		initPreviousPins();
	}, []);

	const drawPin = (position, info = null, pinImg = '../assets/pin.png') => {
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
		placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
		placemark.eyeDistanceScalingThreshold = 2500000;

		placemark.info = info;

		// Add the placemark to the layer and to the Markers component
		const globe = globeRef.current;
		const layer = globe.getLayer('renderables');
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

		setSelectedPin(selected.userObject.info);
		setPinDropMode(APP_MODE.PIN_CLICKED);
	};

	useEffect(() => {
		if (globeRef && oldPinsLoaded && animalsLoaded) {
			globeRef.current.clickMode = CLICK_MODE.DROP;
			pinPositions.map(position => {
				position.type = 'pin';
				drawPin(position.coordinates, position);
			});
			drawPin(PMMC_POSITION, { title: 'PMMC' }, '../assets/star.png');
			allAnimalInfo.map(animal => {
				const { longitude, latitude } = animal.coordinates;
				const position = {
					longitude: longitude,
					latitude: latitude,
				};

				let icon = '../assets/sealion.png';
				if (animal.animal_type.indexOf('Seal') >= 0) {
					icon = '../assets/seal.png';
				}
				animal.type = 'animal';

				drawPin(position, animal, icon);
			});

			globeRef.current.clickMode = CLICK_MODE.PICK;
			setOldPinsLoaded(false);
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
				pinDropMode === APP_MODE.PIN_CLICKED
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
				if (!position) return;
				const placemark = drawPin(
					position,
					null,
					'../assets/pin-pending.png'
				);
				setLastDroppedPlacemark({
					placemark: placemark,
				});
				setPinDropMode(APP_MODE.PIN_DROP_CONFIRM);

				setGlobeFocusedPosition({
					longitude: position.longitude,
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
		const layer = globeRef.current.getLayer('renderables');
		layer.removeRenderable(lastDroppedPlacemark.placemark);
		layer.refresh();
		globeRef.current.wwd.redraw();
	};

	const onClickCancelPinDrop = () => {
		const layer = globeRef.current.getLayer('renderables');
		layer.removeRenderable(lastDroppedPlacemark.placemark);
		layer.refresh();
		globeRef.current.wwd.redraw();

		globeRef.current.armClickDrop(null);
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	const onClickDismissPinDrop = () => {
		globeRef.current.armClickDrop(null);
		setPinDropMode(APP_MODE.DEFAULT_SCREEN);
	};

	const onInvalidPinDrop = () => {
		globeRef.current.armClickDrop(null);
		setPinDropMode(APP_MODE.PIN_DROP_BEGIN);
	};

	const onClickConfirmPinDrop = locationData => {
		setPinPositions(pinPositions => {
			// need to redraw pin so we can add the pin meta info
			// that way we can select it later :)
			deleteDroppedPin();
			const pinInfo = locationData;
			pinInfo.coordinates = lastDroppedPlacemark.placemark.position;
			pinInfo.type = 'pin';
			drawPin(pinInfo.coordinates, pinInfo);

			return pinPositions.concat([pinInfo]);
		});
		setPinDropMode(APP_MODE.PIN_DROP_CONFIRMED);
	};

	const toggleMapLayers = () => {
		const satLayer = globeRef.current.getLayer('Satellite');
		satLayer.enabled = !satLayer.enabled;
		const mapLayer = globeRef.current.getLayer('Maps');
		mapLayer.enabled = !mapLayer.enabled;
		globeRef.current.wwd.redraw();

		setIsLayerMaps(isLayerMaps => !isLayerMaps);
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
					bingMapsKey={BING_API_KEY}
				/>
			</div>
			<MapContext.Provider
				value={{
					pinPosition: lastDroppedPlacemark.placemark.position,
					confirmDroppedPin: onClickConfirmPinDrop,
					cancelDroppedPin: onClickCancelPinDrop,
					returnToHomeScreen: onClickDismissPinDrop,
					toggleMapLayers: toggleMapLayers,
					isLayerMaps: isLayerMaps,
				}}
			>
				<div className='fullscreen-item'>
					<DefaultOverlay
						numVisitors={pinPositions.length}
						numCountries={numCountries}
						numStates={numStates}
						numRescues={numRescues}
						onStartPinDrop={onStartPinDrop}
						isShowing={pinDropMode === APP_MODE.DEFAULT_SCREEN}
						showSurvey={() => setPinDropMode(APP_MODE.START_SURVEY)}
					/>
					<PinDropInstructions
						onClick={onClickInstructions}
						isShowing={
							pinDropMode === APP_MODE.PIN_DROP_INSTRUCTIONS
						}
					/>
					<AnimalInfo
						{...selectedPin}
						onClickDismiss={() => {
							setPinDropMode(APP_MODE.DEFAULT_SCREEN);
							setMouseMode(MOUSE_MODE.NONE);
						}}
						isShowing={
							pinDropMode === APP_MODE.PIN_CLICKED &&
							selectedPin.type === 'animal'
						}
					/>
					<VisitorInfo
						{...selectedPin}
						onClickDismiss={() => {
							setPinDropMode(APP_MODE.DEFAULT_SCREEN);
							setMouseMode(MOUSE_MODE.NONE);
						}}
						isShowing={
							pinDropMode === APP_MODE.PIN_CLICKED &&
							selectedPin.type === 'pin'
						}
					/>
					<Survey
						onReturnClick={() => {
							setPinDropMode(APP_MODE.DEFAULT_SCREEN);
						}}
						isShowing={pinDropMode === APP_MODE.START_SURVEY}
						initialCard='intro'
					/>
					<PinDropOverlay
						onClickCancel={() => {
							deleteDroppedPin();
							setPinDropMode(APP_MODE.DEFAULT_SCREEN);
						}}
						isConfirmPopupShowing={
							// pinDropMode !== APP_MODE.PIN_DROP_BEGIN
							pinDropMode === APP_MODE.PIN_DROP_CONFIRM
						}
						onClickCancelPinDrop={onClickCancelPinDrop}
						onClickDismissPinDrop={onClickDismissPinDrop}
						onInvalidPinDrop={onInvalidPinDrop}
						showSurvey={() => setPinDropMode(APP_MODE.START_SURVEY)}
						isShowing={
							pinDropMode === APP_MODE.PIN_DROP_BEGIN ||
							pinDropMode === APP_MODE.PIN_DROP_DONE ||
							pinDropMode === APP_MODE.PIN_DROP_LOADING ||
							pinDropMode === APP_MODE.PIN_DROP_CONFIRM ||
							pinDropMode === APP_MODE.PIN_DROP_CONFIRMED
						}
					/>
				</div>
			</MapContext.Provider>
		</div>
	);
};

export default App;
