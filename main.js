import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";
gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

function loaderAnimation() {
  gsap.to(".loader", {
    duration: 5,
    y: "-100%",
    ease: "power4.inOut",
    stagger: 0.2,
    onComplete: function () {
      landingPageAnimation();
    },
  });
}

loaderAnimation();

function landingPageAnimation() {
  var h1 = document.querySelector(".content h1");
  var h1Text = h1.textContent;
  var splittedText = h1Text.split("");
  var clutter = "";
  splittedText.forEach(function (elem) {
    clutter += `<span>${elem}</span>`;
  });
  h1.innerHTML = clutter;

  var h2 = document.querySelector(".content h2");
  var h2Text = h2.textContent;
  var splittedText2 = h2Text.split("");
  var clutter2 = "";
  splittedText2.forEach(function (element) {
    clutter2 += `<span>${element}</span>`;
  });
  h2.innerHTML = clutter2;

  const tl = gsap.timeline();
  tl.fromTo(
    "#landing-section .boxes .box",
    { y: "100%" },
    {
      y: "-200%",
      duration: 2,
      stagger: {
        each: 0.1,
        from: "random",
        grid: "auto",
      },
      ease: "power2.out",
    }
  );
  tl.fromTo(
    "#landing-section .content h1 span",
    {
      y: "20%",
      duration: 0.2,
      opacity: 0,
      stagger: 0.1,
    },
    {
      opacity: 1,
      y: "0%",
      duration: 0.2,
      stagger: 0.1,
    }
  );
  tl.fromTo(
    "#landing-section .content h2 span",
    {
      y: "-20%",
      opacity: 0,
      duration: 0.2,
      stagger: -0.15,
    },
    {
      y: "0%",
      opacity: 1,
      duration: 0.2,
      stagger: -0.15,
    },
    "-=1.5"
  );

  tl.fromTo(
    "#landing-section .content a",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }
  );
}

function cursorAnimation() {
  const cur = document.getElementById("cursor");
  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  let currentScale = 0;
  let currentAngle = 0;
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  const speed = 0.12;
  const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 10,
      150
    );
    const scaleValue = (mouseVelocity / 150) * 0.5;
    currentScale += (scaleValue - currentScale) * speed;
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
    if (mouseVelocity > 20) {
      currentAngle = angle;
    }
    const rotateTransform = `rotate(${currentAngle}deg)`;
    cur.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
    window.requestAnimationFrame(tick);
  };
  tick();

  var button = document.querySelector(".content a");
  button.addEventListener("mouseenter", function () {
    cur.style.border = "5px solid #000";
    cur.style.boxShadow = "0px 0px 10px 30px rgba(0, 0, 0, 0.3) inset";
  });

  button.addEventListener("mouseleave", function () {
    cur.style.border = "5px solid #fff";
    cur.style.boxShadow = "0px 0px 10px 30px rgba(255, 255, 255, 0.3) inset";
  });

  var footer = document.querySelector("#footer");
  footer.addEventListener("mouseenter", function () {
    // cur.style.border = '10px solid #000'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(0, 0, 0, 0.3)'
    // cur.style.transform = scale(0)
    cur.style.opacity = 0;
  });

  footer.addEventListener("mouseleave", function () {
    // cur.style.border = '10px solid #fff'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(255, 255, 255, 0.3)'
    // cur.style.transform = scale(1)
    cur.style.opacity = 1;
  });

  var navbar = document.querySelector("header");
  navbar.addEventListener("mouseenter", function () {
    // cur.style.border = '10px solid #000'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(0, 0, 0, 0.3)'
    // cur.style.transform = scale(0)
    cur.style.opacity = 0;
  });

  navbar.addEventListener("mouseleave", function () {
    // cur.style.border = '10px solid #fff'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(255, 255, 255, 0.3)'
    // cur.style.transform = scale(1)
    cur.style.opacity = 1;
  });
}

cursorAnimation();

