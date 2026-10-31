export type StoryCategory =
  | "Unani knowledge"
  | "Hospital"
  | "Community"
  | "Research & learning"
  | "Pharmacy";

export type StorySection = {
  id: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type Story = {
  slug: string;
  title: string;
  dek: string;
  category: StoryCategory;
  wing: "General hospital" | "Unani care" | "Both";
  period: string;
  year: number;
  sections: StorySection[];
  facts: { label: string; value: string }[];
  serviceSlugs: string[];
};

export const storyCategories: StoryCategory[] = [
  "Unani knowledge",
  "Hospital",
  "Community",
  "Research & learning",
  "Pharmacy",
];

const reception =
  "Suitability is decided by your clinician. Please confirm current services, timings and fees with reception on +91 85550 86667.";

export const stories: Story[] = [
  {
    slug: "our-story-since-2002",
    title: "Our story since 2002",
    dek: "How a charitable Trust opened a hospital and a school in donated buildings, and kept its modest charges in place.",
    category: "Hospital",
    wing: "Both",
    period: "Since 2002",
    year: 2002,
    sections: [
      {
        id: "beginning",
        heading: "A beginning in donated buildings",
        paragraphs: [
          "Al Arif General Hospital & Unani Research Institute is run by the Al Arif Education and Medical Trust, which was established in 2001. As recorded in the Trust’s activity reports, the hospital began in 2002 with 100 beds in two buildings. In the same year, Jamia Arifia Nooria opened in another building with 250 pupils.",
          "The buildings were donated by the Founder Chairman, Late Alhaj Syed Mohd. Arifuddin Jeelani Chishti wa Qadri, for service to mankind. The reports describe the aim plainly: to bring healthcare and education within reach of people who were educationally and economically backward, with special care for the weaker sections of society.",
        ],
      },
      {
        id: "charges",
        heading: "Charges set in 2002",
        paragraphs: [
          "From the start, the Trust set an outpatient fee of ₹10 and an inpatient bed charge of ₹100 a day. These charges, set in 2002, are still continued to help the poorest of the poor.",
          "Specialist consultations, tests, procedures and medicines can carry their own charges, and these can change over time. Before you travel, it is worth a quick call to reception to ask what applies to your visit.",
        ],
      },
      {
        id: "institutions",
        heading: "One Trust, several institutions",
        paragraphs: [
          "Over the years, the Trust’s reports list a growing set of institutions working from the same campus. Alongside the hospital, they include:",
        ],
        points: [
          "Al Arif General Hospital, with general and Unani care under one roof",
          "Al-Arif Allopathic Pharmacy, DCA-certified (102/HD1/AP/2010)",
          "Al-Arif Unani (Teaching) Pharmacy, GMP-certified (502/U/12)",
          "Al-Arif Raw Drug Agency (Dawasaz), inaugurated 31 December 2020",
          "Ultrasound, 2D echo and colour Doppler, registered under PC-PNDT (0116A1266)",
          "Jamia Arifia Nooria, offering free education, boarding and lodging",
        ],
      },
      {
        id: "campus",
        heading: "A campus that grew",
        paragraphs: [
          "The campus now covers 5.35 acres, with four buildings of ground plus two floors and approximately 1,00,000 sq.ft built up. The Trust’s reports note an average of more than 200 patients a day.",
          "The 100 beds are shared between three wings: 50 in the Moalijat wing for Unani general medicine, 25 for obstetrics and gynaecology including paediatrics, and 25 for surgery, including eye, ENT and dental care. Around them sit an operation theatre complex, an ICU, a 24-hour casualty, a maternity ward and labour room, a clinical laboratory and imaging, the Ilaj-bit-Tadbeer block and a 4,047 sq.m herbal garden.",
          "During 2020 and 2021, the reports also record a COVID-19 Treatment Centre and an isolation centre. Those belonged to the pandemic response and are described in their own story.",
        ],
      },
      {
        id: "motto",
        heading: "The motto behind the work",
        paragraphs: [
          "The Trust’s motto is “Service to Mankind is service to Almighty.” The hospital is guided today by the Managing Trustee, Alhaj Syed Ahmed Mohiuddin Jeelani Chishti wo Quadri, and its record reads as a series of steady additions rather than a single grand opening.",
          `If you are coming for the first time, the first-visit guide explains what to bring and how to find the hospital. ${reception}`,
        ],
      },
    ],
    facts: [
      { label: "Trust established", value: "2001" },
      { label: "Hospital opened", value: "2002" },
      { label: "Inpatient beds", value: "100" },
      { label: "Campus", value: "5.35 acres" },
      { label: "OP fee · IP bed charge", value: "₹10 · ₹100 a day" },
    ],
    serviceSlugs: ["general-medicine", "unani-medicine"],
  },
  {
    slug: "regimental-therapies-explained",
    title: "Regimental therapies, explained",
    dek: "A plain-English guide to the twelve Ilaj-bit-Tadbeer therapies, and why every one begins with a conversation with your Unani physician.",
    category: "Unani knowledge",
    wing: "Unani care",
    period: "Guide",
    year: 2023,
    sections: [
      {
        id: "what-it-means",
        heading: "What Ilaj-bit-Tadbeer means",
        paragraphs: [
          "Unani medicine describes several ways of caring for a person: through diet, through medicines, through surgery, and through regimens. Ilaj-bit-Tadbeer, usually translated as regimental therapy, is the name for that last group of procedures and routines.",
          "At Al-Arif, these therapies are offered in a dedicated Ilaj-bit-Tadbeer block, and the hospital lists twelve of them. Your Unani physician refers you after assessing whether a therapy is suitable for you. They are not booked directly or chosen from a menu.",
          "Use the explorer below to read a short, neutral description of each one.",
        ],
      },
      {
        id: "twelve-therapies",
        heading: "Why they are not interchangeable",
        paragraphs: [
          "Some of the twelve, such as Riyazat (exercise) and Dalak (massage), are routines that many people will recognise. Others, such as Fasd (venesection) or Kai (cauterisation), are procedures that classical texts describe only for limited, selected situations.",
          "The descriptions in the explorer are deliberately brief. They explain what each therapy involves, not who it is for.",
          "Seeing them listed side by side can make them look interchangeable. They are not. Each has its own preparation, its own aftercare and its own reasons not to go ahead, and your physician weighs these against your health history before suggesting anything at all.",
        ],
      },
      {
        id: "consultation-first",
        heading: "Why consultation comes first",
        paragraphs: [
          "Herbal or traditional care is not automatically risk-free. Before any regimental therapy, your physician needs a clear picture of your health, and a few simple steps help.",
        ],
        points: [
          "Tell your clinician about existing conditions, recent illness and pregnancy.",
          "Share every medicine and supplement you take, from either tradition.",
          "Ask reception about practitioner preference if that matters to you.",
          "Wait for personalised preparation instructions from your clinician.",
          "Ask what aftercare and follow-up to expect.",
        ],
      },
      {
        id: "planning",
        heading: "Planning a visit",
        paragraphs: [
          "The hospital does not publish blanket fasting instructions or self-booked procedure slots. Preparation is personal, and it is given after your consultation.",
          "Start with a Unani medicine OPD consultation. Reception can tell you which Unani clinician is seeing patients that day, and whether the regimental therapy OPD is running. Bring a list of your medicines and any recent reports.",
          `Not every therapy suits everyone, and some may not be offered at a given time. ${reception}`,
        ],
      },
    ],
    facts: [
      { label: "Therapies listed", value: "12" },
      { label: "Where", value: "Ilaj-bit-Tadbeer block" },
      { label: "Inpatient Unani beds", value: "50 (Moalijat wing)" },
      { label: "Who decides", value: "Your Unani physician" },
    ],
    serviceSlugs: ["hijama", "unani-medicine"],
  },
  {
    slug: "maternity-and-diagnostics",
    title: "New imaging and an upgraded maternity ward",
    dek: "Two dated milestones in the general hospital: ultrasound, 2D echo and colour Doppler in March 2021, and an upgraded maternity and gynaecology IPD in May 2022.",
    category: "Hospital",
    wing: "General hospital",
    period: "2021–2022",
    year: 2022,
    sections: [
      {
        id: "imaging",
        heading: "New imaging services",
        paragraphs: [
          "On Saturday, 13 March 2021, the hospital inaugurated its ultrasound (USG), 2D echo and colour Doppler services, as recorded in the Trust’s activity reports. Local health officials and specialist doctors attended the opening.",
          "Having imaging on site means a scan can be discussed with the doctor who requested it, on the same campus as the consultation.",
          "Imaging of this kind is registered under the PC-PNDT Act, and the hospital’s registration number is 0116A1266. The Act prohibits sex determination, and every registered centre is bound by it.",
        ],
      },
      {
        id: "diagnostics",
        heading: "Diagnostics in the general hospital",
        paragraphs: [
          "The imaging services joined a computerised clinical laboratory offering blood, urine and blood-sugar tests and ECG at subsidised rates, along with digital X-ray. Together they allow many investigations to happen on the same campus as the consultation.",
          "Your doctor or the laboratory will tell you about any preparation a test needs. Please confirm the test menu, preparation, pricing and report collection with the laboratory before you come.",
        ],
      },
      {
        id: "maternity",
        heading: "An upgraded maternity and gynaecology IPD",
        paragraphs: [
          "On 27 May 2022, the hospital inaugurated its upgraded Maternity & Gynaecology in-patient department (IPD). The reports record that it was organised under the guidance of the Managing Trustee, with the department’s medical, paramedical and nursing staff.",
          "The chief guest was the superintendent of a government maternity hospital, who is also a professor of obstetrics and gynaecology. Women who are admitted are cared for in the hospital’s 25-bed obstetrics, gynaecology and paediatrics wing, alongside the maternity ward and labour room.",
          "The upgrade is recorded as a milestone in the Trust’s reports. This page does not describe the ward’s current layout or equipment in detail, so ask reception if you have specific questions.",
        ],
      },
      {
        id: "womens-care",
        heading: "What this means for a visit",
        paragraphs: [
          "Three obstetricians and gynaecologists care for women through pregnancy and childbirth. The hospital’s stated charges are ₹7,000 for a normal delivery and ₹18,000 for a Caesarean section. Charges can change, so please confirm current delivery charges with reception before planning.",
        ],
        points: [
          "Bring antenatal records and previous reports to every visit.",
          "Ask reception which obstetrician is seeing patients that day.",
          "For urgent concerns, call the 24/7 emergency line on +91 98484 30017.",
        ],
      },
      {
        id: "planning-ahead",
        heading: "Planning ahead",
        paragraphs: [
          "Children who need admission are cared for in the same wing, and the paediatric OPD looks after newborns, infants and children. For a child’s visit, bring the vaccination card and previous prescriptions.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "Imaging inaugurated", value: "13 March 2021" },
      { label: "Maternity IPD upgraded", value: "27 May 2022" },
      { label: "OBG & paediatrics wing", value: "25 beds" },
      { label: "PC-PNDT registration", value: "0116A1266" },
    ],
    serviceSlugs: ["womens-health", "diagnostics-pharmacy", "child-health"],
  },
  {
    slug: "herbal-garden",
    title: "Inside the herbal garden",
    dek: "A 4,047 sq.m garden of 100 medicinal plant species, and a 25-seat room where they are explained.",
    category: "Unani knowledge",
    wing: "Unani care",
    period: "On campus",
    year: 2023,
    sections: [
      {
        id: "the-garden",
        heading: "A garden of medicinal plants",
        paragraphs: [
          "The hospital’s herbal garden covers 4,047 sq.m and grows 100 species of medicinal plants. It is part of the Unani pharmacy and herbal garden service, alongside the teaching pharmacy and the raw drug agency.",
          "Unani medicine draws on plants, minerals and other natural materials. Many students and visitors first meet these as dried powders or finished preparations. A living garden lets them see the plant itself: its leaves, its habit and how it changes through the seasons.",
          "Because the Unani pharmacy on campus is a teaching pharmacy, the garden is also a learning resource. It lets students connect what they read about a plant with what it looks like in the ground.",
        ],
      },
      {
        id: "demonstration-room",
        heading: "The 25-seat demonstration room",
        paragraphs: [
          "The garden is paired with a 25-seat demonstration room, a space for small groups to learn about the plants and how Unani medicine identifies and describes them.",
          "A room of this size suits a class, a group of interns or a visiting delegation rather than a large audience. The Trust’s activity reports record that a Dept. of AYUSH delegation included the herbal garden in its tour of the hospital in August 2020.",
        ],
      },
      {
        id: "plant-to-pharmacy",
        heading: "From plant to pharmacy",
        paragraphs: [
          "The garden is one part of a wider Unani setup on campus. The GMP-certified Al-Arif Unani (Teaching) Pharmacy (No. 502/U/12) dispenses Unani medicines, and the Al-Arif Raw Drug Agency (Dawasaz), inaugurated on 31 December 2020, runs manufacturing, storage, packaging, labelling, dispensing and dispatch units.",
          "Seeing a plant growing is not the same as knowing how to use it. Identifying, processing and dosing medicinal plants takes training, and a plant that is appropriate in one preparation may not be in another. Please take Unani medicines only as prescribed, and avoid preparing remedies from plants on your own.",
        ],
      },
      {
        id: "visiting",
        heading: "Visiting and learning",
        paragraphs: [
          "If you are a student, teacher or practitioner interested in the garden, ask reception whether a visit or demonstration can be arranged. Formats and availability change, so nothing here is a standing invitation.",
          "The Trust’s single-drug exhibitions in 2022 and 2023 brought similar materials to students and the public, and they are described in a separate story.",
          `Patients who are given a Unani prescription can ask the pharmacist about the medicine they receive, and should mention any other medicines they take. ${reception}`,
        ],
      },
    ],
    facts: [
      { label: "Garden area", value: "4,047 sq.m" },
      { label: "Plant species", value: "100" },
      { label: "Demonstration room", value: "25 seats" },
      { label: "Part of", value: "Unani pharmacy & herbal garden" },
    ],
    serviceSlugs: ["unani-pharmacy", "unani-medicine"],
  },
  {
    slug: "surgery-at-al-arif",
    title: "Surgery at Al-Arif",
    dek: "A practical guide to the 25-bed surgical wing, the operation theatre complex and the general surgery service, and to preparing for a surgical consultation.",
    category: "Hospital",
    wing: "General hospital",
    period: "Guide",
    year: 2024,
    sections: [
      {
        id: "surgical-wing",
        heading: "A 25-bed surgical wing",
        paragraphs: [
          "Of the hospital’s 100 inpatient beds, 25 are set aside for surgery, including eye, ENT and dental care. The rest are divided between the 50-bed Moalijat wing for Unani general medicine and the 25-bed obstetrics, gynaecology and paediatrics wing.",
          "In the Trust’s activity reports, these 25 beds are recorded under Jarahat, or surgery, including Ain, Uzn, Anf, Halaq wa Asnan: eye, ear, nose, throat and dental care.",
        ],
      },
      {
        id: "operation-theatre",
        heading: "The operation theatre complex",
        paragraphs: [
          "The surgical team performs its operations in the hospital’s operation theatre complex. The hospital lists the complex together with an ICU and a 24-hour casualty.",
          "The Trust’s activity reports also record visits that included the complex. On 25 August 2020, a Dept. of AYUSH delegation toured the hospital’s departments, the operation theatre complex among them. On 26 January 2021, an expert team at the Republic Day programme did the same.",
          "This page does not describe the theatre’s equipment or how many operating rooms it has. If you have a specific question about the facilities, ask your surgeon or reception.",
        ],
      },
      {
        id: "general-surgery",
        heading: "The general surgery service",
        paragraphs: [
          "The general surgery service’s listed clinician is a general and laparoscopic surgeon (MBBS, MS in General Surgery). The surgical team performs keyhole (laparoscopic) and open operations for conditions such as hernia, appendicitis and gallbladder stones.",
          "The surgeon’s listed OPD runs Monday to Saturday, 3:00 pm to 5:00 pm. Timings can change, so please confirm them with reception before you travel.",
          "The service lists the topics below for discussion. They are not a menu to choose from: your surgeon confirms which procedure is appropriate, and any preparation or admission arrangements.",
        ],
        points: [
          "Laparoscopic appendectomy and cholecystectomy",
          "Hernia repair",
          "Hydrocele surgery",
          "Abscess drainage and minor procedures",
          "Wound care",
          "Eye, ENT and dental OPD inquiries",
        ],
      },
      {
        id: "before-a-procedure",
        heading: "Preparing questions and documents",
        paragraphs: [
          "A little preparation helps your surgeon understand your history quickly. It also helps to bring a short list of the questions you want to ask.",
          "Preparation for a procedure is personal, and it comes only from your clinical team. No operating date, procedure package or surgical outcome is confirmed through this website.",
        ],
        points: [
          "Bring earlier consultations, scans and test reports.",
          "Bring a list of the medicines and supplements you take now, from either tradition.",
          "Ask about the procedure, the expected follow-up and the costs.",
          "Ask your surgeon about any admission arrangements.",
          "Follow only the preparation instructions given by your clinical team.",
        ],
      },
      {
        id: "charges-and-urgent",
        heading: "Charges, suitability and urgent needs",
        paragraphs: [
          "The outpatient fee is ₹10 and the inpatient bed charge is ₹100 a day, charges set in 2002 and still continued. Specialist consultations, tests, procedures and medicines can carry their own charges, and these can change, so please ask reception what applies before you plan a procedure.",
          "For anything urgent, call the 24/7 emergency line on +91 98484 30017 or go to the nearest emergency department. Do not wait for an online inquiry.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "Surgical wing", value: "25 beds · eye, ENT & dental" },
      { label: "Surgeon’s OPD", value: "Mon–Sat · 3:00–5:00 pm" },
      { label: "OP fee · IP bed charge", value: "₹10 · ₹100 a day" },
      { label: "Emergency (24/7)", value: "+91 98484 30017" },
    ],
    serviceSlugs: ["general-surgery"],
  },
  {
    slug: "your-first-visit",
    title: "Your first visit",
    dek: "A practical guide to your first OPD visit, whether you are coming to the general hospital or for Unani care.",
    category: "Hospital",
    wing: "Both",
    period: "Guide",
    year: 2024,
    sections: [
      {
        id: "finding-us",
        heading: "Finding the hospital",
        paragraphs: [
          "Al Arif General Hospital is at 18-13-132/41/B, Tulsi Nagar, Noori Nagar, Bandlaguda, Chandrayangutta, Hyderabad, Telangana 500005. It stands adjacent to Dargah Hazrat Syed Noori Shah Jeelani R.A., on Bandlaguda Main Road, which is the easiest landmark to give a driver or to ask about locally.",
          "If you need help with step-free access or mobility support, ask reception before you travel so they can tell you what to expect.",
          "It helps to save the hospital’s numbers in your phone before you set out: reception is +91 85550 86667, and the emergency line is +91 98484 30017.",
        ],
      },
      {
        id: "timings",
        heading: "When to come",
        paragraphs: [
          "The hospital is open 24 hours. Outpatient departments (OPDs) run Monday to Saturday, approximately 8:30 am to 8:30 pm.",
          "Timings vary by doctor. Please confirm your doctor’s schedule, and any specialist fee, with reception on +91 85550 86667 (also on WhatsApp) before travelling. Reception can also tell you whether you can walk in or need an appointment.",
        ],
      },
      {
        id: "what-to-bring",
        heading: "What to bring",
        paragraphs: [
          "A little preparation helps your clinician understand your history quickly, whichever wing you visit.",
        ],
        points: [
          "Previous reports and prescriptions",
          "A list of the medicines and supplements you take now",
          "Antenatal records, if you are pregnant",
          "Your child’s vaccination card, for a paediatric visit",
          "Your current Unani prescription, if you have one",
          "A short list of the questions you want to ask",
        ],
      },
      {
        id: "choosing-care",
        heading: "General hospital or Unani care",
        paragraphs: [
          "The general hospital covers general medicine, general surgery, women’s health and maternity, child health, and diagnostics and pharmacy. Unani care includes seven Unani OPDs, regimental therapy such as Hijama, Unani care for women and children, skin care, and the Unani pharmacy and herbal garden.",
          "If you are not sure where to start, tell reception what is troubling you and they can suggest an OPD to begin with. If you take medicines from both traditions, tell each clinician, so they can check how they fit together.",
        ],
      },
      {
        id: "fees-and-urgent",
        heading: "Fees and urgent needs",
        paragraphs: [
          "The outpatient fee is ₹10 and the inpatient bed charge is ₹100 a day. Specialist consultations, tests, procedures and medicines can carry their own charges, so please confirm current fees with reception.",
          "For anything urgent, call the 24/7 emergency line on +91 98484 30017 or seek immediate local help. Do not wait for an online inquiry.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "Hospital", value: "Open 24 hours" },
      { label: "OPD", value: "Mon–Sat · approx. 8:30 am–8:30 pm" },
      { label: "OP fee", value: "₹10" },
      { label: "Reception", value: "+91 85550 86667" },
      { label: "Emergency (24/7)", value: "+91 98484 30017" },
    ],
    serviceSlugs: ["general-medicine", "unani-medicine", "diagnostics-pharmacy"],
  },
  {
    slug: "single-drug-exhibitions",
    title: "Single drugs on display",
    dek: "Two single-drug exhibitions and a pharmacy stall that took Unani materials to students and the public.",
    category: "Research & learning",
    wing: "Unani care",
    period: "2022–2023",
    year: 2023,
    sections: [
      {
        id: "single-drugs",
        heading: "What a single drug is",
        paragraphs: [
          "In Unani pharmacy, a single drug is a medicinal substance used on its own, such as a dried root, seed, resin or mineral, rather than as part of a compound formulation. Exhibitions help students and practitioners recognise materials they will meet in textbooks and in the pharmacy.",
          "Between 2022 and 2023, the Trust’s activity reports record two exhibitions and a pharmacy stall at which Al-Arif put these materials before students and the public. Each is described below as it was recorded at the time.",
        ],
      },
      {
        id: "march-2022",
        heading: "March 2022: a two-day exhibition",
        paragraphs: [
          "On 26 and 27 March 2022, the hospital held a two-day exhibition of Unani single drugs and pharmaceutical equipment under the supervision of the Managing Trustee. It brought together more than 350 single drugs, 100 live medicinal plants, and both traditional and modern pharmacy equipment.",
          "The reports record 787 participants. They included administrators, principals, faculty members, postgraduate and PhD scholars, interns and undergraduate students from Unani, Ayurveda, Homoeopathy, and Yoga & Naturopathy colleges, along with a scientist from NBPGR (ICAR), practitioners, pharmacy proprietors and members of the public.",
        ],
      },
      {
        id: "june-2022",
        heading: "June 2022: Biodiversity Day",
        paragraphs: [
          "On 5 June 2022, the Al-Arif Unani Pharmacy set up a stall at the state-level celebration of the International Day for Biological Diversity and Environment Day. The event was organised by the Telangana State Biodiversity Board (TSBDB) at B.M. Birla Centre, with the Association for Ethnomedicine and Traditional Crops Diversity (APETCD).",
          "The hospital’s directors were part of the delegation. The reports do not list what the stall displayed.",
        ],
      },
      {
        id: "february-2023",
        heading: "February 2023: the Salar Jung Museum",
        paragraphs: [
          "On 25 and 26 February 2023, Al-Arif held a two-day exhibition of Unani herbal single drugs for public health, together with and at the Salar Jung Museum in Hyderabad, to mark Unani Day. Unani Day commemorates the birth anniversary of Hakim Ajmal Khan, on 11 February.",
          "More than 350 single drugs were shown. The exhibition also coincided with the first Urs of the Founder Chairman, and the reports describe a large number of visitors over the two days.",
        ],
      },
      {
        id: "a-note-on-use",
        heading: "A note on use",
        paragraphs: [
          "These exhibitions were about recognising materials and understanding Unani pharmacy, not about choosing a remedy. Please take Unani medicines only as prescribed, and tell your clinician about every other medicine you take.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "March 2022", value: "350+ single drugs · 787 participants" },
      { label: "Live plants shown", value: "100" },
      { label: "June 2022", value: "TSBDB Biodiversity Day stall" },
      { label: "February 2023", value: "Salar Jung Museum" },
    ],
    serviceSlugs: ["unani-pharmacy", "unani-medicine"],
  },
  {
    slug: "casualty-icu-and-wards",
    title: "Casualty, ICU and the wards",
    dek: "A practical guide to the emergency line, the 24-hour casualty and ambulance, the ICU and the three inpatient wings.",
    category: "Hospital",
    wing: "General hospital",
    period: "Guide",
    year: 2024,
    sections: [
      {
        id: "open-day-and-night",
        heading: "Open day and night",
        paragraphs: [
          "Al Arif General Hospital is open 24 hours. Outpatient departments (OPDs) run Monday to Saturday, approximately 8:30 am to 8:30 pm, and timings vary by doctor.",
          "The hospital’s 24/7 emergency line is +91 98484 30017. It is separate from reception on +91 85550 86667, which is the place to confirm a doctor’s schedule, timings and fees.",
          "It helps to save both numbers in your phone. This page does not assess symptoms. In an emergency, call the emergency line or go to the nearest emergency department. Do not wait for an online inquiry.",
        ],
      },
      {
        id: "casualty-and-ambulance",
        heading: "The casualty and the ambulance",
        paragraphs: [
          "The hospital lists a 24-hour casualty among its facilities, alongside an intensive care unit (ICU) and an operation theatre complex.",
          "It also has one ambulance, certified by the Government Transport Department. The Trust’s activity reports list the ambulance among the hospital’s salient features.",
          "This page does not give the number of casualty beds or any further details of the ambulance. If you have questions about either, ask reception.",
        ],
      },
      {
        id: "icu-and-theatre",
        heading: "The ICU and the theatre",
        paragraphs: [
          "The Trust’s activity reports record that guests visited the ICU on Republic Day in January 2022, along with the Unani pharmacy and the Raw Drug Agency. This page does not describe the ICU’s beds or equipment.",
          "The surgical team operates in the operation theatre complex. The surgical wing, the theatre and how to prepare for a surgical consultation are described in a separate guide, “Surgery at Al-Arif”.",
        ],
      },
      {
        id: "inpatient-wings",
        heading: "The inpatient wings",
        paragraphs: [
          "The hospital has 100 inpatient beds. The inpatient bed charge is ₹100 a day, set in 2002 and still continued, although specialist consultations, tests, procedures and medicines can carry their own charges.",
          "The beds are shared between three wings:",
        ],
        points: [
          "Surgery, including eye, ENT and dental care: 25 beds",
          "Obstetrics and gynaecology, including paediatrics: 25 beds",
          "Moalijat (Unani general medicine): 50 beds",
        ],
      },
      {
        id: "if-admission-is-needed",
        heading: "If admission is needed",
        paragraphs: [
          "For an operation, your surgeon confirms which procedure is appropriate, and any preparation or admission arrangements. For maternity care, please confirm admission arrangements with reception.",
          "Whoever is being admitted, bring previous reports, prescriptions and a list of the medicines and supplements they take now.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "Emergency (24/7)", value: "+91 98484 30017" },
      { label: "Ambulance", value: "1 · Transport Dept. certified" },
      { label: "Inpatient beds", value: "100" },
      { label: "IP bed charge", value: "₹100 a day" },
    ],
    serviceSlugs: ["general-surgery", "womens-health", "child-health"],
  },
  {
    slug: "community-camps",
    title: "Free camps in the community",
    dek: "A record of four medical camps, from a cardiac camp in April 2021 to six days at the All India Horticulture & Agriculture Show in 2023.",
    category: "Community",
    wing: "Both",
    period: "2021–2023",
    year: 2023,
    sections: [
      {
        id: "cardiac-camp",
        heading: "April 2021: a free cardiac camp",
        paragraphs: [
          "On Sunday, 11 April 2021, the hospital held a free cardiac camp. As recorded in the Trust’s activity reports, a cardiac consultant gave free consultations and 2D echo examinations to more than 60 patients.",
          "The camp came a month after the hospital inaugurated its 2D echo and colour Doppler services, in March 2021. A camp like this brings a consultation and a test together on one day, which can make a difference for people who find repeated visits difficult.",
        ],
      },
      {
        id: "three-day-camp",
        heading: "June 2021: three days of free care",
        paragraphs: [
          "From 19 to 21 June 2021, the hospital ran a three-day free medical camp. It offered free blood, urine, ECG and sugar tests, and free consultations with specialists in internal medicine, paediatrics, cardiology, Unani medicine, gynaecology and surgery. Medicines were distributed free of charge.",
          "The reports record more than 500 patients over the three days. The camp brought general and Unani clinicians together in one place, much as the hospital itself does day to day.",
        ],
      },
      {
        id: "unani-day-camp",
        heading: "February 2023: Unani Day",
        paragraphs: [
          "On 11 February 2023, Unani Day, the hospital held a free Unani medical camp. Unani Day commemorates the birth anniversary of Hakim Ajmal Khan, and 2023 marked the 155th.",
          "The camp offered free tests and consultations, with medicines at subsidised prices. The reports record more than 427 patients.",
        ],
      },
      {
        id: "horticulture-show",
        heading: "2023: six days at the Horticulture Show",
        paragraphs: [
          "From 31 August to 5 September 2023, Al-Arif ran a six-day Unani medical camp at the All India Horticulture & Agriculture Show, held at People’s Plaza on Necklace Road, Hyderabad. Senior officials from agriculture and AYUSH inaugurated the camp.",
          "Because the show draws visitors from across India, the camp introduced Unani medicine to many people who might not otherwise have come across it. Running across six consecutive days, it is the longest camp in this record.",
        ],
      },
      {
        id: "about-records",
        heading: "About these records",
        paragraphs: [
          "Each camp ran on the dates shown, and patient numbers are given exactly as the reports record them. Some camps distributed medicines free of charge and one offered them at subsidised prices; this reflects what was recorded for each occasion, not a standing policy.",
          "This page does not announce future camps. If you would like to know whether any are planned, ask reception.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "Cardiac camp", value: "11 April 2021 · 60+ patients" },
      { label: "Three-day camp", value: "19–21 June 2021 · 500+ patients" },
      { label: "Unani Day camp", value: "11 February 2023 · 427+ patients" },
      { label: "Horticulture Show camp", value: "31 August–5 September 2023" },
    ],
    serviceSlugs: ["general-medicine", "unani-medicine", "diagnostics-pharmacy"],
  },
  {
    slug: "raw-drug-agency",
    title: "The Raw Drug Agency",
    dek: "How the Al-Arif Raw Drug Agency (Dawasaz), opened on 31 December 2020, fits alongside the hospital’s two pharmacies.",
    category: "Pharmacy",
    wing: "Unani care",
    period: "December 2020",
    year: 2020,
    sections: [
      {
        id: "opening",
        heading: "Opening day",
        paragraphs: [
          "On Thursday, 31 December 2020, the Al-Arif Raw Drug Agency (Dawasaz) was inaugurated on the hospital campus. As recorded in the Trust’s activity reports, the Secretary of the Board of Indian Medicine and an AYUSH Drug Inspector reviewed the agency’s compliance with Good Manufacturing Practice (GMP).",
          "The agency holds licence number 229/U/2020-21. In Unani pharmacy, raw drugs are the plant, mineral and other natural materials from which medicines are prepared.",
          "Its opening followed a year in which the hospital hosted several programmes on Unani medicine and pharmacy practice, which are described in the story on scientific sessions.",
        ],
      },
      {
        id: "what-it-does",
        heading: "What the agency does",
        paragraphs: [
          "Raw drugs need careful handling before they become medicines. The agency is organised into separate units, each covering one stage:",
        ],
        points: [
          "Manufacturing",
          "Storage",
          "Packaging",
          "Labelling",
          "Dispensing",
          "Dispatch",
        ],
      },
      {
        id: "why-gmp",
        heading: "Why GMP matters here",
        paragraphs: [
          "Good Manufacturing Practice is a set of standards for how medicines are made, stored and labelled. For a Unani pharmacy, it applies to raw materials as much as to finished preparations.",
          "Keeping each stage distinct is part of what a GMP review looks at: how materials are stored, how clearly they are labelled, and how they move from one stage to the next. The Unani pharmacy’s GMP practice had already been the subject of a dedicated programme on 10 June 2020, which included a visit to the pharmacy.",
        ],
      },
      {
        id: "pharmacies",
        heading: "Two pharmacies and an agency",
        paragraphs: [
          "The agency sits alongside two pharmacies. The GMP-certified Al-Arif Unani (Teaching) Pharmacy (No. 502/U/12) provides herbal Unani medicines at low rates, and the DCA-certified Al-Arif Allopathic Pharmacy (102/HD1/AP/2010) serves the general hospital.",
          "Put simply, the agency covers the handling of raw drugs, the Unani pharmacy dispenses prescribed Unani medicines, and the allopathic pharmacy serves patients of the general hospital. On Republic Day in January 2022, guests visited the ICU, the Unani pharmacy and the Raw Drug Agency, and the reports note that they appreciated the development work then in progress.",
        ],
      },
      {
        id: "questions",
        heading: "If you have a question",
        paragraphs: [
          "Raw drug inquiries can be made through reception, who can pass your question to the pharmacy team. Online medicine sales and delivery are not available through this website.",
          `Please take Unani medicines only as prescribed, and tell the pharmacist about other medicines you take. ${reception}`,
        ],
      },
    ],
    facts: [
      { label: "Inaugurated", value: "31 December 2020" },
      { label: "Raw drug licence", value: "229/U/2020-21" },
      { label: "Unani pharmacy (GMP)", value: "502/U/12" },
      { label: "Allopathic pharmacy (DCA)", value: "102/HD1/AP/2010" },
    ],
    serviceSlugs: ["unani-pharmacy", "diagnostics-pharmacy"],
  },
  {
    slug: "covid-19-response",
    title: "The COVID-19 response, 2020–2021",
    dek: "A dated record of how the hospital responded during the pandemic, from awareness programmes to an 80-bed treatment centre.",
    category: "Community",
    wing: "Both",
    period: "2020–2021",
    year: 2021,
    sections: [
      {
        id: "awareness",
        heading: "Awareness in the first months",
        paragraphs: [
          "This is a historical record. The COVID-19 Treatment Centre and the isolation and oxygen facilities described here were part of the hospital’s response in 2020 and 2021, and they are not current services.",
          "In the early months of 2020, the Trust’s activity reports record a series of programmes. On 21 March 2020, a scientific session discussed Unani medicine and COVID-19. On 1 April 2020, a press conference presented research aspects of Tiryaq-e-Arba, a Unani polyherbal formulation. On 5 May 2020, an awareness programme was held alongside a free distribution of AYUSH Joshanda.",
        ],
      },
      {
        id: "joshanda",
        heading: "Joshanda distributions",
        paragraphs: [
          "Through the summer of 2020, the hospital distributed Unani medicine free of charge on several dates. The reports name AYUSH Joshanda, a Unani herbal preparation taken as a decoction, for 24 June, 11 July and 10 August, and record a further free distribution on 14 July 2020.",
          "The records describe these as distributions. They do not show that any medicine treats or prevents COVID-19, and this page makes no such claim. On 31 March 2021, ahead of an anticipated second wave, a further session discussed three Unani formulations: Tiryaq-e-Arba, Tiryaq-e-Azam and AYUSH Joshanda.",
        ],
      },
      {
        id: "treatment-centre",
        heading: "An 80-bed treatment centre",
        paragraphs: [
          "From 14 April 2021, during the second wave, the hospital ran an 80-bed COVID-19 Treatment Centre approved by the DM&HO. It was run on a charitable basis, around the clock.",
          "The reports record more than 130 outpatients and 88 inpatients served. The staff included 7 specialist doctors, 14 trained nurses and 10 housekeeping staff, along with ancillary staff.",
        ],
      },
      {
        id: "isolation-oxygen",
        heading: "Isolation and oxygen transit",
        paragraphs: [
          "With the Greater Hyderabad Municipal Corporation (GHMC) and the IQRA Group of Doctors, the Trust also set up a free isolation centre and a free oxygen transit facility for suspected cases.",
          "These facilities were part of a wider effort across the city at a difficult time, and they are recorded here so that the work is remembered accurately. The reports do not give separate dates or patient numbers for them, so none are given here.",
        ],
      },
      {
        id: "today",
        heading: "Today",
        paragraphs: [
          "The facilities in this story belong to 2020 and 2021, and this page is not a guide to current services. For a current health concern, start with the general medicine OPD, or call the 24/7 emergency line on +91 98484 30017 for anything urgent.",
          reception,
        ],
      },
    ],
    facts: [
      { label: "Period", value: "2020–2021 (historical)" },
      { label: "Treatment centre", value: "80 beds, from 14 April 2021" },
      { label: "Patients served", value: "130+ outpatients · 88 inpatients" },
      { label: "Partners", value: "GHMC · IQRA Group of Doctors" },
    ],
    serviceSlugs: ["general-medicine", "unani-medicine"],
  },
  {
    slug: "scientific-sessions",
    title: "Scientific sessions and expert visits",
    dek: "How the hospital hosted Unani experts, the Dept. of AYUSH and practitioners for discussion between 2020 and 2021.",
    category: "Research & learning",
    wing: "Unani care",
    period: "2020–2021",
    year: 2021,
    sections: [
      {
        id: "forum",
        heading: "A forum for discussion",
        paragraphs: [
          "Between 2020 and 2021, the Trust’s activity reports record a run of scientific sessions at the hospital. They brought together Unani physicians and academics, including serving and former officials of the Dept. of AYUSH, Telangana and a former deputy director of the Central Council for Research in Unani Medicine (CCRUM), along with teachers and practitioners.",
          "On 21 March 2020, a session on Unani medicine and COVID-19 was chaired by a former principal of the Government Nizamia Tibbi College. Participants included former AYUSH research officers and a former deputy director of CCRUM.",
        ],
      },
      {
        id: "expert-programmes",
        heading: "Dated programmes",
        paragraphs: [
          "The reports date each programme; some fell on national and state occasions:",
        ],
        points: [
          "2 June 2020, Telangana Formation Day: the responsibilities of Unani doctors",
          "10 June 2020: the importance of Good Manufacturing Practice, with a visit to the Unani pharmacy",
          "15 August 2020, Independence Day: a scientific session",
          "26 January 2021, Republic Day: an expert programme chaired by the Superintendent, followed by a tour of departments",
          "31 March 2021: a session on three Unani formulations, Tiryaq-e-Arba, Tiryaq-e-Azam and AYUSH Joshanda",
        ],
      },
      {
        id: "brainstorming",
        heading: "A brainstorming session",
        paragraphs: [
          "On Saturday, 16 January 2021, the hospital hosted a brainstorming session described as a “rational discussion” on Unani drugs commonly used in general practice.",
          "Sessions like this are about practitioners comparing experience and reviewing how medicines are used. They are discussions rather than clinical studies.",
        ],
      },
      {
        id: "ayush-visit",
        heading: "The AYUSH delegation",
        paragraphs: [
          "On Monday, 25 August 2020, a Dept. of AYUSH delegation led by an additional director visited the hospital. The delegation toured the OPD and IPD, the maternity ward, the operation theatre complex, the clinical laboratory, X-ray and the herbal garden.",
          "The visit sits alongside the sessions in which AYUSH experts took part, and it covered both the general hospital and the Unani side of the campus.",
        ],
      },
      {
        id: "reading-records",
        heading: "Reading these records",
        paragraphs: [
          "These sessions are recorded by date, as they happened, and experts are described by their roles. Publication records for the hospital’s research work are not yet available, and patient testimonials are not used as evidence. Where a session discussed a formulation, the record is of the discussion only, not evidence that the formulation works.",
          `If you are a student or practitioner, the education and research pages describe current learning formats and their status. ${reception}`,
        ],
      },
    ],
    facts: [
      { label: "Period", value: "2020–2021" },
      { label: "Experts from", value: "Dept. of AYUSH, Telangana · former CCRUM official" },
      { label: "AYUSH delegation", value: "25 August 2020" },
      { label: "Brainstorming session", value: "16 January 2021" },
    ],
    serviceSlugs: ["unani-medicine", "unani-pharmacy"],
  },
];

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

export function readingMinutes(story: Story): number {
  const words = story.sections.reduce(
    (total, section) =>
      total +
      countWords(section.heading) +
      section.paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0) +
      (section.points ?? []).reduce((sum, point) => sum + countWords(point), 0),
    countWords(story.dek),
  );
  return Math.max(1, Math.ceil(words / 200));
}

export const regimentalTherapies: {
  name: string;
  meaning: string;
  description: string;
}[] = [
  {
    name: "Hijama",
    meaning: "Cupping",
    description:
      "Cups are placed on the skin to create suction, either on their own (dry cupping) or after small, superficial cuts (wet cupping). It is carried out by a trained practitioner after referral.",
  },
  {
    name: "Dalak",
    meaning: "Massage",
    description:
      "Manual massage of the body or a part of it, sometimes with oils chosen by the physician. Pressure, duration and technique vary from person to person.",
  },
  {
    name: "Fasd",
    meaning: "Venesection",
    description:
      "A measured quantity of blood is let from a vein by a trained practitioner. It is described for selected situations only, after assessment.",
  },
  {
    name: "Aabzan",
    meaning: "Sitz bath",
    description:
      "The person sits in a tub of water, sometimes prepared with herbal decoctions, for a set time. Temperature and duration are decided by the physician.",
  },
  {
    name: "Tariq",
    meaning: "Sweating",
    description:
      "Sweating is induced through warmth, baths or other measures. The method and duration depend on the physician’s assessment.",
  },
  {
    name: "Idrar-e-Baul",
    meaning: "Diuresis",
    description:
      "A regimen intended to increase the flow of urine, using diet, fluids or preparations chosen by the physician.",
  },
  {
    name: "Hamam",
    meaning: "Turkish bath",
    description:
      "A bath taken in warm, humid rooms, followed by washing and rest. The routine is adjusted to the person.",
  },
  {
    name: "Kai",
    meaning: "Cauterisation",
    description:
      "Controlled heat is applied to a small area of the body. Classical texts describe it for limited, selected situations.",
  },
  {
    name: "Ishal",
    meaning: "Purging",
    description:
      "Purgative preparations are given under supervision to move the bowels. The preparation and dose are chosen by the physician.",
  },
  {
    name: "Qai",
    meaning: "Emesis",
    description:
      "Vomiting is induced under supervision using emetic preparations. It is considered only in selected situations.",
  },
  {
    name: "Riyazat",
    meaning: "Exercise",
    description:
      "Planned physical exercise, adjusted to a person’s age, strength and condition. It may be advised alongside other care.",
  },
  {
    name: "Taleeq",
    meaning: "Leeching",
    description:
      "Medicinal leeches are applied to the skin to draw a small quantity of blood. It is carried out by a trained practitioner.",
  },
];
