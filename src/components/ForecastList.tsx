import React from "react";
import { useWeatherStore } from "../store/weatherStore";
import { formatTemperature } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const ForecastList: React.FC = () => {
  const { weatherData, unit } = useWeatherStore();

  if (!weatherData) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={weatherData.location.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mt-6"
      >
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-white mb-4"
        >
          5-Day Forecast
        </motion.h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {weatherData.forecast.forecastday.map((day) => (
            <motion.div
              key={`${weatherData.location.name}-${day.date}`}
              variants={item}
              className="bg-white/15 backdrop-blur-md rounded-xl p-4 flex justify-between items-center
                       hover:bg-white/25 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <motion.img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-12 h-12"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <p className="text-white font-semibold">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <p className="text-white/90 text-sm">
                    {day.day.condition.text}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  {formatTemperature(
                    unit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f,
                    unit
                  )}
                </p>
                <p className="text-white/90 font-medium">
                  {formatTemperature(
                    unit === "C" ? day.day.mintemp_c : day.day.mintemp_f,
                    unit
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
