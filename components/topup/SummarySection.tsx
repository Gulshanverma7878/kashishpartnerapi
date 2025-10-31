"use client";
import React, { useState } from "react";

interface CardItem {
  card: string;
  amount: number;
}

interface CscItem {
  cscId: string;
  amount: number;
}

interface SummarySectionProps {
  type: "card" | "csc";
  title: string;
  data: CardItem[] | CscItem[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ type, title, data }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {/* Date Range Filter (Smaller Inputs) */}
        <div className="flex items-center gap-1.5">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="text-gray-600 text-xs">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Data List Section */}
      <div className="grid gap-3">
        {data.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-gray-200 hover:border-blue-400 transition-colors duration-200 p-3 shadow-sm"
          >
            <p className="text-gray-700 font-medium">
              {type === "card" ? item.card : item.cscId}
            </p>
            <p className="text-green-700 font-semibold">
              ₹ {item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;
