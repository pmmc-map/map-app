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

// find out why adding bing layers doesn't work!
export const GLOBE_LAYERS = [
	'renderables',
	// 'bing-aerial-labels',
	'eox-sentinal2-labels',
	// 'eox-openstreetmap',
	// 'blue-marble',
	'atmosphere-day-night',
	'stars',
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
};

export const ANIMAL_PICTURES = [
	{
		animal_name: 'Avocado.JPG',
		imgSrc: 'Avocado.JPG',
	},
	{
		animal_name: 'Brawler & Niblet',
		imgSrc: 'Brawler & Niblet.jpg',
	},
	{
		animal_name: 'Lumiere',
		imgSrc: 'Lumiere.jpg',
	},
	{
		animal_name: 'Luna',
		imgSrc: 'Luna.JPG',
	},
	{
		animal_name: 'Nick',
		imgSrc: 'Nick.jpg',
	},
	{
		animal_name: 'Oogie & Tiny',
		imgSrc: 'Oogie & Tiny.JPG',
	},
	{
		animal_name: 'Pearl and Xander',
		imgSrc: 'Pearl and Xander.JPG',
	},
	{
		animal_name: 'Roux & Huey',
		imgSrc: 'Roux & Huey.JPG',
	},
	{
		animal_name: 'Sage',
		imgSrc: 'Sage.jpg',
	},
	{
		animal_name: 'Summer & Call',
		imgSrc: 'Summer & Call.jpg',
	},
	{
		animal_name: 'Toasty & Starburst',
		imgSrc: 'Toasty & Starburst.JPG',
	},
	{
		animal_name: 'Ziggy',
		imgSrc: 'Ziggy.JPG',
	},
];
