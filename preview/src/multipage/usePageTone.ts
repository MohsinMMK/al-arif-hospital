import { useEffect } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Band = { top: number; bottom: number; tone: number[] };

/** How many points of the screen's middle stretch are averaged into the colour. */
const samples = 32;

let canvas: CanvasRenderingContext2D | null | undefined;

/** Reads any CSS colour as [red, green, blue]. */
function toRgb(colour: string) {
  canvas ??= document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true });
  if (!canvas || !colour.trim()) return undefined;
  canvas.clearRect(0, 0, 1, 1);
  canvas.fillStyle = colour.trim();
  canvas.fillRect(0, 0, 1, 1);
  const [red, green, blue] = canvas.getImageData(0, 0, 1, 1).data;
  return [red, green, blue];
}

/**
 * Paints the whole page one colour that follows the scroll. Each light band
 * (`data-band`) names its colour in `--band-tone` and stops painting itself, so
 * where two bands meet there is no edge: the colour shifts as the boundary
 * passes through the middle of the screen. The footer keeps the tone above it.
 */
export function usePageTone(root: RefObject<HTMLElement | null>, path: string) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    let bands: Band[] = [];
    let base = [252, 252, 247];
    let end = Infinity;
    let frame = 0;
    let painted = "";
    let cancelled = false;
    // The innermost band wins where bands nest.
    const toneAt = (y: number) => {
      for (let index = bands.length - 1; index >= 0; index--) {
        const band = bands[index];
        if (y >= band.top && y < band.bottom) return band.tone;
      }
      return base;
    };
    // Averages the tones across the middle 60% of the screen, so a boundary
    // fades in over a stretch of scrolling rather than switching at one line.
    const paint = () => {
      frame = 0;
      const middle = window.scrollY + window.innerHeight / 2;
      const reach = window.innerHeight * 0.3;
      const sum = [0, 0, 0];
      for (let index = 0; index < samples; index++) {
        const y = middle - reach + (2 * reach * (index + 0.5)) / samples;
        const tone = toneAt(Math.min(y, end));
        for (let channel = 0; channel < 3; channel++)
          sum[channel] += tone[channel];
      }
      const colour = `rgb(${sum.map((value) => Math.round(value / samples)).join(" ")})`;
      if (colour !== painted) page.style.backgroundColor = painted = colour;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      if (cancelled) return;
      base = toRgb(getComputedStyle(page).getPropertyValue("--paper")) ?? base;
      bands = Array.from(
        page.querySelectorAll<HTMLElement>("[data-band]"),
      ).flatMap((band) => {
        const tone = toRgb(
          getComputedStyle(band).getPropertyValue("--band-tone"),
        );
        const box = band.getBoundingClientRect();
        if (!tone || !box.height) return [];
        const top = box.top + window.scrollY;
        return [{ top, bottom: top + box.height, tone }];
      });
      const footer = page.querySelector(".mp-footer");
      end = footer
        ? footer.getBoundingClientRect().top + window.scrollY - 1
        : Infinity;
      paint();
    };
    page.setAttribute("data-blend", "");
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(page);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    ScrollTrigger.addEventListener("refresh", measure);
    void document.fonts.ready.then(measure);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      ScrollTrigger.removeEventListener("refresh", measure);
      page.removeAttribute("data-blend");
      page.style.backgroundColor = "";
    };
  }, [root, path]);
}
