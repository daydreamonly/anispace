const urlParams = new URLSearchParams(window.location.search);
const mal_id = urlParams.get("mal_id");
const BASE_URL = "https://api.jikan.moe/v4/anime/";
const EPISODES_URL = `https://api.jikan.moe/v4/anime/${mal_id}/episodes`;

const animeInfo = async () => {
    try {
        const res = await fetch(`${BASE_URL}${mal_id}`);
        const data = await res.json();
        const secondRes = await fetch (EPISODES_URL)
        const secondData = await secondRes.json();
        const episodeShow = secondData.data
        
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

        const studiosList = studios.map(studio => studio.name).join(' ')
        const genresList = genres.map(genre => genre.name).join(' ')

        let output = "";

        output = `
            <div class="watch-info">
                <h3 class="anime-title">${title}</h3>
                <div class= "anime-info">
                    <img src="${jpg.image_url}" alt='${title}'>
                    <ul class="anime-about">
                        <li><span>Status:</span> ${status}</li>
                        <li><span>Premiered:</span> ${season}</li>
                        <li id='genres'><span>Genres: </span> ${genresList}</li>
                        <li><span>Studio:</span> ${studiosList}</li>
                        <li><span>Episodes:</span> ${
                            episodes == null ? "No info" : episodes
                        }</li>
                        <div class="anime-desc truncate-text-vertical">${synopsis}</div>
                    </ul>
                </div>
                
            </div>
            <div id="player" class="control-box">
                <iframe class="video" src="${episodeShow[0].url}" frameborder="0"
                    scrolling="no" allowfullscreen></iframe>
                <div class="controller">

                    <div class="episode-controll">
                        <input class="episode-input" type="number">
                        <ul id="episodeContainer" class="episode-list">
                            ${episodeShow.map((episode) => {
                                if (episode.mal_id == '1'){
                                    return `<li data-src='${episode.url}' class='active'>Episode ${episode.mal_id}</li>`
                                } else {
                                    return `<li data-src='${episode.url}'>Episode ${episode.mal_id}</li>`
                                }
                            }).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.querySelector("#animeInfo").innerHTML += output;

        function scrollHandler(container) {
            let isDragging = false;
            let startX;
            let scrollLeft;
            container.addEventListener("wheel", (e) => {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            });

            container.addEventListener("mousedown", (e) => {
                isDragging = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });

            container.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX);
                container.scrollLeft = scrollLeft - walk;
            });

            container.addEventListener("mouseup", (e) => {
                isDragging = false;
                const endXPos = e.pageX;
                if (Math.abs(endXPos - startX) < 5) {
                    e.target.click();
                }
            });
            container.addEventListener("mouseleave", () => {
                isDragging = false;
            });
        }

        scrollHandler(episodeContainer);

        const episodeList = document.querySelectorAll("#episodeContainer li");
        let newSrc;
        episodeList.forEach((episode) => {
            episode.addEventListener("click", () => {
                episodeList.forEach((episode) => {
                    episode.classList.remove("active");
                });
                episode.classList.add("active");
                newSrc = episode.dataset.src;

                if (newSrc == undefined) {
                    alert("Episode didnt upload yet");
                    episodeList.forEach((episode) => {
                        episode.classList.remove("active");
                    });

                    document.querySelector(
                        ".video"
                    ).src = `${episodeList[0].dataset.src}`;
                    episodeList[0].classList.add("active");
                } else {
                    document.querySelector(".video").src = `${newSrc}`;
                }
            });
        });

    } catch (error) {
        console.error(error)
    }
};

animeInfo();
