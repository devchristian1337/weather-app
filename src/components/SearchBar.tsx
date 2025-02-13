import React, { useState, useEffect, useRef } from "react";
import { Search, Clock, MapPin } from "lucide-react";
import { useWeatherStore } from "../store/weatherStore";
import type { LocationSuggestion } from "../types/weather";
import { motion, AnimatePresence } from "framer-motion";

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    fetchWeather,
    fetchSuggestions,
    suggestions,
    recentSearches,
    clearRecentSearches,
  } = useWeatherStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query) {
        fetchSuggestions(query);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, fetchSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
      setQuery("");
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const displayName = `${suggestion.name}${
      suggestion.region ? `, ${suggestion.region}` : ""
    }, ${suggestion.country}`;
    fetchWeather(`${suggestion.lat},${suggestion.lon}`, displayName);
    setQuery("");
    setIsOpen(false);
  };

  const handleRecentSearchClick = (location: string) => {
    fetchWeather(location);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="w-full relative z-10">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search location..."
            className="w-full px-4 py-3 pl-12 bg-white/15 backdrop-blur-md rounded-xl 
                     text-white placeholder-white/70 outline-none focus:ring-2 
                     focus:ring-white/40 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 h-5 w-5" />
        </div>
      </form>

      <AnimatePresence>
        {isOpen &&
          ((query && suggestions.length > 0) || recentSearches.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full mt-2 bg-white/15 backdrop-blur-md rounded-xl 
                      overflow-hidden shadow-lg border border-white/30"
            >
              {query && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-2"
                >
                  <div className="flex items-center px-3 py-2">
                    <MapPin className="h-4 w-4 text-white/90 mr-2" />
                    <span className="text-white/90 text-sm font-medium">Suggestions</span>
                  </div>
                  {suggestions.map((suggestion) => (
                    <motion.button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg transition-colors"
                    >
                      <p className="text-white font-semibold">
                        {suggestion.name}
                      </p>
                      <p className="text-white/85 text-sm">
                        {suggestion.region && `${suggestion.region}, `}
                        {suggestion.country}
                      </p>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-2 border-t border-white/30"
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-white/90 mr-2" />
                      <span className="text-white/90 text-sm font-medium">
                        Recent Searches
                      </span>
                    </div>
                    <motion.button
                      onClick={clearRecentSearches}
                      whileHover={{ color: "rgba(255, 255, 255, 1)" }}
                      className="text-white/85 text-sm font-medium transition-colors hover:text-white"
                    >
                      Clear
                    </motion.button>
                  </div>
                  {recentSearches.map((location, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleRecentSearchClick(location)}
                      whileHover={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                      className="w-full text-left px-3 py-2 text-white font-medium rounded-lg 
                             transition-colors flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-2 text-white/90" />
                      {location}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};
