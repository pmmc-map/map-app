export const pluralize = (num, hasY = false) =>
	hasY ? (num > 1 ? 'ies' : 'y') : num > 1 ? 's' : '';

export const pluralizeIsAre = num => (num > 1 ? 'are' : 'is');
