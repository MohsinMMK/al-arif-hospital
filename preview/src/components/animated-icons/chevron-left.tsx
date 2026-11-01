import { m, type Transition } from "motion/react";
import { animatedIcon } from "./animated-icon";

const DEFAULT_TRANSITION: Transition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};

export const ChevronLeft = animatedIcon("chevron-left", (controls) => (
  <m.path
    animate={controls}
    d="m15 18-6-6 6-6"
    transition={DEFAULT_TRANSITION}
    variants={{
      normal: { x: 0 },
      animate: { x: [0, -2, 0] },
    }}
  />
));
