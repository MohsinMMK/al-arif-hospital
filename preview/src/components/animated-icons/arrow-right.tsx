import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const PATH_VARIANTS: Variants = {
  normal: { d: "M5 12h14" },
  animate: {
    d: ["M5 12h14", "M5 12h9", "M5 12h14"],
    transition: {
      duration: 0.4,
    },
  },
};

const SECONDARY_PATH_VARIANTS: Variants = {
  normal: { d: "m12 5 7 7-7 7", translateX: 0 },
  animate: {
    d: "m12 5 7 7-7 7",
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

export const ArrowRight = animatedIcon("arrow-right", (controls) => (
  <>
    <m.path
      animate={controls}
      d="M5 12h14"
      variants={PATH_VARIANTS}
    />
    <m.path
      animate={controls}
      d="m12 5 7 7-7 7"
      variants={SECONDARY_PATH_VARIANTS}
    />
  </>
));
