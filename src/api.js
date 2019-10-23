export const getPinInfo = async position => {
	const response = await fetch('http://127.0.0.1:5000/api/geocoder', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
		},
		body: JSON.stringify({
			lat: position.latitude,
			long: position.longitude,
		}),
		withCredentials: true,
	});
	return await response.json();
};
