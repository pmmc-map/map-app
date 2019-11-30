//const BASE_API_URL = 'http://54.183.19.24/';
// const BASE_API_URL = 'http://localhost:5000/';
const BASE_API_URL = 'https://www.pmmc-map.xyz/';

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
	const response = await fetch(
		BASE_API_URL + `api/images/city?city=${city}`,
		{
			method: 'GET',
			mode: 'cors',
			headers: {
				// 'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': BASE_API_URL,
			},
			withCredentials: true,
		}
	);

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

export const getLocationCounts = async (country = '', state = '') => {
	const query =
		country === '' || state === ''
			? ''
			: '?country=' + country + '&state=' + state;

	const response = await fetch(
		BASE_API_URL + 'api/locations/counts' + query,
		{
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': BASE_API_URL + '*',
			},
			withCredentials: true,
		}
	);
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
// id is optional
export const getQuestions = async (id = '') => {
	let response = await fetch(BASE_API_URL + 'api/questions', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		withCredentials: true,
	});
	response = await response.json();
	let questions = response.questions;

	// Get options of each question while already getting questions
	for (let i = 0; i < questions.length; i++) {
		response = await getQuestionOptions(questions[i].qid);
		questions[i].options = response.options;
	}

	return questions;
};

export const getQuestionOptions = async qid => {
	const response = await fetch(BASE_API_URL + 'api/options/qid/' + qid, {
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

export const submitResponse = async oid => {
	const response = await fetch(BASE_API_URL + 'api/visitor_response', {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			oid: oid,
		}),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		withCredentials: true,
	});
	return await response.json();
};
