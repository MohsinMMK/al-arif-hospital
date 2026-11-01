import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BedDouble, Building2, Pill, Siren } from "lucide-react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Leaf,
  Phone,
  Stethoscope,
} from "@/components/animated-icons";
import { doctorPages, servicePages } from "./data";
import { departmentGroups, departments, wardBeds } from "./department-data";
import type { Department, DepartmentGroup } from "./department-data";
import { InteractionMotion } from "./interaction-context";
import { LiquidSegments, SplitBar, useReveal } from "./motion-ui";
import type { Segment } from "./motion-ui";
import { PageTitle } from "./primitives";
import { FactChips, SectionHead, WeekStrip } from "./sections";
import type { IconFact } from "./sections";
import {
  jumpToSection,
  scrollOnArrival,
  sectionTop,
  useSectionSpy,
} from "./useSiteScroll";
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

const groupIds = departmentGroups.map((group) => group.id);

/** A card sits below the sticky group switch as well as the header. */
const targetTop = (target: HTMLElement) =>
  sectionTop(target) - (target.classList.contains("dp-card") ? 88 : 0);

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

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    const department = departments.find((item) => item.slug === id);
    if (!department && !departmentGroups.some((group) => group.id === id))
      return;
    let timer = 0;
    const stop = scrollOnArrival(() => {
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
    return () => {
      stop();
      window.clearTimeout(timer);
    };
  }, [hash]);

  // Keeps the scroll spy from overriding a chosen group while the glide runs.
  const hold = useSectionSpy(groupIds, setActiveGroup);

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
          onSelect={(id, event) =>
            jumpToSection(id, event, {
              enabled,
              hold,
              setActive: setActiveGroup,
              top: targetTop,
            })
          }
        />
      </div>
      {departmentGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="dp-group"
          aria-labelledby={`${group.id}-title`}
        >
          <SectionHead
            id={`${group.id}-title`}
            align="split"
            title={group.title}
            accent={group.accent}
            lead={group.lead}
            focusable
          />
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
    </div>
  );
}
