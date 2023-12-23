import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* used in component.json for shadcn  */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
