const apiKey =
	'live_ZiflOEh1DE6p2oLlab6srhvyY5IZfJgsu3WgB31hRYueUsTkAGbSuLk3uB2LjnWH';

var formdata = new FormData();

var requestOptions = {
	method: 'GET',
	redirect: 'follow',
};

async function bengalTen() {
	const catPhoto = await fetch(
		'https://api.thecatapi.com/v1/images/search?limit=10&api_key=' + apiKey,
		requestOptions
	)
		.then((response) => response.json())

		.catch((error) => console.log('error', error));
	// catPhoto = await res.json();
	console.log(catPhoto);
	for (i = 0; i < catPhoto.length; i++) {
		var catUrl = catPhoto[i].url;
		console.log(catUrl);
	}
}
bengalTen();
