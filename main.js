import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'remixicon/fonts/remixicon.css'
gsap.registerPlugin(ScrollTrigger)
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
})
locoScroll.on('scroll', ScrollTrigger.update)
ScrollTrigger.scrollerProxy('#main', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  },
  pinType: document.querySelector('#main').style.transform
    ? 'transform'
    : 'fixed',
})
ScrollTrigger.addEventListener('refresh', () => locoScroll.update())
ScrollTrigger.refresh()

function loaderAnimation() {
  const tl = gsap.timeline(
    {
      onComplete: landingPageAnimation,
    },
    '-=5'
  )

  tl.to('.load-text .loaded-text', {
    scale: 1,
    duration: 0.5,
    ease: 'linear',
  })
    .to('.load-text .loading-text', {
      width: '50vmax',
      duration: 1,
      delay: 1.5,
      ease: 'linear',
    })
    .to('.load-text .loading-text', {
      width: '0vmax',
      duration: 1,
      delay: 1.5,
      ease: 'linear',
    })
    .to('.load-text .loaded-text', {
      scale: 0,
      duration: 0.5,
      ease: 'linear',
    })
    .fromTo(
      '.loader .boxes .box',
      { y: '100%' },
      {
        y: '-200%',
        duration: 2,
        opacity:0,
        stagger: {
          each: 0.1,
          from: 'random',
          grid: 'auto',
        },
        ease: 'power2.out',
      },
      '<'
    )
    .to(
      '.loader',
      {
        scale: 0,
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.2,
      },
      '-=0.5'
    )
}

loaderAnimation()

function landingPageAnimation() {
  var h1 = document.querySelector('.content h1')
  var h1Text = h1.textContent
  var splittedText = h1Text.split('')
  var clutter = ''
  splittedText.forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  })
  h1.innerHTML = clutter

  var h2 = document.querySelector('.content h2')
  var h2Text = h2.textContent
  var splittedText2 = h2Text.split('')
  var clutter2 = ''
  splittedText2.forEach(function (element) {
    clutter2 += `<span>${element}</span>`
  })
  h2.innerHTML = clutter2

  const tl = gsap.timeline()

  tl.to(
    '#landing-section',
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    '+=0.5'
  )
    .fromTo(
      '#landing-section .content h1 span',
      {
        y: '20%',
        opacity: 0,
        duration: 0.2,
        stagger: 0.1,
      },
      {
        opacity: 1,
        y: '0%',
        duration: 0.2,
        stagger: 0.1,
      }
    )
    .fromTo(
      '#landing-section .content h2 span',
      {
        y: '-20%',
        opacity: 0,
        duration: 0.2,
        stagger: -0.1,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.2,
        stagger: -0.1,
      },
      '-=1.5'
    )
    .to('#landing-section .content a', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })
}

function cursorAnimation() {
  const cur = document.getElementById('cursor')
  const mouse = { x: 0, y: 0 }
  const previousMouse = { x: 0, y: 0 }
  const circle = { x: 0, y: 0 }
  let currentScale = 0
  let currentAngle = 0
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
  })
  const speed = 0.12
  const tick = () => {
    circle.x += (mouse.x - circle.x) * speed
    circle.y += (mouse.y - circle.y) * speed
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`
    const deltaMouseX = mouse.x - previousMouse.x
    const deltaMouseY = mouse.y - previousMouse.y
    previousMouse.x = mouse.x
    previousMouse.y = mouse.y
    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 10,
      150
    )
    const scaleValue = (mouseVelocity / 150) * 0.5
    currentScale += (scaleValue - currentScale) * speed
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI
    if (mouseVelocity > 20) {
      currentAngle = angle
    }
    const rotateTransform = `rotate(${currentAngle}deg)`
    cur.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`
    window.requestAnimationFrame(tick)
  }
  tick()

  var button = document.querySelector('.content a')
  button.addEventListener('mouseenter', function () {
    cur.style.border = '5px solid #000'
    cur.style.boxShadow = '0px 0px 10px 30px rgba(0, 0, 0, 0.3) inset'
  })

  button.addEventListener('mouseleave', function () {
    cur.style.border = '5px solid #fff'
    cur.style.boxShadow = '0px 0px 10px 30px rgba(255, 255, 255, 0.3) inset'
  })

  var footer = document.querySelector('#footer')
  footer.addEventListener('mouseenter', function () {
    // cur.style.border = '10px solid #000'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(0, 0, 0, 0.3)'
    // cur.style.transform = scale(0)
    cur.style.opacity = 0
  })

  footer.addEventListener('mouseleave', function () {
    // cur.style.border = '10px solid #fff'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(255, 255, 255, 0.3)'
    // cur.style.transform = scale(1)
    cur.style.opacity = 1
  })

  var navbar = document.querySelector('header')
  navbar.addEventListener('mouseenter', function () {
    // cur.style.border = '10px solid #000'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(0, 0, 0, 0.3)'
    // cur.style.transform = scale(0)
    cur.style.opacity = 0
  })

  navbar.addEventListener('mouseleave', function () {
    // cur.style.border = '10px solid #fff'
    // cur.style.boxShadow = '0px 0px 10px 30px rgba(255, 255, 255, 0.3)'
    // cur.style.transform = scale(1)
    cur.style.opacity = 1
  })
}

cursorAnimation()

function PhoneNavbar() {
  var menuToggle = document.getElementById('menuToggle')
  var menuBar = gsap.timeline({ paused: true })
  menuBar.to(
    '.bar-1',
    0.5,
    {
      attr: { d: 'M8,2 L2,8' },
      x: 1,
      ease: 'power2.easeInOut',
    },
    'start'
  )

  menuBar.to(
    '.bar-2',
    0.5,
    {
      autoAlpha: 0,
    },
    'start'
  )
  menuBar.to(
    '.bar-3',
    0.5,
    {
      attr: { d: 'M8,8 L2,2' },
      x: 1,
      ease: 'power2.easeInOut',
    },
    'start'
  )
  menuBar.reverse()

  var navTl = gsap.timeline({
    paused: true,
  })
  navTl.to('.fullpage-menu', {
    duration: 0,
    display: 'block',
    ease: 'Expo.easeInOut',
  })

  navTl.to('.menu-bg', {
    duration: 1,
    opacity: 1,
    ease: 'Expo.easeInOut',
  })

  navTl.from(
    '.main-menu li a',
    {
      duration: 1.5,
      y: '100%',
      rotateY: 30,
      stagger: 0.2,
      ease: 'Expo.easeInOut',
    },
    '-=0.5'
  )

  navTl.reverse()

  menuToggle.addEventListener('click', function () {
    menuBar.reversed(!menuBar.reversed())
    navTl.reversed(!navTl.reversed())
  })
}
PhoneNavbar()
