const API_KEY = "YOUR_GIPHY_API_KEY";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gifResults = document.getElementById("gifResults");

searchBtn.addEventListener("click", async () => {
    let query = searchInput.value.trim();
    if (query) {
        fetchGIFs(query);
    }
});

async function fetchGIFs(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12&offset=0&rating=g&lang=en`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayGIFs(data.data);
    } catch (error) {
        console.error("Error fetching GIFs:", error);
    }
}

function displayGIFs(gifs) {
    gifResults.innerHTML = "";
    gifs.forEach(gif => {
        let imgElement = document.createElement("img");
        imgElement.src = gif.images.fixed_height.url;
        gifResults.appendChild(imgElement);
    });
}
