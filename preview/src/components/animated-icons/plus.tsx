import { animatedIcon, Glyph } from "./animated-icon";

export const Plus = animatedIcon("plus", (controls) => (
  <Glyph
    animate={controls}
    transition={{ type: "spring", stiffness: 100, damping: 15 }}
    variants={{
      normal: { rotate: 0 },
      animate: { rotate: 180 },
    }}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Glyph>
));
