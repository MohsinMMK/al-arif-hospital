import { m } from "motion/react";
import { animatedIcon } from "./animated-icon";

export const Eye = animatedIcon("eye", (controls) => (
  <>
    <m.path
      animate={controls}
      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      style={{ originY: "50%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      variants={{
        normal: { scaleY: 1, opacity: 1 },
        animate: { scaleY: [1, 0.1, 1], opacity: [1, 0.3, 1] },
      }}
    />
    <m.circle
      animate={controls}
      cx="12"
      cy="12"
      r="3"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      variants={{
        normal: { scale: 1, opacity: 1 },
        animate: { scale: [1, 0.3, 1], opacity: [1, 0.3, 1] },
      }}
    />
  </>
));
