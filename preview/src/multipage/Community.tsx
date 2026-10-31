import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  CircleHelp,
  HandHeart,
  HeartPulse,
  Hospital,
  Leaf,
  Microscope,
  RotateCcw,
} from "lucide-react";
import { PageTitle, TextLink } from "./primitives";
import { milestones, milestoneYears } from "./milestones";
import type { Milestone, MilestoneCategory } from "./milestones";
import { Scrubber, useReveal } from "./motion-ui";
import { StatBand } from "./sections";
import type { Stat } from "./sections";
import "./community.css";

const categories: MilestoneCategory[] = [
  "Hospital",
  "Community",
  "Research & learning",
  "Pharmacy",
  "Trust",
];

const categoryTone: Record<MilestoneCategory, string> = {
  Hospital: "hospital",
  Community: "community",
  "Research & learning": "learning",
  Pharmacy: "pharmacy",
  Trust: "trust",
};

const yearOptions = ["All years", ...milestoneYears.map(String)];

const impactFigures: Stat[] = [
  {
    icon: Hospital,
    value: "88",
    label: "inpatients served at the COVID-19 Treatment Centre, 2021",
  },
  {
    icon: HeartPulse,
    value: "60+",
    label: "patients at the free cardiac camp, April 2021",
  },
  {
    icon: Leaf,
    value: "427+",
    label: "patients at the Unani Day medical camp, February 2023",
  },
  {
    icon: Microscope,
    value: "787",
    label: "participants at the single-drug exhibition, March 2022",
  },
];

const campRecord = [
  [
    "April 2021",
    "Free cardiac camp: free consultation and 2D echo for 60+ patients.",
  ],
  [
    "June 2021",
    "Three-day free medical camp: free tests, consultations with general and Unani specialists, and free medicines for 500+ patients.",
  ],
  [
    "February 2023",
    "Unani Day camp: free tests and specialist consultations, with medicines at subsidised prices, for 427+ patients.",
  ],
  [
    "August–September 2023",
    "Six-day Unani medical camp at the All India Horticulture & Agriculture Show, Necklace Road, Hyderabad.",
  ],
];

const learningRecord = [
  [
    "2020–2021",
    "Scientific and brainstorming sessions on campus with Unani physicians, academics and former officials of the Department of AYUSH, Telangana and CCRUM.",
  ],
  [
    "March 2022",
    "A two-day exhibition of 350+ Unani single drugs, 100 live medicinal plants and pharmaceutical equipment, with 787 participants.",
  ],
  [
    "June 2022",
    "A stall by the Al-Arif Unani Pharmacy at the state-level Environment Day celebrations, Hyderabad.",
  ],
  [
    "February 2023",
    "A two-day exhibition of 350+ Unani herbal single drugs for public health, with the Salar Jung Museum.",
  ],
];

function YearGroup({ year, items }: { year: number; items: Milestone[] }) {
  const reveal = useReveal<HTMLLIElement>();
  return (
    <li ref={reveal} className="cm-year mu-reveal">
      <h3 className="cm-year-heading">{year}</h3>
      <ol className="cm-year-items">
        {items.map((milestone) => (
          <li key={milestone.id}>
            <article
              className="cm-item"
              aria-labelledby={`cm-${milestone.id}`}
            >
              <div className="cm-item-meta">
                <time dateTime={milestone.date}>{milestone.when}</time>
                <span
                  className={`cm-tag cm-tag-${categoryTone[milestone.category]}`}
                >
                  {milestone.category}
                </span>
              </div>
              <h4 id={`cm-${milestone.id}`}>{milestone.title}</h4>
              <p>{milestone.summary}</p>
              {milestone.storySlug && (
                <TextLink to={`/site/stories/${milestone.storySlug}`}>
                  Read the story
                  <span className="sr-only">: {milestone.title}</span>
                </TextLink>
              )}
            </article>
          </li>
        ))}
      </ol>
    </li>
  );
}

