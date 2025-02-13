import React, { useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastList } from "./components/ForecastList";
import { UnitToggle } from "./components/UnitToggle";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { useWeatherStore } from "./store/weatherStore";
import { getBackgroundClass } from "./lib/utils";
import { Github } from "lucide-react";

const App: React.FC = () => {
  const { weatherData, fetchWeather, isLoading, error } = useWeatherStore();

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );

          await fetchWeather(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        } else {
          await fetchWeather("London");
        }
      } catch {
        await fetchWeather("London");
      }
    };

    getUserLocation();
  }, [fetchWeather]);

  const backgroundClass = weatherData
    ? getBackgroundClass(weatherData.current.condition.text)
    : "bg-gradient-to-br from-blue-400 to-blue-600";

  return (
    <div
      className={`min-h-screen select-none ${backgroundClass} transition-colors duration-500 overflow-y-auto scrollbar-thin flex flex-col`}
      role="main"
    >
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <SearchBar />
              </div>
              <UnitToggle />
            </div>
          </div>

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {weatherData && (
            <div className="mt-8 w-full max-w-4xl flex flex-col items-center">
              <WeatherCard />
              <ForecastList />
            </div>
          )}
        </div>
      </div>

      <footer className="w-full py-4 text-white/90 mt-8">
        <div className="flex items-center justify-center gap-2">
          <span>Made by devchristian1337</span>
          <a
            href="https://github.com/devchristian1337/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors transform hover:rotate-12 transition-all duration-300 ease-in-out"
            aria-label="Visit my GitHub profile"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
