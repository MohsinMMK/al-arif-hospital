import { useContext, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog } from "radix-ui";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { pageCatalog } from "./data";

import { InteractionMotion } from "./interaction-context";
gsap.registerPlugin(useGSAP, ScrollTrigger);

type Vars = CSSProperties & Record<`--${string}`, string | number>;

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

const quickPages = pageCatalog.filter((page) =>
  [
    "Department",
    "Service detail",
    "Doctor profile",
    "Education",
    "Patient information",
    "Research",
    "Institution",
    "Stories",
    "Story",
    "Community",
    "Pharmacy",
  ].includes(page.kind),
);
export function QuickFind() {
  const enabled = useContext(InteractionMotion);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const results = quickPages.filter((page) =>
    `${page.title} ${page.description}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const updateOpen = (value: boolean) => {
    setOpen(value);
    if (!value) setQuery("");
  };
  // Arrow keys step between the search field and the result links; Tab is untouched.
  const moveThroughResults = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const down = event.key === "ArrowDown";
    if (!down && event.key !== "ArrowUp") return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const links = Array.from(
      list.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
    );
    const fromInput = event.target === input.current;
    const index =
      event.target instanceof HTMLAnchorElement
        ? links.indexOf(event.target)
        : -1;
    if (index < 0 && !(fromInput && down && links.length)) return;
    event.preventDefault();
    const next = fromInput
      ? links[0]
      : down
        ? links[index + 1]
        : (links[index - 1] ?? input.current);
    next?.focus();
  };
  return (
    <Dialog.Root open={open} onOpenChange={updateOpen}>
      <Dialog.Trigger asChild>
        <button
          className="mp-find-trigger"
          aria-label="Search hospital pages"
          title="Search hospital pages"
        >
          <Search size={19} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="mp-search-overlay" />
        <Dialog.Content
          className="mp-search-dialog"
          data-motion={enabled ? "on" : "off"}
          onKeyDown={moveThroughResults}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            input.current?.focus();
          }}
        >
          <div className="mp-search-heading">
            <Dialog.Title>Where would you like to go?</Dialog.Title>
            <Dialog.Close aria-label="Close search">
              <X size={21} />
            </Dialog.Close>
          </div>
          <Dialog.Description>
            Find a service, doctor or visiting information.
          </Dialog.Description>
          <div className="mp-search">
            <Search size={18} />
            <Input
              ref={input}
              aria-label="Search hospital"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Unani, a doctor’s name, or visit…"
            />
          </div>
          <div ref={list} className="mp-quick-results">
            <p role="status">
              {results.length} {results.length === 1 ? "page" : "pages"} found
            </p>
            {results.length ? (
              results.map((page, index) => {
                const style: Vars = { "--mp-i": Math.min(index, 8) };
                return (
                  <Link
                    key={page.path}
                    to={page.path}
                    style={style}
                    onClick={() => updateOpen(false)}
                  >
                    <span>
                      {page.title}
                      <small>{page.kind}</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </Link>
                );
              })
            ) : (
              <div className="mp-no-results">
                <p>No match. Try a service name or browse all care.</p>
                <Link to="/site/services" onClick={() => updateOpen(false)}>
                  Explore all services <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </div>
          <div className="mp-search-tip">
            Arrows or Tab to move · Enter to open · Esc to close
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
        <Link className="mp-text-link" to="/site/request">
          Plan an inquiry
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
