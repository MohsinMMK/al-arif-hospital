import type { LucideProps } from "lucide-react";
import { m, useAnimation, type Variants } from "motion/react";
import { forwardRef } from "react";
import { AnimatedSvg, Glyph } from "./animated-icon";

const HEART_DRAW_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
  draw: { pathLength: [0, 1], opacity: [0, 1] },
};

const HEART_PULSE_VARIANTS: Variants = {
  normal: { scale: 1 },
  pulse: { scale: [1, 1.08, 1] },
};

const LINE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: { pathLength: [0, 1], pathOffset: [1, 0], opacity: [0, 1] },
};

// The trace runs first, then the heart redraws and beats twice.
export const HeartPulse = forwardRef<SVGSVGElement, LucideProps>(
  (icon, ref) => {
    const heartDraw = useAnimation();
    const heartPulse = useAnimation();
    const line = useAnimation();
    return (
      <AnimatedSvg
        ref={ref}
        names="heart-pulse"
        icon={icon}
        play={async () => {
          heartDraw.start("hidden", { duration: 0 });
          await line.start("animate", {
            duration: 0.6,
            ease: "linear",
            opacity: { duration: 0.1 },
          });
          await heartDraw.start("draw", {
            duration: 0.5,
            ease: "easeOut",
            opacity: { duration: 0.1 },
          });
          heartPulse.start("pulse", {
            duration: 0.9,
            repeat: 1,
            ease: "easeInOut",
          });
        }}
        rest={() => {
          heartDraw.start("normal", { duration: 0.3 });
          heartPulse.start("normal", { duration: 0.3 });
          line.start("normal", { duration: 0.3 });
        }}
      >
        <Glyph animate={heartPulse} variants={HEART_PULSE_VARIANTS}>
          <m.path
            animate={heartDraw}
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
            variants={HEART_DRAW_VARIANTS}
          />
        </Glyph>
        <m.path
          animate={line}
          d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"
          variants={LINE_VARIANTS}
        />
      </AnimatedSvg>
    );
  },
);
HeartPulse.displayName = "HeartPulse";
