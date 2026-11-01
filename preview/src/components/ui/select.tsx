import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "@/components/animated-icons";
import { InteractionMotion } from "@/multipage/interaction-context";
import { Select as SelectPrimitive } from "radix-ui";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-input bg-background px-3 py-3 text-left text-sm text-foreground outline-none data-placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&>span]:truncate",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="pointer-events-none size-4 shrink-0 text-[#254c3d] transition-transform duration-200 in-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// Floats in the site's frosted glass, the width of its trigger, above the header and contact dock.
function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const motion = React.useContext(InteractionMotion);
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-motion={motion ? "on" : "off"}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "relative z-60 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-hidden rounded-2xl border border-(--glass-edge) bg-(--frost-strong) text-foreground shadow-(--shadow-panel) [-webkit-backdrop-filter:var(--frost-filter)] [backdrop-filter:var(--frost-filter)]",
          position === "popper" && "w-(--radix-select-trigger-width)",
          "motion-safe:data-[motion=on]:data-[state=open]:animate-[select-in_180ms_cubic-bezier(0.2,0.8,0.2,1)]",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1.5">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center rounded-xl py-2.5 pr-9 pl-3 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-[state=checked]:font-semibold",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3 flex size-4 items-center justify-center">
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
