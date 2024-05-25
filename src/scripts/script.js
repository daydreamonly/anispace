document.addEventListener('DOMContentLoaded', (e) => {
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");
    const carousel = document.querySelector(".recommendation-carousel");
    let slides = Array.from(carousel.querySelectorAll(".recommendation"));
    let counter = 0;
    
    function nextSlide() {
        if (counter < slides.length) {
            counter++;
            slides.forEach((slide) => {
                slide.style.transform = `translateX(-${counter * 100}%)`;
            });
        }
        if (counter == slides.length) {
            slides.forEach((slide) => {
                counter = 0;
                slide.style.transform = `translateX(0%)`;
            });
        }
    }
    
    function prevSlide() {
        let isFirstSlide = false;
    
        if (counter < slides.length && counter != 0) {
            isFirstSlide = true;
            counter--;
            slides.forEach((slide) => {
                slide.style.transform = `translateX(-${counter * 100}%)`;
            });
        }
    
        if (!isFirstSlide) {
            counter = slides.length - 1;
            slides.forEach((slide) => {
                slide.style.transform = `translateX(-${counter * 100}%)`;
            });
        }
    }
    
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    
    // setInterval(() => {nextSlide()}, 5000);
})

