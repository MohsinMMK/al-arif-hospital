import { m, type Transition } from "motion/react";
import { animatedIcon } from "./animated-icon";

const DEFAULT_TRANSITION: Transition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};

export const ChevronDown = animatedIcon("chevron-down", (controls) => (
  <m.path
    animate={controls}
    d="m6 9 6 6 6-6"
    transition={DEFAULT_TRANSITION}
    variants={{
      normal: { y: 0 },
      animate: { y: [0, 2, 0] },
    }}
  />
));
