import { useContext, useState } from "react";
import type { CSSProperties, Ref } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  Phone,
  Search,
  X,
} from "@/components/animated-icons";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { hospital } from "@/hospital";
import { cn } from "@/lib/utils";
import type { Service } from "./data";
import { InteractionMotion } from "./interaction-context";
import { useMagnetic } from "./motion-ui";

type LineStyle = CSSProperties & { "--mp-line": number };

type ActionProps = {
  children: React.ReactNode;
  outline?: boolean;
  className?: string;
} & (
  | { to: string }
  // Another website opens in a new tab, and the label says so.
  | { href: string; label: string }
);

export function Action({
  children,
  outline = false,
  className,
  ...target
}: ActionProps) {
  // Drifts a few pixels toward a fine pointer; the hook stays idle on touch.
  const magnet = useMagnetic<HTMLAnchorElement>();
  return (
    <ArrowButton
      tone={outline ? "soft" : "solid"}
      className={cn(className, "mu-magnetic")}
      render={
        "to" in target ? (
          <Link ref={magnet} to={target.to} />
        ) : (
          <a
            ref={magnet}
            href={target.href}
            target="_blank"
            rel="noreferrer"
            aria-label={target.label}
          />
        )
      }
    >
      {children}
    </ArrowButton>
  );
}
/** Reception's phone and WhatsApp as two large links. */
export function ConversationLinks() {
  return (
    <div className="mp-conversation-links">
      <a
        href={hospital.receptionHref}
        aria-label={`Call reception at ${hospital.reception}`}
      >
        <Phone size={22} aria-hidden="true" />
        <span>{hospital.reception}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
      <a
        href={hospital.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${hospital.reception} (opens in a new tab)`}
      >
        <WhatsAppIcon />
        <span>{hospital.reception}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
    </div>
  );
}
/** A labelled search box; its clear button appears once something is typed. */
export function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onClear,
  controls,
  ref,
  className,
  clearClassName,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  /** The id of the results the search filters. */
  controls: string;
  ref: Ref<HTMLInputElement>;
  className: string;
  clearClassName?: string;
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={cn("mp-search", className)}>
        <Search size={18} aria-hidden="true" />
        <Input
          id={id}
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-controls={controls}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className={clearClassName}
            onClick={onClear}
            aria-label="Clear search"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="mp-text-link" to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
/** Detail pages step back to their collection; top-level pages need no trail. */
export function BackLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="mp-back-link" to={to}>
      <ChevronLeft size={16} />
      {children}
    </Link>
  );
}
export function PageTitle({
  title,
  description,
  eyebrow,
  align = "start",
  children,
}: {
  title: string;
  description: string;
  eyebrow?: React.ReactNode;
  align?: "start" | "center";
  children?: React.ReactNode;
}) {
  const enabled = useContext(InteractionMotion);
  // Each title rises once when it first appears with motion on. Turning motion
  // off (or back on later) never replays it, and the text is always present.
  const [rise, setRise] = useState({ title, active: enabled });
  if (rise.title !== title) setRise({ title, active: enabled });
  else if (rise.active && !enabled) setRise({ title, active: false });
  const lines = title.split("\n");
  return (
    <div className="mp-page-title" data-align={align}>
      {eyebrow && <div className="mp-eyebrow">{eyebrow}</div>}
      <h1
        data-rise={rise.active ? "" : undefined}
        onAnimationEnd={(event) => {
          const last = event.currentTarget.lastElementChild?.firstElementChild;
          if (event.target === last) setRise({ title, active: false });
        }}
      >
        {lines.map((line, index) => {
          const style: LineStyle = { "--mp-line": index };
          return (
            <span key={`${title}:${index}`} className="mp-title-line">
              <span style={style}>{line}</span>
            </span>
          );
        })}
      </h1>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function ServiceLink({ service }: { service: Service }) {
  return (
    <Link to={`/site/services/${service.slug}`} className="mp-service-row">
      <div>
        <h3>{service.name}</h3>
      </div>
      <p>{service.intro}</p>
      <ArrowUpRight size={23} />
    </Link>
  );
}
export function NotFound() {
  return (
    <div className="mp-page mp-empty">
      <h1>
        Let’s get you
        <br />
        back on the right path.
      </h1>
      <p>This page doesn’t exist.</p>
      <Action to="/site">Return home</Action>
    </div>
  );
}
