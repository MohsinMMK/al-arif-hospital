import { Link } from "react-router-dom";
import { ArrowUpRight } from "@/components/animated-icons";
import { DoctorSpotlight } from "@/components/react-bits/DoctorSpotlight";
import { doctorPages } from "./data";
import type { DoctorProfile, Service } from "./data";
import { TiltLight, useTilt } from "./motion-ui";

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

/** A care page as a card: what it is, and the doctors who offer it. */
export function CareService({ service }: { service: Service }) {
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
