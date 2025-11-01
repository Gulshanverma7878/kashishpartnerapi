"use client";
import React, { useState, useMemo } from "react";
import SummarySection from "./SummarySection";

interface RawDataItem {
  card: string;
  csc_id: string;
  amount: string;
  status: string;
}

interface CardItem {
  card: string;
  amount: number;
}

interface CscItem {
  cscId: string;
  amount: number;
}

interface SummaryGridProps {
  cardData: RawDataItem[];
  cscData: RawDataItem[];
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const SummaryGrid: React.FC<SummaryGridProps> = ({ cardData, cscData,startDate,
  endDate,
  setStartDate,
  setEndDate, }) => {


  // ✅ Utility function: aggregate by key (card or csc_id)
  const aggregateByKey = (
    data: RawDataItem[],
    key: "card" | "csc_id"
  ): { [key: string]: number } => {
    return data
      .filter((item) => item.status === "SUCCESS")
      .reduce((acc, item) => {
        const k = item[key];
        const amt = parseFloat(item.amount) || 0;
        acc[k] = (acc[k] || 0) + amt;
        return acc;
      }, {} as { [key: string]: number });
  };

  // ✅ useMemo for optimized aggregation (only runs when data changes)
  const processedCardData: CardItem[] = useMemo(() => {
    const aggregated = aggregateByKey(cardData, "card");
    return Object.entries(aggregated).map(([card, amount]) => ({
      card,
      amount,
    }));
  }, [cardData]);

  const processedCscData: CscItem[] = useMemo(() => {
    const aggregated = aggregateByKey(cscData, "csc_id");
    return Object.entries(aggregated).map(([cscId, amount]) => ({
      cscId,
      amount,
    }));
  }, [cscData]);   

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 p-4 md:p-6 mb-6">
      {/* 🔹 Date Range Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">Summary Report</h2>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="text-gray-600 text-xs">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* 🔹 Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummarySection type="card" title="Card Summary" data={processedCardData} />
        <SummarySection type="csc" title="CSC Summary" data={processedCscData} />
      </div>
    </div>
  );
};

export default SummaryGrid;
