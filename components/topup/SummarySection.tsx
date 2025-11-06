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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Data List Section (Compact + Scrollable) */}
      <div className="space-y-2 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {data.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-100 rounded-md px-2 py-2 hover:border-blue-300 transition"
          >
            <p className="text-sm text-gray-700 font-medium truncate">
              {type === "card" ? item.card : item.cscId}
            </p>
            <p className="text-sm text-green-700 font-semibold">
              ₹ {item.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 Total Section */}
      <div className="border-t pt-2 mt-3 text-right">
        <p className="text-sm text-gray-800 font-semibold">
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
