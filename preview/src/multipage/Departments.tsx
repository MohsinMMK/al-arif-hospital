import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BedDouble, Pill, ScanLine, Siren, Sprout } from "lucide-react";
import {
  ArrowUpRight,
  Check,
  Clock,
  HeartPulse,
  Phone,
  Users,
} from "@/components/animated-icons";
import { doctorPages, servicePages, wingOf } from "./data";
import {
  departmentGroups,
  departments,
  movedAnchor,
  sharedSections,
  wardBeds,
  wings,
} from "./department-data";
import type { Department, Wing } from "./department-data";
import { CareService, CareTeam } from "./CareDirectory";
import { InteractionMotion } from "./interaction-context";
import { LiquidSegments, SplitBar, useReveal } from "./motion-ui";
import type { Segment } from "./motion-ui";
import { PageTitle } from "./primitives";
import { ExploreTiles, FactChips, SectionHead, WeekStrip } from "./sections";
import type { Destination, IconFact } from "./sections";
import {
  jumpToSection,
  scrollOnArrival,
  sectionTop,
  useSectionSpy,
} from "./useSiteScroll";
import "./departments.css";

type CardSection = { id: string; items: Department[] };

/** A card sits below the sticky switch, where a page has one, as well as the header. */
const targetTop = (target: HTMLElement) =>
  sectionTop(target) -
  (target.classList.contains("dp-card")
    ? document.querySelector(".dp-switch")
      ? 88
      : 24
    : 0);

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
  items,
  tone,
  highlight,
}: {
  items: Department[];
  tone: string;
  highlight: string;
}) {
  const list = useReveal<HTMLUListElement>();
  return (
    <ul ref={list} className="dp-grid mu-reveal" data-group={tone}>
      {items.map((department) => (
        <DepartmentCard
          key={department.slug}
          department={department}
          highlighted={highlight === department.slug}
        />
      ))}
    </ul>
  );
}

/**
 * Glides to the department or section a link names and highlights a card for a moment.
 * An anchor that now lives on another page, from an old Departments link, follows it there.
 */
function useArrival(sections: CardSection[], setActive?: (id: string) => void) {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [highlight, setHighlight] = useState("");

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;
    const section = sections.find(
      (item) =>
        item.id === id ||
        item.items.some((department) => department.slug === id),
    );
    if (!section) {
      const moved = movedAnchor(id);
      if (moved) navigate(moved, { replace: true });
      return;
    }
    const isCard = section.id !== id;
    let timer = 0;
    const stop = scrollOnArrival(() => {
      const target = document.getElementById(id);
      if (!target) return;
      window.scrollTo({ top: targetTop(target), behavior: "instant" });
      setActive?.(section.id);
      if (isCard) {
        setHighlight(id);
        timer = window.setTimeout(() => setHighlight(""), 2400);
        target.focus({ preventScroll: true });
      } else {
        target.querySelector("h2")?.focus({ preventScroll: true });
      }
    });
    return () => {
      stop();
      window.clearTimeout(timer);
    };
  }, [hash, sections, setActive, navigate]);

  return highlight;
}

// The shared services every wing page points to, so neither wing hides them.
const sharedTiles: Destination[] = [
  {
    to: "/site/services#round-the-clock",
    icon: Siren,
    title: "Round the clock",
    detail: "Casualty, ICU, theatre, maternity and ambulance",
  },
  {
    to: "/site/services#diagnostics",
    icon: ScanLine,
    title: "Diagnostics",
    detail: "Pathology and radiology on campus",
  },
  {
    to: "/site/services#pharmacy",
    icon: Pill,
    title: "Pharmacy & garden",
    detail: "Two pharmacies, raw drugs and the herbal garden",
  },
];

// Each wing page, worked out once: its departments, care pages and doctors.
const wingPages = wings.map((wing) => {
  const group = departmentGroups.find((item) => item.id === wing.id);
  const items = departments.filter((item) => item.group === wing.id);
  const services = servicePages.filter((item) => item.wing === wing.name);
  const doctors = doctorPages.filter((doctor) => wingOf(doctor) === wing.name);
  const other = wings.find((item) => item.id !== wing.id) as Wing;
  const facts: IconFact[] = [
    {
      icon: wing.icon,
      label: `${items.length} ${wing.id === "general" ? "specialty" : "Unani"} OPDs`,
    },
    { icon: Users, label: `${doctors.length} doctors` },
    { icon: Clock, label: "OPD Monday to Saturday" },
    { icon: Siren, label: "Casualty open 24 hours" },
  ];
  const tiles: Destination[] = [
    ...sharedTiles,
    {
      to: other.path,
      icon: other.icon,
      title: other.name,
      detail: `The other wing: ${other.emphasis.toLowerCase().replace(/\.$/, "")}`,
    },
  ];
  return {
    wing,
    group,
    items,
    services,
    doctors,
    facts,
    tiles,
    sections: [{ id: "departments", items }],
  };
});

