import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const INDIAN_RUPEE_MAIN_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
};

const INDIAN_RUPEE_SECONDARY_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.5,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.5 },
    },
  },
};

export const IndianRupee = animatedIcon("indian-rupee", (controls) => (
  <>
    <m.path
      animate={controls}
      d="M9 3c6.667 0 6.667 10 0 10"
      variants={INDIAN_RUPEE_MAIN_VARIANTS}
    />
    <m.path
      animate={controls}
      d="M9 13h-3"
      variants={INDIAN_RUPEE_MAIN_VARIANTS}
    />
    <m.path
      animate={controls}
      d="m14.5 21 l-8.5 -8"
      variants={INDIAN_RUPEE_MAIN_VARIANTS}
    />
    <m.path
      animate={controls}
      d="M18 3h-12"
      variants={INDIAN_RUPEE_SECONDARY_VARIANTS}
    />
    <m.path
      animate={controls}
      d="M18 8h-12"
      variants={INDIAN_RUPEE_SECONDARY_VARIANTS}
    />
  </>
));
