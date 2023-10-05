const apiKey =
	'live_ZiflOEh1DE6p2oLlab6srhvyY5IZfJgsu3WgB31hRYueUsTkAGbSuLk3uB2LjnWH';
const catPhotoContainerEl = document.querySelector('#catPhotoContainer');
const baseURL = 'https://api.thecatapi.com/v1/images/search?';
const breedUrl = 'https://api.thecatapi.com/v1/breeds';
var catSearchBtnEl = document.querySelector('#cat-Search-Btn');
var randCatBtnEl = document.querySelector('#rando-cat-btn');
var catNumEl = document.querySelector('#cat-number');
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
	catPhotoContainerEl.replaceChildren();
	for (i = 0; i < catPhoto.length; i++) {
		buildCatElements(catPhoto[i].url);
	}
}

function buildCatElements(url) {
	var catUrl = url;
	var imgEl = document.createElement('div');
	imgEl.classList = 'card';
	var catImgEl = document.createElement('img');

	var favBtnEl = document.createElement('button');
	favBtnEl.textContent = 'thumb_up';
	favBtnEl.classList = 'material-icons likeBtn';

	var unfavBtnEl = document.createElement('button');
	unfavBtnEl.textContent = 'thumb_down';
	unfavBtnEl.classList = 'material-icons likeBtn';

	catImgEl.src = catUrl;
	favBtnEl.id = catUrl;
	unfavBtnEl.id = catUrl;

	favBtnEl.addEventListener('click', isFavorited);
	unfavBtnEl.addEventListener('click', isUnFavorited);

	imgEl.appendChild(catImgEl);
	imgEl.appendChild(favBtnEl);
	imgEl.appendChild(unfavBtnEl);
	catPhotoContainerEl.appendChild(imgEl);
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
	buildCatElements(storedBreeds[index].image.url);
}
