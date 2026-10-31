import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Factory,
  Leaf,
  Package,
  PackageCheck,
  Pause,
  Phone,
  Pill,
  Play,
  Sprout,
  Store,
  Tag,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { servicePages } from "./data";
import type { Service } from "./data";
import {
  StepProgress,
  TiltLight,
  useMagnetic,
  useStepPlayer,
  useTilt,
} from "./motion-ui";
import { PageTitle, ServiceLink, TextLink } from "./primitives";
import { storeUrl } from "./store";
import "./pharmacy.css";

type Unit = {
  name: string;
  tone: string;
  icon: LucideIcon;
  text: string;
  label: string;
  value: string;
  note?: string;
};

const units: Unit[] = [
  {
    name: "Al-Arif Unani (Teaching) Pharmacy",
    tone: "unani",
    icon: Leaf,
    text: "A GMP-certified teaching pharmacy that dispenses pure herbal Unani medicines at low rates.",
    label: "Unani (Teaching) Pharmacy, GMP",
    value: "502/U/12",
  },
  {
    name: "Al-Arif Allopathic Pharmacy",
    tone: "general",
    icon: Pill,
    text: "A DCA-certified pharmacy that dispenses ethical medicines at subsidised rates.",
    label: "Allopathic Pharmacy, DCA licence",
    value: "102/HD1/AP/2010",
  },
  {
    name: "Al-Arif Raw Drug Agency (Dawasaz)",
    tone: "learning",
    icon: Sprout,
    text: "Units for raw drug storage, manufacturing, packaging, labelling, dispensing and dispatch.",
    label: "Raw Drug Sale licence (Dawasaz)",
    value: "229/U/2020-21",
    note: "Inaugurated 31 December 2020",
  },
];

const steps: {
  title: string;
  unit: string;
  icon: LucideIcon;
  text: string;
}[] = [
  {
    title: "Raw drug storage",
    unit: "Storage unit",
    icon: Warehouse,
    text: "Raw herbal drugs are kept in the storage unit of the Al-Arif Raw Drug Agency (Dawasaz), which holds Raw Drug Sale licence 229/U/2020-21.",
  },
  {
    title: "Manufacturing",
    unit: "Drug manufacturing unit",
    icon: Factory,
    text: "Unani medicines are prepared in the drug manufacturing unit. Its GMP compliance was noted during the visit recorded at the agency’s inauguration.",
  },
  {
    title: "Packaging",
    unit: "Packaging unit",
    icon: Package,
    text: "Prepared medicines are packed in a separate packaging unit.",
  },
  {
    title: "Labelling",
    unit: "Labelling unit",
    icon: Tag,
    text: "Packed medicines are labelled in the labelling unit.",
  },
  {
    title: "Dispensing",
    unit: "Dispensing unit",
    icon: Pill,
    text: "Medicines are given out from the dispensing unit. Take them only as prescribed by your clinician, who decides what is suitable for you.",
  },
  {
    title: "Dispatch",
    unit: "Dispatch unit",
    icon: PackageCheck,
    text: "The dispatch unit is the last of the sections recorded at the agency. Online medicine sales and delivery are not available through this website.",
  },
];

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const relatedSlugs = ["unani-pharmacy", "diagnostics-pharmacy"];
const stepInterval = 6000;

