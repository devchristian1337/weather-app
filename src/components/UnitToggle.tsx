import React from "react";
import { Thermometer } from "lucide-react";
import { useWeatherStore } from "../store/weatherStore";

export const UnitToggle: React.FC = () => {
  const { unit, setUnit } = useWeatherStore();

  const handleUnitToggle = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleUnitToggle();
    }
  };

  return (
    <button
      onClick={handleUnitToggle}
      onKeyDown={handleKeyDown}
      className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 
               active:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl 
               text-white transition-all duration-200 focus:outline-none 
               focus:ring-2 focus:ring-white/50 h-[46px]"
      aria-label={`Switch temperature unit to ${
        unit === "C" ? "Fahrenheit" : "Celsius"
      }`}
      tabIndex={0}
      role="switch"
      aria-checked={unit === "C"}
    >
      <Thermometer className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span className="font-medium">°{unit === "C" ? "F" : "C"}</span>
    </button>
  );
};
