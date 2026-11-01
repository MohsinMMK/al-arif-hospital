import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const DURATION = 0.25;

// Each stroke draws once the one before it is done: the chest piece, the tube, then the headset.
const after = (step: number) => ({
  duration: DURATION,
  delay: step * DURATION + 0.1,
  opacity: { delay: step * DURATION + 0.1 },
});

const STROKE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    pathOffset: 0,
    opacity: 1,
    transition: { delay: 0 },
  },
  animate: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    opacity: [0, 1],
  },
};

const CHEST_PIECE_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
  },
};

const HEADSET = [
  "M11 2v2",
  "M5 2v2",
  "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
];

export const Stethoscope = animatedIcon("stethoscope", (controls) => (
  <>
    {HEADSET.map((d) => (
      <m.path
        animate={controls}
        d={d}
        key={d}
        transition={after(2)}
        variants={STROKE_VARIANTS}
      />
    ))}
    <m.path
      animate={controls}
      d="M8 15a6 6 0 0 0 12 0v-3"
      transition={after(1)}
      variants={STROKE_VARIANTS}
    />
    <m.circle
      animate={controls}
      cx="20"
      cy="10"
      r="2"
      transition={after(0)}
      variants={CHEST_PIECE_VARIANTS}
    />
  </>
));