function UnitCard({ unit }: { unit: Unit }) {
  const tilt = useTilt<HTMLElement>();
  const UnitIcon = unit.icon;
  return (
    <article ref={tilt} className={`ph-unit ph-unit-${unit.tone} mu-tilt`}>
      <TiltLight />
      <UnitIcon size={28} aria-hidden="true" />
      <h3>{unit.name}</h3>
      <p>{unit.text}</p>
      <dl>
        <div>
          <dt>{unit.label}</dt>
          <dd>
            {unit.value}
            {unit.note && <small>{unit.note}</small>}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function ProductionStepper() {
  const [active, setActive] = useState(0);
  // The panel slides in from the side it was approached from.
  const [shown, setShown] = useState({ index: 0, direction: 1, moved: false });
  if (shown.index !== active)
    setShown({
      index: active,
      direction: active > shown.index ? 1 : -1,
      moved: true,
    });
  const player = useStepPlayer({
    count: steps.length,
    index: active,
    onChange: setActive,
    interval: stepInterval,
  });
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const last = steps.length - 1;
  const step = steps[active];
  const StepIcon = step.icon;
  const bodyStyle: Vars = { "--ph-dir": shown.direction };

  const select = (index: number) => {
    player.stop();
    setActive(Math.min(last, Math.max(0, index)));
  };

  const stepKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    from: number,
  ) => {
    const target =
      event.key === "ArrowRight"
        ? from + 1
        : event.key === "ArrowLeft"
          ? from - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    const next = Math.min(last, Math.max(0, target));
    select(next);
    buttons.current[next]?.focus();
  };

  return (
    <section className="ph-stepper" aria-labelledby="ph-stepper-title">
      <div className="ph-section-head">
        <h2 id="ph-stepper-title">
          From raw herb
          <br />
          <em>to dispensary.</em>
        </h2>
        <p>
          At its inauguration on 31 December 2020, visitors toured each section
          of the Raw Drug Agency below, as recorded in the Trust’s activity
          reports. Select a stage to read about it.
        </p>
      </div>
      <ol className="ph-steps">
        {steps.map((item, index) => (
          <li key={item.title}>
            <button
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              aria-current={index === active ? "step" : undefined}
              aria-controls="ph-step-panel"
              onClick={() => select(index)}
              onKeyDown={(event) => stepKey(event, index)}
            >
              <span className="ph-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.title}</span>
              {index === active && (
                <StepProgress
                  key={player.progressKey}
                  className="ph-step-progress"
                  playing={player.playing}
                  interval={stepInterval}
                />
              )}
            </button>
          </li>
        ))}
      </ol>
      <div className="ph-progress">
        <p>
          Step {active + 1} of {steps.length}
        </p>
        <div className="ph-progress-track" aria-hidden="true">
          <span
            style={{ transform: `scaleX(${(active + 1) / steps.length})` }}
          />
        </div>
        <button
          type="button"
          className="ph-play"
          aria-controls="ph-step-panel"
          onClick={player.toggle}
        >
          {player.playing ? (
            <Pause size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
          {player.playing ? "Pause steps" : "Play steps"}
        </button>
      </div>
      <div
        id="ph-step-panel"
        className="ph-step-panel"
        aria-live={player.playing ? "off" : "polite"}
        aria-atomic="true"
      >
        <div
          key={active}
          className="ph-step-body"
          data-entering={shown.moved ? "" : undefined}
          style={bodyStyle}
        >
          <StepIcon size={36} aria-hidden="true" />
          <span>{step.unit}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      </div>
      <div className="ph-step-nav">
        <Button
          type="button"
          variant="outline"
          aria-disabled={active === 0}
          onClick={() => {
            if (active > 0) select(active - 1);
          }}
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Previous
        </Button>
        <Button
          type="button"
          aria-disabled={active === last}
          onClick={() => {
            if (active < last) select(active + 1);
          }}
        >
          Next
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

function StoreButton({ href }: { href: string }) {
  const magnet = useMagnetic<HTMLAnchorElement>();
  return (
    <Button asChild>
      <a
        ref={magnet}
        className="mp-action mu-magnetic"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit the online store (opens in a new tab)"
      >
        Visit the online store
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </Button>
  );
}

function OnlineStore() {
  if (storeUrl) {
    return (
      <section className="ph-store" aria-labelledby="ph-store-title">
        <h2 id="ph-store-title">
          Online store.
          <br />
          <em>Unani products from the Trust.</em>
        </h2>
        <div>
          <p>
            The Trust’s online store for its Unani products opens on a separate
            website. Take medicines only as prescribed by your clinician.
          </p>
          <StoreButton href={storeUrl} />
        </div>
      </section>
    );
  }
  return (
    <section className="ph-store" aria-labelledby="ph-store-title">
      <div>
        <span className="ph-store-badge">
          <Store size={16} aria-hidden="true" />
          Coming soon
        </span>
        <h2 id="ph-store-title">
          Online store
          <br />
          <em>coming soon.</em>
        </h2>
      </div>
      <div>
        <p>
          The Trust is preparing an online store for its Unani products. Until
          it opens, please ask the hospital pharmacy or reception.
        </p>
        <div className="mp-conversation-links">
          <a
            href="tel:+918555086667"
            aria-label="Call reception at +91 85550 86667"
          >
            <Phone size={22} aria-hidden="true" />
            <span>+91 85550 86667</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/918555086667"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp +91 85550 86667 (opens in a new tab)"
          >
            <WhatsAppIcon />
            <span>+91 85550 86667</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
        <p className="ph-store-note">
          Take medicines only as prescribed by your clinician, who decides what
          is suitable for you.
        </p>
      </div>
    </section>
  );
}

export function Pharmacy() {
  const related = relatedSlugs
    .map((slug) => servicePages.find((service) => service.slug === slug))
    .filter((service): service is Service => service !== undefined);

  return (
    <div className="mp-page">
      <div className="mp-detail-hero">
        <PageTitle
          title={"From herb to dispensary.\nOn one campus."}
          description="The Trust’s Unani and allopathic pharmacies and the Al-Arif Raw Drug Agency (Dawasaz), alongside the hospital in Bandlaguda."
        />
        <div className="mp-service-stamp">
          <Leaf size={48} aria-hidden="true" />
          <span>Pharmacy & manufacturing</span>
          <strong>Store. Make. Dispense.</strong>
        </div>
      </div>
      <section className="ph-units" aria-labelledby="ph-units-title">
        <h2 id="ph-units-title">
          Three units.
          <br />
          <em>General and Unani care.</em>
        </h2>
        <div className="ph-unit-grid">
          {units.map((unit) => (
            <UnitCard key={unit.name} unit={unit} />
          ))}
        </div>
        <div className="mp-status-notice">
          <CircleHelp size={20} aria-hidden="true" />
          <p>
            Take Unani and allopathic medicines only as prescribed. Your
            clinician decides what is suitable for you. Please confirm current
            pharmacy services, timings and fees with reception on +91 85550
            86667.
          </p>
        </div>
      </section>
      <ProductionStepper />
      <section className="ph-quality" aria-labelledby="ph-quality-title">
        <h2 id="ph-quality-title">
          Quality & oversight.
          <br />
          <em>Licensed and inspected.</em>
        </h2>
        <div>
          <ul className="mp-check-list">
            {[
              "The Al-Arif Unani (Teaching) Pharmacy holds GMP certification 502/U/12.",
              "The Al-Arif Allopathic Pharmacy holds DCA licence 102/HD1/AP/2010.",
              "At the Raw Drug Agency’s inauguration on 31 December 2020, the Secretary of the Board of Indian Medicine and a Drug Inspector of the Department of AYUSH, Telangana visited and noted its GMP compliance.",
              "In June 2020, the hospital hosted an expert programme on the importance of Good Manufacturing Practices.",
            ].map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mp-source-note">
            As recorded in the Trust’s activity reports.
          </p>
          <h3>The herbal garden</h3>
          <p>
            The campus has a 4,047 sq.m herbal garden with 100 species of
            medicinal plants and a 25-seat demonstration room.
          </p>
          <TextLink to="/site/stories/herbal-garden">
            Explore the herbal garden
          </TextLink>
        </div>
      </section>
      <OnlineStore />
      {related.length > 0 && (
        <section className="mp-related-services">
          <h2>Related care</h2>
          {related.map((service) => (
            <ServiceLink key={service.slug} service={service} />
          ))}
        </section>
      )}
      <div className="mp-editorial-links ph-closing">
        <Link to="/site/stories/raw-drug-agency">
          Read the Raw Drug Agency story
          <ArrowUpRight />
        </Link>
        <Link to="/site/stories/single-drug-exhibitions">
          Read about the single-drug exhibitions
          <ArrowUpRight />
        </Link>
        <Link to="/site/community">
          Explore community & milestones
          <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
