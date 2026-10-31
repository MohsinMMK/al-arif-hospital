import {
  Activity,
  Ambulance,
  Baby,
  Eye,
  Hand,
  HeartPulse,
  Leaf,
  PersonStanding,
  Pill,
  ScanLine,
  Scissors,
  ShieldPlus,
  Siren,
  Smile,
  Sparkles,
  Sprout,
  Stethoscope,
  TestTube,
  Venus,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SplitPart } from "./motion-ui";

export type DepartmentGroup = "general" | "unani" | "round-the-clock" | "pharmacy";

export type Department = {
  slug: string;
  name: string;
  /** Plain-English name beside a Unani department's classical one. */
  english?: string;
  group: DepartmentGroup;
  icon: LucideIcon;
  summary: string;
  points?: string[];
  /** Where an inpatient needing this department is admitted. */
  beds?: string;
  serviceSlug?: string;
  /** A page that is not a service page, such as the pharmacy. */
  to?: string;
  doctorSlugs?: string[];
  call?: { href: string; label: string };
  /** Feature cards take two grid cells; wide cards stretch across two columns. */
  span?: "feature" | "wide";
};

// Sources: intake workbook sheets 3 (C6, C15–C28, C31–C34) and 4 (E5–E12),
// and the 2023 Trust activity report's salient features.
export const departmentGroups: {
  id: DepartmentGroup;
  label: string;
  title: string;
  accent: string;
  lead: string;
}[] = [
  {
    id: "general",
    label: "General hospital",
    title: "General hospital.",
    accent: "Nine specialty OPDs.",
    lead: "Modern medical and surgical care, from everyday concerns to childbirth, with diagnostics on campus.",
  },
  {
    id: "unani",
    label: "Unani",
    title: "Unani care.",
    accent: "Seven Unani OPDs.",
    lead: "Classical Unani medicine, each OPD shown with its plain-English name, under specialists with Ph.D and MD qualifications.",
  },
  {
    id: "round-the-clock",
    label: "Round the clock",
    title: "Round the clock.",
    accent: "When care can’t wait.",
    lead: "The hospital is open 24 hours. Casualty, critical care, theatre and maternity share the campus with the wards.",
  },
  {
    id: "pharmacy",
    label: "Pharmacy & garden",
    title: "Pharmacy & garden.",
    accent: "Medicines made close by.",
    lead: "Two licensed pharmacies, a raw drug agency and a medicinal herbal garden support both traditions.",
  },
];

