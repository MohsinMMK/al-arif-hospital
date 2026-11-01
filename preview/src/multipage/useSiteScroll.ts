import { useEffect, useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import Lenis, { type VirtualScrollData } from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

let activeLenis: Lenis | undefined;

/** The running scroll driver, so in-page jumps glide through it instead of fighting it. */
export const siteScroller = () => activeLenis;

/** The sticky header's height, which every in-page landing clears. */
export const headerOffset = () =>
  document.querySelector(".mp-header")?.getBoundingClientRect().height ?? 90;

/** Where a section lands below the header. */
export const sectionTop = (section: HTMLElement) =>
  section.getBoundingClientRect().top + window.scrollY - headerOffset();

/**
 * Runs a landing once the fonts have settled the layout. The shell scrolls a
 * new page to the top after the page's own effects, so it also waits a frame.
 * Returns the cleanup.
 */
export function scrollOnArrival(arrive: () => void) {
  let cancelled = false;
  let frame = 0;
  void document.fonts.ready.then(() => {
    if (cancelled) return;
    frame = requestAnimationFrame(arrive);
  });
  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };
}

/**
 * Marks the section whose top last passed mid-screen as active. Returns a hold
 * that keeps a chosen section active while a jump glides past the others.
 */
export function useSectionSpy(
  ids: readonly string[],
  setActive: (id: string) => void,
) {
  const hold = useRef(0);
  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const update = () => {
      frame = 0;
      const wait = hold.current - performance.now();
      if (wait > 0) {
        window.clearTimeout(timer);
        timer = window.setTimeout(schedule, wait);
        return;
      }
      const line = window.innerHeight / 2;
      let current = ids[0];
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const release = () => {
      hold.current = 0;
      schedule();
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("scrollend", release);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scrollend", release);
    };
  }, [ids, setActive]);
  return hold;
}

/** Jumps from a section switch to its section, gliding when motion is on. */
export function jumpToSection(
  id: string,
  event: MouseEvent<HTMLAnchorElement>,
  {
    enabled,
    hold,
    setActive,
    top = sectionTop,
  }: {
    enabled: boolean;
    /** The hold from useSectionSpy. */
    hold: RefObject<number>;
    setActive: (id: string) => void;
    top?: (section: HTMLElement) => number;
  },
) {
  const section = document.getElementById(id);
  if (!section) return;
  // Lenis claims in-page anchors on window, even modified clicks; keep them all from it.
  event.stopPropagation();
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  setActive(id);
  hold.current = performance.now() + (enabled ? 1200 : 0);
  const target = top(section);
  // A native smooth scroll would be cancelled by a Lenis glide still in flight.
  const lenis = enabled ? siteScroller() : undefined;
  if (lenis && !lenis.isStopped) lenis.scrollTo(target, { duration: 0.8 });
  else
    window.scrollTo({ top: target, behavior: enabled ? "smooth" : "instant" });
  section.querySelector("h2")?.focus({ preventScroll: true });
}

const nativeScrollSelector =
  ".mp-header nav, .cm-panel, .mp-menu-backdrop, [data-slot=select-content], textarea";

/** A mouse or trackpad drives the page; touch screens keep the browser's own scrolling. */
const finePointer = "(hover: hover) and (pointer: fine)";

function useFinePointer() {
  const [fine, setFine] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(finePointer).matches,
  );
  useEffect(() => {
    const query = window.matchMedia(finePointer);
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return fine;
}

/**
 * Smooths wheel and trackpad scrolling on every page, and eases the homepage
 * onto a section edge when it comes to rest close to one. Touch screens are
 * left native: their own momentum is already smooth, and the homepage settles
 * there through CSS proximity snap.
 */
export function useSiteScroll(enabled: boolean, path: string) {
  const fine = useFinePointer();
  const smooth = enabled && fine;
  // The driver lives as long as motion is on, across every page.
  useEffect(() => {
    if (!smooth) return;
    // Easing towards the target each frame follows the hand closely: no fixed
    // glide to wait out, and a fresh wheel step simply retargets. A light lerp
    // keeps a fast flick fast and lets the page coast to a soft stop.
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.16,
      smoothWheel: true,
      anchors: { duration: 0.8 },
      prevent: (element) => Boolean(element.closest(nativeScrollSelector)),
    });
    activeLenis = lenis;
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.stop();
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = undefined;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [smooth]);
  // Each page, and each change of layout, measures afresh.
  useEffect(() => {
    const lenis = activeLenis;
    if (!smooth || !lenis) return;
    // Stopping and starting drops any glide still running from the last
    // page, and resizing measures the new one, as a fresh driver would.
    lenis.stop();
    lenis.start();
    lenis.resize();
    if (path !== "/site") return;
    // Once the page has come to rest on its own, a stop just short of the next
    // section edge eases on to it, and a stop just past one eases back. A
    // flick glides as far as it wants, a slow reader is never pulled back, and
    // any fresh input takes over at once.
    let points: number[] = [];
    let settleTimer = 0;
    let settleAllowed = true;
    let heading = 0;
    const settle = () => {
      if (!settleAllowed || !heading || lenis.isScrolling || lenis.isStopped)
        return;
      const scroll = lenis.scroll;
      const ahead =
        heading > 0
          ? points.find((point) => point > scroll + 1)
          : points.findLast((point) => point < scroll - 1);
      const behind =
        heading > 0
          ? points.findLast((point) => point <= scroll)
          : points.find((point) => point >= scroll);
      const reach = window.innerHeight;
      const target =
        ahead !== undefined && Math.abs(ahead - scroll) <= reach * 0.16
          ? ahead
          : behind !== undefined && Math.abs(behind - scroll) <= reach * 0.05
            ? behind
            : undefined;
      if (target === undefined || Math.abs(target - scroll) < 2) return;
      lenis.scrollTo(target, {
        duration: 0.7,
        easing: (progress) => -(Math.cos(Math.PI * progress) - 1) / 2,
      });
    };
    const scheduleSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 160);
    };
    // Zooming or scrolling a nested control must never start a settle.
    const guardSettle = ({ event, deltaY }: VirtualScrollData) => {
      const nestedControl =
        event.target instanceof Element &&
        event.target.closest(nativeScrollSelector);
      settleAllowed = Boolean(deltaY) && !event.ctrlKey && !nestedControl;
      if (deltaY) heading = Math.sign(deltaY);
    };
    lenis.on("virtual-scroll", guardSettle);
    lenis.on("scroll", scheduleSettle);
    const updatePoints = () => {
      // Each screen settles at its top, less its scroll margin; one that grew
      // past a short screen settles at its end too, so no line is cut off.
      points = Array.from(
        document.querySelectorAll<HTMLElement>(".home-story > .story-screen"),
      ).flatMap((section) => {
        const margin = parseFloat(getComputedStyle(section).scrollMarginTop);
        const top =
          section.getBoundingClientRect().top + window.scrollY - margin;
        const extra = section.offsetHeight - (window.innerHeight - margin);
        return extra > 24 ? [top, top + extra] : [top];
      });
    };
    const observer = new ResizeObserver(updatePoints);
    for (const selector of [".home-story", ".mp-header"]) {
      const element = document.querySelector(selector);
      if (element) observer.observe(element);
    }
    ScrollTrigger.addEventListener("refresh", updatePoints);
    const refreshTimer = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
      updatePoints();
    }, 500);
    updatePoints();
    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(settleTimer);
      observer.disconnect();
      ScrollTrigger.removeEventListener("refresh", updatePoints);
      lenis.off("virtual-scroll", guardSettle);
      lenis.off("scroll", scheduleSettle);
    };
  }, [smooth, path]);
}
