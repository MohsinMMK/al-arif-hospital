import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import { Link } from "react-router-dom";
import { ArrowButton } from "@/components/ui/arrow-button";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Pause,
  Play,
  X,
} from "lucide-react";
import { DoctorSpotlight } from "@/components/react-bits/DoctorSpotlight";
import type {
  FlexCarouselHandle,
  FlexCarouselItem,
} from "@/components/react-bits/FlexCarousel";
import { InteractionMotion } from "./interaction-context";
import { doctorPages, servicePages, type DoctorProfile } from "./data";

// WebGL and its card art load only as the row approaches the viewport.
const FlexCarousel = lazy(() => import("@/components/react-bits/FlexCarousel"));

type Wing = (typeof servicePages)[number]["wing"];

const tones: Record<Wing, { base: string; arch: string }> = {
  "General hospital": { base: "#eee9db", arch: "#f7f4eb" },
  "Unani care": { base: "#dce7cf", arch: "#ebf1e3" },
};

const wingOf = (doctor: DoctorProfile): Wing =>
  servicePages.find((service) => service.slug === doctor.serviceSlugs[0])
    ?.wing ?? "General hospital";

const initialsOf = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

const wrapLines = (
  context: CanvasRenderingContext2D,
  text: string,
  width: number,
) => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && context.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
};

/**
 * Draws a portrait card: wing label, an arched window, a monogram and the name.
 * Content keeps a wide margin because the carousel crops and drifts each image.
 */
