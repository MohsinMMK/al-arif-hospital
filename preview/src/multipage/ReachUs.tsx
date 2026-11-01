import { useState } from "react";
import type { ReactNode } from "react";
import { Siren } from "lucide-react";
import {
  ArrowUpRight,
  Check,
  MapPin,
  Phone,
  PhoneCall,
} from "@/components/animated-icons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ArrowButton } from "@/components/ui/arrow-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { hospital } from "@/hospital";
import { servicePages } from "./data";
import { FloatField } from "./motion-ui";
import "./reach-us.css";

const visitDays = ["Any day", "Today", "Tomorrow", "This week", "Next week"];
const visitTimes = ["Any time", "Morning", "Afternoon", "Evening"];

/**
 * Writes the chosen visit into a WhatsApp message to reception; the patient
 * sends it from their own WhatsApp. `id` keeps two composers' fields apart.
 */
export function VisitComposer({
  id,
  heading,
  initialService = "",
  className,
}: {
  id: string;
  heading: ReactNode;
  initialService?: string;
  className?: string;
}) {
  const [service, setService] = useState(
    servicePages.some((item) => item.slug === initialService)
      ? initialService
      : "",
  );
  const [day, setDay] = useState(visitDays[0]);
  const [time, setTime] = useState(visitTimes[0]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  // Remounts the alert on every blocked submit so the nudge and announcement repeat.
  const [attempt, setAttempt] = useState(0);
  const care = servicePages.find((item) => item.slug === service)?.name;
  const message = [
    `Hello ${hospital.shortName}, I would like to request a visit.`,
    "",
    `Care: ${care}`,
    `Day: ${day}`,
    `Time: ${time}`,
    "",
    "Please let me know the doctor and timing available.",
  ].join("\n");
  const whatsapp = `${hospital.whatsappHref}?text=${encodeURIComponent(message)}`;
  const choose = (set: (value: string) => void) => (value: string) => {
    set(value);
    setSent(false);
  };
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        if (!service) {
          setError("Choose the service you would like to ask about.");
          setAttempt((value) => value + 1);
          return;
        }
        setError("");
        window.open(whatsapp, "_blank", "noopener");
        setSent(true);
      }}
    >
      {heading}
      <FloatField
        id={`${id}-service`}
        label="Care or service"
        filled={Boolean(service)}
        invalid={Boolean(error)}
      >
        <Select
          value={service}
          onValueChange={choose((value) => {
            setService(value);
            setError("");
          })}
        >
          <SelectTrigger
            id={`${id}-service`}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-service-error` : undefined}
          >
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            {servicePages.map((item) => (
              <SelectItem value={item.slug} key={item.slug}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FloatField>
      <div className="visit-when">
        <FloatField id={`${id}-day`} label="Day" filled>
          <Select value={day} onValueChange={choose(setDay)}>
            <SelectTrigger id={`${id}-day`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visitDays.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FloatField>
        <FloatField id={`${id}-time`} label="Time" filled>
          <Select value={time} onValueChange={choose(setTime)}>
            <SelectTrigger id={`${id}-time`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visitTimes.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FloatField>
      </div>
      {error && (
        <p
          key={attempt}
          id={`${id}-service-error`}
          className="mp-error"
          role="alert"
        >
          {error}
        </p>
      )}
      <ArrowButton type="submit" direction="right">
        Send on WhatsApp
      </ArrowButton>
      {sent && (
        <div className="mp-inquiry-result" role="status">
          <Check size={21} />
          <div>
            <h3>Your message is ready in WhatsApp</h3>
            <p>
              {care} · {day} · {time}
            </p>
            <p>
              Press send there and reception will reply to confirm the doctor
              and timing.{" "}
              <a href={whatsapp} target="_blank" rel="noopener">
                Open WhatsApp again
              </a>
            </p>
          </div>
        </div>
      )}
    </form>
  );
}

const helloMessage = encodeURIComponent(
  `Hello ${hospital.shortName}, I have a question.`,
);

type QuickAction = {
  key: string;
  label: string;
  detail: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

// A link cannot start a WhatsApp call itself, so that one opens the chat, where the call button is.
const quickActions: QuickAction[] = [
  {
    key: "call",
    label: "Call reception",
    detail: hospital.reception,
    href: hospital.receptionHref,
    icon: <Phone size={20} aria-hidden="true" />,
  },
  {
    key: "whatsapp-call",
    label: "WhatsApp call",
    detail: "Opens the chat; tap call",
    href: hospital.whatsappHref,
    icon: <PhoneCall size={20} aria-hidden="true" />,
    external: true,
  },
  {
    key: "whatsapp",
    label: "WhatsApp message",
    detail: hospital.reception,
    href: `${hospital.whatsappHref}?text=${helloMessage}`,
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    key: "maps",
    label: "Directions",
    detail: "Bandlaguda, Hyderabad",
    href: hospital.maps,
    icon: <MapPin size={20} aria-hidden="true" />,
    external: true,
  },
];

/**
 * The way to reach the hospital, above every page's footer: the visit request
 * on WhatsApp, the emergency number, and four direct lines out.
 */
export function ReachUs({
  initialService,
  className,
}: {
  initialService?: string;
  className?: string;
}) {
  return (
    <section
      className={cn("reach", className)}
      data-band
      id="reach-us"
      aria-labelledby="reach-title"
    >
      <div className="reach-inner">
        <div className="reach-intro">
          <h2 id="reach-title">
            A visit, made simple.
            <br />
            <em>Reach us your way.</em>
          </h2>
          <p>
            Choose the care, a day and a time, and your message to reception is
            ready in WhatsApp. Reception confirms every visit; nothing is booked
            online.
          </p>
          <p className="reach-urgent">
            <Siren size={18} aria-hidden="true" />
            <span>Emergency, 24 hours:</span>
            <a href={hospital.emergencyHref}>{hospital.emergency}</a>
          </p>
        </div>
        <VisitComposer
          id="reach"
          className="reach-form"
          initialService={initialService}
          heading={<h3>Request a visit on WhatsApp</h3>}
        />
        <ul className="reach-actions" aria-label="Contact reception">
          {quickActions.map((action) => (
            <li key={action.key}>
              <a
                href={action.href}
                data-action={action.key}
                {...(action.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span className="reach-action-icon">{action.icon}</span>
                <strong>{action.label}</strong>
                <span className="reach-action-detail">{action.detail}</span>
                {action.external && (
                  <span className="sr-only"> (opens in a new tab)</span>
                )}
                <ArrowUpRight
                  className="reach-action-arrow"
                  size={18}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
