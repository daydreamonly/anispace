const navbar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("fixed", window.scrollY > 0);
});

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
        const { title, synopsis, studios, episodes, genres, url, images } =
            anime;
        const { jpg } = images;

        console.log();

        output = `
            <div class="post-card">
                <a href="${url}" target="_blank" class="post">
                    <img class="post-img" src="${jpg.image_url}" alt="">
                    <h4 class="post-title">${title}</h4>
                </a>
                <a href="${url}" target="_blank">
                    <div class="post-info">
                        <div class="info truncate-text-2">${title}</div>
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

        document.getElementById(container).innerHTML += output;
    });
};

createAnime("https://api.jikan.moe/v4/seasons/now", animeArr, "postsBox");
createAnime("https://api.jikan.moe/v4/top/anime", animeTopArr, "animeTopBox");