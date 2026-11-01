import { Pill, ScanLine, Siren } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "@/components/animated-icons";
import { Link } from "react-router-dom";
import { hospital } from "@/hospital";
import { doctorPages, servicePages } from "./data";
import {
  departmentGroups,
  departmentPath,
  departments,
  sharedSections,
  type Department,
  type Wing,
} from "./department-data";
import "./care-menu.css";

// One clinician goes straight to their profile; several open the roster filtered to them.
function doctorsLink({ slug, doctorSlugs = [] }: Department) {
  return doctorSlugs.length === 1
    ? `/site/doctors/${doctorSlugs[0]}`
    : `/site/doctors?department=${slug}`;
}

function DepartmentRow({
  department,
  to,
  onNavigate,
}: {
  department: Department;
  to: string;
  onNavigate: () => void;
}) {
  const { name, english, icon: Icon } = department;
  const doctorCount = doctorPages.filter((doctor) =>
    department.doctorSlugs?.includes(doctor.slug),
  ).length;
  // Unani OPDs lead with the plain-English name; the classical one sits beneath.
  const title = english ?? name;
  return (
    <li className="cm-row">
      <Link to={to} onClick={onNavigate}>
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

function Onward({
  links,
  onNavigate,
}: {
  links: [string, string][];
  onNavigate: () => void;
}) {
  return (
    <ul className="cm-onward">
      {links.map(([label, path]) => (
        <li key={path}>
          <Link to={path} onClick={onNavigate}>
            {label}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** One wing's map: its departments, its care pages and its doctors. Both wings share this shape. */
export function WingLinks({
  wing,
  onNavigate,
}: {
  wing: Wing;
  onNavigate: () => void;
}) {
  const { id, name, short, path, icon: Icon } = wing;
  const group = departmentGroups.find((item) => item.id === id);
  const services = servicePages.filter((service) => service.wing === name);
  return (
    <div className="cm-links" data-wing={id}>
      <div className="cm-cols">
        <div className="cm-col">
          <p className="cm-title">
            <span>
              <Icon size={18} aria-hidden="true" />
            </span>
            {name}
            {group && <small>{group.accent}</small>}
          </p>
          <ul>
            {departments
              .filter((department) => department.group === id)
              .map((department) => (
                <DepartmentRow
                  key={department.slug}
                  department={department}
                  to={department.to ?? departmentPath(department.slug)}
                  onNavigate={onNavigate}
                />
              ))}
          </ul>
        </div>
        <div className="cm-col cm-side">
          <p className="cm-label">Care pages</p>
          <ul className="cm-pages">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/site/services/${service.slug}`}
                  onClick={onNavigate}
                >
                  {service.name}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="cm-foot">
        <Onward
          links={[
            [`All ${short} departments`, path],
            [`Doctors in ${short}`, `/site/doctors?wing=${id}`],
          ]}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}

const sharedIcons: Record<string, LucideIcon> = {
  "round-the-clock": Siren,
  diagnostics: ScanLine,
  pharmacy: Pill,
};

/** The services both wings share: round-the-clock care, diagnostics and the pharmacies. */
export function SharedServiceLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="cm-links" data-wing="shared">
      <div className="cm-cols" data-count="3">
        {sharedSections.map(({ id, label, items }) => {
          const Icon = sharedIcons[id];
          return (
            <div key={id} className="cm-col">
              <p className="cm-title">
                <span>
                  <Icon size={18} aria-hidden="true" />
                </span>
                {label}
              </p>
              <ul>
                {items.map((department) => (
                  <DepartmentRow
                    key={department.slug}
                    department={department}
                    to={`/site/services#${department.slug}`}
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
          <a href={hospital.emergencyHref}>Emergency line</a>
        </p>
        <Onward
          links={[
            ["All services", "/site/services"],
            ["Pharmacy & manufacturing", "/site/pharmacy"],
          ]}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
