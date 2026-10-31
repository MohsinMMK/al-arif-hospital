export type MilestoneCategory =
  "Hospital" | "Community" | "Research & learning" | "Pharmacy" | "Trust";

export type Milestone = {
  id: string;
  date: string;
  when: string;
  year: number;
  title: string;
  summary: string;
  category: MilestoneCategory;
  storySlug?: string;
};

export const milestones: Milestone[] = [
  {
    id: "founding-2002",
    date: "2002",
    when: "2002",
    year: 2002,
    title: "The hospital and Jamia Arifia Nooria open",
    summary:
      "The Trust began with a 100-bed charitable hospital in two buildings and Jamia Arifia Nooria, an Arabic institute for 250 pupils, all donated by the Founder Chairman. The ₹10 outpatient fee and ₹100-a-day bed charge set that year are still continued.",
    category: "Trust",
    storySlug: "our-story-since-2002",
  },
  {
    id: "scientific-session-2020-03",
    date: "2020-03-21",
    when: "21 March 2020",
    year: 2020,
    title: "First scientific session on Unani medicine and COVID-19",
    summary:
      "Unani physicians and academics, including former officials of the Department of AYUSH, Telangana and a former deputy director of CCRUM, met on campus to discuss the role of Unani medicine in COVID-19 management.",
    category: "Research & learning",
    storySlug: "scientific-sessions",
  },
  {
    id: "secretariat-programme-2020-03",
    date: "2020-03-30",
    when: "30 March 2020",
    year: 2020,
    title: "Expert programme at the Telangana Government Secretariat",
    summary:
      "The hospital organised an expert programme on the role of Unani medicine in COVID-19 management, held at the Telangana Government Secretariat.",
    category: "Research & learning",
  },
  {
    id: "awareness-press-2020-04",
    date: "2020-04-01",
    when: "1 April 2020",
    year: 2020,
    title: "Public awareness through a press conference",
    summary:
      "A mass awareness programme, held as a press conference, presented research aspects of Tiryaq-e-Arba, a Unani polyherbal formula.",
    category: "Research & learning",
    storySlug: "covid-19-response",
  },
  {
    id: "joshanda-2020-05",
    date: "2020-05-05",
    when: "5 May 2020",
    year: 2020,
    title: "Awareness programme and free AYUSH Joshanda",
    summary:
      "An awareness programme on COVID-19 was held alongside the first free distribution of AYUSH Joshanda recorded in the reports. Further free distributions followed in 2020, including AYUSH Joshanda on 24 June, 11 July and 10 August, and another on 14 July.",
    category: "Community",
    storySlug: "covid-19-response",
  },
  {
    id: "gmp-programme-2020-06",
    date: "2020-06-10",
    when: "10 June 2020",
    year: 2020,
    title: "Expert programme on Good Manufacturing Practices",
    summary:
      "The hospital hosted a programme on the importance of Good Manufacturing Practices (GMP), and the guest expert visited the GMP-certified Al-Arif Unani Pharmacy (502/U/12).",
    category: "Pharmacy",
  },
  {
    id: "scientific-session-2020-08",
    date: "2020-08-15",
    when: "15 August 2020",
    year: 2020,
    title: "Independence Day scientific session",
    summary:
      "On Independence Day, the hospital held a further scientific session on the role of Unani medicine in COVID-19 management, with hospital doctors and invited experts.",
    category: "Research & learning",
    storySlug: "scientific-sessions",
  },
  {
    id: "ayush-delegation-2020-08",
    date: "2020-08-25",
    when: "25 August 2020",
    year: 2020,
    title: "Department of AYUSH delegation visits",
    summary:
      "A delegation from the Department of AYUSH, Telangana toured the outpatient and inpatient departments, maternity ward, operation theatre complex, clinical laboratory, X-ray unit and the herbal garden.",
    category: "Trust",
  },
  {
    id: "raw-drug-agency-2020-12",
    date: "2020-12-31",
    when: "31 December 2020",
    year: 2020,
    title: "Al-Arif Raw Drug Agency (Dawasaz) inaugurated",
    summary:
      "The Raw Drug Agency opened under Raw Drug Sale licence 229/U/2020-21. The Secretary of the Board of Indian Medicine and a Drug Inspector of the Department of AYUSH, Telangana toured its manufacturing, storage, packaging, labelling, dispensing and dispatch units and noted its GMP compliance.",
    category: "Pharmacy",
    storySlug: "raw-drug-agency",
  },
  {
    id: "brainstorming-2021-01",
    date: "2021-01-16",
    when: "16 January 2021",
    year: 2021,
    title: "Brainstorming session on everyday Unani drugs",
    summary:
      "Unani physicians, academics and scientists joined an open discussion on commonly used Unani drugs in general practice.",
    category: "Research & learning",
    storySlug: "scientific-sessions",
  },
  {
    id: "ultrasound-2021-03",
    date: "2021-03-13",
    when: "13 March 2021",
    year: 2021,
    title: "Ultrasound, 2D echo and colour Doppler scanning",
    summary:
      "The hospital inaugurated its ultrasound, 2D echo and colour Doppler scanning unit, with local health officials and specialist doctors as guests.",
    category: "Hospital",
    storySlug: "maternity-and-diagnostics",
  },
  {
    id: "brainstorming-2021-03",
    date: "2021-03-31",
    when: "31 March 2021",
    year: 2021,
    title: "Session on Unani medicine and the second wave",
    summary:
      "Ahead of the anticipated second wave, Unani physicians and academics discussed the role of Unani medicine, including Government of India approved Unani formulations.",
    category: "Research & learning",
    storySlug: "scientific-sessions",
  },
  {
    id: "cardiac-camp-2021-04",
    date: "2021-04-11",
    when: "11 April 2021",
    year: 2021,
    title: "Free cardiac camp",
    summary:
      "A one-day camp at the hospital, where a cardiac consultant gave free consultation and 2D echo to 60+ patients.",
    category: "Community",
    storySlug: "community-camps",
  },
  {
    id: "covid-centre-2021-04",
    date: "2021-04-14",
    when: "14 April 2021",
    year: 2021,
    title: "80-bed COVID-19 Treatment Centre",
    summary:
      "Approved by the District Medical & Health Officer, the centre ran around the clock on a charitable basis during the second wave. It served 130+ outpatients and 88 inpatients.",
    category: "Hospital",
    storySlug: "covid-19-response",
  },
  {
    id: "medical-camp-2021-06",
    date: "2021-06-19",
    when: "19–21 June 2021",
    year: 2021,
    title: "Three-day free medical camp",
    summary:
      "Free blood, urine, sugar and ECG tests, consultations with general and Unani specialists, and free medicines distributed to 500+ patients.",
    category: "Community",
    storySlug: "community-camps",
  },
  {
    id: "exhibition-2022-03",
    date: "2022-03-26",
    when: "26–27 March 2022",
    year: 2022,
    title: "Exhibition of Unani single drugs and equipment",
    summary:
      "A two-day exhibition displayed 350+ Unani single drugs, 100 live medicinal plants and traditional and modern pharmaceutical equipment. It welcomed 787 participants from Unani, Ayurveda, Homoeopathy, Yoga and Naturopathy colleges, along with members of the public.",
    category: "Research & learning",
    storySlug: "single-drug-exhibitions",
  },
  {
    id: "maternity-2022-05",
    date: "2022-05-27",
    when: "27 May 2022",
    year: 2022,
    title: "Upgraded maternity and gynaecology ward",
    summary:
      "The upgraded Maternity & Gynaecology In-Patient Department was inaugurated, with a senior obstetrics and gynaecology specialist as chief guest.",
    category: "Hospital",
    storySlug: "maternity-and-diagnostics",
  },
  {
    id: "biodiversity-stall-2022-06",
    date: "2022-06-05",
    when: "5 June 2022",
    year: 2022,
    title: "Unani Pharmacy stall on Environment Day",
    summary:
      "The Al-Arif Unani Pharmacy ran a stall at the state-level International Day for Biological Diversity and Environment Day celebrations of the Telangana State Biodiversity Board, at B.M. Birla Centre, Hyderabad.",
    category: "Pharmacy",
    storySlug: "single-drug-exhibitions",
  },
  {
    id: "unani-day-camp-2023-02",
    date: "2023-02-11",
    when: "11 February 2023",
    year: 2023,
    title: "Free Unani medical camp on Unani Day",
    summary:
      "Marking the 155th birth anniversary of Hakim Ajmal Khan, the camp offered free tests and specialist consultations, with medicines at subsidised prices, for 427+ patients.",
    category: "Community",
    storySlug: "community-camps",
  },
  {
    id: "salar-jung-exhibition-2023-02",
    date: "2023-02-25",
    when: "25–26 February 2023",
    year: 2023,
    title: "Single-drug exhibition at the Salar Jung Museum",
    summary:
      "With the Salar Jung Museum, Hyderabad, the hospital held a two-day exhibition of 350+ Unani herbal single drugs for public health. It coincided with the first Urs of the late Founder Chairman.",
    category: "Research & learning",
    storySlug: "single-drug-exhibitions",
  },
  {
    id: "horticulture-camp-2023-08",
    date: "2023-08-31",
    when: "31 August – 5 September 2023",
    year: 2023,
    title: "Six-day Unani medical camp at the Horticulture Show",
    summary:
      "A Unani medical camp ran at the All India Horticulture & Agriculture Show, People’s Plaza, Necklace Road, Hyderabad. Officials from the Department of AYUSH and the Agriculture Department, Telangana inaugurated it.",
    category: "Community",
    storySlug: "community-camps",
  },
];

export const milestoneYears: number[] = [
  ...new Set(milestones.map((milestone) => milestone.year)),
].sort((a, b) => a - b);
