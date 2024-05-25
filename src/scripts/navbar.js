const navbar = document.querySelector("#navbar");
const burgerMenu = document.querySelector("#burgerMenu");
const burgerLinks = document.querySelector("#burgerLinks");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("fixed", window.scrollY > 0);
});

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('burger-active')
    burgerLinks.classList.toggle('burger-active')
})
