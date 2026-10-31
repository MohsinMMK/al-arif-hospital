import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const arrows = { "up-right": ArrowUpRight, right: ArrowRight, left: ArrowLeft };

interface ArrowButtonProps extends Omit<React.ComponentProps<typeof Button>, "variant" | "size"> {
  /** solid: green, turning pale on hover. soft: pale, turning green. */
  tone?: "solid" | "soft";
  size?: "default" | "sm";
  /** "left" puts the circle first and slides the arrows backwards. */
  direction?: keyof typeof arrows;
}

/**
 * A label pill beside a circle whose arrow slides out as a twin slides in, while both swap colours.
 * Pass a link as `render` to make it navigate.
 */
function ArrowButton({
  children,
  className,
  tone = "solid",
  size = "default",
  direction = "up-right",
  ...props
}: ArrowButtonProps) {
  const Arrow = arrows[direction];
  const back = direction === "left";
  // The inset ring keeps the pale state visible on the site's pale-green panels.
  const face = cn(
    "inset-ring inset-ring-primary transition-colors duration-500 ease-in-out",
    tone === "solid"
      ? "bg-primary text-primary-foreground group-hover:bg-secondary group-hover:text-primary"
      : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  );
  const slide = "absolute inset-0 m-auto size-5 opacity-100 transition-[translate] duration-500 ease-in-out";
  const circle = (
    <span
      aria-hidden="true"
      data-arrow-circle=""
      className={cn(face, "relative shrink-0 overflow-hidden rounded-full", size === "sm" ? "size-10" : "size-[46px]")}
    >
      <Arrow className={cn(slide, back ? "group-hover:-translate-x-10" : "group-hover:translate-x-10")} />
      <Arrow className={cn(slide, back ? "translate-x-10" : "-translate-x-10", "group-hover:translate-x-0")} />
    </span>
  );
  return (
    <Button
      data-arrow=""
      variant="link"
      className={cn(
        "group h-auto gap-0 rounded-full border-0 p-0 font-semibold text-sm text-primary sm:h-auto sm:text-sm [&_svg]:mx-auto [:hover,[data-pressed]]:no-underline",
        className,
      )}
      {...props}
    >
      {back && circle}
      <span
        data-arrow-label=""
        className={cn(face, "inline-flex items-center justify-center rounded-full", size === "sm" ? "min-h-10 px-4" : "min-h-[46px] px-6")}
      >
        {children}
      </span>
      {!back && circle}
    </Button>
  );
}

export { ArrowButton };
