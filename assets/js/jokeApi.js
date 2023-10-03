const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const filterList = document.getElementById("filterList");
const clearFavoritesButton = document.getElementById("clearFavoritesBtn");
let currentJokeType = "Any";

const updateJokeType = (type) => {
    currentJokeType = type;
    getJoke();
};

const getJoke = () => {
    jokeContainer.classList.remove("fade");
    const apiUrl = `https://v2.jokeapi.dev/joke/${currentJokeType}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`;

    fetch(apiUrl)
        .then((data) => data.json())
        .then((jokeData) => {
            item = jokeData;
            jokeContainer.textContent = `${item.joke}`;
            jokeContainer.classList.add("fade");
            addToFavoritesButton.style.display = "block"; 
            addToFavoritesButton.textContent = "Add to Favorites";
            addToFavoritesButton.addEventListener("click", () => {
                addToFavorites(item);
                displayFavorites();
            });
            jokeContainer.textContent = item.joke; 
        });
};

filterList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const jokeType = event.target.getAttribute("data-type");
        updateJokeType(jokeType);
    }
});

btn.addEventListener("click",getJoke);

function addToFavorites(joke) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some((fav) => fav.joke === joke.joke)) {
        favorites.push(joke);

        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

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

getJoke();

const addToFavoritesButton = document.getElementById("addToFavoritesBtn");
addToFavoritesButton.style.display = "block"; 
addToFavoritesButton.textContent = "Add to Favorites";
addToFavoritesButton.addEventListener("click", () => {
    addToFavorites(item);
    displayFavorites(); 
});

displayFavorites();

clearFavoritesButton.addEventListener("click", () => {
    clearFavorites();
    displayFavorites();
});

function clearFavorites() {
    localStorage.removeItem("favorites");
    displayFavorites();
}