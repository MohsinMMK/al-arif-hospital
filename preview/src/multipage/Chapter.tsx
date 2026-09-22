import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Chapter({
  children,
  path,
  motionEnabled,
}: {
  children: React.ReactNode;
  path: string;
  motionEnabled: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const main = root.current;
      if (!main) return;
      if (motionEnabled)
        gsap.fromTo(
          main,
          { x: 10, opacity: 0.72 },
          {
            x: 0,
            opacity: 1,
            duration: 0.48,
            ease: "sine.inOut",
            clearProps: "transform,opacity",
          },
        );
    },
    { scope: root, dependencies: [path, motionEnabled], revertOnUpdate: true },
  );
  return (
    <div ref={root} className="mp-chapter">
      {children}
    </div>
  );
}
