import { useContext, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { ArrowButton } from "@/components/ui/arrow-button";
import type { Service } from "./data";
import { InteractionMotion } from "./interaction-context";
import { useMagnetic } from "./motion-ui";

type LineStyle = CSSProperties & { "--mp-line": number };

export function Action({
  to,
  children,
  outline = false,
}: {
  to: string;
  children: React.ReactNode;
  outline?: boolean;
}) {
  // Drifts a few pixels toward a fine pointer; the hook stays idle on touch.
  const magnet = useMagnetic<HTMLAnchorElement>();
  return (
    <ArrowButton
      tone={outline ? "soft" : "solid"}
      className="mu-magnetic"
      render={<Link ref={magnet} to={to} />}
    >
      {children}
    </ArrowButton>
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
export function ContactBand({ service }: { service?: string }) {
  return (
    <section className="mp-contact-band">
      <div>
        <h2>
          Let’s find your
          <br />
          <em>next step.</em>
        </h2>
        <p>
          Ask reception about the right consultation and a day that works for
          you.
        </p>
      </div>
      <Action to={`/site/visit${service ? `?service=${service}` : ""}#request`}>
        Plan an inquiry
      </Action>
    </section>
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
