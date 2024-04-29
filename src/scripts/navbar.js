const navbar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("fixed", window.scrollY > 0);
});
