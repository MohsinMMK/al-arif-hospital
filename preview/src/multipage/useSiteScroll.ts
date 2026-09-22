import { useEffect } from "react";
import Lenis, { type VirtualScrollData } from "lenis";
import Snap from "lenis/snap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

/** One shared scroll driver for every page; chapter settling stays on the homepage. */
export function useSiteScroll(enabled: boolean, path: string) {
  useEffect(() => {
    if (!enabled) return;
    const media = gsap.matchMedia();
    media.add(
      {
        all: "all",
        compact: "(max-width:800px)",
        chapters: "(min-width:1101px) and (min-height:800px)",
      },
      (context) => {
        const headerHeight = () =>
          document.querySelector(".mp-header")?.getBoundingClientRect()
            .height ?? 90;
        const nativeScrollSelector =
          ".mp-search-dialog, .mp-search-overlay, .mp-header nav, .mp-menu-backdrop, select, textarea";
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
              "#general-care, #unani-care, .story-doctors",
            ),
          ).map((section) =>
            snap.add(
              section.getBoundingClientRect().top +
                window.scrollY -
                headerHeight(),
            ),
          );
        };
        const tick = (seconds: number) => lenis.raf(seconds * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
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
          gsap.ticker.remove(tick);
          lenis.off("scroll", ScrollTrigger.update);
          lenis.stop();
          lenis.destroy();
          gsap.ticker.lagSmoothing(500, 33);
        };
      },
    );
    return () => media.revert();
  }, [enabled, path]);
}
