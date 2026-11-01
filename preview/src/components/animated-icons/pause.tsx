import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const BASE_RECT_VARIANTS: Variants = {
  normal: {
    y: 0,
  },
};

const BASE_RECT_TRANSITION = {
  transition: {
    times: [0, 0.2, 0.5, 1],
    duration: 0.5,
    stiffness: 260,
    damping: 20,
  },
};

const LEFT_RECT_VARIANTS: Variants = {
  ...BASE_RECT_VARIANTS,
  animate: {
    y: [0, 2, 0, 0],
    ...BASE_RECT_TRANSITION,
  },
};

const RIGHT_RECT_VARIANTS: Variants = {
  ...BASE_RECT_VARIANTS,
  animate: {
    y: [0, 0, 2, 0],
    ...BASE_RECT_TRANSITION,
  },
};

export const Pause = animatedIcon("pause", (controls) => (
  <>
    <m.rect
      animate={controls}
      height="18"
      rx="1"
      variants={LEFT_RECT_VARIANTS}
      width="5"
      x="5"
      y="3"
    />
    <m.rect
      animate={controls}
      height="18"
      rx="1"
      variants={RIGHT_RECT_VARIANTS}
      width="5"
      x="14"
      y="3"
    />
  </>
));
