const catPhotoContainerEl = document.querySelector('#catPhotoContainer');

if (localStorage.getItem('favoriteCats') === null) {
	var catArray = [];
} else {
	var catArray = JSON.parse(localStorage.getItem('favoriteCats'));
}

function getFavoriteCats() {
	var favCatArray = JSON.parse(localStorage.getItem('favoriteCats'));
	if (favCatArray == null) {
		console.log('here');
		var msg = document.createElement('div');
		msg.innerHTML = 'You must like dogs, you have no favorite cats.';
		catPhotoContainerEl.appendChild(msg);
	} else {
		catPhotoContainerEl.replaceChildren();
		for (i = 0; i < favCatArray.length; i++) {
			buildCatElements(favCatArray[i]);
		}
	}
}

function buildCatElements(url) {
	var catUrl = url;
	var indivCatEl = document.createElement('div');
	indivCatEl.classList = 'card';
	var cardContentEl = document.createElement('div');
	cardContentEl.classList = 'card-image';
	var catImgEl = document.createElement('img');

	var cardActionsEl = document.createElement('div');
	cardActionsEl.classList = 'card-action card-btn';

	var favBtnEl = document.createElement('button');
	favBtnEl.textContent = 'thumb_up';
	favBtnEl.classList = 'material-icons like-btn';

	var unfavBtnEl = document.createElement('button');
	unfavBtnEl.textContent = 'thumb_down';
	unfavBtnEl.classList = 'material-icons like-btn';

	catImgEl.src = catUrl;
	favBtnEl.id = catUrl;
	unfavBtnEl.id = catUrl;

	favBtnEl.addEventListener('click', isFavorite);
	unfavBtnEl.addEventListener('click', isUnFavorite);

	cardContentEl.appendChild(catImgEl);
	cardActionsEl.appendChild(favBtnEl);
	cardActionsEl.appendChild(unfavBtnEl);
	indivCatEl.appendChild(cardContentEl);
	indivCatEl.appendChild(cardActionsEl);
	catPhotoContainerEl.appendChild(indivCatEl);
}

function isFavorite(event) {
	img = event.target.id;
	if (catArray != null) {
		if (catArray?.includes(img)) {
			console.log('This cat is already favorited');
			var msg = document.createElement('span');
			msg.innerHTML = 'This meowster has been already favorited!';
			catPhotoContainerEl.appendChild(msg);
		} else {
			catArray?.push(img);
			localStorage.setItem('favoriteCats', JSON.stringify(catArray));
		}
	} else {
		catArray?.push(img);
		localStorage.setItem('favoriteCats', JSON.stringify(catArray));
	}
}

function isUnFavorite(event) {
	img = event.target.id;
	if (catArray != null) {
		if (!catArray.includes(img)) {
			console.log('not favorited');
		} else {
			catArray.indexOf(img);
			catArray.splice(catArray.indexOf(img), 1);
			localStorage.setItem('favoriteCats', JSON.stringify(catArray));
			window.dispatchEvent(new Event('storage'));
		}
	}
}

window.addEventListener('storage', () => {
	getFavoriteCats();
});

//display favorite jokes
function displayFavorites() {
	const favoritesContainer = document.getElementById('favorites');

	let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

	favoritesContainer.innerHTML = '';

	if (favorites.length === 0) {
		favoritesContainer.innerHTML = 'You have no favorite jokes yet.';
	} else {
		const favoritesList = document.createElement('ul');
		favorites.forEach((favorite) => {
			const listItem = document.createElement('li');
			listItem.textContent = favorite.joke;
			favoritesList.appendChild(listItem);
		});
		favoritesContainer.appendChild(favoritesList);
	}
}

displayFavorites();
