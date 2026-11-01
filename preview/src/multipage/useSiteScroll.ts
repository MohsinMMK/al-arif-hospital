import { useEffect, useRef } from "react";
import type { MouseEvent, RefObject } from "react";
import Lenis, { type VirtualScrollData } from "lenis";
import Snap from "lenis/snap";
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

/** One shared scroll driver for every page; chapter settling stays on the homepage. */
export function useSiteScroll(enabled: boolean, path: string) {
  // The driver lives as long as motion is on, across every page.
  useEffect(() => {
    if (!enabled) return;
    let pinchGesture = false;
    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.75,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchInertiaExponent: 1.5,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
      anchors: { duration: 0.8 },
      prevent: (element) => Boolean(element.closest(nativeScrollSelector)),
      virtualScroll: ({ event }) => {
        if (!("touches" in event)) return true;
        if (event.type === "touchstart" && event.touches.length === 1)
          pinchGesture = false;
        if (event.touches.length > 1) pinchGesture = true;
        // Keep the release of a pinch native too; resume on the next single-finger gesture.
        return !pinchGesture;
      },
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
  }, [enabled]);
  // Each page, and each change of layout, measures afresh.
  useEffect(() => {
    const lenis = activeLenis;
    if (!enabled || !lenis) return;
    const media = gsap.matchMedia();
    media.add(
      {
        all: "all",
        compact: "(max-width:800px)",
        chapters: "(min-width:1101px) and (min-height:800px)",
      },
      (context) => {
        // Stopping and starting drops any glide still running from the last
        // page, and resizing measures the new one, as a fresh driver would.
        lenis.stop();
        lenis.start();
        lenis.resize();
        // Let wheel momentum subside before gently correcting the final position.
        // Zero velocity at both ends avoids a sudden tug when reversing a small overshoot.
        const snap =
          path === "/site" &&
          (context.conditions?.chapters || context.conditions?.compact)
            ? new Snap(lenis, {
                type: "proximity",
                distanceThreshold: "35%",
                debounce: 420,
                duration: 0.9,
                easing: (progress) => (1 - Math.cos(Math.PI * progress)) / 2,
              })
            : undefined;
        // A held finger, tap, pinch or nested control must never start a section snap.
        const guardSnap = ({ event, deltaY }: VirtualScrollData) => {
          const nestedControl =
            event.target instanceof Element &&
            event.target.closest(nativeScrollSelector);
          if (
            event.type === "touchstart" ||
            event.type === "touchmove" ||
            !deltaY ||
            event.ctrlKey ||
            nestedControl
          )
            snap?.stop();
          else snap?.start();
        };
        lenis.on("virtual-scroll", guardSnap);
        let removePoints: (() => void)[] = [];
        const updatePoints = () => {
          removePoints.forEach((remove) => remove());
          if (!snap) return;
          removePoints = Array.from(
            document.querySelectorAll<HTMLElement>(
              "#general-care, #unani-care, #departments, .story-doctors",
            ),
          ).map((section) => snap.add(sectionTop(section)));
        };
        const observer = new ResizeObserver(updatePoints);
        for (const selector of [
          ".story-opening",
          ".mp-header",
          "#general-care",
          "#unani-care",
        ]) {
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
          observer.disconnect();
          ScrollTrigger.removeEventListener("refresh", updatePoints);
          removePoints.forEach((remove) => remove());
          snap?.stop();
          snap?.destroy();
          lenis.off("virtual-scroll", guardSnap);
        };
      },
    );
    return () => media.revert();
  }, [enabled, path]);
}
