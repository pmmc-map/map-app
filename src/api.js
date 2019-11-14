const BASE_API_URL = 'http://127.0.0.1:5000/';

export const getPinInfo = async position => {
	const response = await fetch(BASE_API_URL + 'api/geocoder', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL,
		},
		body: JSON.stringify({
			lat: position.latitude,
			long: position.longitude,
		}),
		withCredentials: true,
	});

	return await response.json();
};

export const getCityImg = async city => {
	const response = await fetch(BASE_API_URL + 'api/images/city', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL,
		},
		body: JSON.stringify({
			city: city,
		}),
		withCredentials: true,
	});

	return await response.json();
};

export const recordVisitorLocation = async position => {
	const response = await fetch(BASE_API_URL + 'api/locations', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		body: JSON.stringify({
			lat: position.latitude,
			long: position.longitude,
		}),
		withCredentials: true,
	});
	return await response.json();
};

export const getAllLocationData = async () => {
	const response = await fetch(BASE_API_URL + 'api/locations', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		withCredentials: true,
	});
	return await response.json();
};

export const getAllAnimalData = async () => {
	const response = await fetch(BASE_API_URL + 'api/animal_locations', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		withCredentials: true,
	});
	return await response.json();
};
