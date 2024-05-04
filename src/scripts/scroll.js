const episodeContainer = document.querySelector("#episodeContainer");
const mangaShowcase = document.querySelector("#mangaTopBox");
const animeShowcase = document.querySelector("#animeTopBox");

function scrollHandler(container) {
    let isDragging = false;
    let startX;
    let scrollLeft;
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });

    container.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener("mouseup", (e) => {
        isDragging = false;
        const endXPos = e.pageX;
        if (Math.abs(endXPos - startX) < 5) {
            e.target.click();
        }
    });
    container.addEventListener("mouseleave", () => {
        isDragging = false;
    });
}

if (animeShowcase) {
    scrollHandler(animeShowcase);
} else {
    scrollHandler(mangaShowcase);
}
