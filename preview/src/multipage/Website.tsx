import HomeStory from "./HomeStory";
import { Stories, StoryCards, StoryDetail, TherapyExplorer } from "./Stories";
import { stories } from "./story-data";
import { Community } from "./Community";
import { Pharmacy } from "./Pharmacy";
import { CareDirectory, CareTeam } from "./CareDirectory";
import { Departments } from "./Departments";
import { departmentPath, departments, wardBeds } from "./department-data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { InteractionMotion } from "./interaction-context";
import { QuickFind, ReadingProgress, VisitChecklist } from "./interactive";
import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  Navigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Leaf,
  Stethoscope,
  Menu,
  X,
  Phone,
  MapPin,
  BookOpen,
  CalendarDays,
  Search,
  Check,
  CircleHelp,
  Mail,
  Siren,
  Ambulance,
  Baby,
  BadgeCheck,
  BedDouble,
  Building2,
  Clock,
  Eye,
  FlaskConical,
  GraduationCap,
  Hand,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Hospital,
  IndianRupee,
  Landmark,
  LandPlot,
  Microscope,
  Navigation,
  PhoneCall,
  Pill,
  Presentation,
  Quote,
  School,
  Sprout,
  Target,
  Telescope,
  Users,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { servicePages, doctorPages, landmark } from "./data";
import type { DoctorProfile, Service } from "./data";
import { DoctorSpotlight } from "@/components/react-bits/DoctorSpotlight";
import { FloatField, SplitBar, ToastProvider } from "./motion-ui";
import {
  BadgeGrid,
  ExploreTiles,
  FactChips,
  FigureCards,
  IconTiles,
  SectionHead,
  StatBand,
  WeekStrip,
} from "./sections";
import type { Destination, FigureCard, IconFact, Stat, Tile } from "./sections";
import {
  Action,
  BackLink,
  ContactBand,
  NotFound,
  PageTitle,
  ServiceLink,
  TextLink,
} from "./primitives";
import { Chapter } from "./Chapter";
import { useReducedMotion } from "./useReducedMotion";
import { applyHead } from "@/seo";
import { useSiteScroll } from "./useSiteScroll";
import "./website.css";
import "./home-story.css";
import "./care-services.css";

const address =
  "18-13-132/41/B, Tulsi Nagar, Noori Nagar, Bandlaguda, Chandrayangutta, Hyderabad, Telangana 500005";
const maps =
  "https://maps.google.com/?q=Al+Arif+General+Hospital+Bandlaguda+Hyderabad";