export const departments: Department[] = [
  {
    slug: "general-medicine",
    name: "General medicine",
    group: "general",
    icon: Stethoscope,
    summary:
      "A starting point for everyday concerns, long-term conditions and preventive check-ups.",
    points: [
      "Diabetes & hypertension",
      "Fever & infections",
      "Thyroid & lifestyle disorders",
      "Preventive check-ups",
    ],
    serviceSlug: "general-medicine",
    doctorSlugs: ["mohd-abdul-rahman"],
    span: "feature",
  },
  {
    slug: "general-surgery",
    name: "General & laparoscopic surgery",
    group: "general",
    icon: Scissors,
    summary:
      "Surgical consultations, laparoscopic and open procedures, and follow-up care.",
    beds: "25-bed surgical wing",
    serviceSlug: "general-surgery",
    doctorSlugs: ["syed-mohd-sajjad-hussayni"],
  },
  {
    slug: "paediatrics",
    name: "Paediatrics",
    group: "general",
    icon: Baby,
    summary:
      "Care for newborns, infants and children, from check-ups and vaccinations to common illnesses.",
    beds: "Within the 25 obstetrics beds",
    serviceSlug: "child-health",
    doctorSlugs: ["arshad-hussain"],
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & gynaecology",
    group: "general",
    icon: Venus,
    summary:
      "Pregnancy, childbirth and gynaecological care, with a maternity ward and labour room.",
    beds: "25-bed wing",
    serviceSlug: "womens-health",
    doctorSlugs: ["naseem-fatima", "afiya-tazeen", "ummul-hasanat-tasneem"],
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    group: "general",
    icon: Eye,
    summary: "The eye department, for vision and eye concerns.",
    beds: "Surgical wing",
  },
  {
    slug: "dental-surgery",
    name: "Dental surgery",
    group: "general",
    icon: Smile,
    summary: "Dental consultations and dental surgery for teeth and gums.",
    beds: "Surgical wing",
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    group: "general",
    icon: PersonStanding,
    summary:
      "Exercise and movement-based therapy for recovery, as advised by your doctor.",
  },
  {
    slug: "radiology",
    name: "Radiology",
    group: "general",
    icon: ScanLine,
    summary: "Imaging on campus, so most scans don’t need a second trip.",
    points: [
      "Digital X-ray",
      "Ultrasound, 2D echo & colour Doppler",
      "PC-PNDT Reg. No. 0116A1266",
    ],
    serviceSlug: "diagnostics-pharmacy",
    span: "wide",
  },
  {
    slug: "pathology",
    name: "Pathology",
    group: "general",
    icon: TestTube,
    summary:
      "A fully equipped, computerised clinical laboratory with tests at subsidised rates.",
    points: ["Blood & urine tests", "Blood sugar", "ECG"],
    serviceSlug: "diagnostics-pharmacy",
    span: "wide",
  },
  {
    slug: "moalijat",
    name: "Moalijat",
    english: "Internal medicine",
    group: "unani",
    icon: Leaf,
    summary:
      "Unani consultations for adults with chronic and everyday conditions, and the hospital’s largest inpatient wing.",
    points: [
      "Digestive, liver & joint disorders",
      "Chronic lifestyle conditions",
      "Inpatient Unani care",
    ],
    beds: "50-bed wing",
    serviceSlug: "unani-medicine",
    doctorSlugs: [
      "kaleemullah-khan",
      "umme-shakeeba-khair",
      "shaik-mohammed-salam",
      "asma-begum",
      "reshma-banu",
    ],
    span: "feature",
  },
  {
    slug: "qabalat-wa-amraz-e-niswan",
    name: "Qabalat-wa-Amraz-e-Niswan",
    english: "Obstetrics & gynaecology",
    group: "unani",
    icon: Venus,
    summary:
      "Unani care for women’s health, coordinated with the maternity team.",
    beds: "25-bed obstetrics wing",
    serviceSlug: "unani-women-children",
  },
  {
    slug: "amraz-e-atfal",
    name: "Amraz-e-Atfal",
    english: "Paediatrics",
    group: "unani",
    icon: Baby,
    summary:
      "Unani care for children, coordinated with the child health team.",
    beds: "Within the obstetrics wing",
    serviceSlug: "unani-women-children",
  },
  {
    slug: "ilaj-bit-tadbeer",
    name: "Ilaj-bit-Tadbeer",
    english: "Regimental therapy",
    group: "unani",
    icon: Hand,
    summary:
      "Twelve classical regimental therapies, including hijama, in their own block.",
    beds: "Within the Moalijat wing",
    serviceSlug: "hijama",
    doctorSlugs: ["kaleemullah-khan"],
  },
  {
    slug: "tahaffuzi-wa-samaji-tib",
    name: "Tahaffuzi-wa-Samaji Tib",
    english: "Preventive & social medicine",
    group: "unani",
    icon: ShieldPlus,
    summary: "Prevention and community health in the Unani tradition.",
    serviceSlug: "unani-medicine",
  },
  {
    slug: "amraz-e-jild-wa-tazeeniyat",
    name: "Amraz-e-Jild-wa-Tazeeniyat",
    english: "Skin & cosmetology",
    group: "unani",
    icon: Sparkles,
    summary: "Unani consultations for skin concerns and cosmetology.",
    beds: "Within the Moalijat wing",
    serviceSlug: "unani-skin-care",
  },
  {
    slug: "jarahat",
    name: "Jarahat",
    english: "Surgery, eye, ENT & dental",
    group: "unani",
    icon: Scissors,
    summary:
      "Unani surgery, including Ain, Uzn, Anf, Halaq wa Asnan: the eyes, ears, nose, throat and teeth.",
    beds: "25-bed surgical wing",
  },
  {
    slug: "casualty",
    name: "Casualty",
    group: "round-the-clock",
    icon: Siren,
    summary:
      "The hospital never closes. For an emergency, call the 24-hour line before you set out.",
    call: { href: "tel:+919848430017", label: "+91 98484 30017" },
    span: "feature",
  },
  {
    slug: "intensive-care",
    name: "Intensive care unit",
    group: "round-the-clock",
    icon: HeartPulse,
    summary: "Critical care on campus. Ask reception about bed availability.",
  },
  {
    slug: "operation-theatre",
    name: "Operation theatre complex",
    group: "round-the-clock",
    icon: Activity,
    summary: "A fully equipped theatre complex with qualified staff.",
  },
  {
    slug: "maternity",
    name: "Maternity ward & labour room",
    group: "round-the-clock",
    icon: Baby,
    summary: "Normal delivery ₹7,000. Caesarean section ₹18,000.",
    serviceSlug: "womens-health",
  },
  {
    slug: "ambulance",
    name: "Ambulance",
    group: "round-the-clock",
    icon: Ambulance,
    summary:
      "Certified by the Government Transport Department. Reg. No. AP28TB2951.",
  },
  {
    slug: "unani-teaching-pharmacy",
    name: "Unani (Teaching) Pharmacy",
    group: "pharmacy",
    icon: Leaf,
    summary: "GMP-certified, dispensing pure herbal Unani medicines at low rates.",
    points: ["GMP No. 502/U/12"],
    to: "/site/pharmacy",
  },
  {
    slug: "allopathic-pharmacy",
    name: "Allopathic Pharmacy",
    group: "pharmacy",
    icon: Pill,
    summary: "DCA-certified, dispensing prescribed medicines at subsidised rates.",
    points: ["DCA No. 102/HD1/AP/2010"],
    serviceSlug: "diagnostics-pharmacy",
  },
  {
    slug: "raw-drug-agency",
    name: "Raw Drug Agency",
    english: "Dawasaz",
    group: "pharmacy",
    icon: Warehouse,
    summary: "A licensed raw drug unit on campus, opened on 31 December 2020.",
    points: ["Licence No. 229/U/2020-21"],
    to: "/site/pharmacy",
  },
  {
    slug: "herbal-garden",
    name: "Herbal garden",
    group: "pharmacy",
    icon: Sprout,
    summary:
      "100 species of medicinal plants on 4,047 sq.m, with a 25-seat demonstration room.",
    serviceSlug: "unani-pharmacy",
  },
];

export const wardBeds: SplitPart[] = [
  {
    label: "Moalijat",
    detail: "Unani general medicine, incl. regimental therapy and skin",
    value: 50,
  },
  {
    label: "Obstetrics & gynaecology",
    detail: "Incl. paediatrics",
    value: 25,
  },
  { label: "Surgery", detail: "Incl. eye, ENT and dental", value: 25 },
];

export const departmentPath = (slug: string) => `/site/departments#${slug}`;
