"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  totalPages: number;
  currentPage: number;
  paginate: (page: number) => void;
  getPageNumbers: () => (number | string)[];
}

export default function Pagination({ totalPages, currentPage, paginate, getPageNumbers }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md flex items-center ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && paginate(page)}
            disabled={page === "..."}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : page === "..."
                ? "bg-white text-gray-400 cursor-default"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md flex items-center ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
