const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const filterList = document.getElementById("filterList");
let currentJokeType = "Any"; // Initialize with "Any" type

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

            addToFavoritesButton.style.display = "block"; // Show the button
            addToFavoritesButton.textContent = "Add to Favorites";
            addToFavoritesButton.addEventListener("click", () => {
                addToFavorites(item);
                displayFavorites();
            });
            jokeContainer.textContent = item.joke; // Display the joke
        });
};

// Add event listeners to filter buttons
filterList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const jokeType = event.target.getAttribute("data-type");
        updateJokeType(jokeType);
    }
});

btn.addEventListener("click",getJoke);

function addToFavorites(joke) {
    // Get the current favorites from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the joke is not already in the favorites
    if (!favorites.some((fav) => fav.joke === joke.joke)) {
        // Add the joke to the favorites array
        favorites.push(joke.joke);

        // Save the updated favorites array to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

function displayFavorites() {
    const favoritesContainer = document.getElementById("favorites");

    // Get the favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Clear the previous favorites list
    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "You have no favorite jokes yet.";
    } else {
        // Create a list of favorite jokes
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

// Inside your getJoke function after retrieving a joke
const addToFavoritesButton = document.getElementById("addToFavoritesBtn");
addToFavoritesButton.style.display = "block"; // Show the button
addToFavoritesButton.textContent = "Add to Favorites";
addToFavoritesButton.addEventListener("click", () => {
    addToFavorites(item);
    displayFavorites(); // Update the favorites list when adding a joke
});

// Call displayFavorites to initially populate the favorites list
displayFavorites();