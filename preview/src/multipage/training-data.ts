// Training programmes held at the Al-Arif Unani Pharmacy, as announced by the organisers.
// The newest comes first; each later programme is one more entry here.

export type TrainingPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type TrainingProgramme = {
  slug: string;
  status: "held" | "upcoming";
  title: string;
  /** The process named in Urdu on the announcement. */
  urdu?: string;
  date: string;
  when: string;
  time: string;
  venue: string;
  audience: string;
  participants: number;
  fee: string;
  summary: string;
  learnt: string[];
  gained: string[];
  organisers: { name: string; doctorSlug?: string }[];
  /** The organisers' own words after the session. */
  message?: { text: string; signedBy: string };
  clip?: { src: string; poster: string; caption: string };
  photos: TrainingPhoto[];
};

export const trainingProgrammes: TrainingProgramme[] = [
  {
    slug: "distillation-process-2026-11",
    status: "held",
    title: "Distillation process",
    urdu: "عمل تقطیر",
    date: "2026-11-07",
    when: "7 November 2026",
    time: "3 pm – 5 pm",
    venue:
      "Al-Arif Unani Pharmacy, GMP-certified manufacturing unit, Bandlaguda, Chandrayangutta, Hyderabad",
    audience: "BUMS 2nd, 3rd and final year students and house surgeons",
    participants: 40,
    fee: "Free",
    summary:
      "A free, two-hour hands-on session on Amal-e-Taqteer, the Unani distillation process, held at the pharmacy’s GMP-certified manufacturing unit. Forty registered and shortlisted BUMS medicos worked through it at the still itself.",
    learnt: ["Principles", "Practical", "Application"],
    gained: [
      "Career-oriented training",
      "Industrial exposure",
      "Expert guidance",
    ],
    organisers: [
      { name: "Dr. Kaleemullah Khan", doctorSlug: "kaleemullah-khan" },
      { name: "Dr. Syed Touheed Ahmed", doctorSlug: "syed-touheed-ahmed" },
      { name: "Dr. Mohd. Najeeb Khan", doctorSlug: "mohd-najeeb-khan" },
      { name: "Mohammed Samiuddin" },
      { name: "Md. Abbas Ali" },
    ],
    message: {
      text: "We got a positive response from all of them, and we will shortly conduct the next programme, InshaAllah.",
      signedBy: "Dr. Syed Touheed Ahmed & Dr. Mohd. Najeeb Khan",
    },
    clip: {
      src: "/training/distillation-clip.mp4",
      poster: "/training/distillation-clip-poster.webp",
      caption: "Distillate collecting in the receiver during the session.",
    },
    photos: [
      {
        src: "/training/classroom-briefing.webp",
        alt: "A trainer addresses BUMS students seated beneath the Al-Arif Unani Pharmacy banner.",
        caption: "The briefing: principles before practice.",
        width: 1456,
        height: 662,
      },
      {
        src: "/training/distillation-apparatus.webp",
        alt: "Students gather around a stainless-steel distillation unit while a trainer explains it.",
        caption: "At the still: the practical.",
        width: 1080,
        height: 583,
      },
      {
        src: "/training/unit-walkthrough.webp",
        alt: "A trainer points out a section of the manufacturing unit to a group of students.",
        caption: "A walk through the manufacturing unit.",
        width: 1400,
        height: 797,
      },
      {
        src: "/training/group-photo.webp",
        alt: "Participants and organisers stand together outside the Al-Arif Unani Pharmacy.",
        caption: "Participants and organisers outside the pharmacy.",
        width: 1400,
        height: 645,
      },
    ],
  },
];

export const latestTraining = trainingProgrammes[0];
