"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/store/store";

import useGetLedgerReports from "@/hooks/LedgerReport/useGetLedgerReport";
import TransactionTable from "@/components/LedgerReport/TransactionTable";
import SearchFilters from "@/components/LedgerReport/SearchFilters";
import Pagination from "@/components/LedgerReport/Pagination";

// import SearchFilters from "@/components/transactions/SearchFilters";
// import TransactionTable from "@/components/transactions/TransactionTable";
// import Pagination from "@/components/transactions/Pagination";

export default function TransactionsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate, data = {} as any } = useGetLedgerReports();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [findResponse, setFindResponse] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  useEffect(() => {
    if (user?.id) mutate(user.id);
  }, [user]);

  async function FindHandle() {
    if (!searchTerm) return setFindResponse(null);
    const res = await axios.get(
      `https://api.partner.kashishindiapvtltd.com/api/history/transaction_id/${searchTerm}?startDate=${fromDate}&endDate=${toDate}`
    );
    setFindResponse(res.data.data);
  }

  async function FindHandleNumber() {
    if (!searchMobile) return setFindResponse(null);
    const res = await axios.get(
      `https://api.partner.kashishindiapvtltd.com/api/history/mobile/${searchMobile}?startDate=${fromDate}&endDate=${toDate}`
    );
    setFindResponse(res.data.data);
  }

  const transactions =
    findResponse?.rows || data?.data?.data?.rows || [];

  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    let pages: (number | string)[] = [];
    let max = 5;

    if (totalPages <= max) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }

    return pages;
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">

        <SearchFilters
          fromDate={fromDate}
          toDate={toDate}
          searchTerm={searchTerm}
          searchMobile={searchMobile}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setSearchTerm={setSearchTerm}
          setSearchMobile={setSearchMobile}
          FindHandle={FindHandle}
          FindHandleNumber={FindHandleNumber}
        />

        <div className="p-4">
          <TransactionTable transactions={paginatedData} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            getPageNumbers={getPageNumbers}
          />
        </div>
      </div>
    </div>
  );
}
