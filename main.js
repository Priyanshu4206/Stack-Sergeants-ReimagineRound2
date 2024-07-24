import LocomotiveScroll from "locomotive-scroll";
import { Expo, gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";
import { Back, Power4 } from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(Draggable);

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
  const tl = gsap.timeline(
    {
      onComplete: landingPageAnimation,
    },
    "-=5"
  );

  tl.to(".load-text .loaded-text", {
    scale: 1,
    duration: 0.5,
    ease: "linear",
  })
    .to(".load-text .loading-text", {
      width: "50vmax",
      duration: 1,
      delay: 1.5,
      ease: "linear",
    })
    .to(".load-text .loading-text", {
      width: "0vmax",
      duration: 1,
      delay: 1.5,
      ease: "linear",
    })
    .to(".load-text .loaded-text", {
      scale: 0,
      duration: 0.5,
      ease: "linear",
    })
    .to(
      ".loader",
      {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.2,
      },
      "-=0.5"
    )
    .fromTo(
      ".after-loader .boxes .box",
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
      },
      "<"
    )
    .fromTo(
      ".after-loader",
      {
        x: "0%",
        duration: 0,
        ease: "power4.inOut",
      },
      {
        x: "100%",
        duration: 1,
        ease: "power4.inOut",
      }
    );
}

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
    "#landing-section .content h1 span",
    {
      y: "20%",
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
    },
    {
      y: "0%",
      opacity: 1,
      duration: 0.2,
      stagger: 0.1,
    }
  )
    .fromTo(
      "#landing-section .content h2 span",
      {
        y: "-20%",
        opacity: 0,
        duration: 0.2,
        stagger: -0.1,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 0.2,
        stagger: -0.1,
      },
      "-=1.5"
    )
    .to("#landing-section .content a", {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });
}

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

function featuresAnimation() {
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
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, consequuntur.",
      products: [
        {
          productName: "Product 2.1",
          productImg: "/featured-Products/product_img2.svg", // Updated path
          productDesc:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor sed omnis et beatae dicta fugiat, expedita corporis nostrum illum, sit, voluptates placeat sapiente aspernatur tenetur.s",
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
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab suscipit, cum asperiores consequatur nisi dolores.",
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
        <p class="product-price" style = "font-size: 1.5rem; font-weight: 600;">Rs ${
          product.price
        }</p>
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
    const boxWidth = document.querySelector(".features-box").offsetWidth;
    gsap.to(".features-wrapper", {
      x: -currentIndex * boxWidth,
      duration: 0.25,
    });
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
}

function newCursor() {
  const pointer = document.getElementById("pointer");
  const pointerSize = parseFloat(
    getComputedStyle(document.body)
      .getPropertyValue("--pointer-size")
      .replace("px", "")
  );
  window.addEventListener("mousemove", function (e) {
    const x = e.clientX - pointerSize / 2 + "px";
    const y = e.clientY - pointerSize / 2 + "px";
    const target = e.target;

    gsap.to(pointer, {
      duration: 0.5,
      ease: Back.easeOut.config(1.7),
      left: x,
      top: y,
    });

    if (target.localName !== "html") {
      if (
        target.localName === "a" ||
        target.dataset.cursor === "false" ||
        target.parentNode.dataset.cursor === "false"
      ) {
        gsap.to(pointer, { duration: 1, ease: Power4.easeOut, scale: 0 });
      } else {
        gsap.to(pointer, { duration: 1, ease: Power4.easeOut, scale: 1 });
      }
    }
  });

  window.addEventListener("mousedown", function (e) {
    if (
      e.target.dataset.cursor === "stretch" ||
      e.target.parentNode.dataset.cursor === "stretch"
    ) {
      gsap.to(pointer, {
        duration: 0.3,
        ease: Power4.easeOut,
        rotation: 0,
        width: pointerSize + 15,
        height: pointerSize - 10,
      });
    }
  });

  window.addEventListener("mouseup", function () {
    gsap.to(pointer, {
      duration: 0.3,
      ease: Power4.easeOut,
      rotation: 45,
      width: pointerSize,
      height: pointerSize,
    });
  });
}

function cardsAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#cards",
      scroller: "#main",
      start: "top 40%",
      end: "bottom top",
      scrub: true,
      pin: true,
    },
  });

  tl.from("#cards .cards-container .card-left", {
    duration: 2,
    opacity: 0,
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: -100, y: window.innerHeight },
      ],
      curviness: 2,
      autoRotate: false,
    },
    ease: "power2.out",
  });
  tl.from(
    "#cards .cards-container .card-right",
    {
      duration: 2,
      opacity: 0,
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: window.innerWidth, y: window.innerHeight },
        ],
        curviness: 2,
        autoRotate: false,
      },
      ease: "power2.out",
    },
    "-=2.1"
  );
  tl.to(
    ".card-right img:nth-child(1)",
    {
      x: 100,
      y: 100,
      opacity: 0,
    },
    "+=2.5"
  );
  tl.to(".card-right img:nth-child(2)", {
    x: "-10%",
    y: "20",
    opacity: 1,
    filter: "blur(0px)",
  });
  tl.to(
    ".card-right img:nth-child(2)",
    {
      x: 100,
      y: 100,
      opacity: 0,
    },
    "+=2.5"
  );
}

