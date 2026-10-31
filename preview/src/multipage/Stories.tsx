import {
  Fragment,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleQuestionMark,
  FlaskConical,
  HeartHandshake,
  Hospital,
  Leaf,
  Library,
  Link2,
  Pause,
  Play,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { servicePages } from "./data";
import type { Service } from "./data";
import { InteractionMotion } from "./interaction-context";
import {
  CardSwap,
  StepProgress,
  TiltLight,
  useTilt,
  useToast,
} from "./motion-ui";
import {
  BackLink,
  NotFound,
  PageTitle,
  ServiceLink,
  TextLink,
} from "./primitives";
import {
  readingMinutes,
  regimentalTherapies,
  stories,
  storyCategories,
} from "./story-data";
import type { Story, StoryCategory } from "./story-data";
import "./stories.css";

type CategoryFilter = StoryCategory | "All";

const categoryIcons: Record<StoryCategory, LucideIcon> = {
  "Unani knowledge": Leaf,
  Hospital: Hospital,
  Community: HeartHandshake,
  "Research & learning": BookOpen,
  Pharmacy: FlaskConical,
};

const filterOptions: CategoryFilter[] = ["All", ...storyCategories];

function toneFor(story: Story) {
  if (story.category === "Research & learning") return "learning";
  if (story.wing === "General hospital") return "general";
  if (story.wing === "Unani care") return "unani";
  return "both";
}

const settle = "cubic-bezier(0.2, 0.8, 0.2, 1)";

type Box = { x: number; y: number; w: number; h: number };

function boxWithin(element: Element, host: Element): Box | null {
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const origin = host.getBoundingClientRect();
  return {
    x: rect.left - origin.left,
    y: rect.top - origin.top,
    w: rect.width,
    h: rect.height,
  };
}

/**
 * Filtered results: call `capture()` just before the state change. After the
 * re-render, items that stay glide from where they were and new ones ease in.
 * Items are the `[data-flip]` elements inside the ref'd, always-rendered root.
 */
// oxlint-disable-next-line react/only-export-components -- shared with the care directory search
export function useFlipList<T extends HTMLElement>() {
  const enabled = useContext(InteractionMotion);
  const root = useRef<T>(null);
  const before = useRef<Map<string, Box & { o: number }> | null>(null);
  const running = useRef(new Set<Animation>());
  const capture = () => {
    const host = root.current;
    if (!enabled || !host) {
      before.current = null;
      return;
    }
    const boxes = new Map<string, Box & { o: number }>();
    const fading = running.current.size > 0;
    for (const item of host.querySelectorAll<HTMLElement>("[data-flip]")) {
      const box = boxWithin(item, host);
      if (!box || !item.dataset.flip) continue;
      // Mid-fade items carry their opacity over instead of popping to full.
      const o = fading ? Number(getComputedStyle(item).opacity) || 0 : 1;
      boxes.set(item.dataset.flip, { ...box, o });
    }
    before.current = boxes;
  };
  useLayoutEffect(() => {
    const previous = before.current;
    if (!previous) return;
    before.current = null;
    const live = running.current;
    for (const animation of live) animation.cancel();
    live.clear();
    const host = root.current;
    if (!enabled || !host) return;
    let entering = 0;
    for (const item of host.querySelectorAll<HTMLElement>("[data-flip]")) {
      if (typeof item.animate !== "function") return;
      const rect = item.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
      const now = boxWithin(item, host);
      if (!now) continue;
      const was = previous.get(item.dataset.flip ?? "");
      let animation: Animation;
      if (was) {
        const dx = was.x - now.x;
        const dy = was.y - now.y;
        const faded = was.o < 0.99;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && !faded) continue;
        animation = item.animate(
          [
            { opacity: was.o, transform: `translate(${dx}px, ${dy}px)` },
            { opacity: 1, transform: "none" },
          ],
          { duration: 420, easing: settle },
        );
      } else {
        animation = item.animate(
          [
            { opacity: 0, transform: "translateY(10px)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 360,
            delay: Math.min(entering++, 6) * 40,
            easing: settle,
            fill: "backwards",
          },
        );
      }
      live.add(animation);
      animation.onfinish = () => live.delete(animation);
    }
  });
  useEffect(() => {
    const live = running.current;
    return () => {
      for (const animation of live) animation.cancel();
      live.clear();
    };
  }, []);
  return { root, capture };
}

/**
 * A pill that slides behind the active item (aria-pressed / aria-current stay
 * the source of truth). It exists only while motion is on; otherwise the
 * items keep their own static active styles.
 */
function useSlidingMarker<T extends HTMLElement>(
  active: string,
  items: string,
  current: string,
) {
  const enabled = useContext(InteractionMotion);
  const host = useRef<T>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const motion = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const root = host.current;
    const mark = marker.current;
    if (!enabled || !root || !mark) return;
    const place = () => {
      const target = root.querySelector(current);
      const box = target ? boxWithin(target, root) : null;
      if (!box) {
        root.removeAttribute("data-marker");
        return;
      }
      writeBox(mark, box);
      root.setAttribute("data-marker", "");
    };
    place();
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(place);
    if (observer) {
      observer.observe(root);
      for (const item of root.querySelectorAll(items)) observer.observe(item);
    }
    return () => {
      observer?.disconnect();
      motion.current?.cancel();
      motion.current = null;
      root.removeAttribute("data-marker");
    };
  }, [enabled, items, current]);
  useLayoutEffect(() => {
    const root = host.current;
    const mark = marker.current;
    if (!enabled || !root || !mark) return;
    const target = root.querySelector(current);
    const to = target ? boxWithin(target, root) : null;
    if (!to) return;
    // Measured mid-flight, so a quick second pick continues from where it is.
    const from = root.hasAttribute("data-marker")
      ? boxWithin(mark, root)
      : null;
    motion.current?.cancel();
    motion.current = null;
    writeBox(mark, to);
    root.setAttribute("data-marker", "");
    if (!from || typeof mark.animate !== "function") return;
    if (
      Math.abs(from.x - to.x) < 1 &&
      Math.abs(from.y - to.y) < 1 &&
      Math.abs(from.w - to.w) < 1
    )
      return;
    motion.current = mark.animate(
      [
        {
          transform: `translate(${from.x}px, ${from.y}px) scale(${from.w / to.w}, ${from.h / to.h})`,
        },
        { transform: `translate(${to.x}px, ${to.y}px)` },
      ],
      { duration: 380, easing: settle },
    );
  }, [active, enabled, current]);
  return { host, marker };
}