/** A wing's own page: its departments, its care pages and its team, with the shared services after. */
export function WingPage({ id }: { id: Wing["id"] }) {
  const page = wingPages.find((item) => item.wing.id === id) ?? wingPages[0];
  const { wing, group, items, services, doctors, facts, tiles, sections } =
    page;
  const highlight = useArrival(sections);
  const Icon = wing.icon;
  return (
    <div className="wg-page" data-wing={wing.id}>
      <div className="mp-page dp-page">
        <PageTitle
          align="center"
          eyebrow={
            <>
              <Icon size={14} aria-hidden="true" />
              {wing.name}
            </>
          }
          title={`${wing.name}.\n${wing.emphasis}`}
          description={wing.introduction}
        >
          <FactChips items={facts} label="At a glance" />
        </PageTitle>
        <section
          id="departments"
          className="dp-group"
          aria-labelledby="departments-title"
        >
          <SectionHead
            id="departments-title"
            align="split"
            title="Departments."
            accent={group?.accent ?? ""}
            lead={group?.lead}
            focusable
          />
          <DepartmentGrid items={items} tone={wing.id} highlight={highlight} />
        </section>
      </div>
      <section
        className={`care-wing care-wing-${wing.id === "general" ? "general-hospital" : "unani-care"}`}
        data-band
        aria-labelledby="wing-care-title"
      >
        <div className="care-wing-inner">
          <div className="care-wing-services">
            <div className="care-wing-heading">
              <Icon size={46} aria-hidden="true" />
              <h2 id="wing-care-title">
                Care pages.
                <br />
                <em>Read before you visit.</em>
              </h2>
              <p>
                Each page explains the care, who offers it and what to ask
                reception before you come in.
              </p>
            </div>
            <div className="care-service-list">
              {services.map((service) => (
                <CareService key={service.slug} service={service} />
              ))}
            </div>
          </div>
          <CareTeam
            doctors={doctors}
            title={`Meet the ${wing.name.toLowerCase()} team.`}
            id="wing-team"
            headingLevel={3}
          />
        </div>
      </section>
      <div className="mp-page">
        <section className="sx-section" aria-labelledby="wing-shared">
          <SectionHead
            id="wing-shared"
            title="Also open to you."
            accent="Shared by both wings."
            lead="Casualty, diagnostics and the pharmacies serve the whole campus, so your doctor can call on them whichever wing you start in."
          />
          <ExploreTiles
            items={tiles}
            label="Shared services and the other wing"
          />
        </section>
      </div>
    </div>
  );
}

const sharedIcons: Record<string, typeof Siren> = {
  "round-the-clock": Siren,
  diagnostics: ScanLine,
  pharmacy: Pill,
};

const sharedSegments: Segment[] = sharedSections.map((section) => {
  const Icon = sharedIcons[section.id];
  return {
    id: section.id,
    label: section.short,
    detail: `${section.items.length}`,
    icon: <Icon size={18} aria-hidden="true" />,
  };
});

const sharedIds = sharedSections.map((section) => section.id);

const serviceFacts: IconFact[] = [
  { icon: Siren, label: "Casualty open 24 hours" },
  { icon: BedDouble, label: "100 inpatient beds" },
  { icon: Pill, label: "2 licensed pharmacies" },
  { icon: Sprout, label: "Medicinal herbal garden" },
];

const wingTiles: Destination[] = wings.map((wing) => ({
  to: wing.path,
  icon: wing.icon,
  title: wing.name,
  detail: `${departments.filter((item) => item.group === wing.id).length} OPDs. ${wing.emphasis}`,
}));

/** The services both wings share: round-the-clock care, diagnostics and the pharmacies. */
export function SharedServices() {
  const enabled = useContext(InteractionMotion);
  const { search } = useLocation();
  const [active, setActive] = useState<string>(sharedSections[0].id);
  const highlight = useArrival(sharedSections, setActive);
  // Keeps the scroll spy from overriding a chosen group while the glide runs.
  const hold = useSectionSpy(sharedIds, setActive);

  // The old Care & services page filtered by wing; each wing now has its own page.
  const wing = new URLSearchParams(search).get("wing");
  if (wing === "general" || wing === "unani")
    return <Navigate to={`/site/${wing}`} replace />;

  return (
    <div className="mp-page dp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <HeartPulse size={14} aria-hidden="true" />
            Services
          </>
        }
        title={"Shared services.\nFor both wings."}
        description="Casualty, critical care, theatre, maternity, diagnostics and the pharmacies share one campus with the general hospital and Unani care."
      >
        <FactChips items={serviceFacts} label="At a glance" />
      </PageTitle>
      <div className="dp-switch">
        <LiquidSegments
          label="Service groups"
          items={sharedSegments}
          active={active}
          onSelect={(id, event) =>
            jumpToSection(id, event, {
              enabled,
              hold,
              setActive,
              top: targetTop,
            })
          }
        />
      </div>
      {sharedSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="dp-group"
          aria-labelledby={`${section.id}-title`}
        >
          <SectionHead
            id={`${section.id}-title`}
            align="split"
            title={section.title}
            accent={section.accent}
            lead={section.lead}
            focusable
          />
          <DepartmentGrid
            items={section.items}
            tone={section.id}
            highlight={highlight}
          />
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
      <section className="sx-section" aria-labelledby="services-wings">
        <SectionHead
          id="services-wings"
          title="Start with a wing."
          accent="Reception guides the rest."
          lead="Reception directs you to a general or Unani OPD. Your doctor calls on the shared services as you need them."
        />
        <ExploreTiles items={wingTiles} label="The two wings" />
      </section>
      <p className="mp-source-note">
        Please confirm service availability, fees and consultation arrangements
        with reception.
      </p>
    </div>
  );
}

/** The old Departments page: each anchor goes to its new home, everything else to the General page. */
export function DepartmentsRedirect() {
  const { hash } = useLocation();
  return (
    <Navigate
      to={movedAnchor(decodeURIComponent(hash.slice(1))) ?? "/site/general"}
      replace
    />
  );
}
