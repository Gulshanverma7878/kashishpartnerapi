"use client";
import React from "react";

interface StatusButtonProps {
  status: string;
  isPending: boolean;
  onToggle: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  status,
  isPending,
  onToggle,
}) => {
  const isActive = status === "ACTIVE";

  return (
    <button
      onClick={onToggle}
      disabled={isPending}
      className={`px-4 py-1.5 text-xs font-semibold rounded-xl shadow-sm border transition-all duration-200 
        ${
          isActive
            ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
            : "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
        }
        ${isPending ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {isPending ? "Updating..." : isActive ? "ACTIVE" : "INACTIVE"}
    </button>
  );
};

export default StatusButton;
