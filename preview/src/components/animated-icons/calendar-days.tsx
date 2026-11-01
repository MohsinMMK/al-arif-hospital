import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const DAYS = [
  "M8 13h.01",
  "M12 13h.01",
  "M16 13h.01",
  "M8 17h.01",
  "M12 17h.01",
  "M16 17h.01",
];

const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  animate: (i: number) => ({
    opacity: [1, 0.3, 1],
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      times: [0, 0.5, 1],
    },
  }),
};

export const CalendarDays = animatedIcon("calendar-days", (controls) => (
  <>
    <path d="M8 2v3" />
    <path d="M16 2v3" />
    <rect height="18" rx="2" width="18" x="3" y="3" />
    <path d="M3 9h18" />
    {DAYS.map((day, index) => (
      <m.path
        animate={controls}
        custom={index}
        d={day}
        initial="normal"
        key={day}
        variants={VARIANTS}
      />
    ))}
  </>
));
