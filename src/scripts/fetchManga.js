const mangaShowcase = document.querySelector("#mangaTopBox");
const mangaContainer = document.querySelector("#mangaBox");

mangaShowcase.addEventListener("wheel", (e) => {
    e.preventDefault();
    mangaShowcase.scrollLeft += e.deltaY;
});

let mangaArr = [];
let mangaTopArr = [];

const createManga = async (url, arr, container) => {
    const res = await fetch(url);
    const data = await res.json();
    arr = data.data;

    let output = "";

    arr.forEach((manga) => {
        const { title, synopsis, genres, authors, chapters, url, images } =
            manga;
        const { jpg } = images;

        let genresList = " ";
        genres.forEach((genre, index) => {
            genresList += genre.name;
            if (index < genres.length - 1) {
                genresList += " ";
            }
        });

        output = `
            <div class="post-card">
                <a href="${url}" target="_blank" class="post">
                    <img class="post-img" src="${jpg.image_url}" alt="">
                    <h4 class="post-title">${title}</h4>
                </a>
                <a href="${url}" target="_blank">
                    <div class="post-info">
                        <div class="info truncate-text-2">${title}</div>
                        <p class="truncate-text-2">${synopsis}</p>
                        <div class="info">
                            <p>Authors:</p>
                            <a href="#">${authors[0].name}</a>
                        </div>
                        <div class="info">
                            <p>Chapters:</p>
                            <div>${chapters}chp</div>
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

createManga("https://api.jikan.moe/v4/manga", mangaArr, "mangaBox");
createManga("https://api.jikan.moe/v4/top/manga", mangaTopArr, "mangaTopBox");
