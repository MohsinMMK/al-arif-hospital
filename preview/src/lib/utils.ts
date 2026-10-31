import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Later Tailwind classes win over earlier ones, so a className can override a variant.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
