"use client";

import { useCards } from "@/hooks/documentation/useCard";

export default function CardsPage() {
  const { data, isLoading, isError, refetch, error } = useCards();

  if (isLoading) return <p className="text-center py-4 text-gray-500">Loading cards...</p>;
  if (isError) return <p className="text-center text-red-500 py-4">Error: {error?.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">Service Provider List</h2>

      </div>

      {/* 🔹 Scrollable table container */}
      <div className="overflow-x-auto border border-gray-300 rounded-2xl shadow bg-white">
        <div className="max-h-[750px] overflow-y-auto rounded-2xl">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50 border-b border-gray-500 sticky top-0 z-10">
              <tr>
                {[
                  "Sr.",
                  "Operator Name",
                  "OpCode",
                  "Commision",
                  "Commision Typew",
                  
                 
                  "Min to Max",

                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 border  font-medium text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data?.map((card: any, index: number) => (
                <tr
                  key={card.Op_code}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-all`}
                >
                  <td className="px-4 py-2 text-center font-semibold text-gray-700 border">
                    {index + 1}
                  </td>

                  <td className="px-4 py-2 border font-medium text-gray-800">
                    {card.Operator_Name || "—"}
                  </td>

                  <td className="px-4 py-2 border text-gray-700 text-center">
                    {card.Op_code || "—"}
                  </td>

                  <td className="px-4 py-2 border text-gray-700 text-center">
                {card.sp_key || "0.30"}
                  </td>

                  {/* <td className="px-4 py-2 border text-gray-700 text-center">
                    {card.isBilling ? "True" : "False"}
                  </td> */}

                  <td className="px-4 py-2 border text-gray-700 text-center">
                    {card.businessModel || "Percentage %"}
                  </td>

                 

                  <td className="px-4 py-2 border text-gray-700 text-center">
                    10 - 10000
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
