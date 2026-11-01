import { stories } from "./story-data";
import { departmentPath, departments } from "./department-data";

export type Service = {
  slug: string;
  name: string;
  wing: "General hospital" | "Unani care";
  headline: string;
  intro: string;
  overview: string;
  topics: string[];
  preparation: string[];
  doctorSlugs: string[];
  /** Who helps when no named clinician is linked to the service. */
  support?: { label: string; note: string };
  source: string;
  note: string;
};
export const servicePages: Service[] = [
  {
    slug: "general-medicine",
    name: "General medicine",
    wing: "General hospital",
    headline: "Everyday health.\nIndividual attention.",
    intro:
      "A starting point for everyday concerns, long-term conditions and preventive check-ups.",
    overview:
      "The general medicine OPD sees adults for common illnesses such as fever, infections, diabetes, blood pressure, and heart, lung and stomach complaints. A consultation helps decide what examination, investigations or follow-up may be appropriate, with laboratory, X-ray and ECG support on campus.",
    topics: [
      "Diabetes & hypertension management",
      "Fever, infections & viral illnesses",
      "Thyroid & lifestyle disorders",
      "Respiratory & gastric complaints",
      "Preventive health check-ups",
    ],
    preparation: [
      "Bring your current medicines and prescriptions.",
      "Bring previous reports relevant to your concern.",
      "Confirm the clinician’s current schedule before travelling.",
    ],
    doctorSlugs: ["mohd-abdul-rahman"],
    source: "Intake 3!C24; 4!E5; 5!A13:Y13",
    note: "The clinical team determines the appropriate next step. This page does not diagnose symptoms.",
  },
  {
    slug: "general-surgery",
    name: "General surgery",
    wing: "General hospital",
    headline: "Clear conversations.\nConsidered surgical care.",
    intro:
      "Understand your options, discuss a procedure, and plan the next step with the surgical team.",
    overview:
      "The surgical team performs keyhole (laparoscopic) and open operations for conditions such as hernia, appendicitis and gallbladder stones in the hospital’s operation theatre complex. The 25-bed surgical wing also admits eye, ENT and dental cases. Your surgeon confirms which procedure is appropriate and any preparation or admission arrangements.",
    topics: [
      "Laparoscopic appendectomy & cholecystectomy",
      "Hernia repair",
      "Hydrocele surgery",
      "Abscess drainage & minor procedures",
      "Wound care",
      "Eye, ENT & dental OPD inquiries",
    ],
    preparation: [
      "Bring earlier consultations, scans and test reports.",
      "Ask about the procedure, expected follow-up and costs.",
      "Follow only the preparation instructions given by your clinical team.",
    ],
    doctorSlugs: ["syed-mohd-sajjad-hussayni"],
    source: "Intake 3!C6, C18, C24; 5!A14:Y14",
    note: "No operating date, procedure package or surgical outcome is confirmed through this website.",
  },
  {
    slug: "womens-health",
    name: "Women’s health & maternity",
    wing: "General hospital",
    headline: "Care through\nlife’s changing chapters.",
    intro:
      "Care through pregnancy and childbirth, and for menstrual, hormonal and gynaecological concerns.",
    overview:
      "Three obstetricians and gynaecologists care for women through pregnancy and childbirth in the hospital’s maternity ward and labour room. The hospital’s stated charges are ₹7,000 for a normal delivery and ₹18,000 for a Caesarean section.",
    topics: [
      "Antenatal & postnatal care",
      "Normal delivery",
      "Caesarean section",
      "Menstrual & hormonal disorders",
      "PCOS management",
    ],
    preparation: [
      "Bring antenatal records, prescriptions and previous reports.",
      "Tell reception which consultation you need.",
      "Ask about availability, privacy and any support required for your visit.",
    ],
    doctorSlugs: ["naseem-fatima", "afiya-tazeen", "ummul-hasanat-tasneem"],
    source: "Intake 3!C20; 4!E5, E13; 5!A16:Y18",
    note: "Confirm current delivery charges, what they include, high-risk care and admission arrangements with reception.",
  },
  {
    slug: "child-health",
    name: "Child health",
    wing: "General hospital",
    headline: "Gentle care\nfor growing children.",
    intro:
      "Care for newborns, infants and children, from check-ups and vaccinations to common illnesses.",
    overview:
      "The paediatric OPD looks after the health of newborns, infants and children, including fevers, infections, growth and vaccinations. Children who need admission are cared for in the hospital’s 25-bed obstetrics, gynaecology and paediatrics wing.",
    topics: [
      "Newborn examination & care",
      "Childhood fevers & infections",
      "Growth & development monitoring",
      "Immunisation guidance",
      "Nutrition advice",
    ],
    preparation: [
      "Bring your child’s vaccination card and previous prescriptions.",
      "Note when symptoms started and any medicines already given.",
      "Confirm the paediatric OPD timing before travelling.",
    ],
    doctorSlugs: ["arshad-hussain"],
    source: "Intake 3!C6, C24; 5!A15:Y15",
    note: "This page does not assess symptoms. If your child is seriously unwell, call the 24/7 emergency helpline or go to the nearest emergency department.",
  },
  {
    slug: "diagnostics-pharmacy",
    name: "Diagnostics & pharmacy",
    wing: "General hospital",
    headline: "The details that\nsupport your care.",
    intro:
      "Laboratory tests at subsidised rates, digital imaging and the hospital pharmacy on campus.",
    overview:
      "A computerised clinical laboratory offers blood, urine and blood-sugar tests and ECG at subsidised rates. Imaging includes digital X-ray, and ultrasound, 2D echo and colour Doppler (PC-PNDT Regd. No. 0116A1266). The DCA-certified Al-Arif Allopathic Pharmacy (Licence No. 102/HD1/AP/2010) dispenses subsidised ethical medicines.",
    topics: [
      "Blood, urine & blood-sugar tests",
      "ECG",
      "Digital X-ray",
      "Ultrasound, 2D echo & colour Doppler",
      "Prescription dispensing",
    ],
    preparation: [
      "Bring your test request or current prescription.",
      "Confirm preparation directly with the laboratory.",
      "Ask the pharmacy to review any refill before payment or collection.",
    ],
    doctorSlugs: [],
    support: {
      label: "Laboratory, imaging & pharmacy teams",
      note: "The laboratory, imaging and pharmacy teams can help with current arrangements.",
    },
    source: "Intake 3!C26:C28; 4!E9, E12",
    note: "Confirm the test menu, preparation, pricing and report collection with the laboratory. Online report access and medicine delivery are not available through this website.",
  },
  {
    slug: "unani-medicine",
    name: "Unani medicine",
    wing: "Unani care",
    headline: "Tradition begins\nwith listening.",
    intro:
      "Individual Unani consultations for adults with chronic and everyday conditions.",
    overview:
      "Seven Unani OPDs cover internal medicine (Moalijat), women’s health, children, regimental therapy, preventive and social medicine, skin, and eye, ENT and dental care. The 50-bed Moalijat wing admits patients who need inpatient Unani care. Your clinician discusses suitability, including how a proposed plan relates to medicines or care you already receive.",
    topics: [
      "Unani internal medicine (Moalijat) consultation",
      "Digestive, liver & joint disorders",
      "Chronic lifestyle disease management",
      "Tahaffuzi-wa-Samaji Tib (preventive & social medicine)",
      "Inpatient Unani care",
    ],
    preparation: [
      "Bring previous prescriptions and reports.",
      "Share all medicines and supplements you take.",
      "Ask about possible effects, interactions and follow-up.",
    ],
    doctorSlugs: [
      "syed-touheed-ahmed",
      "mohd-najeeb-khan",
      "kaleemullah-khan",
      "umme-shakeeba-khair",
      "shaik-mohammed-salam",
      "asma-begum",
      "reshma-banu",
    ],
    source: "Intake 3!C11, C24; 4!E6; 5!A10:Y12, A19:Y22",
    note: "Herbal or traditional care is not automatically risk-free. Do not change prescribed treatment based on website content.",
  },
  {
    slug: "hijama",
    name: "Hijama & regimental therapy",
    wing: "Unani care",
    headline: "A considered approach.\nA comfortable visit.",
    intro:
      "Ilaj-bit-Tadbeer: classical Unani regimental therapies, discussed with your physician first.",
    overview:
      "The hospital’s Ilaj-bit-Tadbeer block offers twelve regimental therapies, from Hijama (cupping) and Dalak (massage) to Hamam (Turkish bath) and Riyazat (exercise). Your Unani physician refers you after assessing whether a therapy is suitable, and the team confirms the practitioner, privacy arrangements and any preparation.",
    topics: [
      "Hijama (cupping)",
      "Dalak (massage)",
      "Fasd (venesection)",
      "Aabzan (sitz bath)",
      "Tariq (sweating)",
      "Idrar-e-Baul (diuresis)",
      "Hamam (Turkish bath)",
      "Kai (cauterisation)",
      "Ishal (purging)",
      "Qai (emesis)",
      "Riyazat (exercise)",
      "Taleeq (leeching)",
    ],
    preparation: [
      "Ask reception about your practitioner preference.",
      "Tell the clinician about existing conditions and medicines.",
      "Wait for personalized preparation instructions before your visit.",
    ],
    doctorSlugs: ["kaleemullah-khan"],
    source: "Intake 3!C32; 4!E7; 5!A12:Y12",
    note: "No blanket fasting instructions or self-booked procedure slots. Therapy charges, availability and clinical suitability require confirmation.",
  },
  {
    slug: "unani-women-children",
    name: "Unani care for women & children",
    wing: "Unani care",
    headline: "Unani care for\nwomen and children.",
    intro:
      "Unani OPDs for women’s health (Qabalat-wa-Amraz-e-Niswan) and children’s health (Amraz-e-Atfal).",
    overview:
      "Two of the hospital’s seven Unani OPDs focus on women and children: Qabalat-wa-Amraz-e-Niswan (obstetrics and gynaecology) and Amraz-e-Atfal (paediatrics). Reception can tell you which Unani clinician currently sees patients in each OPD, and whether the hospital’s maternity or child health services suit your needs.",
    topics: [
      "Qabalat-wa-Amraz-e-Niswan (obstetrics & gynaecology)",
      "Amraz-e-Atfal (paediatrics)",
      "Unani herbal treatment",
      "Coordination with the maternity and child health teams",
    ],
    preparation: [
      "Bring previous prescriptions and reports.",
      "Share all medicines and supplements being taken, including during pregnancy.",
      "Ask reception which clinician sees patients in this OPD.",
    ],
    doctorSlugs: [],
    support: {
      label: "Unani OPD team",
      note: "Reception can confirm which Unani clinician currently sees patients in these OPDs.",
    },
    source: "Intake 3!C24; 4!E6",
    note: "Herbal care is not automatically risk-free, especially in pregnancy and for children. Do not change prescribed treatment based on website content.",
  },
  {
    slug: "unani-skin-care",
    name: "Unani skin care",
    wing: "Unani care",
    headline: "Skin care\nwith a Unani approach.",
    intro:
      "Amraz-e-Jild-wa-Tazeeniyat: Unani consultations for skin concerns and cosmetology.",
    overview:
      "Amraz-e-Jild-wa-Tazeeniyat (skin and cosmetology) is one of the hospital’s seven Unani OPDs, with inpatient beds in the Moalijat wing. A Unani physician reviews your skin concern, health history and current treatment before discussing a plan.",
    topics: [
      "Skin consultation",
      "Cosmetology (Tazeeniyat) concerns",
      "Unani herbal treatment",
      "Inpatient care when needed",
    ],
    preparation: [
      "Bring previous prescriptions, creams and reports.",
      "Tell the clinician about allergies and medicines you take.",
      "Ask about expected follow-up.",
    ],
    doctorSlugs: [],
    support: {
      label: "Unani OPD team",
      note: "Reception can confirm which Unani clinician currently sees patients in this OPD.",
    },
    source: "Intake 3!C11, C24; 4!E6",
    note: "Results vary by individual. This page does not diagnose skin conditions.",
  },
  {
    slug: "unani-pharmacy",
    name: "Unani pharmacy & herbal garden",
    wing: "Unani care",
    headline: "Medicines prepared\nwith care.",
    intro:
      "A GMP-certified Unani teaching pharmacy, a licensed raw drug agency and a medicinal herbal garden.",
    overview:
      "The GMP-certified Al-Arif Unani (Teaching) Pharmacy (No. 502/U/12) provides pure herbal Unani medicines at low rates. The Al-Arif Raw Drug Agency (Dawasaz, Licence No. 229/U/2020-21), inaugurated on 31 December 2020, runs GMP-compliant manufacturing, storage, packaging, labelling, dispensing and dispatch units, inspected by the Secretary of the Board of Indian Medicine and an AYUSH Drug Inspector. A 4,047 sq.m herbal garden grows 100 species of medicinal plants.",
    topics: [
      "Dispensing prescribed Unani medicines",
      "Herbal medicines at low rates",
      "Raw drug (Dawasaz) inquiries",
      "Herbal garden & 25-seat demonstration room",
    ],
    preparation: [
      "Bring your current Unani prescription.",
      "Tell the pharmacist about other medicines you take.",
      "Confirm pharmacy hours with reception.",
    ],
    doctorSlugs: [],
    support: {
      label: "Unani pharmacy team",
      note: "The Unani pharmacy team can help with current arrangements.",
    },
    source: "Intake 3!C26, C33:C34; 4!E9:E10",
    note: "Take Unani medicines only as prescribed by your clinician. Online medicine sales and delivery are not available through this website.",
  },
];
export type DoctorProfile = {
  slug: string;
  name: string;
  honorific?: "Hakim" | "Hakima";
  /** Short label for cards and search results. */
  role: string;
  designation: string;
  department: string;
  degrees: string;
  introduction: string;
  focus: string[];
  credentials?: string[];
  opdDays: string;
  opdHours: string;
  hoursNote?: string;
  serviceSlugs: string[];
  source: string;
};
const directorFocus = [
  "Unani herbal medicine consultation",
  "Classical Unani pharmacology & drug selection",
  "Chronic lifestyle disease management",
  "Unani research & clinical protocols",
];
const directorCredentials = [
  "Organiser and host of state-level Unani scientific sessions with the Dept. of AYUSH (Telangana) and CCRUM experts",
  "Unani single-drug exhibitions (2022; Salar Jung Museum, 2023)",
];
const obgFocus = [
  "Antenatal & postnatal care",
  "Normal delivery",
  "Caesarean section",
  "Menstrual & hormonal disorders",
  "PCOS management",
];
const obgIntroduction =
  "Cares for women through pregnancy and childbirth and treats menstrual, hormonal and other gynaecological problems.";
