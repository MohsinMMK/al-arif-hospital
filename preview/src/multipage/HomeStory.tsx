import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  Leaf,
  Stethoscope,
} from "@/components/animated-icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InteractionMotion } from "./interaction-context";
import { servicePages } from "./data";
import { departments } from "./department-data";
import { DoctorRow } from "./DoctorRow";
import { CardSwap, RollingNumber, TiltLight, useTilt } from "./motion-ui";
import { Action } from "./primitives";
import { ReachUs } from "./ReachUs";
import { readingMinutes, stories } from "./story-data";
import { headerOffset } from "./useSiteScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);
function StoryLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Action className="story-link" to={to}>
      {children}
    </Action>
  );
}

const heroFigures = [
  { value: "₹10", label: "OPD fee since 2002" },
  { value: "16", label: "OPDs on one campus" },
  { value: "100", label: "inpatient beds" },
  { value: "24", label: "hour casualty" },
];

// One line per service, so each wing reads as a single screen.
const careSummaries: Record<string, string> = {
  "general-medicine":
    "Everyday concerns, preventive care and ongoing health needs.",
  "general-surgery": "Surgical consultations, procedures and follow-up care.",
  "womens-health": "Pregnancy, childbirth and gynaecological care.",
  "child-health": "Newborn, infant and childhood care.",
  "diagnostics-pharmacy": "Lab tests, imaging and prescriptions.",
  "unani-medicine": "Individual Unani consultations and treatment discussions.",
  hijama: "Twelve regimental therapies, discussed with your physician.",
  "unani-women-children": "Unani OPDs for women and children.",
  "unani-skin-care": "Unani care for skin concerns.",
  "unani-pharmacy": "Unani medicines and the herbal garden.",
};
function CareChapter({ unani = false }: { unani?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const enabled = useContext(InteractionMotion);
  const services = servicePages.filter(
    (service) => service.wing === (unani ? "Unani care" : "General hospital"),
  );
  const opds = departments.filter(
    (item) => item.group === (unani ? "unani" : "general"),
  ).length;
  useGSAP(
    () => {
      if (!enabled || !root.current) return;
      const rows = gsap.utils.toArray<HTMLElement>(
        ".story-care-feature",
        root.current,
      );
      const line = root.current.querySelector(".story-care-line span");
      const section = root.current;
      const accents = rows.map((row) =>
        row.querySelector(".story-feature-wash"),
      );
      const media = gsap.matchMedia();
      media.add(
        { compact: "(max-width:800px)", wide: "(min-width:801px)" },
        (context) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: () => `top ${headerOffset() + 2}px`,
              scrub: 0.18,
              invalidateOnRefresh: true,
              onUpdate: (trigger) =>
                section.classList.toggle(
                  "is-complete",
                  trigger.progress >= 0.999,
                ),
            },
          });
          timeline.fromTo(
            line,
            { scaleY: 0 },
            { scaleY: 1, duration: 1, ease: "none" },
            0,
          );
          timeline.fromTo(
            accents,
            { clipPath: unani ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.68,
              stagger: 0.08,
              ease: "power2.out",
            },
            0,
          );
          if (context.conditions?.compact) {
            gsap.set(rows, { y: 18 });
            timeline.to(
              rows,
              { y: 0, duration: 0.72, stagger: 0.06, ease: "power2.out" },
              0,
            );
          }
          return () => section.classList.remove("is-complete");
        },
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [enabled, unani], revertOnUpdate: true },
  );
  return (
    <section
      ref={root}
      id={unani ? "unani-care" : "general-care"}
      className={`story-care story-screen ${unani ? "story-unani" : "story-general"}`}
      data-band
      aria-labelledby={unani ? "unani-title" : "general-title"}
    >
      <div className="story-care-inner">
        <div className="story-care-intro">
          <div className="story-care-mark" aria-hidden="true">
            {unani ? <Leaf size={44} /> : <Stethoscope size={44} />}
          </div>
          <h2 id={unani ? "unani-title" : "general-title"}>
            {unani ? (
              <>
                Unani care.
                <br />
                <em>Time to listen.</em>
              </>
            ) : (
              <>
                General hospital.
                <br />
                <em>Care for everyday life.</em>
              </>
            )}
          </h2>
          <p>
            {unani
              ? "A consultation starts with your health history, daily life and questions. Your clinician discusses suitability before treatment."
              : "From everyday health concerns to maternity, child health and surgery, backed by a 24-hour casualty and inpatient wards."}
          </p>
          <div className="story-care-links">
            <StoryLink
              to={`/site/services#${unani ? "unani-care" : "general-hospital"}`}
            >
              {unani ? "Explore Unani care" : "Explore general care"}
            </StoryLink>
            <Link className="story-secondary-link" to="/site/departments">
              {unani ? `All ${opds} Unani OPDs` : `All ${opds} specialty OPDs`}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="story-care-features">
          <div className="story-care-line" aria-hidden="true">
            <span />
          </div>
          {services.map((service) => (
            <article className="story-care-feature" key={service.slug}>
              <div className="story-feature-wash" aria-hidden="true" />
              <Link to={`/site/services/${service.slug}`}>
                <h3>{service.name}</h3>
                <ArrowUpRight size={22} />
              </Link>
              <p>{careSummaries[service.slug] ?? service.intro}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type MoreItem = {
  key: string;
  title: string;
  meta: string;
  tone: "general" | "unani" | "learning" | "both";
  heading: string;
  body: string;
  note?: string;
  cta: string;
  to: string;
};

const firstVisit = stories.find((story) => story.slug === "your-first-visit");

// The hospital beyond the consulting room: its story, learning, research and guides.
const moreItems: MoreItem[] = [
  {
    key: "story",
    title: "Our story",
    meta: "Since 2002 · Bandlaguda",
    tone: "both",
    heading: "Two approaches to care, under one roof.",
    body: "For more than 25 years Al-Arif has brought modern medicine and traditional Unani healthcare together. It is a 24-hour charitable hospital run by the Al Arif Education and Medical Trust.",
    cta: "The story of Al-Arif",
    to: "/site/about",
  },
  ...(firstVisit
    ? [
        {
          key: firstVisit.slug,
          title: firstVisit.title,
          meta: `Guide · ${readingMinutes(firstVisit)} min read`,
          tone: "general" as const,
          heading: "Know what happens before you arrive.",
          body: firstVisit.dek,
          cta: "Read the guide",
          to: `/site/stories/${firstVisit.slug}`,
        },
      ]
    : []),
  {
    key: "learning",
    title: "Education & learning",
    meta: "Jamia Arifia Nooria",
    tone: "learning",
    heading: "A place to care. A place to learn.",
    body: "The Trust has run Jamia Arifia Nooria, a charitable Arabic institute with free boarding and lodging, since 2002. Clinical observation, workshops and academic visits are planned.",
    note: "Programme details are not yet confirmed. Applications are not open.",
    cta: "Explore education",
    to: "/site/education",
  },
  {
    key: "research",
    title: "Research",
    meta: "AYUSH & CCRUM sessions",
    tone: "unani",
    heading: "Questions that lead to understanding.",
    body: "Scientific sessions with AYUSH and CCRUM experts, Unani single-drug exhibitions in 2022 and 2023, COVID-19 Unani research and a herbal garden of 100 medicinal species.",
    note: "Publication records will appear when available.",
    cta: "Explore research",
    to: "/site/research",
  },
  {
    key: "stories",
    title: "Stories & guides",
    meta: "Guides, explainers, timeline",
    tone: "both",
    heading: "Read before you visit.",
    body: "Practical visit guides, plain explainers on Unani therapies and a dated record of the Trust’s camps, exhibitions and milestones.",
    cta: "Browse stories & guides",
    to: "/site/stories",
  },
];

function MoreCard({ item }: { item: MoreItem }) {
  const tilt = useTilt<HTMLAnchorElement>({ max: 3 });
  return (
    <Link
      ref={tilt}
      to={item.to}
      className="st-card story-more-card mu-tilt"
      data-tone={item.tone}
    >
      <TiltLight />
      <p className="st-meta">{item.meta}</p>
      <h3>{item.heading}</h3>
      <p>{item.body}</p>
      {item.note && <small>{item.note}</small>}
      <span className="story-more-cta">
        {item.cta}
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Story, learning, research and guides as one deck instead of four sections. */
function MoreChapter() {
  return (
    <section
      className="story-more story-screen"
      data-band
      id="learning"
      aria-labelledby="more-title"
    >
      <div className="story-more-inner">
        <div className="story-more-head">
          <h2 id="more-title">
            More than a hospital.
            <br />
            <em>A place to learn.</em>
          </h2>
          <p>
            The Trust’s story, its learning and research, and the guides that
            help you prepare.
          </p>
        </div>
        <CardSwap
          label="About Al-Arif"
          nextLabel="Next"
          className="story-more-deck"
          items={moreItems.map((item) => ({
            key: item.key,
            title: item.title,
            meta: item.meta,
            card: <MoreCard item={item} />,
          }))}
        />
      </div>
    </section>
  );
}

export default function HomeStory() {
  return (
    <div className="home-story">
      <section className="story-hero story-screen" aria-labelledby="hero-title">
        <div className="story-hero-main">
          <p className="story-hero-eyebrow">
            24-hour charitable hospital · Bandlaguda, Hyderabad
          </p>
          <h1 id="hero-title">
            Care that feels
            <br />
            <em>close to home.</em>
          </h1>
          <p>
            General hospital care and Unani medicine,
            <br className="story-desktop-break" /> together under one roof for
            more than 25 years.
          </p>
          <div className="story-hero-actions">
            <Action to="/site/visit">Plan your visit</Action>
            <a className="story-scroll-link" href="#general-care">
              Discover your care
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <ul className="story-hero-figures" aria-label="Al-Arif in figures">
          {heroFigures.map(({ value, label }) => (
            <li key={label}>
              <RollingNumber value={value} className="story-hero-figure" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>
      <CareChapter />
      <CareChapter unani />
      <section
        className="story-doctors story-screen"
        id="care-team"
        aria-labelledby="doctors-title"
      >
        <h2 id="doctors-title">Meet our doctors.</h2>
        <DoctorRow />
        <StoryLink to="/site/doctors">Explore the care team</StoryLink>
        <small className="story-doctor-note">
          Contact reception for current clinician schedules and consultation
          details.
        </small>
      </section>
      <MoreChapter />
      <ReachUs className="story-screen" />
    </div>
  );
}
