import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Leaf,
  MapPin,
  Stethoscope,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InteractionMotion } from "./interaction-context";
import { landmark, servicePages } from "./data";
import { departmentPath, departments } from "./department-data";
import { DoctorRow } from "./DoctorRow";
import { VisitJourney } from "./VisitJourney";
import { RollingNumber, useMagnetic, useReveal } from "./motion-ui";
import { StoryDeck } from "./Stories";
import { stories } from "./story-data";

gsap.registerPlugin(ScrollTrigger, useGSAP);
function StoryLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const magnet = useMagnetic<HTMLAnchorElement>();
  return (
    <Link ref={magnet} className="story-link mu-magnetic" to={to}>
      {children}
      <ArrowUpRight size={19} />
    </Link>
  );
}

const homeStories = [
  "your-first-visit",
  "regimental-therapies-explained",
  "maternity-and-diagnostics",
  "herbal-garden",
].flatMap((slug) => stories.filter((story) => story.slug === slug));

const mobileCareSummaries: Record<string, string> = {
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
              end: () =>
                `top ${(document.querySelector(".mp-header")?.getBoundingClientRect().height ?? 90) + 2}px`,
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
      className={`story-care ${unani ? "story-unani" : "story-general"}`}
      aria-labelledby={unani ? "unani-title" : "general-title"}
    >
      <div className="story-care-inner">
        <div className="story-care-intro">
          <div className="story-care-mark" aria-hidden="true">
            {unani ? <Leaf size={50} /> : <Stethoscope size={50} />}
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
              ? "A consultation starts with your health history, daily life and questions. Explore seven Unani OPDs, regimental therapy and the Unani pharmacy."
              : "From everyday health concerns to maternity, child health and surgery, find the service that fits the conversation you need."}
          </p>
          <StoryLink
            to={`/site/services#${unani ? "unani-care" : "general-hospital"}`}
          >
            {unani ? "Explore Unani care" : "Explore general care"}
          </StoryLink>
          <div className="story-care-footnote">
            {unani
              ? "Your clinician discusses suitability before treatment."
              : "Reception helps confirm your clinician and visit."}
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
              <p className="story-care-full-copy">{service.intro}</p>
              <p className="story-care-mobile-copy">
                {mobileCareSummaries[service.slug] ?? service.intro}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const departmentFigures = [
  { value: "100", label: "inpatient beds" },
  { value: "200+", label: "OPD patients a day" },
  { value: "24", label: "hour casualty" },
  { value: "2", label: "pharmacies on campus" },
];

