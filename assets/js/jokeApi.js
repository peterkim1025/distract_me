const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const filterList = document.getElementById("filterList");
const clearFavoritesButton = document.getElementById("clearFavoritesBtn");
let currentJokeType = "Any";

//getting jokes
const getJoke = () => {
    jokeContainer.classList.remove("fade");
    const apiUrl = `https://v2.jokeapi.dev/joke/${currentJokeType}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`;

    fetch(apiUrl)
        .then((data) => data.json())
        .then((jokeData) => {
            item = jokeData;
            jokeContainer.textContent = `${item.joke}`;
            addToFavoritesButton.textContent = "Add to Favorites";
            addToFavoritesButton.addEventListener("click", () => {
                addToFavorites(item);
                displayFavorites();
            });
            jokeContainer.textContent = item.joke; 
        });
};

getJoke();
btn.addEventListener("click",getJoke);

//update jokes by types
const updateJokeType = (type) => {
    currentJokeType = type;
    getJoke();
};

filterList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const jokeType = event.target.getAttribute("data-type");
        updateJokeType(jokeType);
    }
});

//add to favorites
function addToFavorites(joke) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some((fav) => fav.joke === joke.joke)) {
        favorites.push(joke);

        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

const addToFavoritesButton = document.getElementById("addToFavoritesBtn");
addToFavoritesButton.style.display = "block"; 
addToFavoritesButton.textContent = "Add to Favorites";

addToFavoritesButton.addEventListener("click", () => {
    addToFavorites(item);
    displayFavorites(); 
});

//display favorites
function displayFavorites() {
    const favoritesContainer = document.getElementById("favorites");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "You have no favorite jokes yet.";
    } else {
        const favoritesList = document.createElement("ul");
        favorites.forEach((favorite) => {
            const listItem = document.createElement("li");
            listItem.textContent = favorite.joke;
            favoritesList.appendChild(listItem);
        });
        favoritesContainer.appendChild(favoritesList);
    }
}

displayFavorites();

//clear button
clearFavoritesButton.addEventListener("click", () => {
    clearFavorites();
    displayFavorites();
});

function clearFavorites() {
    localStorage.removeItem("favorites");
    displayFavorites();
}