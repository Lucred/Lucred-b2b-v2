import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberWithCommas = (x: string | number | null): string => {
  if (x == null) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
