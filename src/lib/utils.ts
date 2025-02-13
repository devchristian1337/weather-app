import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTemperature(temp: number, unit: "C" | "F"): string {
  return `${Math.round(temp)}°${unit}`;
}

export function getBackgroundClass(condition: string): string {
  const timeOfDay = new Date().getHours();
  const isNight = timeOfDay < 6 || timeOfDay > 18;

  const conditions: Record<string, string> = {
    Clear: isNight
      ? "bg-gradient-to-br from-blue-900 to-purple-900"
      : "bg-gradient-to-br from-blue-400 to-blue-200",
    Sunny: "bg-gradient-to-br from-yellow-400 to-orange-300",
    "Partly cloudy": "bg-gradient-to-br from-blue-300 to-gray-200",
    Cloudy: "bg-gradient-to-br from-gray-400 to-gray-300",
    Overcast: "bg-gradient-to-br from-gray-600 to-gray-400",
    Rain: "bg-gradient-to-br from-blue-700 to-gray-600",
    Snow: "bg-gradient-to-br from-blue-100 to-gray-100",
  };

  return conditions[condition] || conditions["Clear"];
}
