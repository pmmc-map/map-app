const BASE_API_URL = 'https://pmmc-flask-backend.herokuapp.com/';

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
	let query = '';
	if (country && state) {
		const searchParams = new URLSearchParams();
		searchParams.append('country', country);
		searchParams.append('state', state);
		query = '?' + searchParams.toString();
	}

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

export const getRescueCounts = async () => {
	const response = await fetch(BASE_API_URL + 'admin/count', {
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
