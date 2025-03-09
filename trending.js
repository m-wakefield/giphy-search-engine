const API_KEY = "YOUR_GIPHY_API_KEY";
const gifResults = document.getElementById("gifResults");

async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12&rating=g`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displayGIFs(data.data);
    } catch (error) {
        console.error("Error fetching trending GIFs:", error);
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

// Fetch trending GIFs on page load
fetchTrendingGIFs();
