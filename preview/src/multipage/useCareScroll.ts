import { useEffect } from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

/** One scroll driver for desktop smoothing, chapter settling and GSAP. */
export function useCareScroll(enabled: boolean) {
 useEffect(() => {
  if (!enabled) return
  const media = gsap.matchMedia()
  media.add('(min-width:1101px) and (min-height:800px) and (pointer:fine)', () => {
   const headerHeight = () => document.querySelector('.mp-header')?.getBoundingClientRect().height ?? 90
   const lenis = new Lenis({
    autoRaf: false, duration: .75, smoothWheel: true,
    easing: progress => 1 - Math.pow(1 - progress, 4),
    anchors: { duration: .8 },
    prevent: element => Boolean(element.closest('.mp-search-dialog, .mp-header nav, .mp-menu-backdrop')),
   })
   const snap = new Snap(lenis, {type:'proximity',distanceThreshold:'35%',debounce:160,duration:.65,easing:progress=>1-Math.pow(1-progress,4)})
   let removePoints: (()=>void)[] = []
   const updatePoints = () => {
    removePoints.forEach(remove => remove())
    removePoints = Array.from(document.querySelectorAll<HTMLElement>('#general-care, #unani-care, .story-doctors')).map(section =>
     snap.add(section.getBoundingClientRect().top + window.scrollY - headerHeight()))
   }
   const tick = (seconds:number) => lenis.raf(seconds * 1000)
   lenis.on('scroll', ScrollTrigger.update)
   gsap.ticker.add(tick)
   gsap.ticker.lagSmoothing(0)
   const observer = new ResizeObserver(updatePoints)
   for (const selector of ['.story-opening','.mp-header','#general-care','#unani-care']) {
    const element = document.querySelector(selector)
    if (element) observer.observe(element)
   }
   ScrollTrigger.addEventListener('refresh', updatePoints)
   const refreshTimer = window.setTimeout(()=>{lenis.resize();ScrollTrigger.refresh();updatePoints()},500)
   updatePoints()
   return () => {
    window.clearTimeout(refreshTimer)
    observer.disconnect()
    ScrollTrigger.removeEventListener('refresh',updatePoints)
    removePoints.forEach(remove=>remove())
    snap.stop()
    snap.destroy()
    gsap.ticker.remove(tick)
    lenis.off('scroll',ScrollTrigger.update)
    lenis.stop()
    lenis.destroy()
    gsap.ticker.lagSmoothing(500,33)
   }
  })
  return () => media.revert()
 },[enabled])
}
