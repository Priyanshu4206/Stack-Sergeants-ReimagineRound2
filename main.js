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
  getDirection: true,
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

locoScroll.on("scroll", (instance) => {
  document.documentElement.setAttribute("data-direction", instance.direction);
  const footer = document.getElementById("footer");
  const footerRect = footer.getBoundingClientRect();
  const footerVisible =
    footerRect.top < window.innerHeight && footerRect.bottom > 0;

  if (footerVisible)
    document.documentElement.setAttribute("data-direction", "up");
  else
    document.documentElement.setAttribute("data-direction", instance.direction);
});
function loaderAnimation() {
  const tl = gsap.timeline({
    onComplete: landingPageAnimation,
  });

  tl
    .to(".load-text .loaded-text", {
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
        ease: "power4.inOut",
      },
      {
        x: "100%",
        ease: "power4.inOut",
      }
    ),
    "+=5";
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
      duration: 0.6,
      stagger: 0.2,
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
      description: "a faster future today. you got it.",
      products: [
        {
          productName: "razr 50 ultra",
          productImg: "/features/razr-50-ultra.png",
          productDesc:
            "The new motorola razr 50 ultra comes with moto buds+ in the box, and the external display is integrated seamlessly with the moto buds+ settings2. With moto buds+ you can experience a new and powerful world of audio featuring Sound by Bose",
          qualities: [
            {
              title: "Mid Night Blue",
              qualityImg: "/features/razr-50-ultra-2.png",
            },
            {
              title: "Spring Green",
              qualityImg: "/features/razr-50-ultra-2.png",
            },
          ],
          price: 94999,
        },
        {
          productName: "edge 5g pro",
          productImg: "/features/edge-50-pro.png",
          productDesc:
            "The motorola edge 50 pro is the world’s first smartphone with a Pantone™ Validated camera and display. Confidently capture and view the world as you see it with Pantone Validated color and skin tones. Every Pantone Validated device has met Pantone’s evaluation and grading criteria by authentically simulating the full range of real-world Pantone Colors3.",
          qualities: [
            {
              title: "Vanilla Cream",
              qualityImg: "/features/edge-50-pro-2.png",
            },
            {
              title: "Luxe Lavender",
              qualityImg: "/features/edge-50-pro-3.png",
            },
            {
              title: "Moonlight Pearl",
              qualityImg: "/features/edge-50-pro-4.png",
            },
          ],
          price: 34999,
        },
      ],
    },
    {
      title: "Premium",
      description: "Redefining elegance",
      products: [
        {
          productName: "edge-50-fusion",
          productImg: "/features/edge-50-fusion.png",
          productDesc:
            "Curved edges, smooth contours, seamless camera housing, and the ultra-thin design of motorola edge 50 fusion gives you a premium tactile experience. Choose between Hot Pink in a vegan suede or Marshmallow Blue in a vegan leather finish, or go with a sophisticated and smooth matte finish in Forest Blue.",
          qualities: [
            {
              title: "Forest Blue",
              qualityImg: "/features/edge-50-fusion-2.png",
            },
            {
              title: "Hot Pink",
              qualityImg: "/features/edge-50-fusion-3.png",
            },
          ],
          price: 22999,
        },
        {
          productName: "g64",
          productImg: "/features/g64.png",
          productDesc:
            "Experience gaming without glitches, smoother videos, and more with the MediaTek Dimensity 7025 octa-core processor offering frequencies up to 2.5GHz. Download your favorite content at lightning-fast 5G speed1. Further, effortlessly switch between apps and have them run smoothly in the background with up to 12GB of RAM2.",
          qualities: [
            {
              title: "Mint Green",
              qualityImg: "/features/g64-2.png",
            },
            {
              title: "Ice Lilac",
              qualityImg: "/features/g64-3.png",
            },
          ],
          price: 69999,
        },
      ],
    },
    {
      title: "Best Deals",
      description: "Reimagine creativity with moto ai",
      products: [
        {
          productName: "razr 50 ultra",
          productImg: "/features/razr-50-ultra.png",
          productDesc:
            "The new motorola razr 50 ultra comes with moto buds+ in the box, and the external display is integrated seamlessly with the moto buds+ settings2. With moto buds+ you can experience a new and powerful world of audio featuring Sound by Bose",
          qualities: [
            {
              title: "Mid Night Blue",
              qualityImg: "/features/razr-50-ultra-2.png",
            },
            {
              title: "Spring Green",
              qualityImg: "/features/razr-50-ultra-2.png",
            },
          ],
          price: 94999,
        },
        {
          productName: "edge 5g pro",
          productImg: "/features/edge-50-pro.png",
          productDesc:
            "The motorola edge 50 pro is the world’s first smartphone with a Pantone™ Validated camera and display. Confidently capture and view the world as you see it with Pantone Validated color and skin tones. Every Pantone Validated device has met Pantone’s evaluation and grading criteria by authentically simulating the full range of real-world Pantone Colors3.",
          qualities: [
            {
              title: "Vanilla Cream",
              qualityImg: "/features/edge-50-pro-2.png",
            },
            {
              title: "Luxe Lavender",
              qualityImg: "/features/edge-50-pro-3.png",
            },
            {
              title: "Moonlight Pearl",
              qualityImg: "/features/edge-50-pro-4.png",
            },
          ],
          price: 34999,
        },
      ],
    },
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
      <p style="font-size:1.5rem;">${product.description}</p>
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
        <p class="product-price" style = "font-size: 1.5rem; font-weight: 600;">&#8377; ${
          product.price
        }.00</p>
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
      currentProductIndex = 0;
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

      if (currentProductIndex === 0) {
        currentIndex = (currentIndex + 1) % featuredProducts.length;
        renderProducts(currentIndex, currentProductIndex);
        renderAboutDetails(currentIndex, currentProductIndex);
        slideHeadings();
      }
    }, 6000);
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

  renderFeatures();
  renderProducts(currentIndex, currentProductIndex);
  renderAboutDetails(currentIndex, currentProductIndex);
  updateButtons();
  startAutoSlide();

  const featuresTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#features",
      start: "top 75%",
      end: "top 25%",
      scroller: "#main",
      scrub: true,
    },
  });

  featuresTimeline
    .from(".features-box", {
      opacity: 0,
      y: "100%",
      duration: 0.5,
      ease: "power2.out",
    })
    .from(
      ".product-box",
      {
        opacity: 0,
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      },
      "<"
    )
    .from(
      ".about-product",
      {
        opacity: 0,
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      },
      "<"
    );
}

