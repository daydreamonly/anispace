const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const carousel = document.querySelector(".recommendation-carousel");
let slides = Array.from(carousel.querySelectorAll(".recommendation"));

function nextSlide() {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active") && i < slides.length - 1) {
            slides.forEach((slide) => {
                slide.classList.remove("active", "slide-left", "slide-right");
            });
            slides[i + 1].classList.add("active", "slide-left");
            break;
        }

        if (i == slides.length - 1) {
            slides.forEach((slide) => {
                slide.classList.remove("active", "slide-left", "slide-right");
            });
            slides[0].classList.add("active", "slide-left");
        }
    }
}

function prevSlide() {
    let isFistSlide = false;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active") && i > 0) {
            slides.forEach((slide) => {
                slide.classList.remove("active", "slide-left", "slide-right");
            });
            slides[i - 1].classList.add("active", "slide-right");
            isFistSlide = true;
            break;
        }
    }

    if (!isFistSlide) {
        slides.forEach((slide) => {
            slide.classList.remove("active", "slide-left", "slide-right");
        });
        slides[slides.length - 1].classList.add("active", "slide-right");
    }
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
setInterval(nextSlide, 3000);

function scrollHandler(container) {
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
}

scrollHandler(document.querySelector("#trendContent"));
