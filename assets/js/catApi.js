const apiKey =
	'live_ZiflOEh1DE6p2oLlab6srhvyY5IZfJgsu3WgB31hRYueUsTkAGbSuLk3uB2LjnWH';
const catPhotoContainerEl = document.querySelector('#catPhotoContainer');
const baseURL = 'https://api.thecatapi.com/v1/images/search?';
var catSearchBtnEl = document.querySelector('#cat-Search-Btn');
var catNumEl = document.querySelector('#cat-number');
var catNum = 1;
var catBreed = 'Abyssinian'; //breed.name
var formdata = new FormData();

if (localStorage.getItem('favoriteCats') == null) {
	var catArray = [];
} else {
	var catArray = JSON.parse(localStorage.getItem('favoriteCats'));
}

var requestOptions = {
	method: 'GET',
	redirect: 'follow',
};

// if (catNum != undefined) {
// }

var buttonClickHandler = function (event) {
	catNum = catNumEl.value;
	console.log(catNum);
	if (catNum > 0) {
		catPhotoContainerEl.replaceChildren();
		getMultiCats(catNum);
	} else {
		// alert('Please enter a number of kitties');
	}
};

function isFavorited(event) {
	img = event.target.id;
	catArray.push(img);
	// rgx = /images\/(.*).[a-z]{3}/;
	// img = img.match(rgx)[1];
	localStorage.setItem('favoriteCats', JSON.stringify(catArray));
	console.log(catArray);
}

function isUnFavorited(event) {
	img = event.target.id;
	// rgx = /images\/(.*).[a-z]{3}/;
	// img = img.match(rgx)[1];
	console.log(img);
}

function getMultiCats(catNum) {
	var queryURL = baseURL.concat('limit=' + catNum + '&api_key=' + apiKey);
	getCat(queryURL);
}

async function getCat(queryURL) {
	const catPhoto = await fetch(queryURL, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log('error', error));
	console.log(catPhoto);
	for (i = 0; i < catPhoto.length; i++) {
		var catUrl = catPhoto[i].url;
		console.log(catUrl);
		var imgEl = document.createElement('div');
		var catImgEl = document.createElement('img');
		var catFavBtnEl = document.createElement('button');
		catFavBtnEl.textContent = 'thumb_up';
		catFavBtnEl.classList = 'material-icons';
		var catUnFavBtnEl = document.createElement('button');
		catUnFavBtnEl.textContent = 'thumb_down';
		catUnFavBtnEl.classList = 'material-icons';
		catImgEl.src = catUrl;
		catFavBtnEl.id = catUrl;
		catFavBtnEl.addEventListener('click', isFavorited);
		catUnFavBtnEl.addEventListener('click', isUnFavorited);
		imgEl.appendChild(catImgEl);
		imgEl.appendChild(catFavBtnEl);
		imgEl.appendChild(catUnFavBtnEl);
		catPhotoContainerEl.appendChild(imgEl);
	}
}
getMultiCats();

function buildKitties(catUrl) {}

catSearchBtnEl.addEventListener('click', buttonClickHandler);
