let animeArr = [];
let animeTopArr = [];

const createAnime = async (url, arr, container) => {
    const res = await fetch(url);
    const data = await res.json();
    arr = data.data;

    let output = "";

    arr.forEach((anime) => {
        const {
            title,
            synopsis,
            studios,
            episodes,
            genres,
            url,
            images,
            mal_id,
        } = anime;
        const { jpg } = images;

        let genresList = " ";
        genres.forEach((genre, index) => {
            `<li>${genre.name}</li>`;
            if (index < genres.length - 1) {
                genresList += " ";
            }
        });

        output = `
            <div class="post-card" data-id='${mal_id}'>
                <a href="redirectPage.html?mal_id=${mal_id}" class="post">
                    <img class="post-img" src="${jpg.image_url}" alt="">
                    <h4 class="post-title">${title}</h4>
                </a>
                <a href="redirectPage.html?mal_id=${mal_id}">
                    <div class="post-info">
                        <div class="info truncate-text-2">${title}</div>
                        <p class="truncate-text-4">${synopsis}</p>
                        <div class="info">
                            <p>Studio:</p>
                            <a href="redirectPage.html?mal_id=${mal_id}"> &nbsp; ${
            studios[0].name
        }</a>
                        </div>
                        <div class="info">
                            <p>Episodes:</p>
                            <div> &nbsp; ${
                                episodes == null ? "No info" : `${episodes}ep`
                            }</div>
                        </div>
                        <div class="info">
                            <p>Genre:</p>
                            <ul class='genres-ul'>${genres
                                .map((genre) => {
                                    return `<li>${genre.name}</li>`;
                                })
                                .join("")}</ul>
                        </div>
                    </div>
                </a>
            </div>
        `;

        document.getElementById(container).innerHTML += output;
    });
};

createAnime("https://api.jikan.moe/v4/top/anime", animeTopArr, "trendContent");
createAnime("https://api.jikan.moe/v4/seasons/now", animeTopArr, "recentlyBox");
