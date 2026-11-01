import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Leaf,
  Stethoscope,
  X,
} from "@/components/animated-icons";
import { DoctorSpotlight } from "@/components/react-bits/DoctorSpotlight";
import { doctorPages, servicePages } from "./data";
import type { DoctorProfile, Service } from "./data";
import { InteractionMotion } from "./interaction-context";
import { LiquidSegments, TiltLight, useTilt } from "./motion-ui";
import type { Segment } from "./motion-ui";
import { SearchField } from "./primitives";
import { useFlipList } from "./Stories";
import {
  jumpToSection,
  scrollOnArrival,
  sectionTop,
  useSectionSpy,
} from "./useSiteScroll";

const careWings = [
  {
    id: "general-hospital",
    name: "General hospital",
    emphasis: "Care for everyday life.",
    introduction:
      "From everyday health concerns to maternity, child health and surgery, find the service that fits the conversation you need.",
  },
  {
    id: "unani-care",
    name: "Unani care",
    emphasis: "Time to listen.",
    introduction:
      "A consultation starts with your health history, daily life and questions. Explore seven Unani OPDs, regimental therapy and the Unani pharmacy.",
  },
] satisfies {
  id: string;
  name: Service["wing"];
  emphasis: string;
  introduction: string;
}[];

const wingIds = careWings.map((wing) => wing.id);

// Each wing's services, and the doctors who offer them.
const wingSections = careWings.map((wing) => {
  const services = servicePages.filter((service) => service.wing === wing.name);
  const doctors = doctorPages.filter((doctor) =>
    services.some((service) => service.doctorSlugs.includes(doctor.slug)),
  );
  return { ...wing, services, doctors };
});

const wingSegments: Segment[] = wingSections.map((wing) => ({
  id: wing.id,
  label: wing.name,
  detail: `${wing.services.length} services`,
  icon:
    wing.name === "General hospital" ? (
      <Stethoscope size={18} aria-hidden="true" />
    ) : (
      <Leaf size={18} aria-hidden="true" />
    ),
}));

// The words a search matches, written once for each service and doctor.
const searchableServices = servicePages.map((service) => {
  const names = doctorPages
    .filter((doctor) => service.doctorSlugs.includes(doctor.slug))
    .map((doctor) => doctor.name)
    .join(" ");
  const text =
    `${service.name} ${service.wing} ${service.intro} ${service.topics.join(" ")} ${names}`.toLowerCase();
  return { service, text };
});
const searchableDoctors = doctorPages.map((doctor) => {
  const services = servicePages
    .filter((service) => service.doctorSlugs.includes(doctor.slug))
    .map((service) => `${service.name} ${service.wing}`)
    .join(" ");
  const text =
    `${doctor.name} ${doctor.honorific ?? ""} ${doctor.role} ${doctor.designation} ${doctor.department} ${doctor.degrees} ${services}`.toLowerCase();
  return { doctor, text };
});

export function CareTeam({
  doctors,
  title,
  id,
  headingLevel = 2,
}: {
  doctors: DoctorProfile[];
  title: string;
  id: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="care-team" aria-labelledby={id}>
      <div className="care-team-heading">
        <Heading id={id}>{title}</Heading>
        <p>Explore their profiles and the care they provide.</p>
      </div>
      <div className="care-team-roster">
        {doctors.map((doctor) => (
          <DoctorSpotlight
            key={doctor.slug}
            doctor={doctor}
            headingLevel={headingLevel === 2 ? 3 : 4}
          />
        ))}
      </div>
      <p className="care-team-note">
        Reception confirms current clinician schedules and consultation details.
      </p>
    </section>
  );
}