const drawCard = (doctor: DoctorProfile) => {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  const context = canvas.getContext("2d");
  if (!context) return Promise.reject(new Error("Canvas is unavailable"));
  const wing = wingOf(doctor);
  const tone = tones[wing];
  context.fillStyle = tone.base;
  context.fillRect(0, 0, 600, 800);

  context.textAlign = "center";
  context.fillStyle = "#4c6151";
  context.font = "600 22px Manrope, sans-serif";
  context.letterSpacing = "3px";
  context.fillText(wing.toUpperCase(), 300, 118);
  context.letterSpacing = "0px";

  context.fillStyle = tone.arch;
  context.beginPath();
  context.moveTo(84, 800);
  context.arc(300, 392, 216, Math.PI, 0);
  context.lineTo(516, 800);
  context.closePath();
  context.fill();

  context.fillStyle = "#254c3d";
  context.beginPath();
  context.arc(300, 392, 118, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#fffdf5";
  context.textBaseline = "middle";
  context.font = "400 92px Bitter, serif";
  context.fillText(initialsOf(doctor.name), 300, 398);

  context.textBaseline = "alphabetic";
  context.fillStyle = "#254c3d";
  let size = 48;
  let lines: string[];
  do {
    size -= 4;
    context.font = `400 ${size}px Bitter, serif`;
    lines = wrapLines(context, doctor.name, 380);
  } while (lines.length > 2 && size > 32);
  lines.forEach((line, index) =>
    context.fillText(line, 300, 610 + index * (size + 10)),
  );

  return new Promise<string>((resolve, reject) =>
    canvas.toBlob((blob) =>
      blob
        ? resolve(URL.createObjectURL(blob))
        : reject(new Error("Card could not be drawn")),
    ),
  );
};

/** On a phone the lens follows the narrow width, so it widens to keep the centred card flat. */
const compactQuery = "(max-width: 640px)";
/** Wide rows have room for the details beside the opened card; narrower ones stack them under it. */
const besideQuery = "(min-width: 1100px)";
const besideGap = 48;
const tuckGap = 20;
/** Matches the details' slide back behind the card in home-story.css. */
const retractMs = 340;

function useMedia(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const change = () => setMatches(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, [query]);
  return matches;
}

/**
 * Where the opened card settles and where its details sit. The growth mirrors
 * FlexCarousel's focus scale for portrait cards: at most 1.3x and 84% of the row height.
 */
const openLayout = (
  width: number,
  height: number,
  cardHeight: number,
  beside: boolean,
) => {
  const cardH = cardHeight * height;
  const scale = Math.max(
    1,
    Math.min(1.3, (height * 0.84) / cardH, (width * 0.92) / (cardH * 0.75)),
  );
  const openW = cardH * 0.75 * scale;
  const openH = cardH * scale;
  if (beside) {
    const panel = Math.min(560, width - openW - besideGap - 24);
    const shift = (besideGap + panel) / 2;
    return {
      offset: [-shift / width, 0] as [number, number],
      style: {
        "--doctor-details-left": `${width / 2 - shift + openW / 2 + besideGap}px`,
        "--doctor-details-width": `${panel}px`,
        "--doctor-details-gap": `${besideGap}px`,
        "--doctor-details-card-h": `${openH}px`,
      } as CSSProperties,
    };
  }
  const lift = 0.08;
  const below = height / 2 + lift * height - openH / 2;
  return {
    offset: [0, -lift] as [number, number],
    style: {
      "--doctor-details-tuck": `${Math.max(0, below - tuckGap)}px`,
      "--doctor-details-gap": `${tuckGap}px`,
      "--doctor-details-card-w": `${openW}px`,
    } as CSSProperties,
  };
};

const pad = (value: number) => String(value).padStart(2, "0");

type DetailsProps = {
  index: number;
  shown: boolean;
  headingRef: Ref<HTMLHeadingElement>;
  onStep: (delta: number) => void;
  onClose: () => void;
};

/**
 * The opened doctor's key facts, beside the zoomed card on wide screens and under it otherwise.
 * Hidden, they stay mounted behind the card so a focused control keeps its focus between doctors.
 */
function DoctorDetails({
  index,
  shown,
  headingRef,
  onStep,
  onClose,
}: DetailsProps) {
  const doctor = doctorPages[index];
  const wing = wingOf(doctor);
  return (
    <section
      className="doctor-details"
      aria-labelledby="doctor-details-name"
      data-state={shown ? "in" : "out"}
      data-lenis-prevent
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.stopPropagation();
        onClose();
      }}
    >
      <div className="doctor-details-bar">
        <span
          className="doctor-details-wing"
          data-wing={wing === "Unani care" ? "unani" : "general"}
        >
          {wing}
        </span>
        <span className="doctor-details-count" aria-hidden="true">
          {pad(index + 1)} / {pad(doctorPages.length)}
        </span>
        <div className="doctor-details-controls">
          <button
            type="button"
            aria-label="Previous doctor"
            onClick={() => onStep(-1)}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next doctor"
            onClick={() => onStep(1)}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Close details" onClick={onClose}>
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {`${doctor.name}, ${index + 1} of ${doctorPages.length}`}
      </p>
      <div key={doctor.slug} className="doctor-details-body">
        <h3 id="doctor-details-name" ref={headingRef} tabIndex={-1}>
          {doctor.name}
        </h3>
        <p className="doctor-details-role">
          {[doctor.honorific, doctor.designation].filter(Boolean).join(" · ")}
        </p>
        <ul className="doctor-details-facts">
          <li>
            <CalendarDays size={16} aria-hidden="true" />
            <span>
              <span className="doctor-details-label">OPD</span>
              {doctor.opdDays} · {doctor.opdHours}
            </span>
          </li>
          <li>
            <GraduationCap size={16} aria-hidden="true" />
            <span>
              <span className="doctor-details-label">Qualifications</span>
              {doctor.degrees}
            </span>
          </li>
          <li>
            <Building2 size={16} aria-hidden="true" />
            <span>
              <span className="doctor-details-label">Department</span>
              {doctor.department}
            </span>
          </li>
        </ul>
        <p className="doctor-details-label doctor-details-heading">
          Areas of care
        </p>
        <ul className="doctor-details-focus">
          {doctor.focus.slice(0, 3).map((item) => (
            <li key={item}>
              <Check size={14} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="doctor-details-actions">
          <ArrowButton
            size="sm"
            render={<Link to={`/site/doctors/${doctor.slug}`} />}
          >
            View full profile
          </ArrowButton>
          <Link
            to={`/site/visit?service=${doctor.serviceSlugs[0]}#request`}
            className="doctor-details-secondary"
          >
            Ask about a consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** A single sliding row of clinicians for the homepage; the full roster lives on the Doctors page. */
export function DoctorRow() {
  const enabled = useContext(InteractionMotion);
  const compact = useMedia(compactQuery);
  const beside = useMedia(besideQuery);
  const row = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const controls = useRef<FlexCarouselHandle>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusHeading = useRef(false);
  const [near, setNear] = useState(false);
  const [items, setItems] = useState<FlexCarouselItem[]>();
  const [unsupported, setUnsupported] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  /** The doctor the row is moving to while the details are tucked away. */
  const travelling = useRef<number | null>(null);
  const retract = useRef(0);
  const [size, setSize] = useState<{ width: number; height: number }>();
  const cardHeight = compact ? 0.5 : 0.56;

  useEffect(() => {
    const node = row.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "900px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [unsupported]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    let urls: string[] = [];
    const revoke = () => urls.forEach((url) => URL.revokeObjectURL(url));
    void (async () => {
      await Promise.all([
        document.fonts.load("400 92px Bitter"),
        document.fonts.load("600 22px Manrope"),
      ]).catch(() => undefined);
      try {
        urls = await Promise.all(doctorPages.map(drawCard));
      } catch {
        if (!cancelled) setUnsupported(true);
        return;
      }
      if (cancelled) {
        revoke();
        return;
      }
      setItems(
        doctorPages.map((doctor, index) => ({
          src: urls[index],
          alt: `${doctor.name}, ${doctor.role}`,
          title: doctor.role,
          subtitle: `OPD ${doctor.opdDays}`,
        })),
      );
    })();
    return () => {
      cancelled = true;
      revoke();
    };
  }, [near]);

  // A keyboard open moves focus to the details so they are read straight away.
  useEffect(() => {
    if (open === null || !focusHeading.current) return;
    focusHeading.current = false;
    heading.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => () => window.clearTimeout(retract.current), []);

  if (unsupported) {
    return (
      <div className="doctor-row-fallback" data-lenis-prevent-touch>
        {doctorPages.map((doctor) => (
          <DoctorSpotlight key={doctor.slug} doctor={doctor} />
        ))}
      </div>
    );
  }

  const carousel = () =>
    row.current?.querySelector<HTMLElement>(".flex-carousel") ?? null;
  const layout = size
    ? openLayout(size.width, size.height, cardHeight, beside)
    : undefined;

  /** Slides the details back behind the card, then carries on. Held still, it carries on at once. */
  const tuckAway = (then: () => void) => {
    window.clearTimeout(retract.current);
    setShown(false);
    if (!enabled) {
      retract.current = 0;
      then();
      return;
    }
    retract.current = window.setTimeout(() => {
      retract.current = 0;
      then();
    }, retractMs);
  };

  const changeOpen = (index: number | null) => {
    travelling.current = null;
    if (index === null) {
      tuckAway(() => setOpen(null));
      return;
    }
    window.clearTimeout(retract.current);
    retract.current = 0;
    if (open === null) {
      focusHeading.current = carousel()?.matches(":focus-visible") ?? false;
    }
    setOpen(index);
    setShown(true);
  };

  // The details tuck behind the card, the card shrinks back into the row, the row moves on
  // and the next card opens with its details. Steps taken on the way retarget the move.
  const step = (delta: number) => {
    const from = travelling.current ?? open;
    if (from === null) return;
    const next = (from + delta + doctorPages.length) % doctorPages.length;
    if (!enabled) {
      setOpen(next);
      controls.current?.open(next);
      return;
    }
    travelling.current = next;
    if (retract.current) return;
    if (!shown) {
      controls.current?.open(next);
      return;
    }
    tuckAway(() => {
      if (travelling.current !== null) {
        controls.current?.open(travelling.current);
      }
    });
  };

  const close = () => {
    carousel()?.focus({ preventScroll: true });
    travelling.current = null;
    tuckAway(() => {
      controls.current?.close();
      setOpen(null);
    });
  };

  return (
    <div
      ref={row}
      className="doctor-row"
      data-lenis-prevent-touch
      data-open={open === null ? undefined : ""}
      style={layout?.style}
    >
      <div ref={stage} className="doctor-row-stage">
        {items && (
          <Suspense fallback={null}>
            <FlexCarousel
              ref={controls}
              items={items}
              preset="liquid"
              intro="rise"
              fit="portrait"
              cardHeight={cardHeight}
              lensWidth={compact ? 1.12 : undefined}
              gap={16}
              radius={14}
              squeeze={0.15}
              dispersion={0.25}
              autoplay={!stopped}
              interval={3.5}
              captureWheel={false}
              focusOnClick
              focusOffset={layout?.offset}
              still={!enabled}
              label="Doctors. Use the arrow keys to browse and Enter to open a doctor's details."
              onOpenChange={changeOpen}
              onUnsupported={() => setUnsupported(true)}
            />
            {enabled && open === null && (
              <button
                type="button"
                className="doctor-row-toggle"
                aria-label={stopped ? "Play doctor row" : "Pause doctor row"}
                onClick={() => setStopped((value) => !value)}
              >
                {stopped ? (
                  <Play size={14} aria-hidden="true" />
                ) : (
                  <Pause size={14} aria-hidden="true" />
                )}
              </button>
            )}
          </Suspense>
        )}
      </div>
      {open !== null && (
        <DoctorDetails
          index={open}
          shown={shown}
          headingRef={heading}
          onStep={step}
          onClose={close}
        />
      )}
    </div>
  );
}
