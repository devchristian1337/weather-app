import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { WeatherData, LocationSuggestion } from "../types/weather";

interface WeatherStore {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  unit: "C" | "F";
  recentSearches: string[];
  suggestions: LocationSuggestion[];
  setUnit: (unit: "C" | "F") => void;
  fetchWeather: (location: string, displayName?: string) => Promise<void>;
  fetchSuggestions: (query: string) => Promise<void>;
  addRecentSearch: (location: string) => void;
  clearRecentSearches: () => void;
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

if (!API_KEY) {
  throw new Error("Weather API key is not defined in environment variables");
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      weatherData: null,
      isLoading: false,
      error: null,
      unit: "C",
      recentSearches: [],
      suggestions: [],
      setUnit: (unit) => set({ unit }),
      fetchWeather: async (location, displayName?) => {
        try {
          set({ isLoading: true, error: null });
          const response = await axios.get(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes`
          );
          set({ weatherData: response.data, isLoading: false });
          get().addRecentSearch(displayName || location);
        } catch {
          set({
            error: "Failed to fetch weather data. Please try again.",
            isLoading: false,
          });
        }
      },
      fetchSuggestions: async (query) => {
        if (query.length < 2) {
          set({ suggestions: [] });
          return;
        }
        try {
          const response = await axios.get(
            `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
          );
          set({ suggestions: response.data });
        } catch {
          set({ suggestions: [] });
        }
      },
      addRecentSearch: (location) => {
        set((state) => ({
          recentSearches: [
            location,
            ...state.recentSearches.filter((l) => l !== location),
          ].slice(0, 5),
        }));
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "weather-store",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        unit: state.unit,
      }),
    }
  )
);