function Services() {
  return (
    <div className="care-directory">
      <CareDirectory />
      <div className="mp-page care-directory-close">
        <p className="mp-source-note">
          Please confirm service availability, fees and consultation
          arrangements with reception.
        </p>
        <ContactBand />
      </div>
    </div>
  );
}
function ServiceDetail() {
  const { slug } = useParams();
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const relatedDoctors = doctorPages.filter((doctor) =>
    service.doctorSlugs.includes(doctor.slug),
  );
  const relatedStories = stories
    .filter((story) => story.serviceSlugs.includes(service.slug))
    .slice(0, 3);
  return (
    <div className="mp-page">
      <BackLink
        to={`/site/services#${service.wing === "General hospital" ? "general-hospital" : "unani-care"}`}
      >
        {service.wing}
      </BackLink>
      <div className="mp-detail-hero">
        <PageTitle title={service.headline} description={service.intro} />
        <div className="mp-service-stamp">
          {service.wing === "Unani care" ? (
            <Leaf size={48} />
          ) : (
            <Stethoscope size={48} />
          )}
          <span>{service.wing}</span>
          <strong>{service.name}</strong>
        </div>
      </div>
      <div className="mp-reading-layout">
        <div>
          <section className="mp-reading-section">
            <h2>Understanding your care.</h2>
            <p>{service.overview}</p>
            <h3>What you can discuss</h3>
            <ul className="mp-check-list">
              {service.topics.map((topic) => (
                <li key={topic}>
                  <Check size={16} />
                  {topic}
                </li>
              ))}
            </ul>
          </section>
          <section className="mp-reading-section">
            <h2>Before you visit.</h2>
            <ol className="mp-numbered-list">
              {service.preparation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          {service.slug === "hijama" && <TherapyExplorer serviceLink={false} />}
          <section className="mp-reading-section">
            <h2>Your questions, welcome.</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="availability">
                <AccordionTrigger>
                  How do I check availability and fees?
                </AccordionTrigger>
                <AccordionContent>
                  Contact reception with the service and your preferred day.
                  Staff confirm the clinician, schedule, fees and any
                  preparation. Online information is not a confirmed
                  appointment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="prepare">
                <AccordionTrigger>
                  Will I receive preparation instructions?
                </AccordionTrigger>
                <AccordionContent>
                  The clinical team provides instructions appropriate to your
                  visit. Do not rely on general online instructions for fasting,
                  stopping medicines or preparing for a procedure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="limits">
                <AccordionTrigger>
                  What should I know about this page?
                </AccordionTrigger>
                <AccordionContent>{service.note}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
        <aside className="mp-visit-aside">
          <h2>
            Let’s plan
            <br />
            <em>your visit.</em>
          </h2>
          <p>{service.name}</p>
          <Action to={`/site/request?service=${service.slug}`}>
            Ask about this care
          </Action>
          <a href="tel:+918555086667" className="mp-aside-phone">
            <Phone size={16} />
            +91 85550 86667
          </a>
          <small>
            Contact reception before travelling to confirm your arrangements.
          </small>
        </aside>
      </div>
      {relatedDoctors.length > 0 ? (
        <CareTeam
          doctors={relatedDoctors}
          title="Meet your care team."
          id="service-care-team"
        />
      ) : (
        <p className="care-service-team-note">
          {service.support?.note ??
            "Reception can help with current arrangements."}
        </p>
      )}
      {relatedStories.length > 0 && (
        <section className="mp-related-reading">
          <h2>
            Related reading.
            <br />
            <em>Guides and stories.</em>
          </h2>
          <StoryCards stories={relatedStories} compact />
        </section>
      )}
      <section className="mp-related-services">
        <h2>Continue exploring.</h2>
        {servicePages
          .filter(
            (item) => item.wing === service.wing && item.slug !== service.slug,
          )
          .slice(0, 2)
          .map((item) => (
            <ServiceLink service={item} key={item.slug} />
          ))}
      </section>
    </div>
  );
}
const doctorWings = [
  { id: "general", name: "General hospital", icon: Stethoscope },
  { id: "unani", name: "Unani care", icon: Leaf },
] as const;
const wingOf = (doctor: DoctorProfile) =>
  servicePages.find((service) => service.slug === doctor.serviceSlugs[0])
    ?.wing;
function Doctors() {
  const [query, setQuery] = useState("");
  const [wing, setWing] = useState<Service["wing"] | "All">("All");
  const matches = doctorPages.filter((doctor) =>
    `${doctor.name} ${doctor.honorific ?? ""} ${doctor.designation} ${doctor.department} ${doctor.degrees}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const groups = doctorWings
    .filter((group) => wing === "All" || group.name === wing)
    .map((group) => ({
      ...group,
      doctors: matches.filter((doctor) => wingOf(doctor) === group.name),
    }))
    .filter((group) => group.doctors.length);
  const filters = [
    { name: "All" as const, icon: Users, count: matches.length },
    ...doctorWings.map((group) => ({
      name: group.name,
      icon: group.icon,
      count: matches.filter((doctor) => wingOf(doctor) === group.name).length,
    })),
  ];
  return (
    <div className="mp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <Users size={14} aria-hidden="true" />
            {doctorPages.length} clinicians across two wings
          </>
        }
        title={"Start with\na human connection."}
        description="Meet your care team and find their services."
      >
        <div className="sx-finder">
          <div className="mp-search">
            <Search size={18} aria-hidden="true" />
            <Input
              aria-label="Search clinicians"
              placeholder="Name or specialty"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="sx-filter" role="group" aria-label="Show a wing">
            {filters.map(({ name, icon: Icon, count }) => (
              <button
                key={name}
                type="button"
                aria-pressed={wing === name}
                onClick={() => setWing(name)}
              >
                <Icon size={16} aria-hidden="true" />
                {name}
                <span>{count}</span>
              </button>
            ))}
          </div>
        </div>
      </PageTitle>
      {groups.map(({ id, name, icon: Icon, doctors }) => (
        <section
          key={id}
          className="sx-roster-group"
          data-wing={id}
          aria-labelledby={`doctors-${id}`}
        >
          <h2 id={`doctors-${id}`} className="sx-roster-head">
            <span>
              <Icon size={20} aria-hidden="true" />
            </span>
            {name}
            <small>{doctors.length}</small>
          </h2>
          <div className="sx-roster">
            {doctors.map((doctor) => (
              <DoctorSpotlight key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </section>
      ))}
      {!groups.length && (
        <p className="sx-empty" role="status">
          No matching clinician. Try “Unani” or “surgery”.
        </p>
      )}
      <p className="mp-source-note sx-note">
        Contact reception for current schedules, fees and clinician information.
      </p>
    </div>
  );
}
function DoctorDetail() {
  const { slug } = useParams();
  const doctor = doctorPages.find((item) => item.slug === slug);
  if (!doctor) return <NotFound />;
  return (
    <div className="mp-page">
      <BackLink to="/site/doctors">All doctors</BackLink>
      <div className="mp-doctor-hero">
        <div className="mp-doctor-identity">
          <Stethoscope size={68} />
          <span>Al-Arif care team</span>
        </div>
        <div>
          <h1>{doctor.name}</h1>
          <p className="mp-doctor-role">
            {[doctor.honorific, doctor.designation].filter(Boolean).join(" · ")}
          </p>
          <p>{doctor.introduction}</p>
          <Action to={`/site/request?service=${doctor.serviceSlugs[0]}`}>
            Ask about a consultation
          </Action>
        </div>
      </div>
      <div className="mp-reading-layout">
        <section className="mp-reading-section">
          <h2>Areas of care.</h2>
          <ul className="mp-check-list">
            {doctor.focus.map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
          {doctor.credentials && (
            <>
              <h3>Experience & recognition</h3>
              <ul className="mp-check-list">
                {doctor.credentials.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3>Care and consultations</h3>
          {servicePages
            .filter((service) => doctor.serviceSlugs.includes(service.slug))
            .map((service) => (
              <ServiceLink key={service.slug} service={service} />
            ))}
          <h3>A little preparation helps</h3>
          <p>
            Bring relevant reports, previous prescriptions and questions you
            want to discuss. Reception will confirm the consultation
            arrangements before you travel.
          </p>
        </section>
        <aside className="mp-profile-facts">
          <h2>Consultation information</h2>
          <dl>
            <div>
              <dt>Department</dt>
              <dd>{doctor.department}</dd>
            </div>
            <div>
              <dt>Qualifications</dt>
              <dd>{doctor.degrees}</dd>
            </div>
            <div>
              <dt>OPD days</dt>
              <dd>{doctor.opdDays}</dd>
            </div>
            <div>
              <dt>OPD timings</dt>
              <dd>
                {doctor.opdHours}
                {doctor.hoursNote && <small>{doctor.hoursNote}</small>}
              </dd>
            </div>
            <div>
              <dt>Consultation fee</dt>
              <dd>
                Hospital OP fee ₹10
                <small>Confirm any specialist fee with reception.</small>
              </dd>
            </div>
            <div>
              <dt>Council registration</dt>
              <dd>Pending hospital verification</dd>
            </div>
          </dl>
          <p>
            Timings can change. Please confirm with reception before you travel.
          </p>
          <TextLink to="/site/visit">Contact and directions</TextLink>
        </aside>
      </div>
    </div>
  );
}
const aboutFacts: IconFact[] = [
  { icon: Clock, label: "Open 24 hours" },
  { icon: IndianRupee, label: "₹10 outpatient fee" },
  { icon: BedDouble, label: "₹100 a day bed charge" },
  { icon: HeartHandshake, label: "Charitable hospital" },
];
const aboutStats: Stat[] = [
  { icon: BedDouble, value: "100", label: "inpatient beds" },
  { icon: Users, value: "200+", label: "OPD patients a day" },
  { icon: CalendarDays, value: "25+", label: "years of service" },
  { icon: LandPlot, value: "5.35", label: "acre campus" },
];
const generalOpds = departments.filter((item) => item.group === "general");
const unaniOpds = departments.filter((item) => item.group === "unani");
// Portraits in public/trustees, supplied by the Trust.
const trustees = [
  {
    photo: "syed-ahmed-mohiuddin-jeelani",
    role: "Managing Trustee",
    name: "Alhaj Syed Ahmed Mohiuddin Jeelani Chishti wo Quadri",
    note: "Janasheen Silsile Nooria wo Arifia and Sajjada Rouza-e-Nooria",
  },
  { photo: "mohammed-sami-uddin", role: "Trustee", name: "Mohammed Sami Uddin" },
  {
    photo: "syed-mohammed-mazhar-uddin-jeelani",
    role: "Trustee",
    name: "Syed Mohammed Mazhar Uddin Jeelani",
  },
  { photo: "cherngoden-abu-bakkar", role: "Trustee", name: "Cherngoden Abu Bakkar" },
];
const campusFacilities: Tile[] = [
  {
    icon: HeartPulse,
    title: "Theatre, ICU & casualty",
    detail: "Operation theatre complex, ICU and 24-hour casualty.",
  },
  {
    icon: Baby,
    title: "Maternity",
    detail: "Maternity ward and labour room.",
  },
  {
    icon: Microscope,
    title: "Laboratory & imaging",
    detail:
      "Computerised lab, digital X-ray, ultrasound, 2D echo, colour Doppler and ECG.",
  },
  {
    icon: Pill,
    title: "Two pharmacies",
    detail:
      "GMP-certified Unani (Teaching) Pharmacy and DCA-certified Allopathic Pharmacy.",
  },
  {
    icon: Hand,
    title: "Ilaj-bit-Tadbeer",
    figure: "12",
    detail: "Regimental therapies in their own block.",
  },
  {
    icon: Sprout,
    title: "Herbal garden",
    figure: "100",
    detail:
      "Medicinal plant species on 4,047 sq.m, with a 25-seat demonstration room.",
  },
  {
    icon: Warehouse,
    title: "Raw Drug Agency",
    detail: "Al-Arif Dawasaz, inaugurated 31 December 2020.",
  },
  {
    icon: Ambulance,
    title: "Ambulance",
    detail: "Certified by the Government Transport Department.",
  },
  {
    icon: Building2,
    title: "Four buildings",
    detail: "Ground plus two floors, approx. 1,00,000 sq.ft built up.",
  },
];
const communityRecord: FigureCard[] = [
  {
    figure: "80",
    unit: "bed COVID-19 Treatment Centre",
    detail:
      "Approved by the DM&HO from 14 April 2021: 130+ outpatients and 88 inpatients served.",
    feature: true,
  },
  {
    figure: "Free",
    unit: "Isolation centre & oxygen transit",
    detail: "With GHMC and the IQRA Group of Doctors.",
  },
  {
    figure: "Free",
    unit: "AYUSH Joshanda distribution",
    detail: "Distributed in 2020.",
  },
  {
    figure: "60+",
    unit: "patients at the free cardiac camp",
    detail: "April 2021, with free 2D echo.",
  },
  {
    figure: "3",
    unit: "day free medical camp",
    detail: "June 2021.",
  },
  {
    figure: "427+",
    unit: "patients on Unani Day",
    detail: "Free Unani medical camp, February 2023.",
  },
  {
    figure: "6",
    unit: "day Unani medical camp",
    detail:
      "All India Horticulture & Agriculture Show, August–September 2023.",
  },
];
const registrations = [
  ["Clinical Establishment licence", "A/111/DRA/HYD/2025"],
  ["Hospital registration (Govt. of Telangana)", "07F-APMCE-1147"],
  ["Biomedical waste registration", "GJ/B/320"],
  ["Unani (Teaching) Pharmacy, GMP", "502/U/12"],
  ["Allopathic Pharmacy, DCA licence", "102/HD1/AP/2010"],
  ["Raw Drug Sale licence (Dawasaz)", "229/U/2020-21"],
  ["Ultrasound, PC-PNDT registration", "0116A1266"],
  ["Ambulance registration", "AP28TB2951"],
  ["Trust 80G approval", "AADTA6228M26HY01"],
];
const aboutRoutes: Destination[] = [
  {
    to: "/site/departments",
    icon: Building2,
    title: "Departments",
    detail: "Sixteen OPDs, wards and round-the-clock care",
  },
  {
    to: "/site/services",
    icon: Stethoscope,
    title: "Care & services",
    detail: "General and Unani care, wing by wing",
  },
  {
    to: "/site/community",
    icon: HandHeart,
    title: "Community & milestones",
    detail: "Camps, relief work and the timeline",
  },
  {
    to: "/site/pharmacy",
    icon: Pill,
    title: "Pharmacy & manufacturing",
    detail: "Unani pharmacy and raw drugs",
  },
  {
    to: "/site/research",
    icon: FlaskConical,
    title: "Research",
    detail: "Initiatives and publications",
  },
  {
    to: "/site/education",
    icon: GraduationCap,
    title: "Education",
    detail: "Jamia Arifia Nooria and learning",
  },
];
function About() {
  return (
    <div className="mp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <Landmark size={14} aria-hidden="true" />
            Al Arif Education and Medical Trust
          </>
        }
        title={"Rooted in community.\nOpen to you."}
        description="Integrative healing: modern medicine and traditional Unani healthcare under one roof."
      >
        <FactChips items={aboutFacts} label="At a glance" />
      </PageTitle>
      <section className="sx-section" aria-labelledby="about-care">
        <SectionHead
          id="about-care"
          title="Two care traditions."
          accent="One welcoming place."
          lead={
            <>
              For more than 25 years the hospital has served Bandlaguda,
              Chandrayangutta. It stands{" "}
              {landmark.charAt(0).toLowerCase() + landmark.slice(1)}.
            </>
          }
        />
        <div className="sx-twin">
          <article>
            <span className="sx-twin-icon">
              <Stethoscope size={28} aria-hidden="true" />
            </span>
            <strong>{generalOpds.length}</strong>
            <h3>General hospital specialty OPDs</h3>
            <ul className="sx-chips">
              {generalOpds.map((opd) => (
                <li key={opd.slug}>
                  <Link to={departmentPath(opd.slug)}>{opd.name}</Link>
                </li>
              ))}
            </ul>
            <TextLink to="/site/departments#general">
              General hospital departments
            </TextLink>
          </article>
          <span className="sx-twin-mark" aria-hidden="true">
            &amp;
          </span>
          <article>
            <span className="sx-twin-icon">
              <Leaf size={28} aria-hidden="true" />
            </span>
            <strong>{unaniOpds.length}</strong>
            <h3>Unani OPDs</h3>
            <ul className="sx-chips">
              {unaniOpds.map((opd) => (
                <li key={opd.slug}>
                  <Link to={departmentPath(opd.slug)}>{opd.name}</Link>
                </li>
              ))}
            </ul>
            <TextLink to="/site/departments#unani">Unani departments</TextLink>
          </article>
        </div>
        <p className="sx-note">
          The outpatient fee of ₹10 and inpatient bed charge of ₹100 a day, set
          in 2002, are still continued to help the poorest of the poor.
        </p>
      </section>
      <StatBand items={aboutStats} label="Al Arif in figures" />
      <section className="sx-section" aria-labelledby="about-principles">
        <h2 id="about-principles" className="mu-sr">
          Motto, vision and mission
        </h2>
        <figure className="sx-quote">
          <Quote size={36} aria-hidden="true" />
          <blockquote>Service to Mankind is service to Almighty.</blockquote>
          <figcaption>Our motto</figcaption>
        </figure>
        <div className="sx-pair">
          <article>
            <span className="sx-tile-icon">
              <Eye size={24} aria-hidden="true" />
            </span>
            <h3>Vision</h3>
            <p>
              To heal the ailing and uplift the health of the community, with
              special care for the educationally and economically backward and
              weaker sections of society.
            </p>
          </article>
          <article>
            <span className="sx-tile-icon">
              <Target size={24} aria-hidden="true" />
            </span>
            <h3>Mission</h3>
            <p>
              To serve society by establishing hospitals, research institutes,
              pharmacies, isolation centres and other facilities, and to make
              quality healthcare accessible to all. The Trust also provides
              free Islamic and moral education with free boarding and lodging.
            </p>
          </article>
        </div>
      </section>
      <section className="sx-section" aria-labelledby="about-campus">
        <SectionHead
          align="split"
          id="about-campus"
          title="On campus."
          accent="Care under one roof."
          lead="Wards, diagnostics, two pharmacies and a herbal garden share one campus in Bandlaguda."
        />
        <div className="sx-panel">
          <SplitBar
            caption="How the 100 inpatient beds are allocated"
            parts={wardBeds}
            unit="beds"
          />
        </div>
        <IconTiles items={campusFacilities} label="Campus facilities" />
      </section>
      <section className="sx-section" aria-labelledby="about-trust">
        <SectionHead
          id="about-trust"
          title="The Trust."
          accent="Leadership and heritage."
          lead="Al Arif Education and Medical Trust was established in 2001 and is registered under the AP Societies Registration Act (No. 327/IV/2011)."
        />
        <ul className="sx-trustees" aria-label="Trustees">
          {trustees.map((trustee) => (
            <li key={trustee.photo}>
              <img
                src={`/trustees/${trustee.photo}.webp`}
                alt={trustee.name}
                width={560}
                height={700}
                loading="lazy"
                decoding="async"
              />
              <span>{trustee.role}</span>
              <strong>{trustee.name}</strong>
              {trustee.note && <small>{trustee.note}</small>}
            </li>
          ))}
        </ul>
        <dl className="sx-trust">
          <div data-feature="">
            <Landmark size={30} aria-hidden="true" />
            <dt>Founding patron</dt>
            <dd>
              Hazrat Sheikh Syed Mohammed Arifuddin Jeelani Noorullah Shah
              Noori RA
            </dd>
          </div>
          <div>
            <Sprout size={24} aria-hidden="true" />
            <dt>Founder Chairman</dt>
            <dd>Late Alhaj Syed Mohd. Arifuddin Jeelani Chishti wa Qadri</dd>
          </div>
          <div>
            <BadgeCheck size={24} aria-hidden="true" />
            <dt>Directors</dt>
            <dd>
              <Link to="/site/doctors/syed-touheed-ahmed">
                Dr. Syed Touheed Ahmed
              </Link>{" "}
              ·{" "}
              <Link to="/site/doctors/mohd-najeeb-khan">
                Dr. Mohd. Najeeb Khan
              </Link>
              <small>BUMS, MD, Ph.D</small>
            </dd>
          </div>
          <div>
            <Hospital size={24} aria-hidden="true" />
            <dt>Medical Superintendent</dt>
            <dd>
              <Link to="/site/doctors/kaleemullah-khan">
                Dr. Kaleemullah Khan
              </Link>
              <small>BUMS, MD (Moalijat)</small>
            </dd>
          </div>
          <div data-tone="sage">
            <BookOpen size={24} aria-hidden="true" />
            <dt>Also run by the Trust</dt>
            <dd>
              Jamia Arifia Nooria
              <small>
                A charitable Arabic institute with free education, boarding and
                lodging.
              </small>
              <TextLink to="/site/education">About the Jamia</TextLink>
            </dd>
          </div>
        </dl>
      </section>
      <section className="sx-section" aria-labelledby="about-community">
        <SectionHead
          align="split"
          id="about-community"
          title="Serving the community."
          accent="Beyond the hospital walls."
          lead="Relief centres, free camps and distributions run alongside everyday care."
        />
        <FigureCards
          items={communityRecord}
          more={{ to: "/site/community", label: "Community & milestones" }}
        />
      </section>
      <section className="sx-section" aria-labelledby="about-registrations">
        <SectionHead
          id="about-registrations"
          title="Registrations."
          accent="Licensed and accountable."
        />
        <BadgeGrid items={registrations} />
      </section>
      <ExploreTiles items={aboutRoutes} />
      <ContactBand />
    </div>
  );
}
const jamiaTiles: Tile[] = [
  {
    icon: School,
    title: "1st Standard to Kamil",
    detail: "Classes from the first standard to the Kamil Course.",
  },
  { icon: Users, figure: "250", title: "Pupils", detail: "About 250 enrolled." },
  {
    icon: BedDouble,
    title: "Free boarding & lodging",
    detail: "For educationally and economically backward families.",
  },
  {
    icon: BookOpen,
    title: "Islamic & Arabic studies",
    detail: "Moral classes for students of other faiths.",
  },
  {
    icon: HandHeart,
    title: "Part of hospital life",
    detail: "Jamia staff join hospital events alongside the care team.",
  },
  {
    icon: CalendarDays,
    figure: "2002",
    title: "Founded",
    detail: "In a building donated by the Founder Chairman.",
  },
];
function Education() {
  return (
    <div className="mp-page">
      <div className="mp-detail-hero">
        <PageTitle
          title={"Care inspires\ncontinued learning."}
          description="Jamia Arifia Nooria, and planned supervised observation, workshops and academic exchange at Al-Arif."
        />
        <div className="mp-service-stamp">
          <BookOpen size={48} aria-hidden="true" />
          <span>Education & Research</span>
          <strong>Learn. Observe. Ask.</strong>
        </div>
      </div>
      <section className="sx-section" aria-labelledby="education-jamia">
        <SectionHead
          id="education-jamia"
          title="Jamia Arifia Nooria."
          accent="Free learning since 2002."
          lead="A charitable Arabic institute run by the Al Arif Education and Medical Trust. It began in 2002 alongside the hospital, in a building donated by the Founder Chairman, Late Alhaj Syed Mohd. Arifuddin Jeelani Chishti wa Qadri."
        />
        <IconTiles items={jamiaTiles} label="About the Jamia" />
        <p className="sx-note">
          For admissions, contact hospital reception. School contact details and
          admission timings will be added when confirmed.
        </p>
      </section>
      <section className="sx-section" aria-labelledby="education-programmes">
        <SectionHead
          id="education-programmes"
          align="split"
          title="Programmes."
          accent="Planned, not yet open."
          lead="Programme dates, eligibility and certification will be published here once confirmed."
        />
        <div className="mp-status-notice">
          <CircleHelp size={20} aria-hidden="true" />
          <p>
            Clinical observation applications are not open. Programme dates,
            eligibility and certification are not yet confirmed.
          </p>
        </div>
        <div className="mp-programme-list">
          <Link to="/site/education/clinical-observation">
            <span className="sx-programme-icon">
              <Stethoscope size={24} aria-hidden="true" />
            </span>
            <span className="sx-programme-status">Proposed programme</span>
            <h3>Clinical observation</h3>
            <p>
              Learn about the planned scope of observation and the details to
              confirm before applying.
            </p>
            <span className="mp-text-link">
              Explore clinical observation{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
          <article>
            <span className="sx-programme-icon">
              <Presentation size={24} aria-hidden="true" />
            </span>
            <span className="sx-programme-status">Details to be announced</span>
            <h3>Workshops & academic visits</h3>
            <p>
              Dates, topics and participation details will be shared when
              confirmed.
            </p>
            <TextLink to="/site/research">View research & publications</TextLink>
          </article>
        </div>
      </section>
      <div className="sx-strip">
        <PhoneCall size={22} aria-hidden="true" />
        <p>
          For education inquiries, contact reception and ask to speak with the
          programme coordinator.
        </p>
        <TextLink to="/site/visit">Contact the hospital</TextLink>
      </div>
    </div>
  );
}
function Programme() {
  const { slug } = useParams();
  if (slug !== "clinical-observation") return <NotFound />;
  return (
    <div className="mp-page">
      <BackLink to="/site/education">Education & learning</BackLink>
      <PageTitle
        title={"Learn by observing.\nUnderstand through care."}
        description="A planned opportunity for supervised learning. Programme details and applications are not yet available."
      />
      <div className="mp-reading-layout">
        <div>
          <section className="mp-reading-section">
            <h2>A programme with clear expectations.</h2>
            <p>
              Before accepting inquiries, the hospital would publish a defined
              learning scope, supervising clinician, eligible audience and
              limits on participation. Observation must not imply permission to
              provide care or access patient records.
            </p>
            <h3>What the programme page will explain</h3>
            <ul className="mp-check-list">
              {[
                "Learning objectives and supervised activities",
                "Eligibility and documents needed",
                "Attendance, privacy and conduct expectations",
                "Selection process and coordinator contact",
              ].map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="mp-reading-section">
            <h2>From interest to participation.</h2>
            <ol className="mp-numbered-list">
              <li>Read the approved programme and eligibility.</li>
              <li>Contact the education coordinator.</li>
              <li>Receive selection and participation instructions.</li>
            </ol>
          </section>
        </div>
        <aside className="mp-profile-facts">
          <h2>Programme status</h2>
          <dl>
            {[
              "Intake dates",
              "Eligibility",
              "Duration",
              "Supervisor",
              "Fees / certification",
            ].map((label) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>Not yet confirmed</dd>
              </div>
            ))}
          </dl>
          <p>Applications are not open.</p>
          <TextLink to="/site/education">Back to education</TextLink>
        </aside>
      </div>
    </div>
  );
}
const researchInitiatives: Tile[] = [
  {
    icon: Users,
    title: "Scientific sessions",
    detail: "Held regularly with the Dept. of AYUSH (Telangana) and CCRUM experts.",
  },
  {
    icon: FlaskConical,
    title: "COVID-19 research",
    detail: "Unani management studied in 2020–21, including Tiryaq-e-Arba.",
  },
  {
    icon: Microscope,
    figure: "350+",
    title: "Single-drug exhibition",
    detail: "Unani drugs and 100 live plants on show, March 2022.",
  },
  {
    icon: Landmark,
    title: "Salar Jung Museum",
    detail: "A Unani single-drug exhibition, February 2023.",
  },
  {
    icon: Sprout,
    figure: "100",
    title: "Herbal garden",
    detail: "Species of medicinal plants across 4,047 sq.m.",
  },
  {
    icon: HandHeart,
    title: "Free distributions & camps",
    detail: "AYUSH Joshanda in 2020 and annual Unani Day free camps.",
  },
];
function Research() {
  return (
    <div className="mp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <Telescope size={14} aria-hidden="true" />
            Unani Research Institute
          </>
        }
        title={"A place for inquiry.\nA record of learning."}
        description="The institute’s initiatives, exhibitions and a future archive for approved publications."
      />
      <section className="sx-section" aria-labelledby="research-initiatives">
        <SectionHead
          id="research-initiatives"
          align="split"
          title="Research initiatives."
          accent="Unani knowledge, shared."
          lead="Sessions, exhibitions and fieldwork that bring Unani medicine to students, clinicians and the public."
        />
        <IconTiles items={researchInitiatives} label="Initiatives" />
      </section>
      <section className="mp-related-reading">
        <h2>
          From the record.
          <br />
          <em>Sessions, exhibitions and the garden.</em>
        </h2>
        <StoryCards
          stories={stories.filter(
            (story) =>
              story.category === "Research & learning" ||
              story.slug === "herbal-garden",
          )}
          compact
        />
        <TextLink to="/site/community">See the full timeline</TextLink>
      </section>
      <section className="mp-publication-empty">
        <BookOpen size={34} aria-hidden="true" />
        <h2>Publications & summaries.</h2>
        <p>
          Publication records are not available here yet. Approved records will
          include authors, publication details and links to the source.
        </p>
        <span>Awaiting verified publication records</span>
      </section>
      <section className="sx-section" aria-labelledby="research-evidence">
        <SectionHead
          id="research-evidence"
          title="Evidence,"
          accent="clearly attributed."
          lead="Academic summaries will distinguish published findings from proposed work. Patient testimonials will not be used as clinical evidence. Clinical outcomes and study participation require appropriate review and consent processes."
        />
        <div className="sx-center">
          <TextLink to="/site/education">Education & academic visits</TextLink>
        </div>
      </section>
    </div>
  );
}
const visitFacts: IconFact[] = [
  { icon: Clock, label: "Open 24 hours" },
  { icon: CalendarDays, label: "OPD Mon–Sat" },
  { icon: IndianRupee, label: "₹10 OPD fee" },
];
const visitQuestions = [
  [
    "Accessibility & assistance",
    "Ask reception about step-free access, mobility support and any help needed on arrival. Facility details have not yet been provided.",
  ],
  [
    "Reports & prescriptions",
    "Bring relevant medical reports, previous prescriptions and a list of current medicines.",
  ],
  [
    "Walk-ins & consultations",
    "For walk-in OPD care, reception can confirm the appropriate schedule and whether an appointment is needed. The hospital OP fee is ₹10.",
  ],
];
function Visit() {
  return (
    <div className="mp-page">
      <PageTitle
        align="center"
        eyebrow={
          <>
            <MapPin size={14} aria-hidden="true" />
            Bandlaguda, Chandrayangutta, Hyderabad
          </>
        }
        title={"We’ll help you\nfind your way."}
        description="Directions, reception and a little help getting ready."
      >
        <FactChips items={visitFacts} label="At a glance" />
      </PageTitle>
      <nav className="sx-contact" aria-label="Contact the hospital">
        <a href="tel:+918555086667">
          <Phone size={24} aria-hidden="true" />
          <span>Reception</span>
          <strong>+91 85550 86667</strong>
        </a>
        <a href="https://wa.me/918555086667" target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          <span>WhatsApp</span>
          <strong>
            +91 85550 86667
            <span className="mu-sr"> (opens in a new tab)</span>
          </strong>
        </a>
        <a href="tel:+919848430017" data-tone="urgent">
          <Siren size={24} aria-hidden="true" />
          <span>Emergency 24/7</span>
          <strong>+91 98484 30017</strong>
        </a>
        <a href="mailto:aaghuri@gmail.com">
          <Mail size={24} aria-hidden="true" />
          <span>Email</span>
          <strong>aaghuri@gmail.com</strong>
        </a>
      </nav>
      <section className="sx-section" aria-labelledby="visit-hours">
        <SectionHead
          id="visit-hours"
          align="split"
          title="Opening hours."
          accent="The hospital never closes."
          lead="OPD runs approx. 8:30 am–8:30 pm and timings vary by doctor. Please confirm your doctor’s schedule and any specialist fee with reception before travelling."
        />
        <WeekStrip open={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]} />
      </section>
      <section className="sx-place" aria-labelledby="visit-address">
        <div className="mp-address-panel">
          <MapPin size={37} aria-hidden="true" />
          <h2 id="visit-address">Al-Arif Hospital</h2>
          <p>{address}</p>
          <Button asChild>
            <a href={maps} target="_blank" rel="noreferrer">
              Open Google Maps <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Button>
        </div>
        <ul className="sx-place-notes">
          <li>
            <Navigation size={20} aria-hidden="true" />
            {landmark}
          </li>
          <li>
            <Building2 size={20} aria-hidden="true" />
            Four buildings on a 5.35 acre campus
          </li>
          <li>
            <Ambulance size={20} aria-hidden="true" />
            24-hour casualty and an ambulance
          </li>
        </ul>
      </section>
      <VisitChecklist />
      <section className="sx-band sx-alert" aria-labelledby="visit-urgent">
        <Siren size={34} aria-hidden="true" />
        <h2 id="visit-urgent">Urgent medical need?</h2>
        <a href="tel:+919848430017">+91 98484 30017</a>
        <p>
          Call the hospital emergency line or seek immediate local emergency
          help. Do not wait for an online inquiry.
        </p>
      </section>
      <section className="sx-section sx-narrow" aria-labelledby="visit-faq">
        <SectionHead
          id="visit-faq"
          title="Questions"
          accent="before travelling?"
        />
        <Accordion type="single" collapsible>
          {visitQuestions.map(([title, body]) => (
            <AccordionItem value={title} key={title}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
function Inquiry() {
  const [params] = useSearchParams();
  const initial = params.get("service") || "";
  const [service, setService] = useState(
    servicePages.some((item) => item.slug === initial) ? initial : "",
  );
  const [preference, setPreference] = useState("No preference");
  const [prepared, setPrepared] = useState(false);
  const [error, setError] = useState("");
  // Remounts the alert on every blocked submit so the nudge and announcement repeat.
  const [attempt, setAttempt] = useState(0);
  return (
    <div className="mp-page">
      <PageTitle
        align="center"
        title={"Let’s make\nthe next step clear."}
        description="Choose a department and your preferred time, then contact reception to arrange your visit."
      >
        <ol className="sx-steps" aria-label="Three steps">
          <li>Choose care</li>
          <li>Pick a time</li>
          <li>Call reception</li>
        </ol>
      </PageTitle>
      <div className="mp-inquiry-layout">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!service) {
              setError("Choose the service you would like to ask about.");
              setAttempt((value) => value + 1);
              return;
            }
            setError("");
            setPrepared(true);
          }}
        >
          <h2>Plan your inquiry.</h2>
          <p>No patient details are collected or sent.</p>
          <FloatField
            id="inquiry-service"
            label="Care or service"
            filled={Boolean(service)}
            invalid={Boolean(error)}
          >
            <select
              id="inquiry-service"
              value={service}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "inquiry-service-error" : undefined}
              onChange={(event) => {
                setService(event.target.value);
                setPrepared(false);
                setError("");
              }}
            >
              <option value="">Choose a service</option>
              {servicePages.map((item) => (
                <option value={item.slug} key={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </FloatField>
          <FloatField id="inquiry-time" label="Time preference" filled>
            <select
              id="inquiry-time"
              value={preference}
              onChange={(event) => {
                setPreference(event.target.value);
                setPrepared(false);
              }}
            >
              <option>No preference</option>
              <option>Morning</option>
              <option>Evening</option>
            </select>
          </FloatField>
          {error && (
            <p
              key={attempt}
              id="inquiry-service-error"
              className="mp-error"
              role="alert"
            >
              {error}
            </p>
          )}
          <Button type="submit">
            Show my next step <ArrowRight size={17} />
          </Button>
          {prepared && (
            <div className="mp-inquiry-result" role="status">
              <Check size={21} />
              <div>
                <h3>Your inquiry plan</h3>
                <p>
                  {servicePages.find((item) => item.slug === service)?.name} ·{" "}
                  {preference}
                </p>
                <p>
                  Contact reception to discuss a day and clinician. Nothing has
                  been sent or booked.
                </p>
              </div>
            </div>
          )}
        </form>
        <aside>
          <h2>Prefer a conversation?</h2>
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
          <hr />
          <h3>Arrange your visit</h3>
          <p>
            Call or message reception with your preferred care and time. The
            team will confirm the clinician, availability and any preparation.
          </p>
          <small>
            Your visit is confirmed only after speaking with reception.
          </small>
        </aside>
      </div>
    </div>
  );
}

export function Shell() {
  const header = useRef<HTMLElement>(null);
  const [headerRaised, setHeaderRaised] = useState(false);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPreference, setMotionPreference] = useState(true);
  const reduced = useReducedMotion();
  const enabled = motionPreference && !reduced;
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const heading = main.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    applyHead(
      location.pathname,
      heading?.innerText?.replace(/\s+/g, " ").trim() || "Al-Arif Hospital",
    );
  }, [location.pathname]);
  useSiteScroll(enabled, location.pathname);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>(".mp-menu-toggle")?.focus();
      }
    };
    const closeOnResize = () => {
      if (window.innerWidth > 1050) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [menuOpen]);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const updateHeight = () => {
      const height = `${element.getBoundingClientRect().height}px`;
      element.parentElement?.style.setProperty("--site-header-height", height);
      document.documentElement.style.setProperty(
        "--site-header-height",
        height,
      );
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    updateHeight();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const updateHeader = () => setHeaderRaised(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  // Four routes up top; the rest of the site is a footer link or a search away.
  const nav = [
    ["Departments", "/site/departments"],
    ["Our doctors", "/site/doctors"],
    ["About", "/site/about"],
    ["Visit us", "/site/visit"],
  ];
  return (
    <InteractionMotion.Provider value={enabled}>
      <div className="mp" data-motion={enabled ? "on" : "off"}>
        <ToastProvider>
          <ReadingProgress />
          <a className="mp-skip" href="#page-content">
            Skip to content
          </a>
          {menuOpen && (
            <button
              className="mp-menu-backdrop"
              aria-label="Close navigation"
              tabIndex={-1}
              onClick={() => setMenuOpen(false)}
            />
          )}
          <header
            ref={header}
            className={`mp-header${headerRaised ? " is-raised" : ""}`}
          >
            <Link className="mp-brand" to="/site">
              <Leaf size={30} />
              <span>
                Al-Arif<small>General Hospital & Unani Research Institute</small>
              </span>
            </Link>
            <nav
              id="main-navigation"
              aria-label="Main navigation"
              className={menuOpen ? "is-open" : ""}
            >
              {nav.map(([label, path]) => (
                <NavLink onClick={() => setMenuOpen(false)} key={path} to={path}>
                  {label}
                </NavLink>
              ))}
            </nav>
            <QuickFind />
            <Action to="/site/request">Request a visit</Action>
            <button
              className="mp-menu-toggle"
              aria-controls="main-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </header>
          <main id="page-content" ref={main}>
            <Chapter path={location.pathname} motionEnabled={enabled}>
              <Routes>
                <Route path="/site" element={<HomeStory />} />
                <Route path="/site/departments" element={<Departments />} />
                <Route path="/site/services" element={<Services />} />
                <Route path="/site/services/:slug" element={<ServiceDetail />} />
                <Route path="/site/doctors" element={<Doctors />} />
                <Route path="/site/doctors/:slug" element={<DoctorDetail />} />
                <Route path="/site/about" element={<About />} />
                <Route path="/site/education" element={<Education />} />
                <Route path="/site/education/:slug" element={<Programme />} />
                <Route path="/site/research" element={<Research />} />
                <Route path="/site/stories" element={<Stories />} />
                <Route path="/site/stories/:slug" element={<StoryDetail />} />
                <Route path="/site/community" element={<Community />} />
                <Route path="/site/pharmacy" element={<Pharmacy />} />
                <Route path="/site/visit" element={<Visit />} />
                <Route
                  path="/site/request"
                  element={<Inquiry key={location.search} />}
                />
                <Route path="/" element={<Navigate to="/site" replace />} />
                <Route
                  path="/site/preview"
                  element={<Navigate to="/site" replace />}
                />
                <Route
                  path="/site/system"
                  element={<Navigate to="/site" replace />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Chapter>
          </main>
          <footer className="mp-footer">
            <div>
              <Link to="/site" className="mp-footer-brand">
                Al-Arif
              </Link>
              <p>
                Thoughtful care.
                <br />
                Closer to your community.
              </p>
            </div>
            <div>
              <h3>Explore</h3>
              <Link to="/site/departments">Departments</Link>
              <Link to="/site/services">Care & services</Link>
              <Link to="/site/doctors">Our doctors</Link>
              <Link to="/site/about">About the hospital</Link>
              <Link to="/site/pharmacy">Pharmacy & manufacturing</Link>
            </div>
            <div>
              <h3>Learn & visit</h3>
              <Link to="/site/stories">Stories & guides</Link>
              <Link to="/site/community">Community & milestones</Link>
              <Link to="/site/education">Education & learning</Link>
              <Link to="/site/research">Research & publications</Link>
              <Link to="/site/visit">Contact & directions</Link>
            </div>
            <div>
              <h3>Get in touch</h3>
              <a href="tel:+918555086667">Call reception</a>
              <a
                href="https://wa.me/918555086667"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a href="tel:+919848430017">Emergency line (24/7)</a>
              <a href="mailto:aaghuri@gmail.com">aaghuri@gmail.com</a>
            </div>
            <p className="mp-footer-legal">
              Run by the Al Arif Education and Medical Trust · Hospital Reg. No.
              07F-APMCE-1147 · Clinical Establishment Licence A/111/DRA/HYD/2025
            </p>
            <div className="mp-footer-bottom">
              © 2026 Al-Arif Hospital
              <button
                type="button"
                className="mp-motion-switch"
                aria-pressed={enabled}
                onClick={() => setMotionPreference(!motionPreference)}
                disabled={reduced}
              >
                <span className="mp-motion-switch-track" aria-hidden="true">
                  <span className="mp-motion-switch-knob" />
                </span>
                Motion
                {/* The name stays "Motion"; aria-pressed carries on and off. */}
                {reduced ? (
                  <span>reduced by your system</span>
                ) : (
                  <span aria-hidden="true">{enabled ? "on" : "off"}</span>
                )}
              </button>
            </div>
          </footer>
          <div className="mp-mobile-contact" onClick={() => setMenuOpen(false)}>
            <a href="tel:+918555086667">
              <Phone size={17} />
              Call reception
            </a>
            <Link to="/site/request">
              <CalendarDays size={17} />
              Request a visit
            </Link>
          </div>
        </ToastProvider>
      </div>
    </InteractionMotion.Provider>
  );
}
export default function Website() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
