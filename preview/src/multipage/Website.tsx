import HomeStory from "./HomeStory";
import { Stories, StoryCards, StoryDetail, TherapyExplorer } from "./Stories";
import { stories } from "./story-data";
import { Community } from "./Community";
import { Pharmacy } from "./Pharmacy";
import { CareTeam } from "./CareDirectory";
import { DepartmentsRedirect, SharedServices, WingPage } from "./Departments";
import {
  departmentPath,
  departments,
  wardBeds,
  wings,
} from "./department-data";
import { KhanectMark } from "@/components/KhanectMark";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { InteractionMotion } from "./interaction-context";
import { ContactDock } from "./ContactDock";
import { ReachUs, VisitComposer } from "./ReachUs";
import { SharedServiceLinks, WingLinks } from "./CareMenu";
import { GooeyNav, type GooeyNavItem } from "@/components/ui/gooey-nav";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode, Ref } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  matchPath,
  Navigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  BookOpen,
  Mail,
  Siren,
  Baby,
  BadgeCheck,
  BedDouble,
  Building2,
  FlaskConical,
  Hospital,
  Landmark,
  LandPlot,
  Microscope,
  Navigation,
  Pill,
  Presentation,
  Quote,
  School,
  Sprout,
  Target,
  Warehouse,
} from "lucide-react";
import {
  Ambulance,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock,
  Eye,
  GraduationCap,
  Hand,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  IndianRupee,
  Leaf,
  MapPin,
  Phone,
  PhoneCall,
  Search,
  Stethoscope,
  Telescope,
  Users,
  X,
} from "@/components/animated-icons";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { servicePages, doctorPages, wingOf } from "./data";
import type { Service } from "./data";
import { fullAddress, hospital, landmark } from "@/hospital";
import { DoctorSpotlight } from "@/components/react-bits/DoctorSpotlight";
import { SplitBar, ToastProvider } from "./motion-ui";
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
  ConversationLinks,
  NotFound,
  PageTitle,
  ServiceLink,
  TextLink,
} from "./primitives";
import { Chapter } from "./Chapter";
import { useReducedMotion } from "./useReducedMotion";
import { applyHead } from "@/seo";
import { scrollOnArrival, sectionTop, useSiteScroll } from "./useSiteScroll";
import { usePageTone } from "./usePageTone";
import { drawerQuery } from "./useMedia";
import { cn } from "@/lib/utils";
import "./website.css";
import "./home-story.css";
import "./care-services.css";

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
        to={
          service.wing === "General hospital" ? "/site/general" : "/site/unani"
        }
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
          <Action to={`/site/visit?service=${service.slug}#request`}>
            Ask about this care
          </Action>
          <a href={hospital.receptionHref} className="mp-aside-phone">
            <Phone size={16} />
            {hospital.reception}
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
function Doctors() {
  const [query, setQuery] = useState("");
  // The header menus link here with ?department= to show one department's team,
  // or with ?wing= to open on one wing.
  const [params, setParams] = useSearchParams();
  const wingParam = params.get("wing");
  const wingFromParam = () =>
    wings.find((group) => group.id === wingParam)?.name ?? "All";
  const [wing, setWing] = useState<Service["wing"] | "All">(wingFromParam);
  const [seenWing, setSeenWing] = useState(wingParam);
  if (wingParam !== seenWing) {
    setSeenWing(wingParam);
    setWing(wingFromParam());
  }
  const department = departments.find(
    (item) => item.slug === params.get("department"),
  );
  const matches = doctorPages.filter(
    (doctor) =>
      (!department || department.doctorSlugs?.includes(doctor.slug)) &&
      `${doctor.name} ${doctor.honorific ?? ""} ${doctor.designation} ${doctor.department} ${doctor.degrees}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const groups = wings
    .filter((group) => wing === "All" || group.name === wing)
    .map((group) => ({
      ...group,
      doctors: matches.filter((doctor) => wingOf(doctor) === group.name),
    }))
    .filter((group) => group.doctors.length);
  const filters = [
    { name: "All" as const, icon: Users, count: matches.length },
    ...wings.map((group) => ({
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
          {department && (
            <p className="sx-department" role="status">
              Showing the {department.english ?? department.name} team
              <button type="button" onClick={() => setParams({})}>
                <X size={14} aria-hidden="true" />
                Show all doctors
              </button>
            </p>
          )}
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
          <Action to={`/site/visit?service=${doctor.serviceSlugs[0]}#request`}>
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
              <dd>
                {doctor.department}
                {departments
                  .filter((item) => item.doctorSlugs?.includes(doctor.slug))
                  .map((item) => (
                    <Link
                      key={item.slug}
                      className="mp-department-link"
                      to={departmentPath(item.slug)}
                    >
                      See the {item.english ?? item.name} department
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
              </dd>
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
  },
  {
    photo: "mohammed-sami-uddin",
    role: "Trustee",
    name: "Mohammed Sami Uddin",
  },
  {
    photo: "syed-mohammed-mazhar-uddin-jeelani",
    role: "Trustee",
    name: "Syed Mohammed Mazhar Uddin Jeelani",
  },
  {
    photo: "cherngoden-abu-bakkar",
    role: "Trustee",
    name: "Cherngoden Abu Bakkar",
  },
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
    detail: "All India Horticulture & Agriculture Show, August–September 2023.",
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
    to: "/site/general",
    icon: Stethoscope,
    title: "General hospital",
    detail: "Nine specialty OPDs, care pages and doctors",
  },
  {
    to: "/site/unani",
    icon: Leaf,
    title: "Unani care",
    detail: "Seven Unani OPDs, care pages and doctors",
  },
  {
    to: "/site/services",
    icon: HeartPulse,
    title: "Services",
    detail: "24-hour care, diagnostics and the pharmacies",
  },
  {
    to: "/site/community",
    icon: HandHeart,
    title: "Community & milestones",
    detail: "Camps, relief work and the timeline",
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
            <TextLink to="/site/general#departments">
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
            <TextLink to="/site/unani#departments">Unani departments</TextLink>
          </article>
        </div>
        <p className="sx-note">
          The outpatient fee of ₹10 and inpatient bed charge of ₹100 a day, set
          in 2002, are still continued to help the poorest of the poor.
        </p>
      </section>
      <StatBand items={aboutStats} label="Al Arif in figures" />
      <section className="sx-section" aria-labelledby="about-principles">
        <h2 id="about-principles" className="sr-only">
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
              quality healthcare accessible to all. The Trust also provides free
              Islamic and moral education with free boarding and lodging.
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
            </li>
          ))}
        </ul>
        <dl className="sx-trust">
          <div data-feature="">
            <Landmark size={30} aria-hidden="true" />
            <dt>Founding patron</dt>
            <dd>
              Hazrat Sheikh Syed Mohammed Arifuddin Jeelani Noorullah Shah Noori
              RA
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
    </div>
  );
}
const jamiaTiles: Tile[] = [
  {
    icon: School,
    title: "1st Standard to Kamil",
    detail: "Classes from the first standard to the Kamil Course.",
  },
  {
    icon: Users,
    figure: "250",
    title: "Pupils",
    detail: "About 250 enrolled.",
  },
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
            <TextLink to="/site/research">
              View research & publications
            </TextLink>
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
    detail:
      "Held regularly with the Dept. of AYUSH (Telangana) and CCRUM experts.",
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
  const { hash, search, key } = useLocation();
  useEffect(() => {
    if (hash !== "#request") return;
    return scrollOnArrival(() => {
      const target = document.getElementById("request");
      if (!target) return;
      window.scrollTo({ top: sectionTop(target) - 16, behavior: "instant" });
      const heading = target.querySelector("h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    });
    // A new key means a fresh click, even on a link to the hash already shown.
  }, [hash, key]);
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
        description="Directions, reception and an easy way to request a visit."
      >
        <FactChips items={visitFacts} label="At a glance" oneRow />
      </PageTitle>
      <nav className="sx-contact" aria-label="Contact the hospital">
        <a href={hospital.receptionHref}>
          <Phone size={24} aria-hidden="true" />
          <span>Reception</span>
          <strong>{hospital.reception}</strong>
        </a>
        <a href={hospital.whatsappHref} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          <span>WhatsApp</span>
          <strong>
            {hospital.reception}
            <span className="sr-only"> (opens in a new tab)</span>
          </strong>
        </a>
        <a href={hospital.emergencyHref} data-tone="urgent">
          <Siren size={24} aria-hidden="true" />
          <span>Emergency 24/7</span>
          <strong>{hospital.emergency}</strong>
        </a>
        <a href={hospital.emailHref}>
          <Mail size={24} aria-hidden="true" />
          <span>Email</span>
          <strong>{hospital.email}</strong>
        </a>
      </nav>
      <VisitRequest key={search} />
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
          <p>{fullAddress}</p>
          {/* Phones get the map itself; the whole map is one link out to Google Maps. */}
          <a
            className="mp-address-map"
            href={hospital.maps}
            target="_blank"
            rel="noreferrer"
          >
            <iframe
              src={hospital.mapsEmbed}
              title="Map of Al-Arif Hospital"
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
            />
            <span>
              <MapPin size={14} aria-hidden="true" />
              Tap to open in Maps
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
          <ArrowButton
            render={<a href={hospital.maps} target="_blank" rel="noreferrer" />}
          >
            Open Google Maps
          </ArrowButton>
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
      <section className="sx-band sx-alert" aria-labelledby="visit-urgent">
        <Siren size={34} aria-hidden="true" />
        <h2 id="visit-urgent">Urgent medical need?</h2>
        <a href={hospital.emergencyHref}>{hospital.emergency}</a>
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
// Three steps beside the shared request, which writes the WhatsApp message to reception.
function VisitRequest() {
  const [params] = useSearchParams();
  return (
    <section
      id="request"
      className="sx-section sx-request"
      aria-labelledby="visit-request"
    >
      <ol className="sx-steps" aria-label="Three steps">
        <li>Choose care</li>
        <li>Pick a day and time</li>
        <li>Send on WhatsApp</li>
      </ol>
      <div className="mp-inquiry-layout">
        <VisitComposer
          id="inquiry"
          initialService={params.get("service") || ""}
          heading={<h2 id="visit-request">Request a visit.</h2>}
        />
        <aside>
          <h2>Prefer a conversation?</h2>
          <ConversationLinks />
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
    </section>
  );
}

/**
 * Closes an open panel on Escape, handing focus back to its toggle, and when a
 * resize leaves the layout the panel belongs to.
 */
function useDismiss(
  open: boolean,
  setOpen: (open: boolean) => void,
  { toggle, closeWhen }: { toggle: string; closeWhen: () => boolean },
) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.querySelector<HTMLElement>(toggle)?.focus();
    };
    const closeOnResize = () => {
      if (closeWhen()) setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open, setOpen, toggle, closeWhen]);
}
const inDrawerLayout = () => window.matchMedia(drawerQuery).matches;
const inWideLayout = () => !inDrawerLayout();

/** The sticky header, which frosts over once the page scrolls; only it re-renders as it does. */
function SiteHeader({
  ref,
  menuOpen,
  children,
}: {
  ref: Ref<HTMLElement>;
  menuOpen: boolean;
  children: ReactNode;
}) {
  const [raised, setRaised] = useState(false);
  useEffect(() => {
    const updateHeader = () => setRaised(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  return (
    <header
      ref={ref}
      className={cn(
        "mp-header",
        raised && "is-raised",
        menuOpen && "is-menu-open",
      )}
    >
      {children}
    </header>
  );
}

// The three header menus: each wing, then the services both wings share.
const menus = [
  {
    id: "general",
    label: "General",
    name: "General hospital",
    path: "/site/general",
    icon: Stethoscope,
    note: "Nine specialty OPDs",
  },
  {
    id: "unani",
    label: "Unani",
    name: "Unani care",
    path: "/site/unani",
    icon: Leaf,
    note: "Seven Unani OPDs",
  },
  {
    id: "services",
    label: "Services",
    name: "Services",
    path: "/site/services",
    icon: HeartPulse,
    note: "24 hours, diagnostics, pharmacy",
  },
] as const;
type MenuId = (typeof menus)[number]["id"];

function MenuLinks({ id, onNavigate }: { id: MenuId; onNavigate: () => void }) {
  const wing = wings.find((item) => item.id === id);
  return wing ? (
    <WingLinks wing={wing} onNavigate={onNavigate} />
  ) : (
    <SharedServiceLinks onNavigate={onNavigate} />
  );
}

export function Shell() {
  const header = useRef<HTMLElement>(null);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [drawerMenu, setDrawerMenu] = useState<MenuId | null>(null);
  const dismissMenu = useCallback((open: boolean) => {
    if (!open) setOpenMenu(null);
  }, []);
  // A mouse opens a menu by resting on it, and closes it by leaving both the menu and its panel.
  const hoverTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef("mouse");
  const hoverMenu = (id: MenuId | null, delay: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(id), delay);
  };
  const showMenu = (id: MenuId | null) => {
    window.clearTimeout(hoverTimer.current);
    setOpenMenu(id);
  };
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);
  // Motion follows the system's reduced-motion setting.
  const enabled = !useReducedMotion();
  const main = useRef<HTMLElement>(null);
  const page = useRef<HTMLDivElement>(null);
  // A service page starts the visit request on that service.
  const serviceSlug = matchPath("/site/services/:slug", location.pathname)
    ?.params.slug;
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
  usePageTone(page, location.pathname);
  // Any navigation, including a jump to a department on the same page, folds the menus away.
  const routeKey = `${location.pathname}${location.search}${location.hash}`;
  const [seenRoute, setSeenRoute] = useState(routeKey);
  if (routeKey !== seenRoute) {
    setSeenRoute(routeKey);
    setOpenMenu(null);
    setMenuOpen(false);
  }
  // The menu panels belong to the wide header, the drawer to narrow screens.
  useDismiss(openMenu !== null, dismissMenu, {
    toggle: `[aria-controls="menu-${openMenu}"]`,
    closeWhen: inDrawerLayout,
  });
  useDismiss(menuOpen, setMenuOpen, {
    toggle: ".mp-menu-toggle",
    closeWhen: inWideLayout,
  });
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const updateHeight = () =>
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${element.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    updateHeight();
    return () => observer.disconnect();
  }, []);
  const onPath = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);
  // A care page belongs to its wing's menu; the pharmacy page to Services.
  const serviceWing = servicePages.find(
    (service) => service.slug === serviceSlug,
  )?.wing;
  const routeMenu: MenuId | null =
    onPath("/site/general") || serviceWing === "General hospital"
      ? "general"
      : onPath("/site/unani") || serviceWing === "Unani care"
        ? "unani"
        : onPath("/site/services") || onPath("/site/pharmacy")
          ? "services"
          : null;
  // Doctors, the three menus, then About.
  const menuIndex = (id: MenuId) =>
    1 + menus.findIndex((menu) => menu.id === id);
  const routeIndex = onPath("/site/doctors")
    ? 0
    : routeMenu
      ? menuIndex(routeMenu)
      : onPath("/site/about")
        ? menus.length + 1
        : -1;
  return (
    <InteractionMotion.Provider value={enabled}>
      <div ref={page} className="mp" data-motion={enabled ? "on" : "off"}>
        <ToastProvider>
          <a className="mp-skip" href="#page-content">
            Skip to content
          </a>
          {openMenu && (
            <button
              className="cm-backdrop"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={() => setOpenMenu(null)}
            />
          )}
          {menuOpen && (
            <button
              className="mp-menu-backdrop"
              aria-label="Close navigation"
              tabIndex={-1}
              onClick={() => setMenuOpen(false)}
            />
          )}
          <SiteHeader ref={header} menuOpen={menuOpen}>
            <Link className="mp-brand" to="/site">
              <img
                src="/al-arif-logo-gradient.svg"
                alt=""
                width={39}
                height={52}
              />
              <span>
                Al-Arif
                <small>General Hospital & Unani Research Institute</small>
              </span>
            </Link>
            <GooeyNav
              className="mp-gooey"
              aria-label="Main navigation"
              items={[
                { label: "Doctors", href: "/site/doctors" },
                ...menus.map((menu): GooeyNavItem => ({
                  label: menu.label,
                  href: menu.path,
                  trailing: (
                    <ChevronDown
                      className="mp-care-chevron"
                      aria-hidden="true"
                    />
                  ),
                  expanded: openMenu === menu.id,
                  controls: `menu-${menu.id}`,
                  events: {
                    onPointerDown: (event) => {
                      lastPointer.current = event.pointerType;
                    },
                    onPointerEnter: (event) => {
                      if (event.pointerType === "mouse")
                        hoverMenu(menu.id, openMenu ? 0 : 90);
                    },
                    onPointerLeave: (event) => {
                      if (event.pointerType === "mouse") hoverMenu(null, 240);
                    },
                    // A tap has no hover, so the first opens the panel and a second follows the link.
                    onClick: (event) => {
                      const tapped =
                        event.detail > 0 && lastPointer.current === "touch";
                      if (!tapped || openMenu === menu.id) return;
                      event.preventDefault();
                      showMenu(menu.id);
                    },
                    // Enter follows the link; the down arrow opens the panel and steps into it.
                    onKeyDown: (event) => {
                      if (event.key !== "ArrowDown") return;
                      event.preventDefault();
                      showMenu(menu.id);
                      requestAnimationFrame(() =>
                        document
                          .querySelector<HTMLElement>(`#menu-${menu.id} a`)
                          ?.focus(),
                      );
                    },
                  },
                })),
                { label: "About", href: "/site/about" },
              ]}
              value={openMenu ? menuIndex(openMenu) : routeIndex}
              onChange={() => showMenu(null)}
              activeColor="#1c3a13"
              activeLabelColor="#fcfcf7"
              reducedMotion={!enabled}
            />
            {menus.map((menu) => (
              <div
                key={menu.id}
                id={`menu-${menu.id}`}
                className="cm-panel"
                data-menu={menu.id}
                role="region"
                aria-label={menu.name}
                data-open={openMenu === menu.id ? "" : undefined}
                inert={openMenu !== menu.id}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") showMenu(menu.id);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") hoverMenu(null, 240);
                }}
                // Tabbing on past the last link folds the panel away.
                onBlur={(event) => {
                  const next = event.relatedTarget;
                  if (next && !event.currentTarget.contains(next))
                    showMenu(null);
                }}
              >
                <MenuLinks id={menu.id} onNavigate={() => setOpenMenu(null)} />
              </div>
            ))}
            <nav
              id="main-navigation"
              aria-label="Main navigation"
              className={cn("mp-drawer", menuOpen && "is-open")}
            >
              <NavLink onClick={() => setMenuOpen(false)} to="/site/doctors">
                <span className="mp-drawer-tile">
                  <Users size={26} aria-hidden="true" />
                </span>
                <span className="mp-drawer-text">
                  Doctors{" "}
                  <small>
                    {doctorPages.length} clinicians across two wings
                  </small>
                </span>
              </NavLink>
              {menus.map(({ id, name, path, icon: Icon, note }) => {
                const open = drawerMenu === id;
                return (
                  <Fragment key={id}>
                    {/* The row opens the page; its arrow unfolds the links beneath. */}
                    <div
                      className="mp-drawer-care"
                      data-open={open ? "" : undefined}
                    >
                      <NavLink end onClick={() => setMenuOpen(false)} to={path}>
                        <span className="mp-drawer-tile">
                          <Icon size={26} aria-hidden="true" />
                        </span>
                        <span className="mp-drawer-text">
                          {name} <small>{note}</small>
                        </span>
                      </NavLink>
                      <button
                        type="button"
                        className="mp-drawer-expand"
                        aria-expanded={open}
                        aria-controls={`drawer-${id}`}
                        aria-label={`${name} links`}
                        onClick={() => setDrawerMenu(open ? null : id)}
                      >
                        <ChevronDown
                          className="mp-care-chevron"
                          size={20}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div
                      id={`drawer-${id}`}
                      className="cm-drawer"
                      hidden={!open}
                    >
                      <MenuLinks
                        id={id}
                        onNavigate={() => setMenuOpen(false)}
                      />
                    </div>
                  </Fragment>
                );
              })}
              <NavLink onClick={() => setMenuOpen(false)} to="/site/about">
                <span className="mp-drawer-tile">
                  <Landmark size={26} aria-hidden="true" />
                </span>
                <span className="mp-drawer-text">
                  About <small>The Trust behind the hospital</small>
                </span>
              </NavLink>
            </nav>
            <Action to="/site/visit">Request a visit</Action>
            <button
              className="mp-menu-toggle"
              aria-controls="main-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* Seed's two bars, which cross into an X while the menu is open */}
              <svg
                className="mp-menu-icon"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <line x1="3.5" y1="9" x2="20.5" y2="9" />
                <line x1="3.5" y1="15" x2="20.5" y2="15" />
              </svg>
            </button>
          </SiteHeader>
          <main id="page-content" ref={main}>
            <Chapter path={location.pathname} motionEnabled={enabled}>
              <Routes>
                <Route path="/site" element={<HomeStory />} />
                <Route
                  path="/site/general"
                  element={<WingPage key="general" id="general" />}
                />
                <Route
                  path="/site/unani"
                  element={<WingPage key="unani" id="unani" />}
                />
                <Route
                  path="/site/departments"
                  element={<DepartmentsRedirect />}
                />
                <Route path="/site/services" element={<SharedServices />} />
                <Route
                  path="/site/services/:slug"
                  element={<ServiceDetail />}
                />
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
                  element={
                    <Navigate
                      to={`/site/visit${location.search}#request`}
                      replace
                    />
                  }
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
          {/* The Visit page holds its own request; the homepage ends on this as its last screen. */}
          {location.pathname !== "/site" &&
            location.pathname !== "/site/visit" && (
              <ReachUs key={location.pathname} initialService={serviceSlug} />
            )}
          <footer className="mp-footer">
            <div>
              <Link to="/site" className="mp-footer-brand">
                <img
                  src="/al-arif-logo-reversed.svg"
                  alt=""
                  width={48}
                  height={64}
                  loading="lazy"
                />
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
              <Link to="/site/general">General hospital</Link>
              <Link to="/site/unani">Unani care</Link>
              <Link to="/site/services">Services</Link>
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
              <a href={hospital.receptionHref}>Call reception</a>
              <a href={hospital.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={hospital.emergencyHref}>Emergency line (24/7)</a>
              <a href={hospital.emailHref}>{hospital.email}</a>
            </div>
            <p className="mp-footer-legal">
              Run by the Al Arif Education and Medical Trust · Hospital Reg. No.
              07F-APMCE-1147 · Clinical Establishment Licence A/111/DRA/HYD/2025
            </p>
            <div className="mp-footer-bottom">
              © 2026 Al-Arif Hospital
              <a
                className="mp-credit"
                href="https://khanect.com"
                target="_blank"
                rel="noreferrer"
              >
                <KhanectMark className="mp-credit-mark" />
                Made by Khanect AI
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </footer>
          <ContactDock />
        </ToastProvider>
      </div>
    </InteractionMotion.Provider>
  );
}
// Every moving part is an m.* component, so only the DOM animation features load. The prerender
// draws the same markup without them, since nothing animates there.
export default function Website() {
  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </LazyMotion>
  );
}
