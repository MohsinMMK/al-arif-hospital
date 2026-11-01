// Adapted from David Haz's React Bits SpotlightCard (MIT + Commons Clause).
// https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx
// License retained in ./LICENSE.md. Adaptations: semantic route link, motion preference,
// touch exclusion, centered clinical identity and keyboard-focus treatment.
import { useContext, useRef } from "react";
import type { PointerEventHandler } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@/components/animated-icons";
import { InteractionMotion } from "@/multipage/interaction-context";
import { initialsOf, type DoctorProfile } from "@/multipage/data";

export function DoctorSpotlight({
  doctor,
  headingLevel = 3,
}: {
  doctor: DoctorProfile;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  const link = useRef<HTMLAnchorElement>(null);
  const enabled = useContext(InteractionMotion);
  const initials = initialsOf(doctor.name);
  const handlePointerMove: PointerEventHandler<HTMLAnchorElement> = (event) => {
    if (!enabled || event.pointerType === "touch" || !link.current) return;
    const bounds = link.current.getBoundingClientRect();
    link.current.style.setProperty(
      "--mouse-x",
      `${event.clientX - bounds.left}px`,
    );
    link.current.style.setProperty(
      "--mouse-y",
      `${event.clientY - bounds.top}px`,
    );
  };
  return (
    <Link
      ref={link}
      to={`/site/doctors/${doctor.slug}`}
      className="doctor-spotlight"
      onPointerMove={handlePointerMove}
    >
      <span className="doctor-spotlight-wash" aria-hidden="true" />
      <span className="doctor-monogram" aria-hidden="true">
        {initials}
      </span>
      <Heading>{doctor.name}</Heading>
      <p>{doctor.role}</p>
      <span className="doctor-profile-link">
        View profile <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}
