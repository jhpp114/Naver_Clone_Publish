// Elements
const junior_naver = document.querySelector('.junior_naver');
const apply_blue = document.querySelector('.apply_blue');
const apply_red = document.querySelector('.apply_red');
const apply_green = document.querySelector('.apply_green');
const naver_color = document.querySelector('.naver_color');
// ========= main content elements====================
const highlight_news = document.querySelector('.dynamic_news');
// ========== option_things_to_read===================
const option_things_to_read = document.querySelector('.option_things_to_read');
// =========== vedio elements ========================
const videos = document.querySelectorAll(".video");
// =========== extra btn elements ====================
const SCROLL_UP_BTN = document.querySelector(".scroll_up");
const MODE_SETTING = document.querySelector(".mode_setting");
const MODE_ICON = document.querySelector('.mode_icon');
// =========== Option_more behavior ==================
const option_more = document.querySelector('.option_more');
const option_more_displayer = document.querySelector('.option_more_displayer');

// =========== Window Scroll =========================
const naver_search_bar = document.querySelector('.main_logo');
const shopping_items = document.querySelector('.shopping_heading_items');
window.onscroll = function(e) {
    //console.log(window.scrollY);
    let scrollY_pixel = window.scrollY;
    if (scrollY_pixel >= 500) {
        naver_search_bar.classList.add('search_bar_behavior');
    } else {
        naver_search_bar.classList.remove('search_bar_behavior');
    }
}

// Event listeners
junior_naver.addEventListener("mouseover", apply_color_change);
junior_naver.addEventListener("mouseout", remove_color_change);
document.addEventListener('DOMContentLoaded', change_headline_everyTwoSec);
option_to_read_active();
auto_play_video();
SCROLL_UP_BTN.addEventListener("click", scroll_to_top);
MODE_SETTING.addEventListener("click", change_theme);
option_more.addEventListener("click", display_more_options);

// Functions
function display_more_options() {
    let windowScroll_X = window.innerWidth;
    if (windowScroll_X > 1035) {
        return;
    } else {
        console.log("hello Outer");
        if (option_more_displayer.classList.contains("display_block")) {
            option_more_displayer.classList.remove("display_block");
        } else {
            option_more_displayer.classList.add("display_block");
        }
    }
}

function change_theme() {
    let currentMode = document.documentElement.getAttribute("data-theme");
    if (currentMode == "dark") {
        // <i class="far fa-moon"></i>
        MODE_SETTING.innerHTML = '<i class="far fa-moon"> Change to Dark</i>'
        document.documentElement.setAttribute("data-theme", "light");        
    } else {
        MODE_SETTING.innerHTML = '<i class="far fa-sun"> Change to Light</i>'
        document.documentElement.setAttribute("data-theme", "dark");
    }
}

function scroll_to_top() {
    window.scrollTo({
        top: 0
    ,   left: 0
    ,   behavior: "smooth"
    });
}

function auto_play_video() {
    videos.forEach(function(video) {
        video.addEventListener('mouseover', ()=> {
            console.log("play?");
            video.play();
        });
        video.addEventListener('mouseout', ()=> {
            video.pause();
        });
    });
}

function option_to_read_active() {
    let options = option_things_to_read.children;
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function() {
            // remove active
            removeClass();
            // apply active
            options[i].classList.add(`active_${i}`);
        });
    }
}

function removeClass() {
    let options = option_things_to_read.children;
    for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains(`active_${i}`)) {
            options[i].classList.remove(`active_${i}`);
            console.log(options[i]);
        }
    }
}

// functions
function random_news_line() {
    const newsLineArr = [
    ,   "Choco-Nyang O-Ta-Ku"
    ,   "Subscriber reached 19!"
    ,   "6 weeks learning code...."
    ,   "[LIVE] UDT forces training"
    ,   "ROK and US military go together"
    ,   "Self Learner can do it!"
    ,   "[Hope] I finally got a job...."
    ];
    return newsLineArr;
}

function change_headline_everyTwoSec() {
    let newsData = random_news_line();
    let i = 0;
    setInterval(function() {
        highlight_news.textContent = newsData[i];
        i++;
        if (i >= newsData.length - 1) {
            i = 0;
        }
    }, 2000); 
}

function apply_color_change() {
    apply_blue.style.color = "blue";
    apply_red.style.color = "red";
    apply_green.style.color = "#2DB400";
    naver_color.style.color = "#2DB400";
}

function remove_color_change() {
    apply_blue.style.color = "rgb(153, 153, 153)";
    apply_red.style.color = "rgb(153, 153, 153)";
    apply_green.style.color = "rgb(153, 153, 153)";
    naver_color.style.color = "rgb(153, 153, 153)";
}
