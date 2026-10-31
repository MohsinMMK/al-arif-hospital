import { useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { InteractionMotion } from "./interaction-context";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ReadingProgress() {
  const enabled = useContext(InteractionMotion);
  const progress = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useGSAP(
    () => {
      const tween = gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: enabled ? 0.18 : true,
            invalidateOnRefresh: true,
          },
        },
      );
      // Filters and accordions change page length without a route or viewport change.
      const observer = new ResizeObserver(() => tween.scrollTrigger?.refresh());
      observer.observe(document.body);
      return () => observer.disconnect();
    },
    { dependencies: [enabled, pathname], revertOnUpdate: true },
  );
  return (
    <div ref={progress} className="mp-reading-progress" aria-hidden="true" />
  );
}

const checklist = [
  "Relevant reports & prescriptions",
  "A list of current medicines",
  "Questions for your clinician",
];
export function VisitChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <section className="mp-visit-checklist">
      <div>
        <h2>
          A little preparation.
          <br />
          <em>A calmer visit.</em>
        </h2>
        <p>Tick what’s ready. This list stays on this page.</p>
        <span role="status">
          {checked.length} of {checklist.length} ready
          {checked.length === checklist.length
            ? " — you’ve covered the basics."
            : ""}
        </span>
        <div className="mp-checklist-track" aria-hidden="true">
          <span
            style={{
              transform: `scaleX(${checked.length / checklist.length})`,
            }}
          />
        </div>
      </div>
      <div>
        {checklist.map((label) => (
          <label
            key={label}
            className={checked.includes(label) ? "is-checked" : ""}
          >
            <input
              type="checkbox"
              checked={checked.includes(label)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, label]
                    : current.filter((item) => item !== label),
                )
              }
            />
            <span className="mp-check-box" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
              >
                {/* Drawn from the short stroke so the tick writes itself in. */}
                <path d="M4 12l5 5L20 6" pathLength={1} />
              </svg>
            </span>
            <span>{label}</span>
          </label>
        ))}
        <Link className="mp-text-link" to="/site/visit#request">
          Plan an inquiry
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
