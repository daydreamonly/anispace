let animeArr = [];
let animeTopArr = [];
let mangaArr = [];

// const fetchAnime = async () => {
//     const res = await fetch("https://api.jikan.moe/v4/anime");
//     const data = await res.json();
//     const resTop = await fetch("https://api.jikan.moe/v4/top/anime");
//     const dataTop = await resTop.json();
//     animeArr = data.data;
//     animeTopArr = dataTop.data;
//     createAnime(animeArr, "postsBox");
//     createAnime(animeTopArr, "animeTopBox");
// };

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

const fetchManga = async () => {
    const res = await fetch("https://api.jikan.moe/v4/manga");
    const data = await res.json();
    mangaArr = data.data;
    createManga(mangaArr);
};

createAnime("https://api.jikan.moe/v4/seasons/now", animeArr, "postsBox");
createAnime("https://api.jikan.moe/v4/top/anime", animeTopArr, "animeTopBox");

// const createAnime = (arr, container) => {
//     let output = "";

//     arr.forEach((anime) => {
//         const { title, synopsis, studios, episodes, genres, url, images } =
//             anime;
//         const { jpg } = images;

//         console.log();

//         output = `
//             <div class="post-card">
//                 <a href="${url}" target="_blank" class="post">
//                     <img class="post-img" src="${jpg.image_url}" alt="">
//                     <h4 class="post-title">${title}</h4>
//                 </a>
//                 <a href="${url}" target="_blank">
//                     <div class="post-info">
//                         <div class="info">${title}</div>
//                         <p class="truncate-text">${synopsis}</p>
//                         <div class="info">
//                             <p>Studio:</p>
//                             <a href="#">${studios[0].name}</a>
//                         </div>
//                         <div class="info">
//                             <p>Episodes:</p>
//                             <div>${episodes}ep</div>
//                         </div>
//                         <div class="info">
//                             <p>Genre:</p>
//                             <div>${genres[0].name}</div>
//                         </div>
//                     </div>
//                 </a>
//             </div>
//         `;

//         document.getElementById(container).innerHTML += output;
//     });
// };

const createManga = (arr) => {
    let output = "";

    arr.forEach((manga) => {
        const { title, synopsis, genres, authors, chapters, url, images } =
            manga;
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
                            <p>Authors:</p>
                            <a href="#">${authors[0].name}</a>
                        </div>
                        <div class="info">
                            <p>Chapters:</p>
                            <div>${chapters}chp</div>
                        </div>
                        <div class="info">
                            <p>Genre:</p>
                            <div>${genres[1].name}</div>
                        </div>
                    </div>
                </a>
            </div>
        `;

        document.getElementById("mangaBox").innerHTML += output;
    });
};

fetchManga();
