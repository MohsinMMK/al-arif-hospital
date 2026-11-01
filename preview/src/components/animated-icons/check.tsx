import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

export const Check = animatedIcon("check", (controls) => (
  <m.path
    animate={controls}
    d="M4 12 9 17L20 6"
    initial="normal"
    variants={PATH_VARIANTS}
  />
));
