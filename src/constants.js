export const APP_MODE = {
	DEFAULT_SCREEN: 0,
	PIN_DROP_INSTRUCTIONS: 1,
	PIN_DROP_BEGIN: 2,
	PIN_DROP_CONFIRM: 3,
	PIN_DROP_LOADING: 4,
	PIN_DROP_CONFIRMED: 5,
	PIN_DROP_DONE: 6,
	PIN_CLICKED: 7,
	START_SURVEY: 8,
};

export const MOUSE_MODE = {
	DOWN: 5,
	UP: 6,
	MOVE: 7,
	NONE: 8,
};

export const GLOBE_BACKGROUND_COLOR = '#2d2d2d';

export const GLOBE_LAYERS = [
	{
		layer: 'eox-sentinal2-labels',
		options: {
			category: 'base',
			enabled: true,
			displayName: 'Satellite',
		},
	},
	{
		layer: 'eox-openstreetmap',
		options: {
			category: 'overlay',
			enabled: false,
			opacity: 0.8,
			displayName: 'Maps',
		},
	},
	{
		layer: 'renderables',
		options: {
			category: 'data',
			enabled: true,
			displayName: 'renderables',
		},
	},
	{
		layer: 'stars',
		options: { category: 'setting', enabled: true },
	},
	{
		layer: 'atmosphere-day-night',
		options: { category: 'setting', enabled: true },
	},
];
// synced with our fork of react globe
// use this to differentiate between pin drop mode and pin select mode
export const CLICK_MODE = {
	DROP: 0,
	PICK: 1,
};

export const PMMC_POSITION = {
	latitude: 33.5733,
	longitude: -117.7628,
};

export const REFETCH_DATA_INTERVAL = 7200000;
