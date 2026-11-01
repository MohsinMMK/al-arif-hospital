import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -10, 10, -10, 0] },
};

export const CircleHelp = animatedIcon(
  "circle-question-mark help-circle circle-help",
  (controls) => (
    <>
      <circle cx="12" cy="12" r="10" />
      <m.g
        animate={controls}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        variants={VARIANTS}
      >
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </m.g>
    </>
  ),
);
