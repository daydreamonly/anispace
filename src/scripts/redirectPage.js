const urlParams = new URLSearchParams(window.location.search);
const mal_id = urlParams.get("mal_id");
const BASE_URL = "https://api.jikan.moe/v4/anime/";

const animeInfo = async () => {
    const res = await fetch(`${BASE_URL}${mal_id}`);
    const data = await res.json();
    const info = data.data;
    const {
        images,
        title,
        status,
        season,
        genres,
        studios,
        episodes,
        synopsis,
    } = info;
    const { jpg } = images;

    let genresList = " ";
    genres.forEach((genre, index) => {
        genresList += genre.name;
        if (index < genres.length - 1) {
            genresList += " ";
        }
    });

    console.log(info);

    let output = "";

    output = `
        <div class="anime-info">
            <img src="${jpg.image_url}" alt='${title}'>
            <h3>${title}</h3>
            <ul class="anime-about">
                <li><span>Status:</span> ${status}</li>
                <li><span>Premiered:</span> ${season}</li>
                <li id='genres'><span>Genres:</span>${genresList}</li>
                <li><span>Studio:</span> ${studios[0].name}</li>
                <li><span>Episodes:</span> ${episodes}</li>
            </ul>
            <div class="anime-desc truncate-text-18">
                ${synopsis}
            </div>
        </div>
        <iframe class="video" src="https://video.sibnet.ru/shell.php?videoid=5496631" frameborder="0" scrolling="no" allowfullscreen></iframe>

    `;

    document.querySelector("#animeInfo").innerHTML += output;
};

animeInfo();
