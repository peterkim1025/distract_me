const apiKey =
	'live_ZiflOEh1DE6p2oLlab6srhvyY5IZfJgsu3WgB31hRYueUsTkAGbSuLk3uB2LjnWH';
const catPhotoContainerEl = document.querySelector('#catPhotoContainer');
const baseURL = 'https://api.thecatapi.com/v1/images/search?';
const breedUrl = `https://api.thecatapi.com/v1/breeds`;
var catSearchBtnEl = document.querySelector('#cat-Search-Btn');
var randCatBtnEl = document.querySelector('#rando-cat-btn');
var catNumEl = document.querySelector('#cat-number');
// var catNum = 1;
var catBreed = 'Abyssinian'; //breed.name
var formdata = new FormData();
let storedBreeds = [];

if (localStorage.getItem('favoriteCats') === null) {
	var catArray = [];
} else {
	var catArray = JSON.parse(localStorage.getItem('favoriteCats'));
}

var requestOptions = {
	method: 'GET',
	redirect: 'follow',
};

var buttonClickHandler = function (event) {
	catNum = catNumEl.value;
	console.log(catNum);
	if (catNum > 0) {
		catPhotoContainerEl.replaceChildren();
		getMultiCats(catNum);
	} else {
		alert('Please enter a number greater than 0');
	}
};

function isFavorited(event) {
	img = event.target.id;
	if (catArray != null) {
		if (catArray?.includes(img)) {
			console.log(' cat is already favorited');
		} else {
			catArray?.push(img);
			localStorage.setItem('favoriteCats', JSON.stringify(catArray));
		}
	} else {
		catArray?.push(img);
		localStorage.setItem('favoriteCats', JSON.stringify(catArray));
	}
	console.log(catArray);
}

function isUnFavorited(event) {
	img = event.target.id;
	if (catArray != null) {
		if (!catArray.includes(img)) {
			console.log('not favorited');
		} else {
			catArray.indexOf(img);
			console.log(catArray.indexOf(img));
			catArray.splice(catArray.indexOf(img), 1);
			localStorage.setItem('favoriteCats', JSON.stringify(catArray));
		}
	}
}

function getMultiCats(catNum) {
	var queryURL = baseURL.concat('limit=' + catNum + '&api_key=' + apiKey);
	buildCat(queryURL);
}

function getRandomCat() {
	catPhotoContainerEl.replaceChildren();
	getMultiCats(1);
}

async function buildCat(queryURL) {
	const catPhoto = await fetch(queryURL, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log('error', error));
	for (i = 0; i < catPhoto.length; i++) {
		var catUrl = catPhoto[i].url;
		var imgEl = document.createElement('div');
		imgEl.classList = 'card';
		var catImgEl = document.createElement('img');

		var catFavBtnEl = document.createElement('button');
		catFavBtnEl.textContent = 'thumb_up';
		catFavBtnEl.classList = 'material-icons likeBtn';

		var catUnFavBtnEl = document.createElement('button');
		catUnFavBtnEl.textContent = 'thumb_down';
		catUnFavBtnEl.classList = 'material-icons likeBtn';

		catImgEl.src = catUrl;
		catFavBtnEl.id = catUrl;
		catUnFavBtnEl.id = catUrl;

		catFavBtnEl.addEventListener('click', isFavorited);
		catUnFavBtnEl.addEventListener('click', isUnFavorited);

		imgEl.appendChild(catImgEl);
		imgEl.appendChild(catFavBtnEl);
		imgEl.appendChild(catUnFavBtnEl);
		catPhotoContainerEl.appendChild(imgEl);
	}
}
getRandomCat();

catSearchBtnEl.addEventListener('click', buttonClickHandler);
randCatBtnEl.addEventListener('click', getRandomCat);

fetch(breedUrl, {
	headers: {
		'x-api-key': apiKey,
	},
})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		data = data.filter((img) => img.image?.url != null);
		storedBreeds = data;

		for (let i = 0; i < storedBreeds.length; i++) {
			const breed = storedBreeds[i];
			let breedDropdown = document.createElement('option');

			if (!breed.image) continue;
			breedDropdown.value = i;
			breedDropdown.innerHTML = `${breed.name}`;
			document
				.getElementById('breed_selector')
				.appendChild(breedDropdown);
		}
	})
	.catch(function (error) {
		console.log(error);
	});

function showBreedImage(index) {
	catPhotoContainerEl.replaceChildren();
	document.getElementById('breed_image').src = storedBreeds[index].image.url;
}
