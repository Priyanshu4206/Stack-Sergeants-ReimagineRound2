import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    '#landing-section .content h1',
    {
      y: '20%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
      duration: 1,
      // stagger: 0.3,
      ease: 'power2.out',
    }
  )
  tl.fromTo(
    '#landing-section .content h2',
    {
      y: '-20%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }
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
