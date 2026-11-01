// Shared frame for the icons adapted from lucide-animated (MIT, https://lucide-animated.com).
// License retained in ./LICENSE.md. Adaptations: each icon draws through lucide-react's own Icon,
// so it renders the same single <svg> as its static twin and takes the same props; it plays when
// the link or button around it is hovered or keyboard-focused rather than only the glyph itself;
// and it stays still when the site's motion switch or the reduced-motion setting is on.
import { Icon, type LucideIcon, type LucideProps } from "lucide-react";
import { m, useAnimation, type LegacyAnimationControls } from "motion/react";
import {
  forwardRef,
  useContext,
  useEffect,
  useEffectEvent,
  useImperativeHandle,
  useRef,
  type ComponentProps,
  type ReactNode,
  type Ref,
} from "react";
import { InteractionMotion } from "@/multipage/interaction-context";

// Hovering or focusing any of these plays the icons inside it; elsewhere the glyph itself is the target.
const TRIGGER = "a, button, summary, label";

type AnimatedSvgProps = {
  // lucide's name for the glyph, then any aliases, for the lucide-<name> classes the static icon carries
  names: string;
  // the props the page passed
  icon: LucideProps;
  play: () => void;
  rest: () => void;
  children: ReactNode;
  ref?: Ref<SVGSVGElement>;
};

export function AnimatedSvg({
  names,
  icon,
  play,
  rest,
  children,
  ref,
}: AnimatedSvgProps) {
  const svg = useRef<SVGSVGElement>(null);
  useImperativeHandle(ref, () => svg.current!);
  const enabled = useContext(InteractionMotion);
  const onPlay = useEffectEvent(() => enabled && play());
  const onRest = useEffectEvent(rest);
  useEffect(() => {
    const glyph = svg.current;
    const target = glyph?.closest(TRIGGER) ?? glyph;
    if (!target) return;
    const enter = () => onPlay();
    const leave = () => onRest();
    // a mouse click also focuses a button; only keyboard focus should replay the icon
    const focus = (event: Event) =>
      (event.target as Element).matches(":focus-visible") && onPlay();
    target.addEventListener("mouseenter", enter);
    target.addEventListener("mouseleave", leave);
    target.addEventListener("focusin", focus);
    target.addEventListener("focusout", leave);
    return () => {
      target.removeEventListener("mouseenter", enter);
      target.removeEventListener("mouseleave", leave);
      target.removeEventListener("focusin", focus);
      target.removeEventListener("focusout", leave);
    };
  }, []);
  const [name, ...aliases] = names.split(" ");
  // lucide leaves its hidden flag off any icon drawn from children, so it is set here as on the static icons
  const labelled = Object.keys(icon).some(
    (prop) => prop.startsWith("aria-") || prop === "role" || prop === "title",
  );
  return (
    <Icon
      ref={svg}
      icon={{ name, aliases, node: [] }}
      aria-hidden={labelled ? undefined : "true"}
      // moves may carry the glyph past its box, as they did when upstream moved the <svg> itself
      overflow="visible"
      {...icon}
    >
      {children}
    </Icon>
  );
}

// A moving group whose pivot reads against the 24-unit icon box rather than its own bounds, so the
// percentage and pixel origins upstream wrote for its <svg> or its grid land where it meant them.
export function Glyph({ style, ...props }: ComponentProps<typeof m.g>) {
  return <m.g style={{ transformBox: "view-box", ...style }} {...props} />;
}

// Most icons move one set of controls from their "normal" variant to "animate" and back.
export function animatedIcon(
  names: string,
  draw: (controls: LegacyAnimationControls) => ReactNode,
): LucideIcon {
  const Animated = forwardRef<SVGSVGElement, LucideProps>((icon, ref) => {
    const controls = useAnimation();
    return (
      <AnimatedSvg
        ref={ref}
        names={names}
        icon={icon}
        play={() => controls.start("animate")}
        rest={() => controls.start("normal")}
      >
        {draw(controls)}
      </AnimatedSvg>
    );
  });
  // the static icon's display name, from the first lucide name: "link-2" -> "Link2"
  Animated.displayName = names
    .split(" ")[0]
    .replace(/(?:^|-)(\w)/g, (_, c: string) => c.toUpperCase());
  return Animated;
}
