document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    const genreQuery = params.get('genres')
    const searchResult = document.querySelector('#searchResults');
    const searchString = document.querySelector('#searchResultHeading');
    let genresArr = [];

    if (!searchQuery && !genreQuery){
        searchResult.innerHTML = '<p>No search query provided.</p>'
    } else if (searchQuery){
        searchString.textContent += `Search results for ${searchQuery}`
        fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                const regex = new RegExp(searchQuery, 'i');
                const animeData = data.data;
                let foundMatches = false;
                let output = '';

                animeData.forEach(anime => {
                    if (regex.test(anime.title)){
                        const { title, synopsis, studios, episodes, genres, images, mal_id } = anime;
                        const { jpg } = images;
                        const genresList = genres.map(genre => `<li>${genre.name}</li>`).join('')
                        foundMatches = true;
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
                    }

                    document.querySelector('#searchResults').innerHTML = output;
                })

                if (!foundMatches){
                    searchResult.innerHTML = `
                        <p>No matching results found.</p>
                        <a href='index.html'>Go back</a>
                    `
                }
            })
    } else {
        fetch(`https://api.jikan.moe/v4/genres/anime`)
            .then(res => res.json())
            .then(data => {
                const genreData = data.data;
                const genre = genreData.find(genre => genre.mal_id == genreQuery)
                searchString.innerHTML += `Аниме в жанре <span style="color: var(--primary-color)">${genre.name}</span>`
            })
        fetch(`https://api.jikan.moe/v4/anime?genres=${genreQuery}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const animeData = data.data;
                let output = '';

                animeData.forEach(anime => {
                    const { title, synopsis, studios, episodes, genres, images, mal_id } = anime;
                        const { jpg } = images;
                        const genresList = genres.map(genre => `<li>${genre.name}</li>`).join('')
                        foundMatches = true;
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

                        document.querySelector('#searchResults').innerHTML = output;
                })
            })
    }

    const loadGenres = async () => {
        const res = await fetch('https://api.jikan.moe/v4/genres/anime')
        const data = await res.json();
        
        genresArr = data.data;
        genresArr.forEach(genre => {
            document.querySelector('#genresList').innerHTML += `<a href="search.html?genres=${genre.mal_id}" class="genre" data-id='${genre.mal_id}'>${genre.name}</a>`
        })
    }

    loadGenres()
})