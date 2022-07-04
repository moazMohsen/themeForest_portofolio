
// carouselo
import { Carousel } from "./Carousel.js";
import { Contentful } from "./Contentful.js";

// nav
const navigationTaps = document.querySelectorAll(".navigation-tap");
const sectionBoxs = document.querySelectorAll(".section-box");
// Select tab content item
function selectItem() {
  removeActive();
  removeShow();
  // Grab content item from DOM
  const sectionBox = document.querySelector(`#${this.id}-content`);

  // Add show class
  sectionBox.classList.add("show");
  // add active borders from all tab items
  this.classList.add("active");
}

// Remove active borders from all tab items
function removeActive() {
  navigationTaps.forEach((item) => {
    item.classList.remove("active");
  });
}
// Remove show class from all content items
function removeShow() {
  sectionBoxs.forEach((item) => {
    item.classList.remove("show");
  });
}
// Listen for tab item click
navigationTaps.forEach((item) => {
  item.addEventListener("click", selectItem);
});

// red more button
const overlayBox = document.getElementById("overla-box"),
  closBtn = document.getElementById("close-btn"),
  openBtn = document.getElementById("open-btn");

openBtn.onclick = function () {
  overlayBox.style.display = "block";
  closBtn.classList.add("clos-btn-hide");
};

closBtn.onclick = function () {
  overlayBox.style.display = "none";

  closBtn.classList.remove("clos-btn-hide");
};

//Carousel
let carousel_left = document.querySelector(".carousel-left"),
  carousel_right = document.querySelector(".carousel-right"),
  our_partner_Box = document.querySelector(".our-partner-box");
const carouseloP = new Carousel(carousel_right, carousel_left, our_partner_Box);

// portofolio nav
let cat_btn = document.querySelectorAll(".cat li a");

cat_btn.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    cat_btn.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

cat_btn.forEach((ele) => {
  ele.addEventListener("click", () => {
    document.querySelectorAll(".portofolio-img").forEach((ele) => {
      ele.classList.add("hide");

      setTimeout(() => {
        ele.style.display = "none";
      }, 500);
    });
    document.querySelectorAll(ele.dataset.cat).forEach((ele) => {
      setTimeout(() => {
        ele.classList.remove("hide");
        ele.style.display = "block";
      }, 500);
    });
  });
});

// content
const portofolioBox = document.querySelector(".portofolio-img-box "),
  newsBox = document.querySelector(".news-box  ");

const content = new Contentful(portofolioBox, newsBox);
