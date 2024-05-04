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
                <li><span>Episodes:</span> ${
                    episodes == null ? "No info" : episodes
                }</li>
            </ul>
            <div class="anime-desc truncate-text-18">
                ${synopsis}
            </div>
        </div>
        <div id="player" class="control-box">
            <iframe id=""video" class="video" src="https://video.sibnet.ru/shell.php?videoid=5497001" frameborder="0" scrolling="no" allowfullscreen></iframe>
            <div class="controller">
                <button id="prev" class="control-btn left">PREV</button>
                <div class="episode-controll">
                    <input class="episode-find" type="text">
                    <ul id="episodeContainer" class="episode-list">
                        <li class="active" data-src="https://video.sibnet.ru/shell.php?videoid=5497001">Episode 1</li>
                        <li data-src="https://video.sibnet.ru/shell.php?videoid=5504616">Episode 2</li>
                        <li data-src="https://video.sibnet.ru/shell.php?videoid=5512014">Episode 3</li>
                        <li data-src="https://video.sibnet.ru/shell.php?videoid=5518671">Episode 4</li>
                        <li>Episode 5</li>
                        <li>Episode 6</li>
                        <li>Episode 7</li>
                        <li>Episode 8</li>
                        <li>Episode 9</li>
                        <li>Episode 10</li>
                        <li>Episode 11</li>
                        <li>Episode 12</li>
                        <li>Episode 13</li>
                        <li>Episode 14</li>
                        <li>Episode 15</li>
                    </ul>
                </div>
                <button id="next" class="control-btn right">NEXT</button>
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
            const walk = (x - startX) * 2;
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

    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");
    let episodeArr = Array.from(episodeList);
    nextBtn.addEventListener("click", () => {
        for (let i = 0; i < episodeArr.length; i++) {
            if (
                episodeArr[i].className == "active" &&
                i < episodeArr.length - 1
            ) {
                episodeArr[i].classList.remove("active");
                episodeArr[i + 1].classList.add("active");
                let src = episodeArr[i + 1].dataset.src;
                if (src == undefined) {
                    alert("Episode didnt upload yet");
                    document.querySelector(
                        ".video"
                    ).src = `${episodeArr[0].dataset.src}`;
                    episodeArr.forEach((episode) => {
                        episode.classList.remove("active");
                    });
                    episodeArr[0].classList.add("active");
                } else {
                    document.querySelector(".video").src = `${src}`;
                }
                break;
            }
        }
    });

    prevBtn.addEventListener("click", () => {
        for (let i = 0; i < episodeArr.length; i++) {
            if (episodeArr[i].className == "active" && i > 0) {
                episodeArr[i].classList.remove("active");
                episodeArr[i - 1].classList.add("active");
                let src = episodeArr[i - 1].dataset.src;
                document.querySelector(".video").src = `${src}`;
            }
        }
    });
};

animeInfo();
