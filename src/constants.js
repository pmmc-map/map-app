export const APP_MODE = {
	DEFAULT_SCREEN: 0,
	PIN_DROP_INSTRUCTIONS: 1,
	PIN_DROP_BEGIN: 2,
	PIN_DROP_CONFIRM: 3,
	PIN_DROP_DONE: 4,
};

export const MOUSE_MODE = {
	DOWN: 5,
	UP: 6,
	MOVE: 7,
	NONE: 8,
};

export const GLOBE_LAYERS = [
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

export const GLOBE_BACKGROUND_COLOR = '#2d2d2d';
