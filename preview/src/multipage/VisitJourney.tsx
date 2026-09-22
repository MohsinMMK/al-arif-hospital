import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationItem } from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

const transform = {
  o: { a: 0, k: 100 },
  r: { a: 0, k: 0 },
  p: { a: 0, k: [0, 0, 0] },
  a: { a: 0, k: [0, 0, 0] },
  s: { a: 0, k: [100, 100, 100] },
};
const line = {
  ty: "sh",
  ks: {
    a: 0,
    k: {
      i: [
        [0, 0],
        [0, 0],
      ],
      o: [
        [0, 0],
        [0, 0],
      ],
      v: [
        [55, 60],
        [665, 60],
      ],
      c: false,
    },
  },
  nm: "Visit path",
};
const color = [0.145, 0.298, 0.239, 1];
const journeyAnimation = {
  v: "5.12.2",
  fr: 30,
  ip: 0,
  op: 91,
  w: 720,
  h: 120,
  nm: "Al-Arif visit journey — original geometric motion",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Progress",
      sr: 1,
      ks: transform,
      ao: 0,
      shapes: [
        line,
        {
          ty: "st",
          c: { a: 0, k: color },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
          lc: 2,
          lj: 2,
        },
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              {
                t: 0,
                s: [0],
                e: [100],
                o: { x: [0.33], y: [0.33] },
                i: { x: [0.67], y: [0.67] },
              },
              { t: 90, s: [100] },
            ],
          },
          o: { a: 0, k: 0 },
          m: 1,
        },
      ],
      ip: 0,
      op: 91,
      st: 0,
      bm: 0,
    },
    ...[55, 360, 665].map((x, index) => ({
      ddd: 0,
      ind: index + 2,
      ty: 4,
      nm: `Step ${index + 1}`,
      sr: 1,
      ks: transform,
      ao: 0,
      shapes: [
        { ty: "el", p: { a: 0, k: [x, 60] }, s: { a: 0, k: [20, 20] } },
        { ty: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 } },
      ],
      ip: 0,
      op: 91,
      st: 0,
      bm: 0,
    })),
    {
      ddd: 0,
      ind: 5,
      ty: 4,
      nm: "Moving marker",
      sr: 1,
      ks: {
        ...transform,
        p: {
          a: 1,
          k: [
            {
              t: 0,
              s: [55, 60, 0],
              e: [665, 60, 0],
              o: { x: 0.33, y: 0.33 },
              i: { x: 0.67, y: 0.67 },
            },
            { t: 90, s: [665, 60, 0] },
          ],
        },
      },
      ao: 0,
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [38, 38] } },
        {
          ty: "st",
          c: { a: 0, k: color },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 2 },
        },
      ],
      ip: 0,
      op: 91,
      st: 0,
      bm: 0,
    },
  ],
};

export function VisitJourney({ motionEnabled }: { motionEnabled: boolean }) {
  const section = useRef<HTMLElement>(null);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = container.current;
    const target = section.current;
    if (!motionEnabled || !host || !target) return;
    let disposed = false;
    let animation: AnimationItem | undefined;
    let trigger: ScrollTrigger | undefined;
    const loadAnimation = () => {
      void import("lottie-web/build/player/lottie_light")
        .then(({ default: lottie }) => {
          if (disposed) return;
          animation = lottie.loadAnimation({
            container: host,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: structuredClone(journeyAnimation),
          });
          const ready = () => {
            if (disposed || !animation) return;
            const renderFrame = (progress: number) => {
              animation?.goToAndStop(progress * 90, true);
              host.dataset.frame = String(Math.round(progress * 90));
            };
            trigger = ScrollTrigger.create({
              trigger: target,
              start: "top 85%",
              end: "bottom 35%",
              onUpdate: (self) => renderFrame(self.progress),
            });
            renderFrame(trigger.progress);
            host.dataset.lottieReady = "true";
          };
          if (animation.isLoaded) ready();
          else animation.addEventListener("DOMLoaded", ready);
        })
        .catch((error: unknown) => {
          console.error(
            "Visit journey animation could not load; static steps remain available.",
            error,
          );
        });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          loadAnimation();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(target);
    return () => {
      disposed = true;
      observer.disconnect();
      trigger?.kill();
      animation?.destroy();
      delete host.dataset.lottieReady;
      delete host.dataset.frame;
    };
  }, [motionEnabled]);
  return (
    <section className="mp-journey mp-section" ref={section}>
      <div className="mp-section-heading">
        <h2>
          A visit, made
          <br />
          <em>a little simpler.</em>
        </h2>
        <p>
          From choosing your care to arriving at the hospital, know what happens
          next.
        </p>
      </div>
      <div className="mp-journey-line" aria-hidden="true">
        <div className="mp-journey-player" ref={container} />
        <svg className="mp-journey-static" viewBox="0 0 720 120" fill="none">
          <path d="M55 60H665" stroke="currentColor" strokeWidth="3" />
          {[55, 360, 665].map((x) => (
            <circle key={x} cx={x} cy="60" r="10" fill="currentColor" />
          ))}
          <circle
            cx="665"
            cy="60"
            r="19"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <ol className="mp-journey-steps">
        <li>
          <span>1</span>
          <h3>Find your care</h3>
          <p>Explore a service and the team associated with it.</p>
        </li>
        <li>
          <span>2</span>
          <h3>Speak with reception</h3>
          <p>Discuss a preferred day. The team confirms availability.</p>
        </li>
        <li>
          <span>3</span>
          <h3>Arrive prepared</h3>
          <p>Bring relevant reports and follow the team’s guidance.</p>
        </li>
      </ol>
    </section>
  );
}
