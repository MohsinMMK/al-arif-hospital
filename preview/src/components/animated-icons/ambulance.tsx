import { m, type Variants } from "motion/react";
import { animatedIcon } from "./animated-icon";

const BODY_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
};

const SPEED_LINE_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    x: 0,
    scaleX: 0,
  },
  animate: (custom: number) => ({
    opacity: [0, 0.7, 0.5, 0],
    x: [0, -4, -10, -16],
    scaleX: [0.2, 1, 0.8, 0.3],
    transition: {
      duration: 0.5,
      ease: "easeOut",
      repeat: Number.POSITIVE_INFINITY,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1],
    },
  }),
};

const CROSS_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

export const Ambulance = animatedIcon("ambulance", (controls) => (
  <>
    {[
      { y: 8, width: 5, x: 0 },
      { y: 11, width: 7, x: -1 },
      { y: 14, width: 4, x: 0 },
    ].map((line, i) => (
      <m.line
        animate={controls}
        custom={i}
        initial="normal"
        key={`speed-${i}`}
        strokeLinecap="round"
        strokeWidth="2"
        variants={SPEED_LINE_VARIANTS}
        x1={line.x}
        x2={line.x + line.width}
        y1={line.y}
        y2={line.y}
      />
    ))}

    <m.g
      animate={controls}
      initial="normal"
      variants={BODY_VARIANTS}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
      <path d="M9 18h6" />

      <m.g
        animate={controls}
        initial="normal"
        variants={CROSS_VARIANTS}
      >
        <path d="M10 10H6" />
        <path d="M8 8v4" />
      </m.g>
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </m.g>
  </>
));
