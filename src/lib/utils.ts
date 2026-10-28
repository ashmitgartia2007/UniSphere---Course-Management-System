import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  if (!dateString) return "-";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getAttendanceColor(percentage: number): {
  badge: string;
  text: string;
  bg: string;
  border: string;
} {
  if (percentage >= 85) {
    return {
      badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500",
      border: "border-emerald-500",
    };
  } else if (percentage >= 75) {
    return {
      badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500",
      border: "border-blue-500",
    };
  } else if (percentage >= 65) {
    return {
      badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500",
      border: "border-amber-500",
    };
  } else {
    return {
      badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500",
      border: "border-rose-500",
    };
  }
}