const medicalOfficerFocus = [
  "General OPD consultation",
  "Inpatient ward care",
  "Emergency first response & admissions",
  "Unani herbal treatment",
];
const medicalOfficerIntroduction =
  "First point of contact for OPD and admitted patients, providing Unani-based treatment and coordinating care with specialists.";
export const doctorPages: DoctorProfile[] = [
  {
    slug: "syed-touheed-ahmed",
    name: "Dr. Syed Touheed Ahmed",
    honorific: "Hakim",
    role: "Director · Unani pharmacology",
    designation: "Director & Chief Unani Physician",
    department: "Ilm-ul-Advia (Unani Pharmacology) & Hospital Administration",
    degrees: "BUMS, MD, Ph.D (Ilm-ul-Advia)",
    introduction:
      "Leads the hospital as Director and advises patients on classical Unani herbal medicines, drawing on doctoral expertise in Unani pharmacology.",
    focus: directorFocus,
    credentials: directorCredentials,
    opdDays: "Mon–Sat",
    opdHours: "11:00 am – 4:00 pm",
    serviceSlugs: ["unani-medicine"],
    source: "Intake 2!C21:C22; 5!A10:Y10",
  },
  {
    slug: "mohd-najeeb-khan",
    name: "Dr. Mohd. Najeeb Khan",
    honorific: "Hakim",
    role: "Director · Unani pharmacology",
    designation: "Director",
    department: "Ilm-ul-Advia (Unani Pharmacology) & Hospital Administration",
    degrees: "BUMS, MD, Ph.D (Ilm-ul-Advia)",
    introduction:
      "Leads the hospital as Director and advises patients on classical Unani herbal medicines, drawing on doctoral expertise in Unani pharmacology.",
    focus: directorFocus,
    credentials: directorCredentials,
    opdDays: "Mon–Sat",
    opdHours: "11:00 am – 4:00 pm",
    serviceSlugs: ["unani-medicine"],
    source: "Intake 2!C21; 5!A11:Y11",
  },
  {
    slug: "kaleemullah-khan",
    name: "Dr. Kaleemullah Khan",
    honorific: "Hakim",
    role: "Medical Superintendent · Moalijat",
    designation: "Medical Superintendent",
    department: "Moalijat (Unani Internal Medicine)",
    degrees: "BUMS, MD (Moalijat)",
    introduction:
      "Heads day-to-day medical operations and treats adults with chronic internal-medicine conditions using Unani therapies.",
    focus: [
      "Unani internal medicine (Moalijat) consultation",
      "Digestive, liver & joint disorders",
      "Chronic lifestyle disease management",
      "Referral for Ilaj-bit-Tadbeer (regimental therapy)",
    ],
    credentials: [
      "Former Vice-Principal, Govt. Nizamia Tibbi College",
      "Former Research Officer, Dept. of AYUSH, Govt. of Telangana",
      "Chaired state-level Unani scientific sessions",
    ],
    opdDays: "Mon–Sat",
    opdHours: "11:00 am – 4:00 pm",
    serviceSlugs: ["unani-medicine", "hijama"],
    source: "Intake 2!C21; 5!A12:Y12",
  },
  {
    slug: "mohd-abdul-rahman",
    name: "Dr. Mohd. Abdul Rahman",
    role: "General physician",
    designation: "General Physician",
    department: "General Medicine",
    degrees: "MBBS, MD (General Medicine)",
    introduction:
      "Diagnoses and treats common adult illnesses such as fever, infections, diabetes, blood pressure and heart, lung and stomach complaints.",
    focus: [
      "Diabetes & hypertension management",
      "Fever, infections & viral illnesses",
      "Thyroid & lifestyle disorders",
      "Respiratory & gastric complaints",
      "Preventive health check-ups",
    ],
    opdDays: "Mon–Sat",
    opdHours: "3:00 pm – 5:00 pm",
    serviceSlugs: ["general-medicine"],
    source: "Intake 5!A13:Y13",
  },
  {
    slug: "syed-mohd-sajjad-hussayni",
    name: "Dr. Syed Mohd. Sajjad Hussayni",
    role: "General & laparoscopic surgeon",
    designation: "General & Laparoscopic Surgeon",
    department: "General & Laparoscopic Surgery",
    degrees: "MBBS, MS (General Surgery)",
    introduction:
      "Performs keyhole (laparoscopic) and open operations for conditions such as hernia, appendicitis and gallbladder stones.",
    focus: [
      "Laparoscopic appendectomy & cholecystectomy",
      "Hernia repair",
      "Hydrocele surgery",
      "Abscess drainage & minor procedures",
      "Wound care",
    ],
    opdDays: "Mon–Sat",
    opdHours: "3:00 pm – 5:00 pm",
    serviceSlugs: ["general-surgery"],
    source: "Intake 5!A14:Y14",
  },
  {
    slug: "arshad-hussain",
    name: "Dr. Arshad Hussain",
    role: "Pediatrician",
    designation: "Pediatrician",
    department: "Pediatrics",
    degrees: "MBBS, MD (Pediatrics)",
    introduction:
      "Looks after the health of newborns, infants and children, including fevers, infections, growth and vaccinations.",
    focus: [
      "Newborn examination & care",
      "Childhood fevers & infections",
      "Growth & development monitoring",
      "Immunisation guidance",
      "Nutrition advice",
    ],
    opdDays: "Mon–Fri",
    opdHours: "1:00 pm – 2:00 pm",
    serviceSlugs: ["child-health"],
    source: "Intake 5!A15:Y15",
  },
  {
    slug: "naseem-fatima",
    name: "Dr. Naseem Fatima",
    role: "Obstetrician & gynecologist",
    designation: "Obstetrician & Gynecologist",
    department: "Obstetrics & Gynecology (OBG)",
    degrees: "MBBS, DGO",
    introduction: obgIntroduction,
    focus: obgFocus,
    opdDays: "Mon–Sat",
    opdHours: "1:00 pm – 3:00 pm",
    serviceSlugs: ["womens-health"],
    source: "Intake 5!A16:Y16",
  },
  {
    slug: "afiya-tazeen",
    name: "Dr. Afiya Tazeen",
    role: "Obstetrician & gynecologist",
    designation: "Obstetrician & Gynecologist",
    department: "Obstetrics & Gynecology (OBG)",
    degrees: "MBBS, DGO",
    introduction: obgIntroduction,
    focus: obgFocus,
    opdDays: "Mon–Sat",
    opdHours: "3:00 pm – 5:00 pm",
    serviceSlugs: ["womens-health"],
    source: "Intake 5!A17:Y17",
  },
  {
    slug: "ummul-hasanat-tasneem",
    name: "Dr. Ummul Hasanat Tasneem",
    role: "Obstetrician & gynecologist",
    designation: "Obstetrician & Gynecologist",
    department: "Obstetrics & Gynecology (OBG)",
    degrees: "MBBS, DNB",
    introduction: obgIntroduction,
    focus: obgFocus,
    opdDays: "Mon–Sat",
    opdHours: "11:00 am – 1:00 pm",
    serviceSlugs: ["womens-health"],
    source: "Intake 5!A18:Y18",
  },
  {
    slug: "umme-shakeeba-khair",
    name: "Dr. Umme Shakeeba Khair",
    honorific: "Hakima",
    role: "Medical officer · Unani medicine",
    designation: "Medical Officer",
    department: "General Unani Medicine",
    degrees: "BUMS, MD",
    introduction: medicalOfficerIntroduction,
    focus: medicalOfficerFocus,
    opdDays: "Mon–Sat",
    opdHours: "2:30 pm – 8:30 pm",
    serviceSlugs: ["unani-medicine"],
    source: "Intake 5!A19:Y19",
  },
  {
    slug: "shaik-mohammed-salam",
    name: "Dr. Shaik Mohammed Salam",
    honorific: "Hakim",
    role: "Medical officer · Unani medicine",
    designation: "Medical Officer",
    department: "General Unani Medicine",
    degrees: "BUMS, MD",
    introduction: medicalOfficerIntroduction,
    focus: medicalOfficerFocus,
    opdDays: "Mon–Sat",
    opdHours: "9:00 am – 3:00 pm",
    serviceSlugs: ["unani-medicine"],
    source: "Intake 5!A20:Y20",
  },
  {
    slug: "asma-begum",
    name: "Dr. Asma Begum",
    honorific: "Hakima",
    role: "Medical officer · Unani medicine",
    designation: "Medical Officer",
    department: "General Unani Medicine",
    degrees: "BUMS",
    introduction: medicalOfficerIntroduction,
    focus: medicalOfficerFocus,
    opdDays: "Fri–Wed (Thursday off)",
    opdHours: "8:30 am – 2:30 pm",
    serviceSlugs: ["unani-medicine"],
    source: "Intake 5!A21:Y21",
  },
  {
    slug: "reshma-banu",
    name: "Dr. Reshma Banu",
    honorific: "Hakima",
    role: "Medical officer · Unani medicine",
    designation: "Medical Officer",
    department: "General Unani Medicine",
    degrees: "BUMS",
    introduction: medicalOfficerIntroduction,
    focus: medicalOfficerFocus,
    opdDays: "Tue–Sun (Monday off)",
    opdHours: "11:00 am – 5:00 pm",
    hoursNote: "Please confirm these timings with reception.",
    serviceSlugs: ["unani-medicine"],
    source: "Intake 5!A22:Y22",
  },
];
/** A doctor's wing is the wing of their first service. */
export const wingOf = (doctor: DoctorProfile): Service["wing"] =>
  servicePages.find((service) => service.slug === doctor.serviceSlugs[0])
    ?.wing ?? "General hospital";