function bannerAnimation() {
  const bannerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#banner",
      start: "top 55%",
      end: "top 15%",
      scroller: "#main",
      scrub: true,
    },
  });
  bannerTimeline.from("#banner .content h1", {
    opacity: 0,
    scale: 1,
    y: "60%",
    duration: 1,
    ease: "power4.inOut",
  });
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
        target.localName === "button" ||
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
      start: "top 10%",
      end: "top -400%",
      scrub: true,
      pin: true,
    },
  });

  tl.from("#cards .cards-container .card-left", {
    duration: 25,
    opacity: 0,
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: -100, y: window.innerHeight },
      ],
      curviness: 2,
      autoRotate: false,
    },
    stagger: 1,
    ease: "power4.inOut",
  });
  tl.from(
    "#cards .cards-container .card-right",
    {
      duration: 25,
      opacity: 0,
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: window.innerWidth, y: window.innerHeight },
        ],
        curviness: 2,
        autoRotate: false,
      },
      stagger: 1,
      ease: "power4.inOut",
    },
    "-=5.1"
  );
  tl.to(".card-right img:nth-child(1)", {
    x: 100,
    y: 100,
    opacity: 0,
    duration: 25,
    ease: "power4.inOut",
  });
  tl.to(".card-right img:nth-child(2)", {
    x: "-20%",
    y: "20%",
    opacity: 1,
    filter: "blur(0px)",
    duration: 25,
    ease: "power4.inOut",
  });
  tl.to(".card-right img:nth-child(2)", {
    x: 100,
    y: 100,
    opacity: 0,
    duration: 25,
    ease: "power4.inOut",
  });
  tl.to(
    "#cards .cards-container .card-left",
    {
      duration: 25,
      opacity: 0,
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: -100, y: window.innerHeight },
        ],
        curviness: 2,
        autoRotate: false,
      },
      ease: "power4.inOut",
    },
    "+=2"
  );
}

function trendingAnimation() {
  gsap.to("#circular-slider-area", {
    rotate: 0,
    ease: Expo.easeInOut,
    duration: 1,
  });
}

const stripes = document.querySelectorAll(".stripes");
let previousRightBox = null;
const step = 25;
const range = [-50, 50];

function setActiveStripe(rotation) {
  const activeIndex = 2 - rotation / step;
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
      title: "motorola razr 50 ultra",
      imgSrc: "/featured-Products/159051-800-auto.png",
    },
    {
      title: "motorola edge 50 pro",
      imgSrc: "/featured-Products/edge-50-pro.png",
    },
    {
      title: "motorola edge 50 fusion",
      imgSrc: "/featured-Products/edge-50-fusion.png",
    },
    {
      title: "motorola g85",
      imgSrc: "/featured-Products/g85.png",
    },
    {
      title: "motorola g64",
      imgSrc: "/featured-Products/g64.png",
    },
  ];

  const selectedProduct = products[index];
  const productTitle = document.querySelector(".product-title");
  const productImg = document.querySelector(".product-img-wrapper img");

  productTitle.textContent = selectedProduct.title;
  productImg.src = "";
  productImg.src = selectedProduct.imgSrc;
  productImg.style.opacity = 0;
  requestAnimationFrame(() => {
    productImg.style.transition =
      "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    productImg.style.opacity = 1;
    productImg.style.transform = "scale(1)";
  });
  productImg.addEventListener(
    "load",
    () => {
      productImg.style.transform = "scale(0)";
      requestAnimationFrame(() => {
        productImg.style.transform = "scale(1)";
      });
    },
    { once: true }
  );
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
  bannerAnimation();
  PhoneNavbar();
  newCursor();
  cardsAnimation();
  trendingAnimation();
});
