import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

export const X = animatedIcon("x", (controls) => (
  <>
    <m.path
      animate={controls}
      d="M18 6 6 18"
      variants={PATH_VARIANTS}
    />
    <m.path
      animate={controls}
      d="m6 6 12 12"
      transition={{ delay: 0.2 }}
      variants={PATH_VARIANTS}
    />
  </>
));