function writeBox(element: HTMLElement, box: Box) {
  const style = element.style;
  style.setProperty("--st-x", `${box.x.toFixed(2)}px`);
  style.setProperty("--st-y", `${box.y.toFixed(2)}px`);
  style.setProperty("--st-w", `${box.w.toFixed(2)}px`);
  style.setProperty("--st-h", `${box.h.toFixed(2)}px`);
}

function StoryMeta({ story }: { story: Story }) {
  return (
    <p className="st-meta">
      <span>{story.category}</span>
      <span aria-hidden="true">·</span>
      <span>{story.period}</span>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes(story)} min read</span>
    </p>
  );
}

function StoryCard({ story }: { story: Story }) {
  const tilt = useTilt<HTMLAnchorElement>({ max: 3 });
  return (
    <Link
      ref={tilt}
      to={`/site/stories/${story.slug}`}
      className="st-card mu-tilt"
      data-tone={toneFor(story)}
    >
      <TiltLight />
      <StoryMeta story={story} />
      <h3>{story.title}</h3>
      <p>{story.dek}</p>
      <ArrowUpRight size={20} aria-hidden="true" />
    </Link>
  );
}

export function StoryDeck({ stories: list }: { stories: Story[] }) {
  return (
    <CardSwap
      label="Stories and guides"
      nextLabel="Next story"
      className="st-deck"
      items={list.map((story) => ({
        key: story.slug,
        title: story.title,
        meta: `${story.category} · ${readingMinutes(story)} min read`,
        card: <StoryCard story={story} />,
      }))}
    />
  );
}

