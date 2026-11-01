import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const PATH_VARIANTS: Variants = {
  normal: { d: "m19 12-7 7-7-7", translateY: 0 },
  animate: {
    d: "m19 12-7 7-7-7",
    translateY: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const SECOND_PATH_VARIANTS: Variants = {
  normal: { d: "M12 5v14" },
  animate: {
    d: ["M12 5v14", "M12 5v9", "M12 5v14"],
    transition: {
      duration: 0.4,
    },
  },
};

export const ArrowDown = animatedIcon("arrow-down", (controls) => (
  <>
    <m.path
      animate={controls}
      d="m19 12-7 7-7-7"
      variants={PATH_VARIANTS}
    />
    <m.path
      animate={controls}
      d="M12 5v14"
      variants={SECOND_PATH_VARIANTS}
    />
  </>
));
