import { m, type Variants } from "motion/react";
import { animatedIcon, Glyph } from "./animated-icon";

const CAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    y: [0, -2, 0],
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const TASSEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 15, -10, 5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

export const GraduationCap = animatedIcon("graduation-cap", (controls) => (
  <Glyph animate={controls} variants={CAP_VARIANTS}>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    <m.path
      d="M22 10v6"
      style={{
        transformBox: "fill-box",
        transformOrigin: "top center",
      }}
      variants={TASSEL_VARIANTS}
    />
  </Glyph>
));
