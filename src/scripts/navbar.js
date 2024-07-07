const navbar = document.querySelector("#navbar");
const burgerMenu = document.querySelector("#burgerMenu");
const burgerLinks = document.querySelector("#burgerLinks");
const burgerClose = document.querySelector('#burgerClose');

window.addEventListener("scroll", () => {
    navbar.classList.toggle("fixed", window.scrollY > 0);
});

burgerMenu.addEventListener('click', () => {
    burgerMenu.style.display = 'none';
    burgerClose.style.display = 'block';
    burgerLinks.classList.add('burger-active');
})

burgerClose.addEventListener('click', () => {
    burgerMenu.style.display = 'block';
    burgerClose.style.display = 'none';
    burgerLinks.classList.remove('burger-active');
})
