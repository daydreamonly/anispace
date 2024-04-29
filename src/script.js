const BASE_URL = "https://api.jikan.moe/v4/anime";

let startIndex = 0;
let endIndex = 5;
let animeArr = [];
let mangaArr = [];

const fetchData = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    animeArr = data.data;
    fetchAnime(animeArr);
};

const fetchAnime = (arr) => {
    let output = "";

    arr.forEach((anime) => {
        const { title, synopsis, studios, episodes, genres, url, images } =
            anime;
        const { jpg } = images;

        output = `
            <div class="post-card">
                <a href="${url}" target="_blank" class="post">
                    <img class="post-img" src="${jpg.image_url}" alt="">
                    <h4 class="post-title">${title}</h4>
                </a>
                <a href="${url}" target="_blank">
                    <div class="post-info">
                        <div class="info">${title}</div>
                        <p class="truncate-text">${synopsis}</p>
                        <div class="info">
                            <p>Studio:</p>
                            <a href="#">${studios[0].name}</a>
                        </div>
                        <div class="info">
                            <p>Episodes:</p>
                            <div>${episodes}ep</div>
                        </div>
                        <div class="info">
                            <p>Genre:</p>
                            <div>${genres[0].name}</div>
                        </div>
                    </div>
                </a>
            </div>
        `;

        document.getElementById("postsBox").innerHTML += output;
    });
};

fetchData();
