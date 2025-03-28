const API_KEY = "cBCWgXnX9Kahfp5gxqZlRGAkA0mHI56y";
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
        const response = await fetch(url);
        const data = await response.json();
        displayGIFs(data.data);
    } catch (err) {
        console.error("Failed to fetch trending GIFs:", err);
    }
}

fetchTrendingGIFs();

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

const homeTrendingContainer = document.getElementById("homeTrendingResults");

async function fetchHomeTrendingGIFs() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10&rating=g`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayHomeTrendingGIFs(data.data);
  } catch (error) {
    console.error("Error loading trending GIFs:", error);
  }
}

function displayHomeTrendingGIFs(gifs) {
  homeTrendingContainer.innerHTML = "";
  gifs.forEach(gif => {
    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title || "trending gif";
    homeTrendingContainer.appendChild(img);
  });
}

// Call this when the page loads
fetchHomeTrendingGIFs();

function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("show");
  }
  
  document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("nav-links").classList.remove("show");
    });
  });
  