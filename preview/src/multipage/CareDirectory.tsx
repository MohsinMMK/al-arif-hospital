import { useContext, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Leaf, Search, Stethoscope, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DoctorSpotlight } from "@/components/react-bits/DoctorSpotlight";
import { doctorPages, servicePages } from "./data";
import type { DoctorProfile, Service } from "./data";
import { InteractionMotion } from "./interaction-context";
import { LiquidSegments, TiltLight, useTilt } from "./motion-ui";
import type { Segment } from "./motion-ui";
import { useFlipList } from "./Stories";
import { siteScroller } from "./useSiteScroll";

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

const wingSegments: Segment[] = careWings.map((wing) => ({
  id: wing.id,
  label: wing.name,
  detail: `${servicePages.filter((service) => service.wing === wing.name).length} services`,
  icon:
    wing.name === "General hospital" ? (
      <Stethoscope size={18} aria-hidden="true" />
    ) : (
      <Leaf size={18} aria-hidden="true" />
    ),
}));

const headerOffset = () =>
  document.querySelector(".mp-header")?.getBoundingClientRect().height ?? 90;

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
  // While a switch jump glides past the other wing, the scrollspy waits.
  const hold = useRef(0);
  const searchInput = useRef<HTMLInputElement>(null);
  const { root: resultsRoot, capture: captureResults } =
    useFlipList<HTMLDivElement>();
  const { hash, search } = useLocation();
  const term = query.toLowerCase().trim();
  const matchingServices = term
    ? servicePages.filter((service) => {
        const names = doctorPages
          .filter((doctor) => service.doctorSlugs.includes(doctor.slug))
          .map((doctor) => doctor.name)
          .join(" ");
        return `${service.name} ${service.wing} ${service.intro} ${service.topics.join(" ")} ${names}`
          .toLowerCase()
          .includes(term);
      })
    : [];
  const matchingDoctors = term
    ? doctorPages.filter((doctor) => {
        const services = servicePages
          .filter((service) => service.doctorSlugs.includes(doctor.slug))
          .map((service) => `${service.name} ${service.wing}`)
          .join(" ");
        return `${doctor.name} ${doctor.honorific ?? ""} ${doctor.role} ${doctor.designation} ${doctor.department} ${doctor.degrees} ${services}`
          .toLowerCase()
          .includes(term);
      })
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
    let cancelled = false;
    let frame = 0;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        const section = document.getElementById(id);
        if (!section) return;
        window.scrollTo({
          top:
            section.getBoundingClientRect().top +
            window.scrollY -
            headerOffset(),
          behavior: "instant",
        });
        section.querySelector("h2")?.focus({ preventScroll: true });
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [hash, search]);

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
      // The current wing is the last one whose top has passed mid-screen.
      const line = window.innerHeight / 2;
      let current = careWings[0].id;
      for (const wing of careWings) {
        const top = document
          .getElementById(wing.id)
          ?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = wing.id;
      }
      setActiveWing(current);
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

  const jumpToWing = (id: string, event: MouseEvent<HTMLAnchorElement>) => {
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
    setActiveWing(id);
    hold.current = performance.now() + (enabled ? 1200 : 0);
    const top =
      section.getBoundingClientRect().top + window.scrollY - headerOffset();
    // A native smooth scroll would be cancelled by a Lenis glide still in flight.
    const lenis = enabled ? siteScroller() : undefined;
    if (lenis && !lenis.isStopped) lenis.scrollTo(top, { duration: 0.8 });
    else window.scrollTo({ top, behavior: enabled ? "smooth" : "instant" });
    section.querySelector("h2")?.focus({ preventScroll: true });
  };

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
          <label htmlFor="care-search">Find a service or doctor</label>
          <div className="mp-search care-search">
            <Search size={18} aria-hidden="true" />
            <Input
              id="care-search"
              ref={searchInput}
              placeholder="Service or doctor’s name"
              value={query}
              onChange={(event) => {
                captureResults();
                setQuery(event.target.value);
              }}
              aria-controls="care-search-results"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
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
      <div className="care-wings">
        <div className="care-wing-switch">
          <LiquidSegments
            label="Care sections"
            items={wingSegments}
            active={activeWing}
            onSelect={jumpToWing}
          />
        </div>
        {careWings.map((wing) => {
          const services = servicePages.filter(
            (service) => service.wing === wing.name,
          );
          const doctors = doctorPages.filter((doctor) =>
            services.some((service) =>
              service.doctorSlugs.includes(doctor.slug),
            ),
          );
          return (
            <section
              key={wing.id}
              id={wing.id}
              className={`care-wing care-wing-${wing.id}`}
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
