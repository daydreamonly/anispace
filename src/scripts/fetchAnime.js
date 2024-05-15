const createAnime = async (url, containerId, contentType) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        const arr = data.data

        console.log(arr);

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
                        <div class="post-card" data-id='${mal_id}'>
                            <a href="watch.html?mal_id=${mal_id}" class="post">
                                <img class="post-img" src="${jpg.image_url}" alt="">
                                <h4 class="post-title">${title}</h4>
                            </a>
                            <a href="watch.html?mal_id=${mal_id}">
                                <div class="post-info">
                                    <div class="info truncate-text-2">${title}</div>
                                    <p class="truncate-text-4">${synopsis}</p>
                                    <div class="info">
                                        <p>Studio:</p>
                                        <a href="watch.html?mal_id=${mal_id}"> &nbsp; ${studios[0].name}</a>
                                    </div>
                                    <div class="info">
                                        <p>Episodes:</p>
                                        <div> &nbsp; ${episodes == null ? "Нет информации" : `${episodes}ep`}</div>
                                    </div>
                                    <div class="info">
                                        <p>Genre:</p>
                                        <ul class='genres-ul'>${genresList}</ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `
                } else if (contentType === 'grid'){
                    output += `
                        <div class="content">
                            <div class="content-card">
                                <img class="card-img" src="${jpg.image_url}" alt="${title}">
                                <div class="card-info">
                                    <a href='watch.html?mal_id=${mal_id}' class="card-title truncate-text-1">${title}</a>
                                    <p>Studio: ${studios[0].name}</p>
                                    <p>Episdoes: ${
                                        episodes == null
                                            ? "Нет информации"
                                            : `${episodes}ep`
                                    }</p>
                                </div>
                            </div>
                        </div>
                    `
                }
            })
            document.getElementById(containerId).innerHTML += output;
        }

        
    
    } catch(err){
        console.err(err);
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