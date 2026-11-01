import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const ARROW_VARIANTS: Variants = {
  normal: {
    scale: 1,
    translateX: 0,
    translateY: 0,
  },
  animate: {
    scale: [1, 0.85, 1],
    translateX: [0, -4, 0],
    translateY: [0, 4, 0],
    originX: 1,
    originY: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const ArrowUpRight = animatedIcon("arrow-up-right", (controls) => (
  <m.g animate={controls} variants={ARROW_VARIANTS}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </m.g>
));
