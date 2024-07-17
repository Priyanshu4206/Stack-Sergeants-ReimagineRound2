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
  window.addEventListener('load', () => {
    const tl = gsap.timeline()
    tl.fromTo(
      '#landing-section .boxes .box',
      { y: '100%' },
      {
        y: '-100%',
        duration: 2,
        stagger: {
          each: 0.1,
          from: 'random',
          grid: 'auto',
        },
        ease: 'power2.out',
      }
    )
    tl.fromTo(
      '#landing-section .content h1 span',
      {
        y: '20%',
        duration: 0.2,
        opacity: 0,
        stagger: 0.1,
      },
      {
        opacity: 1,
        y: '0%',
        duration: 0.2,
        stagger: 0.1,
      }
    )
    tl.fromTo(
      '#landing-section .content h2 span',
      {
        y: '-20%',
        opacity: 0,
        duration: 0.2,
        stagger: -0.15,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.2,
        stagger: -0.15,
      },
      '-=1.5'
    )

    tl.fromTo(
      '#landing-section .content a',
      {
        opacity: 0,
      },
      {
        opacity: 2,
        duration: 1,
        ease: 'power2.out',
      }
    )
  })
}

landingPageAnimation()

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
  })

  button.addEventListener('mouseleave', function () {
    cur.style.border = '5px solid #fff'
  })
}

cursorAnimation()

function PhoneNavbar() {
  const list = document.querySelectorAll('.list')

  function activeLink() {
    list.forEach((item) => item.classList.remove('active'))
    this.classList.add('active')
  }

  list.forEach((item) => item.addEventListener('click', activeLink))
}
PhoneNavbar()
