import React from "react";
import { Cloud, Droplets, Wind } from "lucide-react";
import { formatTemperature } from "../lib/utils";
import { useWeatherStore } from "../store/weatherStore";
import { motion, AnimatePresence } from "framer-motion";

export const WeatherCard: React.FC = () => {
  const { weatherData, unit } = useWeatherStore();

  if (!weatherData) return null;

  const { current, location } = weatherData;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-start mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-1">
              {location.name}
            </h2>
            <p className="text-white/90">{location.country}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-right"
          >
            <div className="text-4xl font-bold text-white">
              {formatTemperature(
                unit === "C" ? current.temp_c : current.temp_f,
                unit
              )}
            </div>
            <p className="text-white/90">{current.condition.text}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-white">
          {[
            { Icon: Wind, value: `${current.wind_kph} km/h`, label: "Wind Speed" },
            { Icon: Droplets, value: `${current.humidity}%`, label: "Humidity" },
            { Icon: Cloud, value: `${current.precip_mm} mm`, label: "Precipitation" },
          ].map(({ Icon, value, label }, index) => (
            <motion.div
              key={`${location.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center p-3 bg-white/20 rounded-xl"
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium mb-1">{label}</span>
              <span className="text-sm font-semibold">{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