function CareService({ service }: { service: Service }) {
  const doctors = doctorPages.filter((doctor) =>
    service.doctorSlugs.includes(doctor.slug),
  );
  const tilt = useTilt<HTMLElement>({ max: 2 });
  return (
    <article ref={tilt} className="care-service mu-tilt">
      <TiltLight />
      <Link
        className="care-service-route"
        to={`/site/services/${service.slug}`}
        aria-labelledby={`care-service-${service.slug}`}
      >
        <h3 id={`care-service-${service.slug}`}>{service.name}</h3>
        <ArrowUpRight size={22} aria-hidden="true" />
        <p>{service.intro}</p>
      </Link>
      {doctors.length ? (
        <div className="care-service-doctors">
          <span>With</span>
          {doctors.map((doctor) => (
            <Link key={doctor.slug} to={`/site/doctors/${doctor.slug}`}>
              {doctor.name} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : (
        <p className="care-service-support">
          {service.support?.label ?? "Reception confirms the clinician"}
        </p>
      )}
    </article>
  );
}

export function CareDirectory() {
  const enabled = useContext(InteractionMotion);
  const [query, setQuery] = useState("");
  const [activeWing, setActiveWing] = useState(careWings[0].id);
  const searchInput = useRef<HTMLInputElement>(null);
  const { root: resultsRoot, capture: captureResults } =
    useFlipList<HTMLDivElement>();
  const { hash, search } = useLocation();
  const term = query.toLowerCase().trim();
  const matchingServices = term
    ? searchableServices
        .filter(({ text }) => text.includes(term))
        .map(({ service }) => service)
    : [];
  const matchingDoctors = term
    ? searchableDoctors
        .filter(({ text }) => text.includes(term))
        .map(({ doctor }) => doctor)
    : [];
  const resultCount = matchingServices.length + matchingDoctors.length;
  const clearSearch = () => {
    captureResults();
    setQuery("");
    searchInput.current?.focus();
  };

  useEffect(() => {
    // Existing wing links/bookmarks now lead to a section, without hiding the other wing.
    const wing = new URLSearchParams(search).get("wing");
    const id =
      hash.slice(1) ||
      (wing === "general"
        ? "general-hospital"
        : wing === "unani"
          ? "unani-care"
          : "");
    if (!careWings.some((section) => section.id === id)) return;
    return scrollOnArrival(() => {
      const section = document.getElementById(id);
      if (!section) return;
      window.scrollTo({ top: sectionTop(section), behavior: "instant" });
      section.querySelector("h2")?.focus({ preventScroll: true });
    });
  }, [hash, search]);

  // While a switch jump glides past the other wing, the scrollspy waits.
  const hold = useSectionSpy(wingIds, setActiveWing);

  return (
    <>
      <div className="care-directory-intro">
        <h1>
          A place to start.
          <br />
          <em>A path to your care.</em>
        </h1>
        <div className="care-directory-help">
          <p>
            Explore general hospital and Unani care. Find your service, meet the
            team, and plan your visit.
          </p>
          <SearchField
            id="care-search"
            label="Find a service or doctor"
            placeholder="Service or doctor’s name"
            value={query}
            onChange={(value) => {
              captureResults();
              setQuery(value);
            }}
            onClear={clearSearch}
            controls="care-search-results"
            ref={searchInput}
            className="care-search"
          />
        </div>
      </div>
      <div
        ref={resultsRoot}
        id="care-search-results"
        className="care-search-results"
      >
        <p role="status" className={term ? "care-search-status" : "sr-only"}>
          {term
            ? `${resultCount} ${resultCount === 1 ? "result" : "results"} for “${query.trim()}”`
            : ""}
        </p>
        {term &&
          (resultCount ? (
            <div className="care-search-groups">
              {matchingServices.length > 0 && (
                <section aria-labelledby="care-search-services">
                  <h2 id="care-search-services" data-flip="services-title">
                    Services
                  </h2>
                  {matchingServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/site/services/${service.slug}`}
                      data-flip={`service-${service.slug}`}
                    >
                      <span>
                        {service.name}
                        <small>{service.wing}</small>
                      </span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  ))}
                </section>
              )}
              {matchingDoctors.length > 0 && (
                <section aria-labelledby="care-search-doctors">
                  <h2 id="care-search-doctors" data-flip="doctors-title">
                    Doctors
                  </h2>
                  {matchingDoctors.map((doctor) => (
                    <Link
                      key={doctor.slug}
                      to={`/site/doctors/${doctor.slug}`}
                      data-flip={`doctor-${doctor.slug}`}
                    >
                      <span>
                        {doctor.name}
                        <small>{doctor.role}</small>
                      </span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  ))}
                </section>
              )}
            </div>
          ) : (
            <div className="care-search-empty" data-flip="empty">
              <h2>No matching service or doctor.</h2>
              <p>Try a different word, or explore both care sections below.</p>
              <button type="button" onClick={clearSearch}>
                Clear search <X size={16} aria-hidden="true" />
              </button>
            </div>
          ))}
      </div>
      <div className="care-wings" data-band>
        <div className="care-wing-switch">
          <LiquidSegments
            label="Care sections"
            items={wingSegments}
            active={activeWing}
            onSelect={(id, event) =>
              jumpToSection(id, event, {
                enabled,
                hold,
                setActive: setActiveWing,
              })
            }
          />
        </div>
        {wingSections.map(({ services, doctors, ...wing }) => {
          return (
            <section
              key={wing.id}
              id={wing.id}
              className={`care-wing care-wing-${wing.id}`}
              data-band
              aria-labelledby={`${wing.id}-title`}
            >
              <div className="care-wing-inner">
                <div className="care-wing-services">
                  <div className="care-wing-heading">
                    {wing.name === "General hospital" ? (
                      <Stethoscope size={46} aria-hidden="true" />
                    ) : (
                      <Leaf size={46} aria-hidden="true" />
                    )}
                    <h2 id={`${wing.id}-title`} tabIndex={-1}>
                      {wing.name}.<br />
                      <em>{wing.emphasis}</em>
                    </h2>
                    <p>{wing.introduction}</p>
                  </div>
                  <div className="care-service-list">
                    {services.map((service) => (
                      <CareService key={service.slug} service={service} />
                    ))}
                  </div>
                </div>
                <CareTeam
                  doctors={doctors}
                  title={
                    wing.name === "General hospital"
                      ? "Meet the general hospital team."
                      : "Meet the Unani care team."
                  }
                  id={`${wing.id}-team`}
                  headingLevel={3}
                />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
