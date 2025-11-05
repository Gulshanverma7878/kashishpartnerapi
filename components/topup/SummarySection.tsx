"use client";
import React from "react";

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
  // ✅ Calculate total amount
  const totalAmount = data.reduce((sum, item: any) => sum + (item.amount || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Data List Section with fixed height & scroll */}
      <div className="grid gap-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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

      {/* 🔹 Total Section */}
      <div className="border-t pt-3 text-right mt-4">
        <p className="text-gray-800 font-semibold">
          Total:{" "}
          <span className="text-green-700">
            ₹ {totalAmount.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SummarySection;
