export const APP_MODE = {
	DEFAULT_SCREEN: 0,
	PIN_DROP_INSTRUCTIONS: 1,
	PIN_DROP_BEGIN: 2,
	PIN_DROP_CONFIRM: 3,
	PIN_DROP_LOADING: 4,
	PIN_DROP_CONFIRMED: 5,
	PIN_DROP_DONE: 6,
	ANIMAL_CLICKED: 7,
};

export const MOUSE_MODE = {
	DOWN: 5,
	UP: 6,
	MOVE: 7,
	NONE: 8,
};

// find out why adding bing layers doesn't work!
export const GLOBE_LAYERS = [
	'renderables',
	'eox-openstreetmap',
	// 'blue-marble',
	// 'atmosphere-day-night',
	// 'stars',
];

export const GLOBE_BACKGROUND_COLOR = '#2d2d2d';

// synced with our fork of react globe
// use this to differentiate between pin drop mode and pin select mode
export const CLICK_MODE = {
	DROP: 0,
	PICK: 1,
};

export const PMMC_POSITION = {
	latitude: 33.5733,
	longitude: -117.7628,
	altitude: 1972.1101500654263,
};
