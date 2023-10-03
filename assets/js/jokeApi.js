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
        .then((item) => {
            jokeContainer.textContent = `${item.joke}`;
            jokeContainer.classList.add("fade");
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
getJoke();
