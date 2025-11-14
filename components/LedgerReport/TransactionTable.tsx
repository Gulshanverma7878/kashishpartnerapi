"use client";
import React from "react";

interface Props {
  transactions: any[];
}

export default function TransactionTable({ transactions }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-300 shadow-lg rounded-2xl bg-white">
      <div className="max-h-[750px] overflow-y-auto rounded-2xl">
        <table className="min-w-full border-collapse text-sm">
          {/* 🔹 Sticky Gradient Header */}
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white sticky top-0 z-10 shadow-md">
            <tr>
              {[
                "Sr.",
                "Date & Time",
                "Type",
                "Remark",
                "OrderId",
                "Amount",
                "Transaction ID",
                "Service",
                "Recharge Number",
                "Operation Circle",
                "Status",
              ].map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 border border-blue-400 font-semibold text-sm text-center min-w-[150px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* 🔹 Table Body */}
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <tr
                  key={txn.id}
                  className={`transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-blue-50"
                  } hover:bg-blue-100`}
                >
                  <td className="px-4 py-2 border text-center font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-4 py-2 border text-center text-gray-700">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(txn.createdAt))}
                    {", "}
                    {new Intl.DateTimeFormat("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(txn.createdAt))}
                  </td>
                  <td className="px-4 py-2 border text-center text-gray-700">
                    null
                  </td>

                  <td className="px-4 py-2 border text-center text-gray-700">
                    null
                  </td>

                  <td className="px-4 py-2 border text-center text-gray-700">
                    null
                  </td>

                  <td className="px-4 py-2 border text-center text-green-700 font-semibold">
                    ₹{txn.txn_amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border text-center text-gray-800 font-medium">
                    {txn.transaction_id}
                  </td>

                  <td className="px-4 py-2 border text-center text-gray-700">
                    {txn.service}
                  </td>

                  <td className="px-4 py-2 border text-center text-gray-700">
                    {txn.mobile}
                  </td>

                  <td className="px-4 py-2 border text-center text-gray-700">
                    {txn.operatorCircle || "-"}
                  </td>

                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        txn.status === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : txn.status === "FAILED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-sm py-6 text-gray-500 border"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
