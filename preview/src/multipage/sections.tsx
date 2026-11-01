import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "@/components/animated-icons";
import type { LucideIcon } from "lucide-react";
import { RollingNumber, useReveal } from "./motion-ui";
import "./sections.css";

export type IconFact = { icon: LucideIcon; label: string };
export type Stat = { icon: LucideIcon; value: string; label: string };
export type Tile = {
  icon: LucideIcon;
  title: string;
  detail?: string;
  figure?: string;
};
export type FigureCard = {
  figure: string;
  unit: string;
  detail: string;
  feature?: boolean;
};
export type Destination = {
  to: string;
  icon: LucideIcon;
  title: string;
  detail: string;
};

/** Short facts read at a glance: an icon and a few words each. */
export function FactChips({
  items,
  label,
  oneRow,
}: {
  items: IconFact[];
  label?: string;
  /** Keeps the chips on one line on phones too, shrinking them to fit. */
  oneRow?: boolean;
}) {
  return (
    <ul
      className="sx-chips"
      data-one-row={oneRow || undefined}
      aria-label={label}
    >
      {items.map(({ icon: Icon, label: text }) => (
        <li key={text}>
          <Icon size={16} aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}

/** A section heading that can sit centred, split against its lead, or at the start. */
export function SectionHead({
  title,
  accent,
  lead,
  align = "center",
  id,
  focusable = false,
}: {
  title: string;
  accent: string;
  lead?: React.ReactNode;
  align?: "center" | "split" | "start";
  id?: string;
  /** Lets a jump to the section move focus to its heading. */
  focusable?: boolean;
}) {
  return (
    <div className="sx-head" data-align={align}>
      <h2 id={id} tabIndex={focusable ? -1 : undefined}>
        {title}
        <br />
        <em>{accent}</em>
      </h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

/** Edge-to-edge figures: each value rolls in once beside its icon. */
export function StatBand({
  items,
  label,
  tone = "dark",
}: {
  items: Stat[];
  label: string;
  tone?: "dark" | "sage";
}) {
  const list = useReveal<HTMLUListElement>();
  return (
    <section
      className="sx-band"
      data-tone={tone}
      data-band={tone === "sage" ? "" : undefined}
      aria-label={label}
    >
      <ul ref={list} className="sx-stats mu-reveal">
        {items.map(({ icon: Icon, value, label: text }) => (
          <li key={text}>
            <span className="sx-stat-icon">
              <Icon size={22} aria-hidden="true" />
            </span>
            <RollingNumber value={value} className="sx-stat-value" />
            <span className="sx-stat-label">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A grid of icon-led tiles; an optional figure replaces the detail's opening words. */
export function IconTiles({ items, label }: { items: Tile[]; label?: string }) {
  const list = useReveal<HTMLUListElement>();
  return (
    <ul ref={list} className="sx-tiles mu-reveal" aria-label={label}>
      {items.map(({ icon: Icon, title, detail, figure }) => (
        <li key={title}>
          <span className="sx-tile-icon">
            <Icon size={24} aria-hidden="true" />
          </span>
          {figure && <strong className="sx-tile-figure">{figure}</strong>}
          <h3>{title}</h3>
          {detail && <p>{detail}</p>}
        </li>
      ))}
    </ul>
  );
}

/** Number-led record cards; a featured card takes a double cell. */
export function FigureCards({
  items,
  more,
}: {
  items: FigureCard[];
  more?: { to: string; label: string };
}) {
  const list = useReveal<HTMLUListElement>();
  return (
    <ul ref={list} className="sx-figures mu-reveal">
      {items.map(({ figure, unit, detail, feature }) => (
        <li key={`${figure} ${unit}`} data-feature={feature ? "" : undefined}>
          <strong>{figure}</strong>
          <h3>{unit}</h3>
          <p>{detail}</p>
        </li>
      ))}
      {more && (
        <li className="sx-figures-more">
          <Link to={more.to}>
            {more.label}
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </li>
      )}
    </ul>
  );
}

/** Registration numbers set as certificate badges. */
export function BadgeGrid({ items }: { items: string[][] }) {
  return (
    <dl className="sx-badges">
      {items.map(([label, value]) => (
        <div key={label}>
          <ShieldCheck size={22} aria-hidden="true" />
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Onward routes as icon tiles rather than a column of text links. */
export function ExploreTiles({
  items,
  label = "Keep exploring",
}: {
  items: Destination[];
  label?: string;
}) {
  return (
    <nav className="sx-explore" aria-label={label}>
      {items.map(({ to, icon: Icon, title, detail }) => (
        <Link key={to} to={to}>
          <Icon size={26} aria-hidden="true" />
          <strong>{title}</strong>
          <span>{detail}</span>
          <ArrowUpRight
            className="sx-explore-arrow"
            size={18}
            aria-hidden="true"
          />
        </Link>
      ))}
    </nav>
  );
}

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** The OPD week as a strip of days; the hospital itself never closes. */
export function WeekStrip({ open }: { open: string[] }) {
  return (
    <ol className="sx-week" aria-label="OPD days">
      {week.map((day) => {
        const isOpen = open.includes(day);
        return (
          <li key={day} data-open={isOpen ? "" : undefined}>
            <span>{day}</span>
            <small>{isOpen ? "OPD" : "No OPD"}</small>
          </li>
        );
      })}
    </ol>
  );
}
