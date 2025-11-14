"use client";
import React from "react";
import { FiCalendar, FiFolder } from "react-icons/fi";

interface Props {
  fromDate: string;
  toDate: string;
  searchTerm: string;
  searchMobile: string;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
  setSearchTerm: (value: string) => void;
  setSearchMobile: (value: string) => void;
  FindHandle: () => void;
  FindHandleNumber: () => void;
}

export default function SearchFilters({
  fromDate,
  toDate,
  searchTerm,
  searchMobile,
  setFromDate,
  setToDate,
  setSearchTerm,
  setSearchMobile,
  FindHandle,
  FindHandleNumber
}: Props) {
  return (
    <div className="p-4 border-b">

      {/* Dates */}
      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-12 sm:col-span-6 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-md w-full"
            />
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex mt-4 gap-6">

        <div>
          <input
            type="text"
            placeholder="Search With Transaction Id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-3 border rounded-md w-64"
          />
          <button onClick={FindHandle} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
            <FiFolder className="mr-2 inline" /> Find
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search With Recharge Number"
            value={searchMobile}
            onChange={(e) => setSearchMobile(e.target.value)}
            className="py-2 px-3 border rounded-md w-64"
          />
          <button onClick={FindHandleNumber} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
            <FiFolder className="mr-2 inline" /> Find
          </button>
        </div>

      </div>
    </div>
  );
}
