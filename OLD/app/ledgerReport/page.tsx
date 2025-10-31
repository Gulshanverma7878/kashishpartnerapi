'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useGetLedgerReports from '@/hooks/LedgerReport/useGetLedgerReport';
import {
  FiCalendar,
  FiFolder,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import axios from 'axios';

interface Transaction {
  id: string;
  transaction_id: string;
  account?: string;
  service: string;
  referenceNo?: string;
  txn_amount: number;
  operatorCircle?: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

interface LedgerReportResponse {
  data?: {
    count: number;
    rows: Transaction[];
  };
  message?: string;
  success?: boolean;
}

const TransactionsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate, data = {} as LedgerReportResponse, error, isPending } = useGetLedgerReports();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [findResponse, setFindResponse] = useState<any>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  useEffect(() => {
    console.log(user?.id)
    if (user?.id) mutate(user?.id);
  }, [user, mutate]);

  async function FindHandle() {
    if (!searchTerm) {
      setFindResponse(null);
      setCurrentPage(1);
    } else {
      const data = await axios.get(`https://api.partner.kashishindiapvtltd.com/api/history/transaction_id/${searchTerm}?startDate=${fromDate}&endDate=${toDate}`)
      console.log("api filter ", data?.data?.data);
      setFindResponse(data?.data?.data);
      setCurrentPage(1);
    }
  }

  async function FindHandleNumber() {
    if (!searchMobile) {
      setFindResponse(null);
      setCurrentPage(1);
    } else {
      const data = await axios.get(`https://api.partner.kashishindiapvtltd.com/api/history/mobile/${searchMobile}?startDate=${fromDate}&endDate=${toDate}`)
      console.log("api filter ", data?.data?.data);
      setFindResponse(data?.data?.data);
      setCurrentPage(1);
    }
  }

  // Get current transactions for pagination
  const getCurrentTransactions = () => {
    if (findResponse?.rows) {
      return findResponse.rows;
    }
    const transactions = data?.data?.data?.rows || [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return transactions.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Calculate total pages
  const totalItems = findResponse?.rows ? findResponse.rows.length : (data?.data?.data?.rows?.length || 0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const currentTransactions = getCurrentTransactions();

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* From Date */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>

            {/* To Date */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-sm"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            {/* Export Button */}
            <div className="col-span-12 sm:col-span-3 md:col-span-3 md:col-start-10 flex justify-end">
              <button className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
                <FiDownload className="mr-2" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Search filters */}
        <div className='flex mt-2 p-4'>
          <div className="flex justify-end mb-4 gap-4 mr-4">
            <input
              type="text"
              placeholder="Search With Transaction Id"
              className="py-2 px-3 border border-gray-300 rounded-md text-sm w-64 placeholder-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="col-span-6 ml-4 sm:col-span-3 md:col-span-2">
              <button
                onClick={() => { FindHandle() }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 flex items-center justify-center"
              >
                <FiFolder className="mr-2" /> Find
              </button>
            </div>
          </div>
          
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search With Recharge Number"
              className="py-2 px-3 border border-gray-300 rounded-md text-sm w-64 placeholder-gray-600"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
            />
            <div className="col-span-6 ml-4 sm:col-span-3 md:col-span-2">
              <button
                onClick={() => { FindHandleNumber() }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 flex items-center justify-center"
              >
                <FiFolder className="mr-2" /> Find
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          {/* Items per page selector */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div className="text-sm text-gray-700">
              Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
            </div>
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sr. No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recharge Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operation Circle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((txn: any,index:any) => (
                    <tr key={txn.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>

                      <td className="px-6 py-4 text-sm text-gray-900">{txn.transaction_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(txn.createdAt).toLocaleDateString('en-GB')}{' '}
                        {new Date(txn.createdAt).toLocaleTimeString('en-GB')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{txn.service}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">₹{txn.txn_amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{txn.mobile}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{txn.operatorCircle || '-'}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            txn.status === 'SUCCESS'
                              ? 'bg-green-100 text-green-800'
                              : txn.status === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-sm py-6 text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-1">
                {/* Previous Button */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded-md flex items-center ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && paginate(page)}
                    disabled={page === '...'}
                    className={`px-3 py-1 border rounded-md ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : page === '...'
                        ? 'bg-white text-gray-400 cursor-default'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded-md flex items-center ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;