export function StoryCards({
  stories: list,
  compact = false,
}: {
  stories: Story[];
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "st-grid st-grid-compact" : "st-grid"}>
      {list.map((story) => (
        <li key={story.slug} data-flip={story.slug}>
          <StoryCard story={story} />
        </li>
      ))}
    </ul>
  );
}

function FeaturedStory({ story }: { story: Story }) {
  const Icon = categoryIcons[story.category];
  const tilt = useTilt<HTMLAnchorElement>({ max: 1.5 });
  return (
    <Link
      ref={tilt}
      to={`/site/stories/${story.slug}`}
      className="st-featured mu-tilt"
      data-tone={toneFor(story)}
    >
      <TiltLight />
      <div className="st-featured-copy">
        <span className="st-eyebrow">Featured story</span>
        <StoryMeta story={story} />
        <h2>{story.title}</h2>
        <p>{story.dek}</p>
        <span className="st-featured-cta">
          Read the story
          <ArrowUpRight size={17} aria-hidden="true" />
        </span>
      </div>
      <div className="st-featured-arch" aria-hidden="true">
        <Icon size={54} strokeWidth={1.4} />
        <span>{story.wing === "Both" ? "General & Unani" : story.wing}</span>
      </div>
    </Link>
  );
}

/** The first story of each topic, in library order. */
const featuredStories = stories.filter(
  (story, index) =>
    stories.findIndex((item) => item.category === story.category) === index,
);
const featuredInterval = 7000;

/**
 * Featured stories as a step player: the active step's bar fills, and when it
 * is full the next story crossfades in. It holds while hovered, focused from
 * the keyboard, off screen or in a hidden tab, and never runs with motion off.
 */