function PhoneNavbar() {
  var menuToggle = document.getElementById("menuToggle");
  var menuBar = gsap.timeline({ paused: true });
  menuBar.to(
    ".bar-1",
    0.5,
    {
      attr: { d: "M8,2 L2,8" },
      x: 1,
      ease: "power2.easeInOut",
    },
    "start"
  );

  menuBar.to(
    ".bar-2",
    0.5,
    {
      autoAlpha: 0,
    },
    "start"
  );
  menuBar.to(
    ".bar-3",
    0.5,
    {
      attr: { d: "M8,8 L2,2" },
      x: 1,
      ease: "power2.easeInOut",
    },
    "start"
  );
  menuBar.reverse();

  var navTl = gsap.timeline({
    paused: true,
  });
  navTl.to(".fullpage-menu", {
    duration: 0,
    display: "block",
    ease: "Expo.easeInOut",
  });

  navTl.to(".menu-bg", {
    duration: 1,
    opacity: 1,
    ease: "Expo.easeInOut",
  });

  navTl.from(
    ".main-menu li a",
    {
      duration: 1.5,
      y: "100%",
      rotateY: 30,
      stagger: 0.2,
      ease: "Expo.easeInOut",
    },
    "-=0.5"
  );

  navTl.reverse();

  menuToggle.addEventListener("click", function () {
    menuBar.reversed(!menuBar.reversed());
    navTl.reversed(!navTl.reversed());
  });
}
PhoneNavbar();
const featuredProducts = [
  {
    title: "5G",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestia cumque ullam aliquid quis velit.",
    products: [
      {
        productName: "Product 1.1",
        productImg: "/featured-Products/product_img1.svg", // Updated path
        productDesc:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 12922,
      },
      {
        productName: "Product 1.2",
        productImg: "/featured-Products/product_img2.svg", // Updated path
        productDesc:
          "Assume Something- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 102922,
      },
    ],
  },
  {
    title: "4G",
    description:
      "Assume Something-em ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
    products: [
      {
        productName: "Product 2.1",
        productImg: "/featured-Products/product_img2.svg", // Updated path
        productDesc:
          "Assume Something- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 21212,
      },
      {
        productName: "Product 2.2",
        productImg: "/featured-Products/product_img1.svg", // Updated path
        productDesc:
          "Assume Something- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 1122922,
      },
      {
        productName: "Product 2.3",
        productImg: "/featured-Products/product_img2.svg", // Updated path
        productDesc:
          "Assume Something- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 23122,
      },
      {
        productName: "Product 2.4",
        productImg: "/featured-Products/product_img1.svg", // Updated path
        productDesc:
          "Assume Something- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 21222,
      },
    ],
  },
  {
    title: "Good one",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestia cumque ullam aliquid quis velit.",
    products: [
      {
        productName: "Product 3.1",
        productImg: "/featured-Products/product_img1.svg", // Updated path
        productDesc:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 12922,
      },
      {
        productName: "Product 3.2",
        productImg: "/featured-Products/product_img2.svg", // Updated path
        productDesc:
          "Assume Something- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, a! Est soluta eum perferendis molestias cumque ullam aliquid quis velit.",
        qualities: [
          {
            title: "quality 1",
            qualityImg: "/featured-Products/qualityimg1.svg",
          }, // Updated path
          {
            title: "quality 2",
            qualityImg: "/featured-Products/qualityimg2.svg",
          }, // Updated path
          {
            title: "quality 3",
            qualityImg: "/featured-Products/qualityimg3.svg",
          }, // Updated path
        ],
        price: 102922,
      },
    ],
  },
  // Add more objects as needed
];
const titlesContainer = document.querySelector(".features-wrapper");
const imagesContainer = document.querySelector(
  ".featured-products-image-container"
);
const aboutWrapper = document.querySelector(".about-wrapper");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentIndex = 0;
let currentProductIndex = 0;
let autoSlideInterval;

function renderFeatures() {
  titlesContainer.innerHTML = featuredProducts
    .map(
      (product, index) => `
    <div class="features-title" data-index="${index}">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
    </div>
  `
    )
    .join("");
}

function renderProducts(index, productIndex) {
  const products = featuredProducts[index].products;
  imagesContainer.innerHTML = `
    <div class="product-wrapper">
      <img src="${products[productIndex].productImg}" alt="${products[productIndex].productName}">
    </div>
  `;
  // Animate the image sliding in from the right
  gsap.fromTo(
    ".product-wrapper",
    { x: "100%" },
    { x: "0%", duration: 1, ease: "power1.out" }
  );
}

function renderAboutDetails(index, productIndex) {
  const product = featuredProducts[index].products[productIndex];

  if (product) {
    aboutWrapper.innerHTML = `
      <div class="about-details">
        <h3>${product.productName}</h3>
        <p>${product.productDesc}</p>
        <ul class="qualities-list">
          ${product.qualities
            .map(
              (quality) => `
            <li class="quality-item">
              <img src="${quality.qualityImg}" alt="${quality.title}"> ${quality.title}
            </li>
          `
            )
            .join("")}
        </ul>
        <p class="product-price">Rs ${product.price}</p>
      </div>
    `;

    const tl = gsap.timeline();

    tl.fromTo(
      ".about-details h3",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power1.out" },
      "<"
    );

    tl.fromTo(
      ".about-details p:not(.product-price)",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power1.out" },
      "<"
    );

    tl.fromTo(
      ".about-details .qualities-list .quality-item",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power1.out" },
      "<"
    );

    tl.fromTo(
      ".about-details .product-price",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power1.out" },
      "<"
    );
  }
}

function updateButtons() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === featuredProducts.length - 1;
}

function slideHeadings() {
  const boxWidth = document.querySelector(".features-title").offsetWidth;
  gsap.to(".features-wrapper", { x: -currentIndex * boxWidth, duration: 0.25 });
  updateButtons();
}

function changeSlide(offset) {
  if (
    currentIndex + offset >= 0 &&
    currentIndex + offset < featuredProducts.length
  ) {
    currentIndex += offset;
    currentProductIndex = 0; // Reset product index for new featured product
    renderProducts(currentIndex, currentProductIndex);
    renderAboutDetails(currentIndex, currentProductIndex);
    slideHeadings();
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const products = featuredProducts[currentIndex].products;
    currentProductIndex = (currentProductIndex + 1) % products.length;
    renderProducts(currentIndex, currentProductIndex);
    renderAboutDetails(currentIndex, currentProductIndex);

    // Check if all products have been shown
    if (currentProductIndex === 0) {
      currentIndex = (currentIndex + 1) % featuredProducts.length;
      renderProducts(currentIndex, currentProductIndex);
      renderAboutDetails(currentIndex, currentProductIndex);
      slideHeadings(); // Update headings after changing featured product
    }
  }, 3000); // Change every 3 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

nextButton.addEventListener("click", () => {
  stopAutoSlide();
  changeSlide(1);
  startAutoSlide();
});

prevButton.addEventListener("click", () => {
  stopAutoSlide();
  changeSlide(-1);
  startAutoSlide();
});

// Initial render
renderFeatures();
renderProducts(currentIndex, currentProductIndex);
renderAboutDetails(currentIndex, currentProductIndex);
updateButtons();
startAutoSlide();
