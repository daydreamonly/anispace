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

function scrollHandler(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.offsetLeft
    })
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
    })
    
    container.addEventListener('mouseup', () => {
        isDown = false;
    })
    
    container.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX);
        container.scrollLeft = scrollLeft - walk
    })
}

scrollHandler(document.querySelector("#trendContent"));
