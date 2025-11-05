"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
// import { usePaycards } from "@/hooks/usePaycards";
import SummaryGrid from "@/components/topup/SummaryGrid";
import PaycardTableContent from "@/components/topup/PaycardTableContent";
import Pagination from "@/components/topup/Pagination";
import { usePaycards } from "@/hooks/Topup/useGetTopup";

export default function PaycardTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemsPerPage = 10;
  

  // ✅ Custom Hook
  const { data = [], isLoading, isError, error } = usePaycards();

  // 🔹 Filter and Sort
  const filteredData = data
    .filter((item) => {
      if (!startDate || !endDate) return true;
      const createdDate = new Date(item.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return createdDate >= start && createdDate <= new Date(end.setHours(23, 59, 59, 999));
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // 🔹 Helper functions
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "suspended":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(
      parseFloat(amount)
    );

  // 🔹 UI
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paycards</h1>
          <p className="text-gray-600">Manage and view all paycard transactions</p>
        </div>

        <SummaryGrid
          cardData={filteredData}
          cscData={filteredData}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
          </div>
        ) : isError ? (
          <p className="text-center text-red-600 py-4">❌ Error: {error.message}</p>
        ) : (
          <PaycardTableContent
            data={paginatedData}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            getStatusColor={getStatusColor}
          />
        )}

        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
