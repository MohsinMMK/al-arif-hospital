import { Link } from "react-router-dom";
import { BookOpen, Factory, FlaskConical } from "lucide-react";
import {
  ArrowUpRight,
  CalendarDays,
  CircleHelp,
  Clock,
  GraduationCap,
  MapPin,
  Users,
} from "@/components/animated-icons";
import { ConversationLinks, PageTitle } from "./primitives";
import { FactChips, IconTiles, SectionHead } from "./sections";
import type { IconFact, Tile } from "./sections";
import { latestTraining, trainingProgrammes } from "./training-data";
import type { TrainingPhoto, TrainingProgramme } from "./training-data";
import "./training.css";

const learntIcons = [BookOpen, FlaskConical, Factory];
const learntDetail: Record<string, string> = {
  Principles:
    "What distillation separates, and why Unani pharmacy relies on it.",
  Practical: "Running the process on the pharmacy’s own still, step by step.",
  Application: "Where distilled preparations fit in Unani drug manufacturing.",
};
const gainedIcons = [GraduationCap, Factory, Users];

function Photo({
  photo,
  priority = false,
}: {
  photo: TrainingPhoto;
  priority?: boolean;
}) {
  return (
    <figure className="tr-photo">
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

function ProgrammeFeature({ programme }: { programme: TrainingProgramme }) {
  const [lead] = programme.photos;
  const facts = [
    { icon: CalendarDays, label: "Date", value: programme.when },
    { icon: Clock, label: "Time", value: programme.time },
    { icon: MapPin, label: "Venue", value: programme.venue },
    { icon: GraduationCap, label: "For", value: programme.audience },
  ];
  return (
    <article className="tr-feature" aria-labelledby="tr-feature-title">
      {lead && <Photo photo={lead} priority />}
      <div className="tr-feature-body">
        <div className="tr-feature-intro">
          <p className="tr-status" data-status={programme.status}>
            {programme.status === "held" ? "Held" : "Upcoming"} ·{" "}
            {programme.when}
          </p>
          <h2 id="tr-feature-title">
            {programme.title}
            {programme.urdu && (
              <span lang="ur" dir="rtl" className="tr-urdu">
                {programme.urdu}
              </span>
            )}
          </h2>
          <p>{programme.summary}</p>
        </div>
        <div className="tr-feature-details">
          <dl className="tr-facts">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <dt>
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="tr-figures" aria-label="The session in figures">
            <li>
              <strong>{programme.participants}</strong>
              <span>registered medicos took part</span>
            </li>
            <li>
              <strong>2 hrs</strong>
              <span>hands-on, at the still</span>
            </li>
            <li>
              <strong>{programme.fee}</strong>
              <span>for every participant</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Training() {
  const programme = latestTraining;
  const learnt: Tile[] = programme.learnt.map((title, index) => ({
    icon: learntIcons[index % learntIcons.length],
    title,
    detail: learntDetail[title],
  }));
  const gained: IconFact[] = programme.gained.map((label, index) => ({
    icon: gainedIcons[index % gainedIcons.length],
    label,
  }));
  const gallery = programme.photos.slice(1);
  const earlier = trainingProgrammes.slice(1);

  return (
    <div className="mp-page tr-page">
      <div className="mp-detail-hero">
        <PageTitle
          eyebrow="Al-Arif Unani Pharmacy · GMP certified"
          title={"Hands-on training.\nLearnt at the still."}
          description="Free practical sessions for BUMS students and house surgeons, held inside the Trust’s GMP-certified Unani manufacturing unit in Bandlaguda."
        />
        <div className="mp-service-stamp">
          <FlaskConical size={48} aria-hidden="true" />
          <span>Training & workshops</span>
          <strong>Principles. Practice. Application.</strong>
        </div>
      </div>

      <section className="tr-latest" aria-label="Latest programme">
        <ProgrammeFeature programme={programme} />
      </section>

      <section className="sx-section" aria-labelledby="tr-learnt">
        <SectionHead
          id="tr-learnt"
          title="What participants learnt."
          accent="From principle to practice."
          lead="The session moved from the idea behind distillation to working the apparatus, and then to where it is used in Unani manufacturing."
        />
        <IconTiles items={learnt} label="What participants learnt" />
        <FactChips items={gained} label="What the session offered" />
      </section>

      <section className="tr-gallery-section" aria-labelledby="tr-gallery">
        <SectionHead
          id="tr-gallery"
          align="split"
          title="From the session."
          accent={programme.when}
          lead="Photographs and a short clip shared by the organisers."
        />
        <div className="tr-gallery">
          {gallery.map((photo) => (
            <Photo key={photo.src} photo={photo} />
          ))}
          {programme.clip && (
            <figure className="tr-photo tr-clip">
              <video
                controls
                playsInline
                preload="none"
                poster={programme.clip.poster}
                width={640}
                height={360}
              >
                <source src={programme.clip.src} type="video/mp4" />
              </video>
              <figcaption>{programme.clip.caption}</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="tr-next" aria-labelledby="tr-next-title">
        <div>
          <h2 id="tr-next-title">
            The next programme.
            <br />
            <em>Coming shortly, InshaAllah.</em>
          </h2>
          <p>
            After a positive response from the participants and many requests
            from other medicos, the organisers have decided to hold another
            session soon. Its date, topic and registration details will be
            posted here once confirmed.
          </p>
          <div className="mp-status-notice">
            <CircleHelp size={20} aria-hidden="true" />
            <p>
              Places are limited and participants are registered and shortlisted
              in advance. To ask about the next programme, contact hospital
              reception.
            </p>
          </div>
          <ConversationLinks />
        </div>
        <aside className="tr-message" aria-label="From the organisers">
          {programme.message && (
            <figure>
              <blockquote>
                <p>“{programme.message.text}”</p>
              </blockquote>
              <figcaption>— {programme.message.signedBy}</figcaption>
            </figure>
          )}
          <div className="tr-organisers">
            <h3>Organising team</h3>
            <ul>
              {programme.organisers.map(({ name, doctorSlug }) => (
                <li key={name}>
                  {doctorSlug ? (
                    <Link to={`/site/doctors/${doctorSlug}`}>{name}</Link>
                  ) : (
                    name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {earlier.length > 0 && (
        <section className="sx-section" aria-labelledby="tr-earlier">
          <SectionHead
            id="tr-earlier"
            align="start"
            title="Earlier programmes."
            accent="Held at the pharmacy."
          />
          <ul className="tr-earlier">
            {earlier.map((item) => (
              <li key={item.slug}>
                <span>{item.when}</span>
                <strong>{item.title}</strong>
                <p>{item.audience}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mp-editorial-links">
        <Link to="/site/pharmacy">
          See the pharmacy & manufacturing unit
          <ArrowUpRight />
        </Link>
        <Link to="/site/education">
          Explore education & learning
          <ArrowUpRight />
        </Link>
        <Link to="/site/research">
          Read about Unani research
          <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
