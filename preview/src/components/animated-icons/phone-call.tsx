import type { LucideProps } from "lucide-react";
import { m, useAnimation, type Variants } from "motion/react";
import { forwardRef } from "react";
import { AnimatedSvg, Glyph } from "./animated-icon";

const PHONE_CALL_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    rotate: [10, 20, -10, 10, 0],
    scale: [1, 1.1, 1.2, 1.1, 1],
    transition: {
      duration: 0.9,
      ease: "easeInOut",
    },
  },
};

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

// The handset rings while its two waves blink out and back in, the outer one last.
export const PhoneCall = forwardRef<SVGSVGElement, LucideProps>(
  (icon, ref) => {
    const phone = useAnimation();
    const waves = useAnimation();
    return (
      <AnimatedSvg
        ref={ref}
        names="phone-call"
        icon={icon}
        play={() => {
          phone.start("animate");
          waves.start("fadeOut").then(() => waves.start("fadeIn"));
        }}
        rest={() => {
          phone.start("normal");
          waves.start("normal");
        }}
      >
        <Glyph animate={phone} initial="normal" variants={PHONE_CALL_VARIANTS}>
          <m.path
            animate={waves}
            custom={2}
            d="M13 2a9 9 0 0 1 9 9"
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <m.path
            animate={waves}
            custom={1}
            d="M13 6a5 5 0 0 1 5 5"
            initial={{ opacity: 1 }}
            variants={PATH_VARIANTS}
          />
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </Glyph>
      </AnimatedSvg>
    );
  },
);
PhoneCall.displayName = "PhoneCall";
