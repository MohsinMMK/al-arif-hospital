/* oxlint-disable react/only-export-components -- hooks sit beside the components they pair with */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
} from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import { InteractionMotion } from "./interaction-context";
import "./motion-ui.css";

type Vars = CSSProperties & Record<`--${string}`, string | number>;
type Pair = [number, number];

const finePointerQuery = "(hover: hover) and (pointer: fine)";
const classes = (...names: (string | undefined)[]) =>
  names.filter(Boolean).join(" ");
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function useFinePointer() {
  const [fine, setFine] = useState(
    () => window.matchMedia(finePointerQuery).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(finePointerQuery);
    const change = () => setFine(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return fine;
}

export type RollingPart =
  | { type: "digit"; digit: number }
  | { type: "text"; text: string };

export function splitRollingValue(value: string): RollingPart[] {
  const parts: RollingPart[] = [];
  for (const char of value) {
    const last = parts.at(-1);
    if (char >= "0" && char <= "9")
      parts.push({ type: "digit", digit: Number(char) });
    else if (last?.type === "text") last.text += char;
    else parts.push({ type: "text", text: char });
  }
  return parts;
}

const digits = "0123456789".split("");
export function RollingNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const enabled = useContext(InteractionMotion);
  const root = useRef<HTMLSpanElement>(null);
  const parts = useMemo(() => splitRollingValue(value), [value]);
  const skip = !enabled || typeof IntersectionObserver === "undefined";
  const [rolled, setRolled] = useState(skip);
  // Once motion is off the final value stays put, even if motion returns.
  if (skip && !rolled) setRolled(true);
  useEffect(() => {
    const element = root.current;
    if (rolled || !element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.intersectionRatio >= 0.49)) return;
        observer.disconnect();
        setRolled(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rolled]);
  let column = 0;
  return (
    <span
      ref={root}
      className={classes("mu-rolling", className)}
      data-rolled={rolled ? "" : undefined}
    >
      <span className="mu-sr">{value}</span>
      <span aria-hidden="true">
        {parts.map((part, index) => {
          const key = parts.length - index;
          if (part.type === "text") return <span key={key}>{part.text}</span>;
          const style: Vars = {
            "--mu-d": part.digit,
            "--mu-i": Math.min(column++, 3),
          };
          return (
            <span key={key} className="mu-rolling-digit" style={style}>
              <span className="mu-rolling-ghost">{part.digit}</span>
              <span className="mu-rolling-column">
                {digits.map((digit) => (
                  <span key={digit}>{digit}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

// Eases two values toward the pointer-derived goal on rAF, then back to rest.
function followPointer(
  element: HTMLElement,
  attribute: string,
  aim: (event: PointerEvent, rect: DOMRect, current: Pair) => Pair,
  write: (value: Pair) => void,
) {
  let current: Pair = [0, 0];
  let goal: Pair = [0, 0];
  let pointer: PointerEvent | null = null;
  let inside = false;
  let frame = 0;
  let previous = 0;
  const tick = (time: number) => {
    frame = 0;
    if (pointer) goal = aim(pointer, element.getBoundingClientRect(), current);
    pointer = null;
    const elapsed = previous ? Math.min(time - previous, 50) : 16.7;
    const ease = 1 - Math.pow(0.8, elapsed / 16.7);
    previous = time;
    const next: Pair = [
      current[0] + (goal[0] - current[0]) * ease,
      current[1] + (goal[1] - current[1]) * ease,
    ];
    const settled =
      Math.abs(goal[0] - next[0]) < 0.01 && Math.abs(goal[1] - next[1]) < 0.01;
    current = settled ? goal : next;
    write(current);
    if (!settled) frame = requestAnimationFrame(tick);
    else {
      previous = 0;
      if (!inside) element.removeAttribute(attribute);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    if (!inside) element.setAttribute(attribute, "active");
    inside = true;
    pointer = event;
    schedule();
  };
  const leave = () => {
    if (!inside) return;
    inside = false;
    pointer = null;
    goal = [0, 0];
    element.setAttribute(attribute, "rest");
    schedule();
  };
  element.addEventListener("pointerenter", move, { passive: true });
  element.addEventListener("pointermove", move, { passive: true });
  element.addEventListener("pointerleave", leave, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    element.removeEventListener("pointerenter", move);
    element.removeEventListener("pointermove", move);
    element.removeEventListener("pointerleave", leave);
    element.removeAttribute(attribute);
  };
}

export function useTilt<T extends HTMLElement>({
  max = 4,
}: { max?: number } = {}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const enabled = useContext(InteractionMotion);
  const fine = useFinePointer();
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled || !fine) return;
    const limit = clamp(max, 0, 6);
    const style = element.style;
    const stop = followPointer(
      element,
      "data-tilt",
      (event, rect) => {
        const x = rect.width ? clamp((event.clientX - rect.left) / rect.width, 0, 1) : 0.5;
        const y = rect.height ? clamp((event.clientY - rect.top) / rect.height, 0, 1) : 0.5;
        style.setProperty("--mu-lx", `${(x * rect.width).toFixed(1)}px`);
        style.setProperty("--mu-ly", `${(y * rect.height).toFixed(1)}px`);
        return [(0.5 - y) * 2 * limit, (x - 0.5) * 2 * limit];
      },
      ([rx, ry]) => {
        style.setProperty("--mu-rx", `${rx.toFixed(2)}deg`);
        style.setProperty("--mu-ry", `${ry.toFixed(2)}deg`);
      },
    );
    return () => {
      stop();
      for (const name of ["--mu-rx", "--mu-ry", "--mu-lx", "--mu-ly"])
        style.removeProperty(name);
    };
  }, [enabled, fine, max]);
  return ref;
}

export function TiltLight() {
  return <span className="mu-tilt-light" aria-hidden="true" />;
}

export function useMagnetic<T extends HTMLElement>(
  strength = 4,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const enabled = useContext(InteractionMotion);
  const fine = useFinePointer();
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled || !fine) return;
    const reach = clamp(strength, 0, 6);
    const style = element.style;
    const stop = followPointer(
      element,
      "data-magnetic",
      (event, rect, [x, y]) => {
        // The rect includes the current drift; measure from the resting centre.
        const halfWidth = rect.width / 2 || 1;
        const halfHeight = rect.height / 2 || 1;
        const dx = (event.clientX - (rect.left - x + halfWidth)) / halfWidth;
        const dy = (event.clientY - (rect.top - y + halfHeight)) / halfHeight;
        return [clamp(dx, -1, 1) * reach, clamp(dy, -1, 1) * reach * 0.6];
      },
      ([x, y]) => {
        style.setProperty("--mu-mx", `${x.toFixed(2)}px`);
        style.setProperty("--mu-my", `${y.toFixed(2)}px`);
      },
    );
    return () => {
      stop();
      style.removeProperty("--mu-mx");
      style.removeProperty("--mu-my");
    };
  }, [enabled, fine, strength]);
  return ref;
}

type ToastItem = { id: number; message: string; leaving: boolean };
const toastLimit = 3;
const toastDuration = 3600;
const toastGap = 10;
const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const enabled = useContext(InteractionMotion);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const [announcement, setAnnouncement] = useState("");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const deck = useRef<HTMLDivElement>(null);
  const lastId = useRef(0);
  const returnFocus = useRef<HTMLElement | null>(null);
  const removals = useRef(new Map<number, number>());
  if (!toasts.length && (hovered || focused)) {
    setHovered(false);
    setFocused(false);
  }
  const push = useCallback((message: string) => {
    lastId.current += 1;
    const id = lastId.current;
    setToasts((current) => {
      const live = current.filter((toast) => !toast.leaving);
      const dropped = new Set(
        live.slice(0, Math.max(0, live.length - toastLimit + 1)).map((toast) => toast.id),
      );
      return [
        ...current.map((toast) =>
          dropped.has(toast.id) ? { ...toast, leaving: true } : toast,
        ),
        { id, message, leaving: false },
      ];
    });
    // A trailing no-break space makes a repeated message announce again.
    setAnnouncement((previous) =>
      previous === message ? `${message} ` : message,
    );
  }, []);
  const dismiss = useCallback((id: number, fromUser: boolean) => {
    const node = deck.current;
    if (fromUser && node?.contains(document.activeElement)) {
      const next = Array.from(
        node.querySelectorAll<HTMLElement>(".mu-toast:not([data-leaving])"),
      )
        .filter((item) => item.dataset.id !== String(id))
        .at(-1)
        ?.querySelector<HTMLElement>(".mu-toast-dismiss");
      const target =
        next ?? (returnFocus.current?.isConnected ? returnFocus.current : null);
      if (target) target.focus({ preventScroll: true });
      else if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
    }
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id ? { ...toast, leaving: true } : toast,
      ),
    );
  }, []);
  const measure = useCallback((id: number, height: number) => {
    setHeights((current) =>
      current[id] === height ? current : { ...current, [id]: height },
    );
  }, []);
  useEffect(() => {
    const timers = removals.current;
    for (const toast of toasts) {
      if (!toast.leaving || timers.has(toast.id)) continue;
      const remove = () => {
        timers.delete(toast.id);
        setToasts((current) => current.filter((item) => item.id !== toast.id));
        setHeights((current) => {
          const next = { ...current };
          delete next[toast.id];
          return next;
        });
      };
      timers.set(toast.id, window.setTimeout(remove, enabled ? 240 : 0));
    }
  }, [toasts, enabled]);
  useEffect(() => {
    const timers = removals.current;
    return () => {
      for (const timer of timers.values()) window.clearTimeout(timer);
      timers.clear();
    };
  }, []);
  const place = (list: ToastItem[]) => {
    const spots = new Map<number, { index: number; offset: number }>();
    let offset = 0;
    list.forEach((toast, index) => {
      spots.set(toast.id, { index, offset });
      offset += (heights[toast.id] ?? 52) + toastGap;
    });
    return { spots, height: Math.max(0, offset - toastGap) };
  };
  const live = place(toasts.filter((toast) => !toast.leaving).reverse());
  const all = place([...toasts].reverse());
  const expanded = (hovered || focused) && live.spots.size > 0;
  const deckStyle: Vars = { "--mu-deck-h": `${live.height}px` };
  return (
    <ToastContext.Provider value={push}>
      {children}
      {/* No body to portal into while prerendering at build time. */}
      {typeof document !== "undefined" && document.body && createPortal(
        <div
          ref={deck}
          className="mu-toast-deck"
          data-motion={enabled ? "on" : "off"}
          data-expanded={expanded ? "" : undefined}
          style={deckStyle}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={(event) => {
            const from = event.relatedTarget;
            if (from instanceof HTMLElement && !event.currentTarget.contains(from))
              returnFocus.current = from;
            setFocused(true);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setFocused(false);
          }}
        >
          <div className="mu-sr" role="status" aria-live="polite" aria-atomic="true">
            {announcement}
          </div>
          {toasts.length > 0 && (
            <ol className="mu-toast-list" aria-label="Notifications">
              {toasts.map((toast) => {
                const spot = (toast.leaving ? all : live).spots.get(toast.id) ?? {
                  index: 0,
                  offset: 0,
                };
                return (
                  <ToastCard
                    key={toast.id}
                    toast={toast}
                    y={expanded ? -spot.offset : -spot.index * 10}
                    scale={expanded ? 1 : 1 - spot.index * 0.05}
                    layer={toastLimit + 1 - spot.index}
                    behind={!expanded && spot.index > 0}
                    paused={hovered || focused}
                    onDismiss={dismiss}
                    onMeasure={measure}
                  />
                );
              })}
            </ol>
          )}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  y,
  scale,
  layer,
  behind,
  paused,
  onDismiss,
  onMeasure,
}: {
  toast: ToastItem;
  y: number;
  scale: number;
  layer: number;
  behind: boolean;
  paused: boolean;
  onDismiss: (id: number, fromUser: boolean) => void;
  onMeasure: (id: number, height: number) => void;
}) {
  const item = useRef<HTMLLIElement>(null);
  const remaining = useRef(toastDuration);
  useLayoutEffect(() => {
    const node = item.current;
    if (!node) return;
    const update = () => onMeasure(toast.id, node.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [toast.id, onMeasure]);
  useEffect(() => {
    if (paused || toast.leaving) return;
    const started = performance.now();
    const timer = window.setTimeout(
      () => onDismiss(toast.id, false),
      Math.max(remaining.current, 1000),
    );
    return () => {
      window.clearTimeout(timer);
      remaining.current -= performance.now() - started;
    };
  }, [paused, toast.leaving, toast.id, onDismiss]);
  const style: Vars = { "--mu-y": `${y}px`, "--mu-s": scale, zIndex: layer };
  return (
    <li
      ref={item}
      className="mu-toast"
      data-id={toast.id}
      data-behind={behind ? "" : undefined}
      data-leaving={toast.leaving ? "" : undefined}
      style={style}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.stopPropagation();
        onDismiss(toast.id, true);
      }}
    >
      <div className="mu-toast-card">
        <p className="mu-toast-message">{toast.message}</p>
        <button
          type="button"
          className="mu-toast-dismiss"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(toast.id, true)}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export function useStepPlayer({
  count,
  index,
  onChange,
  interval = 6000,
}: {
  count: number;
  index: number;
  onChange: (index: number) => void;
  interval?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [expected, setExpected] = useState(index);
  const change = useRef(onChange);
  useEffect(() => {
    change.current = onChange;
  }, [onChange]);
  // Any index the player did not request is a manual pick: stop playing.
  if (index !== expected) {
    setExpected(index);
    if (playing) setPlaying(false);
  }
  useEffect(() => {
    const update = () => {
      setHidden(document.hidden);
      if (!document.hidden) setRun((value) => value + 1);
    };
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!playing || hidden) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(index + 1, count - 1);
      setExpected(next);
      change.current(next);
      if (next >= count - 1) setPlaying(false);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [playing, hidden, index, count, interval, run]);
  const toggle = useCallback(() => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (index >= count - 1) {
      setExpected(0);
      change.current(0);
    }
    setRun((value) => value + 1);
    setPlaying(true);
  }, [playing, index, count]);
  const stop = useCallback(() => setPlaying(false), []);
  return { playing, toggle, stop, progressKey: `${index}-${run}` };
}

/** A filling bar for the current step. `paused` holds the fill where it is, and
 * `onEnd` fires when a full run completes, so the bar itself can pace a player. */
export function StepProgress({
  playing,
  paused = false,
  interval = 6000,
  className,
  onEnd,
}: {
  playing: boolean;
  paused?: boolean;
  interval?: number;
  className?: string;
  onEnd?: () => void;
}) {
  const style: Vars = { "--mu-duration": `${interval}ms` };
  return (
    <span
      className={classes("mu-step-progress", className)}
      data-playing={playing ? "" : undefined}
      data-paused={paused ? "" : undefined}
      style={style}
      aria-hidden="true"
      onAnimationEnd={onEnd}
    />
  );
}

export function Scrubber({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: string[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  const id = useId();
  if (!options.length) return null;
  const last = options.length - 1;
  const current = clamp(Math.round(value), 0, last);
  const style: Vars = { "--mu-p": last ? current / last : 0 };
  return (
    <div className={classes("mu-scrubber", className)} style={style}>
      <label className="mu-scrubber-label" htmlFor={id}>
        {label}
      </label>
      <div className="mu-scrubber-ruler">
        <span className="mu-scrubber-rail" aria-hidden="true">
          {options.map((option, index) => {
            const tick: Vars = { "--mu-t": last ? index / last : 0 };
            return (
              <span
                key={`${index}-${option}`}
                className="mu-scrubber-tick"
                data-passed={index <= current ? "" : undefined}
                style={tick}
              />
            );
          })}
          <span className="mu-scrubber-thumb">
            <span className="mu-scrubber-value">{options[current]}</span>
          </span>
        </span>
        <input
          id={id}
          type="range"
          min={0}
          max={last}
          step={1}
          value={current}
          aria-valuetext={options[current]}
          data-lenis-prevent-touch=""
          onChange={(event) => onChange(Number(event.currentTarget.value))}
        />
      </div>
      <div className="mu-scrubber-ends" aria-hidden="true">
        <span>{options[0]}</span>
        {last > 0 && <span>{options[last]}</span>}
      </div>
    </div>
  );
}

export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  const enabled = useContext(InteractionMotion);
  useLayoutEffect(() => {
    const element = ref.current;
    const state = element?.getAttribute("data-reveal");
    if (!element || state === "run" || state === "done") return;
    const mark = (next: string) => element.setAttribute("data-reveal", next);
    if (!enabled || typeof IntersectionObserver === "undefined") {
      mark("done");
      return;
    }
    mark("pending");
    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        mark("run");
        timer = window.setTimeout(() => mark("done"), 1100);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      if (element.getAttribute("data-reveal") === "pending")
        element.removeAttribute("data-reveal");
      else mark("done");
    };
  }, [enabled]);
  return ref;
}

export type SplitPart = { label: string; detail?: string; value: number };

/** A proportional bar; the legend underneath carries the same figures as text. */
export function SplitBar({
  caption,
  parts,
  unit,
  className,
}: {
  caption: string;
  parts: SplitPart[];
  unit: string;
  className?: string;
}) {
  const reveal = useReveal<HTMLElement>();
  return (
    <figure ref={reveal} className={classes("mu-split", className)}>
      <figcaption>{caption}</figcaption>
      <div className="mu-split-bar" aria-hidden="true">
        {parts.map((part, index) => {
          const style: Vars = { "--mu-share": part.value, "--mu-i": index };
          return (
            <span
              key={part.label}
              className="mu-split-part"
              data-part={index}
              style={style}
            >
              <b>{part.value}</b>
            </span>
          );
        })}
      </div>
      <dl className="mu-split-legend">
        {parts.map((part, index) => {
          const style: Vars = { "--mu-i": index };
          return (
            <div key={part.label} data-part={index} style={style}>
              <dt>
                {part.label}
                {part.detail && <small>{part.detail}</small>}
              </dt>
              <dd>
                {part.value} {unit}
              </dd>
            </div>
          );
        })}
      </dl>
    </figure>
  );
}

/** A label that rests inside the control and floats up on focus or once filled. */
export function FloatField({
  id,
  label,
  filled,
  invalid = false,
  className,
  children,
}: {
  id: string;
  label: string;
  filled: boolean;
  invalid?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={classes("mu-float", className)}
      data-filled={filled ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
    >
      <label className="mu-float-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

export type SwapItem = {
  key: string;
  title: string;
  meta?: string;
  card: ReactNode;
};
const pad = (value: number) => String(value).padStart(2, "0");

/** Tabs beside a stacked deck; the card leaving the front tucks in behind the rest. */
export function CardSwap({
  label,
  items,
  nextLabel,
  className,
}: {
  label: string;
  items: SwapItem[];
  nextLabel: string;
  className?: string;
}) {
  const enabled = useContext(InteractionMotion);
  const id = useId();
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // With motion off no animation ends, so a tuck in flight would never clear.
  if (!enabled && leaving.length) setLeaving([]);
  const count = items.length;
  if (!count) return null;
  const current = Math.min(active, count - 1);
  const show = (index: number) => {
    const next = ((index % count) + count) % count;
    if (next === current) return next;
    // Clear the last announcement, so the next press always changes the live region.
    setAnnouncement("");
    const from = items[current].key;
    const to = items[next].key;
    if (enabled)
      setLeaving((list) => [
        ...list.filter((key) => key !== from && key !== to),
        from,
      ]);
    setActive(next);
    return next;
  };
  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowDown: current + 1,
      ArrowRight: current + 1,
      ArrowUp: current - 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    tabs.current[show(targets[event.key])]?.focus();
  };
  return (
    <div className={classes("mu-swap", className)}>
      <div
        className="mu-swap-tabs"
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={moveFocus}
      >
        {items.map((item, index) => (
          <button
            key={item.key}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={index === current}
            aria-controls={`${id}-panel`}
            tabIndex={index === current ? 0 : -1}
            onClick={() => show(index)}
          >
            <span className="mu-swap-index" aria-hidden="true">
              {pad(index + 1)}
            </span>
            <span className="mu-swap-title">
              {item.title}
              {item.meta && <small>{item.meta}</small>}
            </span>
          </button>
        ))}
      </div>
      <div className="mu-swap-stage">
        <div
          id={`${id}-panel`}
          className="mu-swap-deck"
          role="tabpanel"
          aria-labelledby={`${id}-tab-${current}`}
        >
          {items.map((item, index) => {
            const position = (index - current + count) % count;
            const front = position === 0;
            const style: Vars = {
              "--mu-pos": position,
              zIndex: count - position,
            };
            return (
              <div
                key={item.key}
                className="mu-swap-card"
                data-leaving={leaving.includes(item.key) ? "" : undefined}
                style={style}
                inert={!front}
                aria-hidden={front ? undefined : true}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return;
                  setLeaving((list) => list.filter((key) => key !== item.key));
                }}
              >
                {item.card}
              </div>
            );
          })}
        </div>
        <div className="mu-swap-controls">
          <span aria-hidden="true">
            {pad(current + 1)} / {pad(count)}
          </span>
          <button
            type="button"
            className="mu-swap-next"
            onClick={() => {
              const next = show(current + 1);
              setAnnouncement(`${next + 1} of ${count}: ${items[next].title}`);
            }}
          >
            {nextLabel} <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="mu-sr" role="status" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </div>
  );
}

export type Segment = {
  id: string;
  label: string;
  detail?: string;
  icon?: ReactNode;
};

/** In-page section links on a pill whose trailing edge lags, so it stretches as it moves. */
export function LiquidSegments({
  label,
  items,
  active,
  onSelect,
  className,
}: {
  label: string;
  items: Segment[];
  active: string;
  onSelect: (id: string, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  const index = Math.max(
    0,
    items.findIndex((item) => item.id === active),
  );
  const [shown, setShown] = useState(index);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  if (index !== shown) {
    setShown(index);
    setDirection(index > shown ? "forward" : "back");
  }
  if (!items.length) return null;
  const style: Vars = { "--mu-count": items.length, "--mu-index": index };
  return (
    <nav
      aria-label={label}
      className={classes("mu-segments", className)}
      data-dir={direction}
      style={style}
    >
      <span className="mu-segments-pill" aria-hidden="true" />
      {items.map((item, itemIndex) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={itemIndex === index ? "location" : undefined}
          onClick={(event) => onSelect(item.id, event)}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.detail && <small>{item.detail}</small>}
        </a>
      ))}
    </nav>
  );
}
