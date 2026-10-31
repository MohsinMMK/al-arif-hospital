import { useContext, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  Check,
  Clock,
  Leaf,
  Phone,
  Pill,
  Siren,
  Stethoscope,
} from "lucide-react";
import { doctorPages, servicePages } from "./data";
import {
  departmentGroups,
  departments,
  wardBeds,
} from "./department-data";
import type { Department, DepartmentGroup } from "./department-data";
import { InteractionMotion } from "./interaction-context";
import { LiquidSegments, SplitBar, useReveal } from "./motion-ui";
import type { Segment } from "./motion-ui";
import { ContactBand, PageTitle } from "./primitives";
import { FactChips, SectionHead, WeekStrip } from "./sections";
import type { IconFact } from "./sections";
import { siteScroller } from "./useSiteScroll";
import "./departments.css";

const groupIcons: Record<DepartmentGroup, typeof Stethoscope> = {
  general: Stethoscope,
  unani: Leaf,
  "round-the-clock": Siren,
  pharmacy: Pill,
};

// Phones show only the short label; the count joins it from 600px up.
const shortLabels: Record<DepartmentGroup, string> = {
  general: "General",
  unani: "Unani",
  "round-the-clock": "24 hours",
  pharmacy: "Pharmacy",
};

const groupSegments: Segment[] = departmentGroups.map((group) => {
  const Icon = groupIcons[group.id];
  return {
    id: group.id,
    label: shortLabels[group.id],
    detail: `${departments.filter((item) => item.group === group.id).length}`,
    icon: <Icon size={18} aria-hidden="true" />,
  };
});

const departmentFacts: IconFact[] = [
  { icon: Stethoscope, label: "9 specialty OPDs" },
  { icon: Leaf, label: "7 Unani OPDs" },
  { icon: BedDouble, label: "100 inpatient beds" },
  { icon: Clock, label: "Open 24 hours" },
];

const headerOffset = () =>
  document.querySelector(".mp-header")?.getBoundingClientRect().height ?? 90;

/** A card sits below the sticky group switch as well as the header. */
const targetTop = (target: HTMLElement) =>
  target.getBoundingClientRect().top +
  window.scrollY -
  headerOffset() -
  (target.classList.contains("dp-card") ? 88 : 0);

