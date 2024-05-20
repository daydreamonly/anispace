document.querySelector('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const query = document.querySelector('#searchInput').value.replace(/\s+/g, '%20');
    
    window.location.href = `search.html?search=${query}`
})

const genresList = document.querySelector('genresList');
const li = genresList.querySelectorAll('li')
console.log(li);