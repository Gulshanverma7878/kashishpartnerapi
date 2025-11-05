"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import SummarySection from "@/components/topup/SummarySection";
import SummaryGrid from "@/components/topup/SummaryGrid";
import PaycardTableContent from "@/components/topup/PaycardTableContent";
import Pagination from "@/components/topup/Pagination";

export default function PaycardTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.partner.kashishindiapvtltd.com/paycardlist"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        if (result.success && result.cards) {
          setData(result.cards);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  }, [startDate, endDate]);

  const filteredData = data.filter((item) => {
    if (!startDate || !endDate) return true; // no filter if not selected

    const createdDate = new Date(item.createdAt);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 🔹 Include both start and end dates
    return (
      createdDate >= start &&
      createdDate <= new Date(end.setHours(23, 59, 59, 999))
    );
  })
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log(filteredData);

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(parseFloat(amount));
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paycards</h1>
          <p className="text-gray-600">
            Manage and view all paycard transactions
          </p>
        </div>

        <SummaryGrid
          cardData={filteredData}
          cscData={filteredData}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        {/* // Inside your return statement where table is shown: */}
        <PaycardTableContent
          data={paginatedData}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          getStatusColor={getStatusColor}
        />

        {!loading && !error && totalPages > 1 && (
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
