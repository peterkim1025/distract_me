var formdata = new FormData();

var requestOptions = {
	method: 'GET',
	redirect: 'follow',
};

fetch(
	'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_ZiflOEh1DE6p2oLlab6srhvyY5IZfJgsu3WgB31hRYueUsTkAGbSuLk3uB2LjnWH',
	requestOptions
)
	.then((response) => response.text())
	.then((result) => console.log(result))
	.catch((error) => console.log('error', error));
