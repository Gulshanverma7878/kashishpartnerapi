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

const SummaryGrid: React.FC<SummaryGridProps> = ({
  cardData,
  cscData,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
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
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 md:p-5 mb-4">
      {/* 🔹 Date Range Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
        <h2 className="text-base font-semibold text-gray-800">Summary Report</h2>

        <div className="flex items-center gap-1.5">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="text-gray-600 text-xs">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* 🔹 Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SummarySection
          type="card"
          title="Card Summary"
          data={processedCardData}
        />
        <SummarySection
          type="csc"
          title="CSC Summary"
          data={processedCscData}
        />
      </div>
    </div>
  );
};

export default SummaryGrid;
