const API_KEY = "YOUR_GIPHY_API_KEY";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gifResults = document.getElementById("gifResults");
const trendingResults = document.getElementById("trendingResults");

// Toggle mobile menu
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("show");
}

// Fetch GIFs based on search
searchBtn.addEventListener("click", async () => {
    let query = searchInput.value.trim();
    if (query) {
        fetchGIFs(query);
    }
});

async function fetchGIFs(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10&rating=g`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayGIFs(data.data, gifResults);
    } catch (error) {
        console.error("Error fetching GIFs:", error);
    }
}

// Fetch trending GIFs on page load
async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10&rating=g`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayGIFs(data.data, trendingResults);
    } catch (error) {
        console.error("Error fetching trending GIFs:", error);
    }
}

function displayGIFs(gifs, container) {
    container.innerHTML = "";
    gifs.forEach(gif => {
        let imgElement = document.createElement("img");
        imgElement.src = gif.images.fixed_height.url;
        container.appendChild(imgElement);
    });
}

// Load trending GIFs when the page loads
fetchTrendingGIFs();