function DepartmentCard({
  department,
  highlighted,
}: {
  department: Department;
  highlighted: boolean;
}) {
  const {
    slug,
    name,
    english,
    group,
    icon: Icon,
    summary,
    points,
    beds,
    serviceSlug,
    to,
    doctorSlugs = [],
    call,
    span,
  } = department;
  const service = servicePages.find((item) => item.slug === serviceSlug);
  const doctors = doctorPages.filter((doctor) =>
    doctorSlugs.includes(doctor.slug),
  );
  const isOpd = group === "general" || group === "unani";
  return (
    <li
      id={slug}
      className="dp-card"
      data-span={span}
      data-highlight={highlighted ? "" : undefined}
      tabIndex={-1}
      aria-labelledby={`${slug}-name`}
    >
      <div className="dp-card-top">
        <span className="dp-icon">
          <Icon size={22} aria-hidden="true" />
        </span>
        {beds && (
          <span className="dp-tag">
            <BedDouble size={14} aria-hidden="true" />
            {beds}
          </span>
        )}
      </div>
      <h3 id={`${slug}-name`}>
        {name}
        {english && <small>{english}</small>}
      </h3>
      <p className="dp-summary">{summary}</p>
      {points && (
        <ul className="dp-points">
          {points.map((point) => (
            <li key={point}>
              <Check size={14} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      )}
      {call && (
        <a className="dp-call" href={call.href}>
          <Phone size={18} aria-hidden="true" />
          <span>
            Emergency line
            <strong>{call.label}</strong>
          </span>
        </a>
      )}
      {(doctors.length > 0 || service || to || isOpd) && (
        <div className="dp-card-foot">
          {doctors.length > 0 && (
            <ul className="dp-doctors" aria-label={`${name} doctors`}>
              {doctors.map((doctor) => (
                <li key={doctor.slug}>
                  <Link to={`/site/doctors/${doctor.slug}`}>{doctor.name}</Link>
                </li>
              ))}
            </ul>
          )}
          {service ? (
            <Link className="dp-more" to={`/site/services/${service.slug}`}>
              {service.name}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ) : to ? (
            <Link className="dp-more" to={to}>
              Pharmacy & manufacturing
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ) : (
            isOpd && (
              <p className="dp-confirm">
                Ask reception for the clinician and OPD timings.
              </p>
            )
          )}
        </div>
      )}
    </li>
  );
}

function DepartmentGrid({
  group,
  highlight,
}: {
  group: DepartmentGroup;
  highlight: string;
}) {
  const list = useReveal<HTMLUListElement>();
  return (
    <ul ref={list} className="dp-grid mu-reveal" data-group={group}>
      {departments
        .filter((department) => department.group === group)
        .map((department) => (
          <DepartmentCard
            key={department.slug}
            department={department}
            highlighted={highlight === department.slug}
          />
        ))}
    </ul>
  );
}

export function Departments() {
  const enabled = useContext(InteractionMotion);
  const { hash } = useLocation();
  const [activeGroup, setActiveGroup] = useState<string>(
    departmentGroups[0].id,
  );
  const [highlight, setHighlight] = useState("");
  // Keeps the scroll spy from overriding a chosen group while the glide runs.
  const hold = useRef(0);

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    const department = departments.find((item) => item.slug === id);
    if (!department && !departmentGroups.some((group) => group.id === id))
      return;
    let cancelled = false;
    let frame = 0;
    let timer = 0;
    // The shell scrolls a new page to the top after this effect, so wait a frame.
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (!target) return;
        window.scrollTo({ top: targetTop(target), behavior: "instant" });
        if (department) {
          setActiveGroup(department.group);
          setHighlight(department.slug);
          timer = window.setTimeout(() => setHighlight(""), 2400);
          target.focus({ preventScroll: true });
        } else {
          setActiveGroup(id);
          target.querySelector("h2")?.focus({ preventScroll: true });
        }
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [hash]);

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const update = () => {
      frame = 0;
      const wait = hold.current - performance.now();
      if (wait > 0) {
        window.clearTimeout(timer);
        timer = window.setTimeout(schedule, wait);
        return;
      }
      // The current group is the last one whose top has passed mid-screen.
      const line = window.innerHeight / 2;
      let current: string = departmentGroups[0].id;
      for (const group of departmentGroups) {
        const top = document
          .getElementById(group.id)
          ?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = group.id;
      }
      setActiveGroup(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const release = () => {
      hold.current = 0;
      schedule();
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("scrollend", release);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scrollend", release);
    };
  }, []);

  const jumpToGroup = (id: string, event: MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById(id);
    if (!section) return;
    // Lenis claims in-page anchors on window, even modified clicks; keep them all from it.
    event.stopPropagation();
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    setActiveGroup(id);
    hold.current = performance.now() + (enabled ? 1200 : 0);
    const top = targetTop(section);
    // A native smooth scroll would be cancelled by a Lenis glide still in flight.
    const lenis = enabled ? siteScroller() : undefined;
    if (lenis && !lenis.isStopped) lenis.scrollTo(top, { duration: 0.8 });
    else window.scrollTo({ top, behavior: enabled ? "smooth" : "instant" });
    section.querySelector("h2")?.focus({ preventScroll: true });
  };

  return (
    <div className="mp-page dp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <Building2 size={14} aria-hidden="true" />
            Departments
          </>
        }
        title={"Every department.\nOne campus."}
        description="Nine specialty OPDs and seven Unani OPDs, backed by a 24-hour casualty, inpatient wards, diagnostics and two pharmacies."
      >
        <FactChips items={departmentFacts} label="At a glance" />
      </PageTitle>
      <div className="dp-switch">
        <LiquidSegments
          label="Department groups"
          items={groupSegments}
          active={activeGroup}
          onSelect={jumpToGroup}
        />
      </div>
      {departmentGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="dp-group"
          aria-labelledby={`${group.id}-title`}
        >
          <div className="sx-head" data-align="split">
            <h2 id={`${group.id}-title`} tabIndex={-1}>
              {group.title}
              <br />
              <em>{group.accent}</em>
            </h2>
            <p>{group.lead}</p>
          </div>
          <DepartmentGrid group={group.id} highlight={highlight} />
        </section>
      ))}
      <section className="sx-section dp-hours" aria-labelledby="dp-hours">
        <SectionHead
          id="dp-hours"
          align="split"
          title="OPD six days."
          accent="Wards every day."
          lead="OPD runs Monday to Saturday, approx. 8:30 am–8:30 pm, and timings vary by doctor. The hospital, casualty and wards stay open 24 hours."
        />
        <WeekStrip open={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} />
        <SplitBar
          className="dp-beds"
          caption="100 inpatient beds across three wings"
          parts={wardBeds}
          unit="beds"
        />
      </section>
      <ContactBand />
    </div>
  );
}