/** Up to two initials, without the "Dr." title. */
export const initialsOf = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
export const pageCatalog = [
  {
    path: "/site",
    title: "Home",
    description:
      "A condensed welcome, two care routes and a short visit journey.",
    kind: "Overview",
  },
  {
    path: "/site/general",
    title: "General hospital",
    description:
      "Nine specialty OPDs, general hospital care pages and the general hospital team.",
    kind: "Wing",
  },
  {
    path: "/site/unani",
    title: "Unani care",
    description: "Seven Unani OPDs, Unani care pages and the Unani care team.",
    kind: "Wing",
  },
  // Search reads the description too, so it carries each department's keywords.
  ...departments.map((department) => ({
    path: departmentPath(department.slug),
    title: department.english
      ? `${department.name} (${department.english})`
      : department.name,
    description: [department.summary, ...(department.points ?? [])].join(" "),
    kind: "Department",
  })),
  {
    path: "/site/services",
    title: "Services",
    description:
      "Casualty, ICU, operation theatre, maternity, ambulance, diagnostics, pharmacies and the herbal garden, shared by both wings.",
    kind: "Directory",
  },
  ...servicePages.map((service) => ({
    path: `/site/services/${service.slug}`,
    title: service.name,
    description:
      "Overview, consultation topics, visit preparation and related clinicians.",
    kind: "Service detail",
  })),
  {
    path: "/site/doctors",
    title: "Our doctors",
    description: "Search clinicians and open each profile.",
    kind: "Directory",
  },
  ...doctorPages.map((doctor) => ({
    path: `/site/doctors/${doctor.slug}`,
    title: doctor.name,
    description: doctor.role,
    kind: "Doctor profile",
  })),
  {
    path: "/site/about",
    title: "About Al-Arif",
    description:
      "Trust, leadership, facilities, registrations and community service.",
    kind: "Institution",
  },
  {
    path: "/site/education",
    title: "Education & learning",
    description:
      "Jamia Arifia Nooria and proposed learning formats with clear status.",
    kind: "Education",
  },
  {
    path: "/site/education/clinical-observation",
    title: "Clinical observation",
    description: "Planned clinical observation and current programme status.",
    kind: "Programme detail",
  },
  {
    path: "/site/research",
    title: "Research & publications",
    description:
      "Unani research initiatives, exhibitions and a future publication archive.",
    kind: "Research",
  },
  {
    path: "/site/stories",
    title: "Stories & guides",
    description:
      "Guides to Unani care and the hospital, with stories from the Trust's record.",
    kind: "Stories",
  },
  ...stories.map((story) => ({
    path: `/site/stories/${story.slug}`,
    title: story.title,
    description: story.dek,
    kind: "Story",
  })),
  {
    path: "/site/community",
    title: "Community & milestones",
    description:
      "A timeline of camps, exhibitions, sessions and milestones since 2002.",
    kind: "Community",
  },
  {
    path: "/site/pharmacy",
    title: "Pharmacy & manufacturing",
    description:
      "The Unani teaching pharmacy, allopathic pharmacy and raw drug agency.",
    kind: "Pharmacy",
  },
  {
    path: "/site/visit",
    title: "Plan your visit",
    description: "Address, reception, practical guidance and directions.",
    kind: "Patient information",
  },
];
