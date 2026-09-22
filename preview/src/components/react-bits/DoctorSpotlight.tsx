// Adapted from David Haz's React Bits SpotlightCard (MIT + Commons Clause).
// https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx
// License retained in ./LICENSE.md. Adaptations: semantic route link, motion preference,
// touch exclusion, centered clinical identity and keyboard-focus treatment.
import { useContext, useRef } from "react";
import type { PointerEventHandler } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { InteractionMotion } from "@/multipage/interaction-context";
import type { DoctorProfile } from "@/multipage/data";

export function DoctorSpotlight({ doctor }: { doctor: DoctorProfile }) {
  const link = useRef<HTMLAnchorElement>(null);
  const enabled = useContext(InteractionMotion);
  const initials = doctor.name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
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
      <h3>{doctor.name}</h3>
      <p>{doctor.role}</p>
      <span className="doctor-profile-link">
        View profile <ArrowUpRight size={17} />
      </span>
    </Link>
  );
}
