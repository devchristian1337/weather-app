import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading weather data...",
}) => {
  return (
    <div className="text-white text-center mt-8">
      <div
        className="animate-spin inline-block w-8 h-8 border-4 border-white 
                   border-t-transparent rounded-full mb-2"
        role="status"
        aria-label="Loading"
      />
      <p>{message}</p>
    </div>
  );
};
