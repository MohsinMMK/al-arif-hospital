import { ArrowUpRight, Leaf, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { doctorPages } from "./data";
import {
  departmentGroups,
  departmentPath,
  departments,
  type Department,
  type DepartmentGroup,
} from "./department-data";
import "./care-menu.css";

// The two wings side by side, so a patient sees both traditions in one place.
const wings: { id: DepartmentGroup; title: string; icon: LucideIcon }[] = [
  { id: "general", title: "General hospital", icon: Stethoscope },
  { id: "unani", title: "Unani care", icon: Leaf },
];

const onwardLinks = [
  ["All departments", "/site/departments"],
  ["Find a doctor", "/site/doctors"],
  ["Care & services", "/site/services"],
  ["Pharmacy", "/site/pharmacy"],
];

// One clinician goes straight to their profile; several open the roster filtered to them.
function doctorsLink({ slug, doctorSlugs = [] }: Department) {
  return doctorSlugs.length === 1
    ? `/site/doctors/${doctorSlugs[0]}`
    : `/site/doctors?department=${slug}`;
}

function DepartmentRow({
  department,
  onNavigate,
}: {
  department: Department;
  onNavigate: () => void;
}) {
  const { name, english, icon: Icon, to, slug } = department;
  const doctorCount = doctorPages.filter((doctor) =>
    department.doctorSlugs?.includes(doctor.slug),
  ).length;
  // Unani OPDs lead with the plain-English name; the classical one sits beneath.
  const title = english ?? name;
  return (
    <li className="cm-row">
      <Link to={to ?? departmentPath(slug)} onClick={onNavigate}>
        <Icon size={16} aria-hidden="true" />
        <span>
          {title}
          {english && <small>{name}</small>}
        </span>
      </Link>
      {doctorCount > 0 && (
        <Link
          className="cm-doctors"
          to={doctorsLink(department)}
          onClick={onNavigate}
          aria-label={`${doctorCount === 1 ? "The doctor" : `${doctorCount} doctors`} in ${title}`}
        >
          {doctorCount === 1 ? "1 doctor" : `${doctorCount} doctors`}
        </Link>
      )}
    </li>
  );
}

/** The care map: both wings with their departments, the 24-hour services and onward links. */
export function CareLinks({ onNavigate }: { onNavigate: () => void }) {
  const roundTheClock = departments.filter(
    (department) => department.group === "round-the-clock",
  );
  return (
    <div className="cm-links">
      <div className="cm-wings">
        {wings.map(({ id, title, icon: Icon }) => {
          const group = departmentGroups.find((item) => item.id === id);
          return (
            <div key={id} className="cm-wing" data-wing={id}>
              <p className="cm-title">
                <span>
                  <Icon size={18} aria-hidden="true" />
                </span>
                {title}
                {group && <small>{group.accent}</small>}
              </p>
              <ul>
                {departments
                  .filter((department) => department.group === id)
                  .map((department) => (
                    <DepartmentRow
                      key={department.slug}
                      department={department}
                      onNavigate={onNavigate}
                    />
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="cm-foot">
        <p>
          <strong>Open 24 hours</strong>
          {roundTheClock.map(({ slug, name }) => (
            <Link key={slug} to={departmentPath(slug)} onClick={onNavigate}>
              {name}
            </Link>
          ))}
        </p>
        <ul className="cm-onward">
          {onwardLinks.map(([label, path]) => (
            <li key={path}>
              <Link to={path} onClick={onNavigate}>
                {label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