function DepartmentPanel({ unani = false }: { unani?: boolean }) {
  const list = useReveal<HTMLUListElement>();
  const group = unani ? "unani" : "general";
  const items = departments.filter((item) => item.group === group);
  const Icon = unani ? Leaf : Stethoscope;
  return (
    <div className="story-department-panel" data-group={group}>
      <h3>
        <Icon size={20} aria-hidden="true" />
        {unani ? "Unani care" : "General hospital"}
        <span>{items.length} OPDs</span>
      </h3>
      <ul ref={list} className="mu-reveal">
        {items.map(({ slug, name, english }) => (
          <li key={slug}>
            <Link to={departmentPath(slug)}>
              <span>
                {name}
                {english && <small>{english}</small>}
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Both OPD lists side by side, equal weight, each name linking to its card. */
function DepartmentsChapter() {
  return (
    <section
      className="story-departments story-section"
      id="departments"
      aria-labelledby="departments-title"
    >
      <div className="story-departments-head">
        <h2 id="departments-title">
          Sixteen OPDs.
          <br />
          <em>One campus.</em>
        </h2>
        <div>
          <p>
            Nine specialty OPDs and seven Unani OPDs, backed by a 24-hour
            casualty, inpatient wards, diagnostics and two pharmacies.
          </p>
          <StoryLink to="/site/departments">Explore all departments</StoryLink>
        </div>
      </div>
      <div className="story-department-panels">
        <DepartmentPanel />
        <DepartmentPanel unani />
      </div>
      <ul className="story-department-figures" aria-label="Departments in figures">
        {departmentFigures.map(({ value, label }) => (
          <li key={label}>
            <RollingNumber value={value} className="story-department-figure" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HomeStory() {
  const enabled = useContext(InteractionMotion);
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("care-chapter-scroll");
    return () =>
      document.documentElement.classList.remove("care-chapter-scroll");
  }, [enabled]);
  return (
    <div className="home-story">
      <div className="story-opening">
        <section className="story-hero">
          <div>
            <h1>
              Care that feels
              <br />
              <em>close to home.</em>
            </h1>
            <p>
              Al-Arif brings general hospital care and Unani medicine
              <br className="story-desktop-break" /> together in Bandlaguda,
              Hyderabad.
            </p>
            <a className="story-scroll-link" href="#general-care">
              Discover your care
              <ArrowDown size={18} />
            </a>
          </div>
          <div className="story-hero-ground">
            <span>
              <Stethoscope size={21} />
              General hospital
            </span>
            <span>
              <Leaf size={21} />
              Unani care
            </span>
            <Link to="/site/visit">
              <MapPin size={18} />
              Plan your visit
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
        <section className="story-about story-section" id="hospital">
          <h2>
            A hospital in your neighbourhood.
            <br />
            <em>A welcome for your family.</em>
          </h2>
          <div>
            <p>
              For more than 25 years, Al-Arif has brought two approaches to care
              together in Bandlaguda: modern medicine and traditional Unani
              healthcare, under one roof.
            </p>
            <p>
              A 24-hour charitable hospital run by the Al Arif Education and
              Medical Trust, it still keeps the ₹10 outpatient fee set in 2002.
            </p>
            <StoryLink to="/site/about">The story of Al-Arif</StoryLink>
          </div>
        </section>
      </div>
      <CareChapter />
      <CareChapter unani />
      <DepartmentsChapter />
      <section className="story-doctors story-section" id="care-team">
        <div className="story-section-intro">
          <h2>Meet our doctors.</h2>
        </div>
        <DoctorRow />
        <StoryLink to="/site/doctors">Explore the care team</StoryLink>
        <small className="story-doctor-note">
          Contact reception for current clinician schedules and consultation
          details.
        </small>
      </section>
      <section className="story-learning" id="learning">
        <div className="story-learning-inner">
          <div className="story-learning-title">
            <BookOpen size={42} aria-hidden="true" />
            <h2>
              A place to care.
              <br />
              <em>A place to learn.</em>
            </h2>
          </div>
          <div className="story-learning-copy">
            <p>
              The Trust has run Jamia Arifia Nooria, a charitable Arabic
              institute with free boarding and lodging, since 2002. Explore it
              alongside planned observation, workshops and academic visits.
            </p>
            <h3>Clinical observation</h3>
            <p>
              Explore the planned learning scope, supervision and details to
              confirm before applying.
            </p>
            <small>
              Programme details and intakes are not yet confirmed. Applications
              are not open.
            </small>
            <StoryLink to="/site/education">
              Explore education & learning
            </StoryLink>
            <Link
              className="story-secondary-link"
              to="/site/education/clinical-observation"
            >
              Explore clinical observation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="story-research story-section" id="research">
        <div>
          <h2>
            Questions that lead
            <br />
            <em>to understanding.</em>
          </h2>
          <p>
            Scientific sessions with AYUSH and CCRUM experts, Unani single-drug
            exhibitions and a herbal garden of 100 medicinal species.
          </p>
          <StoryLink to="/site/research">
            Explore research & publications
          </StoryLink>
        </div>
        <div className="story-research-themes">
          <h3>Research initiatives</h3>
          <ul>
            <li>AYUSH & CCRUM scientific sessions</li>
            <li>Single-drug exhibitions, 2022 & 2023</li>
            <li>COVID-19 Unani research</li>
            <li>Herbal garden, 100 species</li>
          </ul>
          <small>Publication records will appear when available.</small>
        </div>
      </section>
      <section className="story-library story-section" id="stories">
        <div className="story-library-head">
          <h2>
            Stories & guides.
            <br />
            <em>Read before you visit.</em>
          </h2>
          <div>
            <p>
              Practical guides for your first visit, plain explainers on Unani
              therapies and a dated record of the Trust’s camps, exhibitions
              and milestones.
            </p>
            <StoryLink to="/site/stories">Browse stories & guides</StoryLink>
            <Link className="story-secondary-link" to="/site/community">
              Follow the community timeline
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <StoryDeck stories={homeStories} />
      </section>
      <section
        className="story-visit"
        id="visiting"
        aria-label="Planning your visit"
      >
        <VisitJourney motionEnabled={enabled} />
        <div className="story-visit-details">
          <div>
            <h3>Find us in Bandlaguda.</h3>
            <p>
              Chandrayangutta, Hyderabad.
              <br />
              {landmark}.
            </p>
            <StoryLink to="/site/visit">
              Directions & visit information
            </StoryLink>
          </div>
          <div>
            <h3>Let’s plan your next step.</h3>
            <p>
              Check the service, clinician and timing with reception before you
              travel.
            </p>
            <StoryLink to="/site/request">Plan an inquiry</StoryLink>
            <small>Preview only. No appointment is booked online.</small>
          </div>
        </div>
      </section>
    </div>
  );
}
