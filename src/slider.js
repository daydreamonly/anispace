const animeContainer = document.querySelector("#postsBox");
const animeTopContainer = document.querySelector("#animeTopBox");
const mangaContainer = document.querySelector("#mangaBox");
const navbar = document.querySelector("#navbar");

animeContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    animeContainer.scrollLeft += e.deltaY;
});

animeTopContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    animeTopContainer.scrollLeft += e.deltaY;
});

mangaContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    mangaContainer.scrollLeft += e.deltaY;
});

window.addEventListener("scroll", () => {
    navbar.classList.toggle("fixed", window.scrollY > 0);
});
