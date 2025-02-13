import React from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="bg-red-500/30 backdrop-blur-md text-white font-medium p-4 rounded-xl mt-8"
      role="alert"
    >
      {message}
    </div>
  );
};
