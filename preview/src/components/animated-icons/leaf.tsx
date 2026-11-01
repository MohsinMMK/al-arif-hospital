import type { Variants } from "motion/react";
import { animatedIcon, Glyph } from "./animated-icon";

const LEAF_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    x: 0,
  },
  animate: {
    rotate: [0, -8, 4, -3, 0],
    y: [0, -4, -2, -1, 0],
    x: [0, 2, -2, 1, 0],
    transition: {
      duration: 1.6,
      ease: "easeInOut",
    },
  },
};

export const Leaf = animatedIcon("leaf", (controls) => (
  <Glyph animate={controls} initial="normal" variants={LEAF_VARIANTS}>
    <path d="M11 20a10 10 0 0 0 10-10 25.9 25.9 0 0 0-1.04-7.281 1 1 0 0 0-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0 0 11 20" />
    <path d="M2 21a5 5 0 0 1 2.911-4.544C7.613 15.212 8.351 15.24 11 13" />
  </Glyph>
));
