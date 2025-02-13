import React from "react";
import { useNavigate } from "react-router-dom";
import { CloudOff, ArrowLeft } from "lucide-react";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8">
        <div className="flex flex-col items-center gap-4">
          <CloudOff className="w-20 h-20 text-white animate-pulse" />
          <h1 className="text-4xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white/90">
            Page Not Found
          </h2>
          <p className="text-white/80">
            Oops! The page you're looking for seems to have drifted away like a
            cloud.
          </p>
        </div>

        <button
          onClick={handleBack}
          onKeyDown={handleKeyDown}
          className="group flex items-center gap-2 mx-auto bg-white/10 hover:bg-white/20 
                   active:bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl 
                   text-white transition-all duration-200 focus:outline-none 
                   focus:ring-2 focus:ring-white/50"
          aria-label="Go back to home page"
          tabIndex={0}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>
    </div>
  );
};