function FeaturedPlayer({ items }: { items: Story[] }) {
  const enabled = useContext(InteractionMotion);
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [away, setAway] = useState(false);
  const [spoken, setSpoken] = useState("");
  const auto = enabled && items.length > 1;
  const paused = stopped || hovered || focused || away;
  useEffect(() => {
    const node = root.current;
    if (!auto || !node) return;
    let inView = true;
    const update = () => setAway(!inView || document.hidden);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            update();
          });
    observer?.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [auto]);
  const pick = (index: number) => {
    setActive(index);
    setSpoken(`Story ${index + 1} of ${items.length}: ${items[index].title}`);
  };
  if (items.length === 0) return null;

  return (
    <section
      ref={root}
      className="st-player"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      data-auto={auto ? "" : undefined}
      onPointerEnter={(event) =>
        setHovered(event.pointerType === "mouse")
      }
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="st-player-slides">
        {items.map((story, index) => (
          <div
            key={story.slug}
            className="st-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            inert={index !== active}
          >
            <FeaturedStory story={story} />
          </div>
        ))}
      </div>
      <div className="st-player-controls">
        <ol className="st-player-steps">
          {items.map((story, index) => (
            <li key={story.slug}>
              <button
                type="button"
                aria-label={`Story ${index + 1} of ${items.length}: ${story.title}`}
                aria-current={index === active ? "true" : undefined}
                data-done={index < active ? "" : undefined}
                onClick={() => pick(index)}
              >
                <span className="st-player-track">
                  {index === active && (
                    <StepProgress
                      playing={auto}
                      paused={paused}
                      interval={featuredInterval}
                      onEnd={() =>
                        setActive((current) => (current + 1) % items.length)
                      }
                    />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
        {auto && (
          <button
            type="button"
            className="st-player-toggle"
            aria-label={
              stopped ? "Play featured stories" : "Pause featured stories"
            }
            onClick={() => setStopped((value) => !value)}
          >
            {stopped ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      <span className="mu-sr" aria-live="polite" aria-atomic="true">
        {spoken}
      </span>
    </section>
  );
}

export function Stories() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const needle = query.trim().toLowerCase();
  const filtering = category !== "All" || needle !== "";
  const matches = stories.filter(
    (story) =>
      (category === "All" || story.category === category) &&
      (needle === "" ||
        [story.title, story.dek, story.category].some((text) =>
          text.toLowerCase().includes(needle),
        )),
  );
  const shown = filtering ? matches : stories;
  const { root: resultsRoot, capture: captureResults } =
    useFlipList<HTMLDivElement>();
  const { host: chipsHost, marker: chipsMarker } =
    useSlidingMarker<HTMLDivElement>(
      category,
      ".st-chip",
      '.st-chip[aria-pressed="true"]',
    );
  const countFor = (option: CategoryFilter) =>
    option === "All"
      ? stories.length
      : stories.filter((story) => story.category === option).length;
  const resetFilters = () => {
    captureResults();
    setCategory("All");
    setQuery("");
    searchInput.current?.focus();
  };
  const clearSearch = () => {
    captureResults();
    setQuery("");
    searchInput.current?.focus();
  };

  return (
    <div className="mp-page st-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <Library size={14} aria-hidden="true" />
            {stories.length} guides, explainers and records
          </>
        }
        title={"Our stories.\nYour guides."}
        description="A small health library from Al-Arif: practical guides for your visit, plain-English explainers on Unani care, and a dated record of the hospital’s work since 2002."
      />
      <FeaturedPlayer items={featuredStories} />

      <section className="st-library" aria-labelledby="story-library-title">
        <div className="st-library-head">
          <h2 id="story-library-title">
            The library.
            <br />
            <em>Browse by topic.</em>
          </h2>
          <div className="st-search-field">
            <label htmlFor="story-search">Search stories and guides</label>
            <div className="mp-search st-search">
              <Search size={18} aria-hidden="true" />
              <Input
                id="story-search"
                ref={searchInput}
                placeholder="Try “Hijama” or “maternity”"
                value={query}
                onChange={(event) => {
                  captureResults();
                  setQuery(event.target.value);
                }}
                aria-controls="story-results"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="st-search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          ref={chipsHost}
          className="st-chips"
          role="group"
          aria-label="Filter by category"
        >
          {filterOptions.map((option) => {
            const count = countFor(option);
            return (
              <button
                key={option}
                type="button"
                className="st-chip"
                aria-pressed={category === option}
                aria-label={`${option}, ${count} ${count === 1 ? "story" : "stories"}`}
                onClick={() => {
                  if (option === category) return;
                  captureResults();
                  setCategory(option);
                }}
              >
                <span>{option}</span>
                <span className="st-chip-count" aria-hidden="true">
                  {count}
                </span>
              </button>
            );
          })}
          <span
            ref={chipsMarker}
            className="st-marker st-chip-marker"
            aria-hidden="true"
          />
        </div>

        <p className="st-count" role="status">
          {filtering
            ? `${matches.length} of ${stories.length} stories`
            : `${stories.length} stories and guides`}
        </p>

        <div id="story-results" ref={resultsRoot}>
          {shown.length > 0 ? (
            <StoryCards stories={shown} />
          ) : (
            <div className="mp-empty st-empty" data-flip="empty">
              <h3>Nothing matches yet.</h3>
              <p>
                Try a shorter word, or show every story and guide again.
              </p>
              <button
                type="button"
                className="st-reset"
                onClick={resetFilters}
              >
                <RotateCcw size={17} aria-hidden="true" />
                Show all stories
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="st-closing">
        <h2>
          Beyond the library.
          <br />
          <em>More from Al-Arif.</em>
        </h2>
        <div>
          <div className="mp-editorial-links">
            <Link to="/site/community">
              <span>
                Community work
                <small>Camps, outreach and the dated record behind them</small>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <Link to="/site/pharmacy">
              <span>
                Our pharmacies
                <small>Unani and allopathic pharmacies, raw drugs and the herbal garden</small>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <p className="mp-source-note">
            Stories are drawn from the Trust’s activity reports, and details
            reflect the period each one describes. Please confirm current
            services, timings and fees with reception on{" "}
            <a href="tel:+918555086667">+91 85550 86667</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export function StoryDetail() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);
  if (!story) return <NotFound />;
  return (
    <StoryArticle
      key={story.slug}
      story={story}
      index={stories.indexOf(story)}
    />
  );
}

type CopyState = "idle" | "copied" | "failed";

function StoryArticle({ story, index }: { story: Story; index: number }) {
  const [active, setActive] = useState(story.sections[0]?.id ?? "");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const toast = useToast();
  const { host: tocHost, marker: tocMarker } = useSlidingMarker<HTMLElement>(
    active,
    "a",
    'a[aria-current="true"]',
  );
  const Icon = categoryIcons[story.category];
  const minutes = readingMinutes(story);
  const previous = stories[(index - 1 + stories.length) % stories.length];
  const next = stories[(index + 1) % stories.length];
  const more = stories
    .filter(
      (item) =>
        item.category === story.category &&
        item !== story &&
        item !== previous &&
        item !== next,
    )
    .slice(0, 2);
  const services = story.serviceSlugs
    .map((serviceSlug) =>
      servicePages.find((service) => service.slug === serviceSlug),
    )
    .filter((service): service is Service => service !== undefined);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const header = document.querySelector(".mp-header");
    const offset = Math.round(
      (header?.getBoundingClientRect().height ?? 90) + 16,
    );
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = story.sections.find((section) => visible.has(section.id));
        if (first) setActive(first.id);
      },
      { rootMargin: `-${offset}px 0px -55% 0px` },
    );
    for (const section of story.sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [story]);

  useEffect(() => {
    if (copyState !== "copied") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 4000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const copyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Unavailable");
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
      toast("Link copied");
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div className="mp-page st-page">
      <BackLink to="/site/stories">Stories & guides</BackLink>
      <div className="mp-detail-hero st-hero">
        <div>
          <p className="st-meta st-hero-meta">
            <span>{story.category}</span>
            <span aria-hidden="true">·</span>
            <span>{story.period}</span>
            <span aria-hidden="true">·</span>
            <span>{minutes} min read</span>
          </p>
          <PageTitle title={story.title} description={story.dek}>
            <div className="st-share">
              <button
                type="button"
                className="st-copy"
                onClick={() => void copyLink()}
              >
                {copyState === "copied" ? (
                  <Check size={17} aria-hidden="true" />
                ) : (
                  <Link2 size={17} aria-hidden="true" />
                )}
                Copy link
              </button>
              {/* Success is announced by the toast; this region covers failure only. */}
              <span className="st-copy-status" role="status">
                {copyState === "failed" &&
                  "Couldn’t copy automatically. Copy the address from your browser’s address bar."}
              </span>
            </div>
          </PageTitle>
        </div>
        <div className="mp-service-stamp" aria-hidden="true">
          <Icon size={48} strokeWidth={1.4} />
          <span>{story.wing === "Both" ? "General & Unani" : story.wing}</span>
          <strong>{story.category}</strong>
        </div>
      </div>

      <div className="mp-reading-layout st-reading">
        <div className="st-aside">
          <nav ref={tocHost} className="st-toc" aria-label="On this page">
            <p className="st-toc-title">On this page</p>
            <ol>
              {story.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={active === section.id ? "is-active" : undefined}
                    aria-current={active === section.id ? "true" : undefined}
                    onClick={() => setActive(section.id)}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <span
              ref={tocMarker}
              className="st-marker st-toc-marker"
              aria-hidden="true"
            />
          </nav>
          <aside className="mp-profile-facts st-facts" aria-labelledby="story-facts-title">
            <h2 id="story-facts-title">At a glance</h2>
            <dl>
              {story.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <article className="st-article">
          {story.sections.map((section, sectionIndex) => (
            <Fragment key={section.id}>
              <section
                id={section.id}
                className="mp-reading-section st-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul className="mp-check-list">
                    {section.points.map((point) => (
                      <li key={point}>
                        <Check size={16} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              {story.slug === "regimental-therapies-explained" &&
                sectionIndex === 0 && <TherapyExplorer />}
            </Fragment>
          ))}
        </article>
      </div>

      {services.length > 0 && (
        <section className="mp-related-services st-related">
          <h2>
            Related care.
            <br />
            <em>Services mentioned here.</em>
          </h2>
          {services.map((service) => (
            <ServiceLink key={service.slug} service={service} />
          ))}
        </section>
      )}

      <section className="st-keep-reading" aria-labelledby="keep-reading-title">
        <h2 id="keep-reading-title">
          Keep reading.
          <br />
          <em>More stories and guides.</em>
        </h2>
        <nav className="st-pager" aria-label="Previous and next stories">
          {previous && (
            <Link to={`/site/stories/${previous.slug}`} className="st-pager-link">
              <span className="st-pager-label">
                <ArrowLeft size={17} aria-hidden="true" />
                Previous
              </span>
              <strong>{previous.title}</strong>
            </Link>
          )}
          {next && (
            <Link
              to={`/site/stories/${next.slug}`}
              className="st-pager-link st-pager-next"
            >
              <span className="st-pager-label">
                Next
                <ArrowRight size={17} aria-hidden="true" />
              </span>
              <strong>{next.title}</strong>
            </Link>
          )}
        </nav>
        {more.length > 0 && (
          <>
            <p className="st-more-label">More in {story.category}</p>
            <StoryCards stories={more} compact />
          </>
        )}
        <div className="st-back">
          <TextLink to="/site/stories">All stories and guides</TextLink>
        </div>
      </section>

      <p className="mp-source-note st-source">
        Drawn from the Trust’s activity reports. Details reflect the period
        described and may have changed since. Please confirm current services,
        timings and fees with reception on{" "}
        <a href="tel:+918555086667">+91 85550 86667</a>.
      </p>
    </div>
  );
}

export function TherapyExplorer({
  serviceLink = true,
}: {
  serviceLink?: boolean;
}) {
  const enabled = useContext(InteractionMotion);
  const [selected, setSelected] = useState(0);
  const [picked, setPicked] = useState(false);
  // The outgoing description, kept briefly so the panel crossfades.
  const [leaving, setLeaving] = useState<{ from: number; to: number } | null>(
    null,
  );
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const panelId = `${baseId}-panel`;
  const therapy = regimentalTherapies[selected] ?? regimentalTherapies[0];
  const outgoing =
    enabled && leaving ? regimentalTherapies[leaving.from] : undefined;
  const choose = (index: number) => {
    if (index === selected) return;
    setPicked(true);
    setLeaving(enabled ? { from: selected, to: index } : null);
    setSelected(index);
  };

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setLeaving(null), 260);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  return (
    <section className="st-therapy" aria-labelledby={headingId}>
      <h2 id={headingId}>
        Twelve therapies.
        <br />
        <em>One conversation first.</em>
      </h2>
      <p className="st-therapy-intro">
        Choose a therapy to read a short, neutral description.
      </p>
      <div
        className="st-therapy-grid"
        role="group"
        aria-label="Regimental therapies"
      >
        {regimentalTherapies.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            className="st-therapy-option"
            aria-pressed={selected === itemIndex}
            aria-controls={panelId}
            onClick={() => choose(itemIndex)}
          >
            <span>{item.name}</span>
            <small>{item.meaning}</small>
          </button>
        ))}
      </div>
      {therapy && (
        <div
          id={panelId}
          className="st-therapy-panel"
          data-picked={picked ? "" : undefined}
          aria-live="polite"
          aria-atomic="true"
        >
          <div key={therapy.name} className="st-therapy-copy">
            <h3>{therapy.name}</h3>
            <p className="st-therapy-meaning">{therapy.meaning}</p>
            <p>{therapy.description}</p>
          </div>
          {outgoing && leaving && (
            <div
              key={`${leaving.from}-${leaving.to}`}
              className="st-therapy-copy-out"
              aria-hidden="true"
            >
              <h3>{outgoing.name}</h3>
              <p className="st-therapy-meaning">{outgoing.meaning}</p>
              <p>{outgoing.description}</p>
            </div>
          )}
        </div>
      )}
      <div className="st-therapy-note">
        <CircleQuestionMark size={20} aria-hidden="true" />
        <p>
          Your Unani physician decides whether any therapy is suitable, and not
          every therapy suits everyone. Please confirm current services,
          timings and fees with reception on +91 85550 86667.
        </p>
      </div>
      {serviceLink && (
        <TextLink to="/site/services/hijama">
          Hijama & regimental therapy
        </TextLink>
      )}
    </section>
  );
}
