const divs = document.querySelectorAll(".burgers");
const burs = document.querySelectorAll(".bur");
const collapse1 = document.querySelector(".collapse1");
const collapse2 = document.querySelector(".collapse2");
// the aboce is for burgur nav
const about = document.querySelector("#about");
const showmore = document.querySelector(".showmore-link");
// the aboce is for about section
const imgContainer = document.querySelector(".imgs-hidden")
const showImages = document.querySelector(".expand-img");
// the aboce is for portfolio section
const collapsibleBtns = document.querySelectorAll(".collapsible-2")
// the aboce is for FAQ section

for (let div of divs) {
    div.addEventListener("click", function () {
        this.children[0].classList.toggle('one');
        this.children[1].classList.toggle('two');
        this.children[2].classList.toggle('three');
        collapse1.classList.toggle("expand-left");
        collapse2.classList.toggle("expand-right");
    })
}

showmore.addEventListener("click", (e) => {
    e.preventDefault();
    about.classList.toggle("new-height")
})

showImages.addEventListener("click", (e) => {
    e.preventDefault();

    if (imgContainer.style.height) {
        imgContainer.style.height = null;
    } else {
        imgContainer.style.height = imgContainer.scrollHeight + "px";
    }
})

for (let i = 0; i < collapsibleBtns.length; i++) {
    collapsibleBtns[i].addEventListener("click", function (e) {
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;

            this.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#C4C4C4" fill-opacity="0.1" />
        <path d="M20 10L20 30.5" stroke="#8F6C53" />
        <line x1="10" y1="19.5" x2="30.5" y2="19.5" stroke="#8F6C53" />
        </svg>`
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            this.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#C4C4C4" fill-opacity="0.1"/>
        <line x1="10" y1="19.5" x2="30.5" y2="19.5" stroke="#8F6C53"/>
        </svg>`
        }
    })
}


// courasel code

const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide div")
const nav = document.querySelector(".carousel__nav");
const points = Array.from(nav.children);
const imgCountIndicator = document.querySelector(".img-count-indicator");

//buttons 
const prevBtn = document.querySelector(".courasel__button--left");
const nextBtn = document.querySelector(".courasel__button--right");

//trackers
let counter = 1;
let currentSlide = 1;
let targetSlide = 1;
let t;
let allSlides = carouselImages.length;


const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";



const moveToSlide = (counter, currentSlide, targetSlide) => {
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    updatePoint(currentSlide, targetSlide);
    updateNumbers(currentSlide);
    automated();
}
function moveNext() {
    if (counter >= carouselImages.length - 1) return;
    currentSlide = counter - 1;
    targetSlide = counter;
    if (counter == carouselImages.length - 2) {
        targetSlide = 0;
    }
    counter++;
    stopAutomated()
    moveToSlide(counter, currentSlide, targetSlide)
}

function updateNumbers() {
    imgCountIndicator.innerHTML = `${counter - 1} / ${allSlides - 2}`
}

nextBtn.addEventListener("click", () => {
    stopAutomated()
    moveNext();
})



prevBtn.addEventListener("click", () => {
    stopAutomated()
    if (counter <= 0) return;
    currentSlide = counter - 1;
    targetSlide = counter - 2;
    if (counter == 1) {
        targetSlide = points.length - 1;
    }
    counter--;

    moveToSlide(counter, currentSlide, targetSlide)

})

carouselSlide.addEventListener("transitionend", () => {
    if (carouselImages[counter].id === "lastClone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
    if (carouselImages[counter].id === "firstClone") {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
})

nav.addEventListener("click", e => {
    stopAutomated();
    const targetDot = e.target.closest("button");
    if (!targetDot) return;
    const targetIndex = points.findIndex(dot => dot === targetDot);
    currentSlide = counter - 1;
    targetSlide = targetIndex;
    counter = targetIndex + 1;
    moveToSlide(counter, currentSlide, targetSlide);

})

const updatePoint = (currentSlide, targetSlide) => {
    points[currentSlide].classList.remove("current-slide");
    points[targetSlide].classList.add("current-slide");
}

function automated() {
    t = setTimeout(moveNext, 20000);
}

function stopAutomated() {
    clearTimeout(t);
}

updateNumbers(currentSlide)
automated();

// calender code
const date = new Date();

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];

    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
};

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();


// popups code

const newsletterSignup = document.querySelector(".newsletter-signup a");
const popupContact = document.querySelectorAll(".popup-faded-screen");
const closeBtn = document.querySelectorAll(".popup-close-button");

const getinTouchLink = document.querySelector(".getin-touch_container a");

const reservationLink = document.querySelector(".reservation-wrapper a");

console.log(getinTouchLink)

getinTouchLink.addEventListener("click", function (e) {
    e.preventDefault();
    popupContact[0].classList.add("popup-active");
})

reservationLink.addEventListener("click", function (e) {
    e.preventDefault();
    popupContact[1].classList.add("popup-active");
})

newsletterSignup.addEventListener("click", function (e) {
    e.preventDefault();
    popupContact[2].classList.add("popup-active");
})

for (let i of closeBtn) {
    i.addEventListener("click", function () {
        this.parentElement.parentElement.classList.remove("popup-active");
    })
}




// on scroll change fixed navigator class

let mainNavLinks = document.querySelectorAll(".fixed-section-navigator li a");
let mainSections = document.querySelectorAll(".main-section");

let lastId;
let cur = [];

for (let i of mainNavLinks) {
    i.addEventListener("click", function (e) {
        for (let i of mainNavLinks) {
            i.classList.remove("active-navigator")
        }
        this.classList.add("active-navigator");

    })
}

window.addEventListener("scroll", event => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active-navigator");
        } else {
            link.classList.remove("active-navigator");
        }
    });
});