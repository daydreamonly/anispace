let arr = [];
let genresArr = [];
let startIndex = 0;
let endIndex = 9;

const createAnime = async (url, containerId, contentType) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        arr = data.data

        let output = '';

        if (res.status == 429){
            setTimeout(() => {
                createAnime(url, containerId, contentType)
            }, 1000);
        } else {
            arr.forEach((anime) => {
                const { title, synopsis, studios, episodes, genres, images, mal_id } = anime;
                const { jpg } = images;
                const genresList = genres.map(genre => `<li>${genre.name}</li>`).join('')
    
                if (contentType === 'default'){
                    output += `
                    <div class="post-card" data-id="${mal_id}">
                        <a href="watch.html?mal_id=${mal_id}" class="post">
                            <img class="post-img" src="${jpg.image_url}" alt="${title}">
                            <h4 class="post-title">${title}</h4>
                        </a>
                        <a href="watch.html?mal_id=${mal_id}" class="post-info">
                            <div class="info truncate-text-2">${title}</div>
                            <p class="truncate-text-4">${synopsis}</p>
                            <div class="info">
                                <p>Studio: <span>${studios[0] == undefined ? 'No data' : studios[0].name}</span></p>
                            </div>
                            <div class="info">
                                <p>Episodes: <span>${episodes == null ? "Нет информации" : `${episodes}ep`}</span></p>
                            </div>
                            <div class="info">
                                <p>Genre:</p>
                                <ul class="genres-ul">${genresList}</ul>
                            </div>
                        </a>
                    </div>
                    `
                } else if (contentType === 'grid'){
                    output += `
                        <div class="content">
                            <a href='watch.html?mal_id=${mal_id}'  class="content-card">
                                <img class="card-img" src="${jpg.image_url}" alt="${title}">
                                <div class="card-info">
                                    <div class="card-title truncate-text-1">${title}</div>
                                    <p>Studio: ${studios[0].name}</p>
                                    <p>Episdoes: ${
                                        episodes == null
                                            ? "Нет информации"
                                            : `${episodes}ep`
                                    }</p>
                                </div>
                            </a>
                        </div>
                    `
                }
            })
            document.getElementById(containerId).innerHTML += output;
        }

        function scrollHandler(container) {
            const slider = document.querySelector(container)
            const slides = slider.querySelectorAll('.post-card')
            
            let isDown = false;
            let startX;
            let scrollLeft;
            let isDragging = false;
    
            function enablePointerEvents(){
                slides.forEach(slide => {
                    slide.classList.remove('pointer-events-none')
                })
            }
            
            function disablePointerEvents(){
                slides.forEach(slide => {
                    slide.classList.add('pointer-events-none')
                })
            }
    
            slider.addEventListener('mouseenter', () => {
                if (isDragging){
                    disablePointerEvents();
                }
            })
        
            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                isDragging = true;
        
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            })
        
            slider.addEventListener('mouseleave', () => {
                isDown = false;
                isDragging = false;
                enablePointerEvents();
            })
            
            slider.addEventListener('mouseup', () => {
                isDown = false;
                isDragging = false;
                enablePointerEvents();
            })
        
            slider.addEventListener('mousemove', (e) => {
                e.preventDefault();
                isDragging = true;
        
                if (!isDown) return;
        
                const x = e.pageX - slider.offsetLeft;
                const walk = x - startX;
                slider.scrollLeft = scrollLeft - walk;
                disablePointerEvents()
            })
        }
        
        scrollHandler('#trendContent')

    } catch(err){
        console.error(err);
    }
}

(async () => {
    await createAnime('https://api.jikan.moe/v4/top/anime', 'trendContent', 'default');
    await createAnime('https://api.jikan.moe/v4/seasons/2023/winter?limit=5','addedBox', 'grid');
    await createAnime('https://api.jikan.moe/v4/seasons/now?limit=5','ongoingBox', 'grid');
    await createAnime('https://api.jikan.moe/v4/seasons/2024/winter?limit=5','completedBox', 'grid');
    await createAnime('https://api.jikan.moe/v4/seasons/upcoming?limit=5','upcomingBox', 'grid');
    await createAnime('https://api.jikan.moe/v4/seasons/now?limit=10', 'recentlyBox', 'default');
})();

fetch('https://api.jikan.moe/v4/genres/anime')
    .then(res => res.json())
    .then(data => {
        genresArr = data.data
        displayGenres(genresArr.slice(startIndex, endIndex))
    });
    
function displayGenres(genres){
    genres.forEach(genre => {
        document.querySelector('#genresList').innerHTML += `<a href="search.html?genres=${genre.mal_id}" class="genre" data-id='${genre.mal_id}'>${genre.name}</a>`
    });
};
    
function loadMoreGenres(){
    startIndex += 9;
    endIndex += 9;
        
    displayGenres(genresArr.slice(startIndex, endIndex));

    if (genresArr.length <= endIndex){
        moreBtn.style.display = 'none'
    }
}
const moreBtn = document.querySelector('#loadMore')

moreBtn.addEventListener('click', loadMoreGenres)