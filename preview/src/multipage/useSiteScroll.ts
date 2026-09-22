import { useEffect } from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

/** One shared scroll driver for every page; chapter settling stays on the homepage. */
export function useSiteScroll(enabled: boolean, path: string) {
 useEffect(() => {
  if (!enabled) return
  const media = gsap.matchMedia()
  media.add({smooth:'(min-width:801px) and (pointer:fine)',chapters:'(min-width:1101px) and (min-height:800px)'}, context => {
   if (!context.conditions?.smooth) return
   const headerHeight = () => document.querySelector('.mp-header')?.getBoundingClientRect().height ?? 90
   const lenis = new Lenis({
    autoRaf: false, duration: .75, smoothWheel: true,
    easing: progress => 1 - Math.pow(1 - progress, 4),
    anchors: { duration: .8 },
    prevent: element => Boolean(element.closest('.mp-search-dialog, .mp-search-overlay, .mp-header nav, .mp-menu-backdrop, select, textarea')),
   })
   // Let wheel momentum subside before gently correcting the final position.
   // Zero velocity at both ends avoids a sudden tug when reversing a small overshoot.
   const snap = path === '/site' && context.conditions?.chapters ? new Snap(lenis, {
    type: 'proximity', distanceThreshold: '35%', debounce: 420, duration: .9,
    easing: progress => (1 - Math.cos(Math.PI * progress)) / 2,
   }) : undefined
   let removePoints: (()=>void)[] = []
   const updatePoints = () => {
    removePoints.forEach(remove => remove())
    if (!snap) return
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
    snap?.stop()
    snap?.destroy()
    gsap.ticker.remove(tick)
    lenis.off('scroll',ScrollTrigger.update)
    lenis.stop()
    lenis.destroy()
    gsap.ticker.lagSmoothing(500,33)
   }
  })
  return () => media.revert()
 },[enabled,path])
}