function MilestoneTimeline() {
  const [year, setYear] = useState<number | "all">("all");
  const [category, setCategory] = useState<MilestoneCategory | "all">("all");
  const yearFilter = useRef<HTMLDivElement>(null);

  const inYear = milestones.filter(
    (milestone) => year === "all" || milestone.year === year,
  );
  const shown = inYear.filter(
    (milestone) => category === "all" || milestone.category === category,
  );
  const groups = milestoneYears
    .map((groupYear) => ({
      year: groupYear,
      items: shown.filter((milestone) => milestone.year === groupYear),
    }))
    .filter((group) => group.items.length > 0);
  const filtered = year !== "all" || category !== "all";
  const yearIndex = year === "all" ? 0 : milestoneYears.indexOf(year) + 1;

  const reset = () => {
    setYear("all");
    setCategory("all");
    yearFilter.current
      ?.querySelector<HTMLInputElement>('input[type="range"]')
      ?.focus();
  };

  return (
    <section
      className="cm-timeline-section"
      aria-labelledby="cm-timeline-title"
    >
      <div className="cm-section-head">
        <h2 id="cm-timeline-title">
          Milestones.
          <br />
          <em>From 2002 to 2023.</em>
        </h2>
        <p>
          Filter by year or theme. Each entry is as recorded in the Trust’s
          activity reports and describes what happened at the time.
        </p>
      </div>
      <div className="cm-filters">
        <div ref={yearFilter} className="cm-year-filter">
          <Scrubber
            className="cm-scrubber"
            label="Year"
            options={yearOptions}
            value={yearIndex}
            onChange={(index) =>
              setYear(index > 0 ? (milestoneYears[index - 1] ?? "all") : "all")
            }
          />
        </div>
        <div
          className="cm-chip-group"
          role="group"
          aria-labelledby="cm-theme-label"
        >
          <span id="cm-theme-label" className="cm-chip-label">
            Theme
          </span>
          <div className="cm-chips">
            <button
              type="button"
              className="cm-chip"
              aria-pressed={category === "all"}
              aria-controls="cm-timeline-results"
              onClick={() => setCategory("all")}
            >
              All themes
              <span className="cm-chip-count">
                <span className="sr-only">, </span>
                {inYear.length}
                <span className="sr-only"> milestones</span>
              </span>
            </button>
            {categories.map((item) => {
              const count = inYear.filter(
                (milestone) => milestone.category === item,
              ).length;
              return (
                <button
                  key={item}
                  type="button"
                  className="cm-chip"
                  aria-pressed={category === item}
                  aria-controls="cm-timeline-results"
                  onClick={() => setCategory(item)}
                >
                  {item}
                  <span className="cm-chip-count">
                    <span className="sr-only">, </span>
                    {count}
                    <span className="sr-only">
                      {count === 1 ? " milestone" : " milestones"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div id="cm-timeline-results">
        <p role="status" className="cm-status">
          {filtered
            ? `Showing ${shown.length} of ${milestones.length} milestones`
            : `Showing all ${milestones.length} milestones`}
        </p>
        {groups.length > 0 ? (
          <ol className="cm-timeline">
            {groups.map((group) => (
              <YearGroup
                key={group.year}
                year={group.year}
                items={group.items}
              />
            ))}
          </ol>
        ) : (
          <div className="cm-empty">
            <h3>No milestones match these filters.</h3>
            <p>Try another year or theme, or return to the full timeline.</p>
            <button type="button" onClick={reset}>
              Show all milestones <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function RecordList({ items }: { items: string[][] }) {
  return (
    <ul className="mp-check-list cm-record">
      {items.map(([when, text]) => (
        <li key={`${when}-${text}`}>
          <Check size={16} aria-hidden="true" />
          <span>
            <strong>{when}</strong> · {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Community() {
  return (
    <div className="mp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <HandHeart size={14} aria-hidden="true" />
            Community & outreach since 2002
          </>
        }
        title={"Beyond our walls.\nA record of service."}
        description="Free camps, public exhibitions and the milestones of the Al Arif Education and Medical Trust since 2002, as recorded in the Trust’s activity reports."
      />
      <div className="cm-impact">
        <StatBand items={impactFigures} label="Community impact" tone="sage" />
        <p className="mp-source-note sx-note">
          Figures as recorded in the Trust’s activity reports.
        </p>
      </div>
      <MilestoneTimeline />
      <section className="cm-feature" aria-labelledby="cm-camps-title">
        <h2 id="cm-camps-title">
          Camps & outreach.
          <br />
          <em>Care taken to the community.</em>
        </h2>
        <div>
          <p>
            The hospital has held free and low-cost medical camps that brought
            general and Unani clinicians together, on campus and elsewhere in
            Hyderabad.
          </p>
          <RecordList items={campRecord} />
          <p>
            During the COVID-19 pandemic, the hospital distributed AYUSH
            Joshanda free of charge, set up the Free Al-Arif Isolation Centre
            and Free Oxygen Transit Facility with GHMC and the IQRA Group of
            Doctors, and ran an 80-bed treatment centre during the second wave.
          </p>
          <div className="mp-status-notice">
            <CircleHelp size={20} aria-hidden="true" />
            <p>
              To ask whether any camps are planned, please contact reception
              on{" "}
              <a className="cm-inline-link" href="tel:+918555086667">
                +91 85550 86667
              </a>
              .
            </p>
          </div>
          <div className="cm-links">
            <TextLink to="/site/stories/community-camps">
              Read about the camps
            </TextLink>
            <TextLink to="/site/stories/covid-19-response">
              Read about the COVID-19 response
            </TextLink>
          </div>
        </div>
      </section>
      <section className="cm-feature" aria-labelledby="cm-learning-title">
        <h2 id="cm-learning-title">
          Learning in public.
          <br />
          <em>Exhibitions and sessions.</em>
        </h2>
        <div>
          <p>
            Alongside patient care, the hospital has shared Unani knowledge with
            students, practitioners and the public through exhibitions and open
            scientific sessions.
          </p>
          <RecordList items={learningRecord} />
          <div className="cm-links">
            <TextLink to="/site/stories/single-drug-exhibitions">
              Read about the exhibitions
            </TextLink>
            <TextLink to="/site/stories/scientific-sessions">
              Read about the scientific sessions
            </TextLink>
          </div>
        </div>
      </section>
      <p className="mp-source-note cm-caution">
        Medicines mentioned on this page were presented or distributed at the
        time, as recorded. A clinician decides what is suitable for each person.
        Please confirm current services, timings and fees with reception on +91
        85550 86667.
      </p>
      <div className="mp-editorial-links cm-closing">
        <Link to="/site/stories">
          Read all stories
          <ArrowUpRight />
        </Link>
        <Link to="/site/pharmacy">
          Explore pharmacy & manufacturing
          <ArrowUpRight />
        </Link>
        <Link to="/site/about">
          About Al-Arif
          <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
