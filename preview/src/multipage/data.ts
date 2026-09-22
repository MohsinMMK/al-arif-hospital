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
      "A starting point for everyday concerns, preventive care and ongoing health needs.",
    overview:
      "General outpatient consultations cover for acute illnesses, seasonal fevers, blood-pressure concerns and diabetes monitoring. A consultation helps determine what examination, investigations or follow-up may be appropriate.",
    topics: [
      "General outpatient consultation",
      "Diabetes and blood-pressure monitoring",
      "Preventive health discussions",
      "Fever and common illness assessment",
    ],
    preparation: [
      "Bring your current medicines and prescriptions.",
      "Bring previous reports relevant to your concern.",
      "Confirm the clinician’s current schedule before travelling.",
    ],
    doctorSlugs: ["ameena"],
    source: "03!A8:G8; 08!B39:E39",
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
      "Ask the surgical team about hernia consultations, hydrocele procedures, appendectomy, minor surgery and wound care. The surgeon must confirm which procedure is appropriate, whether it is available, and any preparation or admission arrangements.",
    topics: [
      "Hernia consultation",
      "Minor and day-care procedures",
      "Wound care and follow-up",
      "Discussion of surgical options",
    ],
    preparation: [
      "Bring earlier consultations, scans and test reports.",
      "Ask about the procedure, expected follow-up and costs.",
      "Follow only the preparation instructions given by your clinical team.",
    ],
    doctorSlugs: ["sajjad-hussain"],
    source: "03!A5:G5; 04!A7:F7",
    note: "No operating date, procedure package or surgical outcome is confirmed through this website.",
  },
  {
    slug: "womens-health",
    name: "Women’s health & maternity",
    wing: "General hospital",
    headline: "Care through\nlife’s changing chapters.",
    intro:
      "A thoughtful space for gynecology, pregnancy-related consultations and reproductive health.",
    overview:
      "Ask about antenatal and postnatal consultations, menstrual health and gynecological assessment. Confirm the required service with reception, including the clinician’s availability and current maternity facilities.",
    topics: [
      "Gynecology consultations",
      "Antenatal and postnatal visits",
      "Menstrual health concerns",
      "Reproductive health assessment",
    ],
    preparation: [
      "Bring relevant prescriptions and previous reports.",
      "Tell reception which consultation you need.",
      "Ask about availability, privacy and any support required for your visit.",
    ],
    doctorSlugs: ["saheen", "naima"],
    source: "08!B40:E40; 11!C6:F6",
    note: "Delivery packages, high-risk services and facilities require hospital confirmation.",
  },
  {
    slug: "infertility-care",
    name: "Infertility consultation",
    wing: "Unani care",
    headline: "Questions deserve\ntime and understanding.",
    intro:
      "Begin with a private conversation about reproductive health and the next steps in assessment.",
    overview:
      "Discuss reproductive health and infertility concerns with Dr. Naima. The consultation can help clarify assessment, follow-up and appropriate specialist referrals.",
    topics: [
      "Initial reproductive health discussion",
      "Review of previous assessments",
      "Questions about PCOD/PCOS",
      "Individual follow-up planning",
    ],
    preparation: [
      "Bring previous reports and treatment records, if available.",
      "List medicines or supplements currently being taken.",
      "Ask the clinical team about further assessment and suitable referrals.",
    ],
    doctorSlugs: ["naima"],
    source: "03!A6:G6; 08!B49:E49",
    note: "Individual care decisions belong with the treating clinician. Treatment outcomes vary by individual.",
  },
  {
    slug: "unani-medicine",
    name: "Unani medicine",
    wing: "Unani care",
    headline: "Tradition begins\nwith listening.",
    intro:
      "An individual consultation considering health history, diet and Unani approaches to care.",
    overview:
      "The source describes Ilaj-bil-Ghiza (dietary guidance), Ilaj-bil-Dawa (prescribed formulations), and regimental therapies. A clinician-led discussion determines suitability, including how a proposed plan relates to medicines or care already being received.",
    topics: [
      "Unani clinical consultation",
      "Diet and lifestyle discussion",
      "Prescribed formulation review",
      "Ongoing care and follow-up",
    ],
    preparation: [
      "Bring previous prescriptions and reports.",
      "Share all medicines and supplements you take.",
      "Ask about possible effects, interactions and follow-up.",
    ],
    doctorSlugs: ["tauheed"],
    source: "08!B47:E48; 03!A4:G4",
    note: "Herbal or traditional care is not automatically risk-free. Do not change prescribed treatment based on website content.",
  },
  {
    slug: "hijama",
    name: "Hijama & regimental therapy",
    wing: "Unani care",
    headline: "A considered approach.\nA comfortable visit.",
    intro:
      "Understand the appointment process, ask about privacy, and discuss whether therapy is suitable for you.",
    overview:
      "Ask about wet and dry cupping and regimental approaches such as Dal’k, Nutool and Riyazat. The clinical team needs to confirm the therapy offered, suitability, practitioner, room and any preparation before agreeing an appointment.",
    topics: [
      "Wet and dry cupping inquiries",
      "Practitioner preference",
      "Privacy and room arrangements",
      "Clinician-approved preparation and follow-up",
    ],
    preparation: [
      "Ask reception about your practitioner preference.",
      "Tell the clinician about existing conditions and medicines.",
      "Wait for personalized preparation instructions before your visit.",
    ],
    doctorSlugs: ["tauheed"],
    source: "08!B45:E45; 12!C13:F16",
    note: "No blanket fasting instructions or self-booked procedure slots. Availability and clinical suitability require confirmation.",
  },
  {
    slug: "joint-rehabilitation",
    name: "Joint & rehabilitation care",
    wing: "Unani care",
    headline: "Support for\nthe movements that matter.",
    intro:
      "Discuss joint concerns, mobility and rehabilitation needs with the care team.",
    overview:
      "Care includes joint-pain consultations, arthritis and sciatica concerns, and rehabilitation support. The clinician can discuss assessment, appropriate movement and whether other specialists or treatments are needed.",
    topics: [
      "Joint and mobility consultations",
      "Arthritis-related concerns",
      "Rehabilitation discussions",
      "Follow-up and progress review",
    ],
    preparation: [
      "Bring relevant reports and prior treatment notes.",
      "Explain what activities are difficult for you.",
      "Ask about an individual plan and when to seek further care.",
    ],
    doctorSlugs: ["tauheed"],
    source: "08!B46:E46; 08!B50:E50",
    note: "This is consultation information, not a promise of recovery or a replacement for urgent or specialist assessment.",
  },
  {
    slug: "diagnostics-pharmacy",
    name: "Diagnostics & pharmacy",
    wing: "General hospital",
    headline: "The details that\nsupport your care.",
    intro:
      "Find out about investigations, prescription dispensing and collection arrangements.",
    overview:
      "The hospital offers an in-house pathology laboratory and pharmacy. Its test examples include blood counts, glucose, HbA1c, lipid, liver and renal profiles. Confirm the available tests, preparation, pricing and collection hours with the team.",
    topics: [
      "Laboratory test inquiries",
      "Sample and report collection",
      "Prescription dispensing",
      "Existing-patient refill inquiries",
    ],
    preparation: [
      "Bring your test request or current prescription.",
      "Confirm preparation directly with the laboratory.",
      "Ask the pharmacy to review any refill before payment or collection.",
    ],
    doctorSlugs: [],
    source: "04!A9:F10; 08!B41:E41",
    note: "Online report access, delivery, medicine sales and international dispatch are not available through this website.",
  },
];
export type DoctorProfile = {
  slug: string;
  name: string;
  role: string;
  introduction: string;
  serviceSlugs: string[];
  source: string;
};
export const doctorPages: DoctorProfile[] = [
  {
    slug: "tauheed",
    name: "Dr. Tauheed",
    role: "Unani medicine & rehabilitation",
    introduction:
      "Consultations for Unani consultations, joint concerns and rehabilitation support.",
    serviceSlugs: ["unani-medicine", "joint-rehabilitation", "hijama"],
    source: "03!A4:G4",
  },
  {
    slug: "sajjad-hussain",
    name: "Dr. Sajjad Hussain",
    role: "General surgery",
    introduction:
      "Consultations for general surgical consultations, procedures and follow-up care.",
    serviceSlugs: ["general-surgery"],
    source: "03!A5:G5",
  },
  {
    slug: "naima",
    name: "Dr. Naima",
    role: "Infertility & reproductive care",
    introduction:
      "Consultations for infertility and reproductive health consultations.",
    serviceSlugs: ["infertility-care", "womens-health"],
    source: "03!A6:G6",
  },
  {
    slug: "saheen",
    name: "Dr. Saheen",
    role: "Gynecology & obstetrics",
    introduction:
      "Consultations for gynecological, antenatal and postnatal consultations.",
    serviceSlugs: ["womens-health"],
    source: "03!A7:G7",
  },
  {
    slug: "ameena",
    name: "Dr. Ameena",
    role: "General medicine",
    introduction:
      "Consultations for everyday outpatient concerns and general medicine.",
    serviceSlugs: ["general-medicine"],
    source: "03!A8:G8",
  },
];
export const pageCatalog = [
  {
    path: "/site",
    title: "Home",
    description:
      "A condensed welcome, two care routes and a short visit journey.",
    kind: "Overview",
  },
  {
    path: "/site/services",
    title: "Care & services",
    description: "Explore general hospital and Unani services with their associated doctors.",
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
    description: "Institution, dual care identity and community heritage.",
    kind: "Institution",
  },
  {
    path: "/site/education",
    title: "Education & learning",
    description: "Proposed programme formats with clear availability status.",
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
      "Research themes and an honest publication archive empty state.",
    kind: "Research",
  },
  {
    path: "/site/visit",
    title: "Plan your visit",
    description: "Address, reception, practical guidance and directions.",
    kind: "Patient information",
  },
  {
    path: "/site/request",
    title: "Request a visit",
    description:
      "Prepare your preferences and contact reception to arrange a visit.",
    kind: "Inquiry",
  },
];
