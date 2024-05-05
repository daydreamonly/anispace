const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const carousel = document.querySelector(".recommendation-carousel");
let recList = Array.from(carousel.querySelectorAll(".recommendation"));
let index = 0;

nextBtn.addEventListener("click", () => {
    for (let i = 0; i < recList.length; i++) {
        if (
            recList[i].className == "active" &&
            recList[i] < recList.length - 1
        ) {
            recList[i].classList.remove("active");
            recList[i + 1].classList.add("active");
            console.log("next");
            break;
        }
    }
});

prevBtn.addEventListener("click", () => {
    for (let i = 0; i < recList.length; i++) {
        if (recList[i].className == "active" && recList[i] > 0) {
            recList[i].classList.remove("active");
            recList[i - 1].classList.add("active");
            console.log("prev");
            break;
        }
    }
});

console.log("hello");