// Trending Animation
function trendingAnimation() {
  gsap.to("#circular-slider-area", {
    rotate: 0,
    ease: Expo.easeInOut,
    duration: 1,
  });
}

const stripes = document.querySelectorAll(".stripes");
let previousRightBox = null; // Variable to keep track of the previously clicked right-box
const step = 25; // Degree step for rotation
const range = [-50, 50]; // Range of rotation degrees

function setActiveStripe(rotation) {
  const activeIndex = 2 - rotation / step; // Adjusted to reverse the index calculation
  stripes.forEach((stripe, index) => {
    const rightBox = stripe.querySelector(".right-box");
    if (index === activeIndex) {
      gsap.to(rightBox, {
        x: "1rem",
        color: "blue",
        fontSize: "2.5rem",
        duration: 0.3,
      });
      updateProductInfo(index);
      previousRightBox = rightBox;
    } else {
      gsap.to(rightBox, {
        x: 0,
        color: "whitesmoke",
        fontSize: "2rem",
        duration: 0.3,
      });
    }
  });
}

function updateProductInfo(index) {
  const products = [
    {
      title: "Product 1",
      imgSrc: "./public/featured-Products/product_img01.png",
    },
    {
      title: "Product 2",
      imgSrc: "./public/featured-Products/product_img02.png",
    },
    {
      title: "Product 3",
      imgSrc: "./public/featured-Products/product_img01.png",
    },
    {
      title: "Product 4",
      imgSrc: "./public/featured-Products/product_img02.png",
    },
    {
      title: "Product 5",
      imgSrc: "./public/featured-Products/product_img01.png",
    },
  ];

  const selectedProduct = products[index];
  const productTitle = document.querySelector(".product-title");
  const productImg = document.querySelector(".product-img-wrapper img");
  const hologramLight = document.querySelector(".hologram-light");

  productTitle.textContent = selectedProduct.title;

  // Reset image source to trigger reload
  productImg.src = "";
  productImg.src = selectedProduct.imgSrc;

  // Animate hologram light
  hologramLight.style.animation = "none";
  productImg.style.opacity = 0; // Start with hidden image
  requestAnimationFrame(() => {
    hologramLight.style.animation = "hologram 1s ease-in-out forwards";
    productImg.style.transition =
      "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    productImg.style.opacity = 1;
    productImg.style.transform = "scale(1)";
  });

  // Ensure hologram animation resets and triggers on image load
  productImg.addEventListener(
    "load",
    () => {
      hologramLight.style.animation = "none";
      productImg.style.transform = "scale(0)";
      requestAnimationFrame(() => {
        hologramLight.style.animation = "hologram 1s ease-in-out forwards";
        productImg.style.transform = "scale(1)";
      });
    },
    { once: true }
  ); // Ensure the listener is added only once
}

Draggable.create("#circular-slider-area", {
  type: "rotation",
  bounds: {
    minRotation: range[0],
    maxRotation: range[1],
  },
  snap: (endValue) => {
    const snappedValue = Math.round(endValue / step) * step;
    const clampedValue = Math.max(range[0], Math.min(snappedValue, range[1]));
    setActiveStripe(clampedValue);
    return clampedValue;
  },
  onDrag: function () {
    const rotation = this.rotation;
    const snappedValue = Math.round(rotation / step) * step;
    const clampedValue = Math.max(range[0], Math.min(snappedValue, range[1]));
    setActiveStripe(clampedValue);
  },
  onDragEnd: function () {
    const rotation = this.rotation;
    const snappedValue = Math.round(rotation / step) * step;
    const clampedValue = Math.max(range[0], Math.min(snappedValue, range[1]));
    setActiveStripe(clampedValue);
    gsap.to(this.target, {
      rotation: clampedValue,
    });
  },
});

stripes.forEach((stripe, index) => {
  const rightBox = stripe.querySelector(".right-box");
  if (rightBox) {
    if (index === 2) {
      gsap.set(rightBox, {
        x: "1rem",
        color: "blue",
        fontSize: "2.5rem",
      });
      previousRightBox = rightBox;
    } else {
      gsap.set(rightBox, {
        fontSize: "2rem",
        color: "whitesmoke",
      });
    }

    rightBox.addEventListener("click", (event) => {
      event.stopPropagation();
      const active = 3;
      const rotateBy = (active - (index + 1)) * 25;
      gsap.to("#circular-slider-area", {
        rotate: rotateBy,
      });
      if (previousRightBox && previousRightBox !== rightBox) {
        gsap.to(previousRightBox, {
          x: 0,
          color: "whitesmoke",
          fontSize: "2rem",
        });
      }
      gsap.to(rightBox, {
        x: "1rem",
        color: "blue",
        fontSize: "2.5rem",
      });
      previousRightBox = rightBox;
      updateProductInfo(index);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loaderAnimation();
  featuresAnimation();
  PhoneNavbar();
  newCursor();
  cardsAnimation();
  trendingAnimation();
  initializeSlider();
});
