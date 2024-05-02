const animeShowcase = document.querySelector("#animeTopBox");

animeShowcase.addEventListener("wheel", (e) => {
    e.preventDefault();
    animeShowcase.scrollLeft += e.deltaY;
});

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
            genresList += genre.name;
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
                        <p class="truncate-text-2">${synopsis}</p>
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
                            <div>${genresList}</div>
                        </div>
                    </div>
                </a>
            </div>
        `;

        document.getElementById(container).innerHTML += output;
    });
};

createAnime("https://api.jikan.moe/v4/seasons/now", animeArr, "postsBox");
createAnime("https://api.jikan.moe/v4/top/anime", animeTopArr, "animeTopBox");
