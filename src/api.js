// const BASE_API_URL = 'http://54.183.19.24/';
const BASE_API_URL = 'http://localhost:5000/';

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
				'Content-Type': 'image/jpeg',
				'Access-Control-Allow-Origin': BASE_API_URL,
			},
			withCredentials: true,
		}
	);

	return await response;
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

export const getLocationCounts = async () => {
	const response = await fetch(BASE_API_URL + 'api/locations/counts', {
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
// id is optional
export const getQuestions = async (id = '') => {
	/*let response = await fetch(BASE_API_URL + 'api/questions/' + id, {
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
		withCredentials: true
	});
	response = await response.json();
	let questions = response.questions;

	// Get options of each question while already getting questions
	for(let i = 0; i < questions.length; i++){
		response = await getQuestionOptions(questions[i].qid);
		response = await response.json();
		questions[i].options = response.options;
	}

	return questions;*/
	// dummy data check if survey works, remove after testing
	return [
		{
			qid: '1',
			text: 'How did you hear about us?',
			options: [
				{
					oid: '1',
					qid: '1',
					text: 'Internet/social media',
				},
				{
					oid: '2',
					qid: '1',
					text: 'Hotel concierge',
				},
				{
					oid: '3',
					qid: '1',
					text: 'Word of mouth',
				},
			],
		},
		{
			qid: '2',
			text: 'Primary reason for visiting Laguna Beach',
			options: [
				{
					oid: '5',
					qid: '2',
					text: 'Vacationing in Laguna Beach',
				},
				{
					oid: '6',
					qid: '2',
					text: 'To visit Pacific Marine Mammal Center',
				},
				{
					oid: '7',
					qid: '2',
					text: 'Other',
				},
			],
		},
		{
			qid: '3',
			text: 'Was your experience in our visitor yard enjoyable?',
			options: [
				{
					oid: '9',
					qid: '3',
					text: 'yes, excellent!',
				},
				{
					oid: '10',
					qid: '3',
					text: ' it was okay',
				},
				{
					oid: '11',
					qid: '3',
					text: 'no, not really',
				},
			],
		},
		{
			qid: '4',
			text:
				'Did your visit to PMMC make you more likely to adopt more earth friendly practices?',
			options: [
				{
					oid: '12',
					qid: '4',
					text: 'yes!',
				},
				{
					oid: '13',
					qid: '4',
					text: 'no',
				},
			],
		},
		{
			qid: '5',
			text:
				"Did your visit make you interested in donating and supporting PMMC's mission?",
			options: [
				{
					oid: '15',
					qid: '5',
					text: 'yes',
				},
				{
					oid: '17',
					qid: '5',
					text: 'no',
				},
			],
		},
	];
};

export const getQuestionOptions = async qid => {
	const response = await fetch(BASE_API_URL + '/api/options/' + qid, {
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
	console.log('oid: ', oid);
	/*const response = await fetch(BASE_API_URL + '/api/visitor_response', {
		method: 'POST',
		mode: 'cors',
		body:JSON.stringify({
			oid: oid
		}),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': BASE_API_URL + '*',
		},
		withCredentials: true
	});
	return await response.json();*/
};
