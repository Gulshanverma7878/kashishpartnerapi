"use client";

import { useCards } from "@/hooks/documentation/useCard";

export default function CardsPage() {
  const { data, isLoading, isError, refetch, error } = useCards();

  if (isLoading) return <p>Loading cards...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Service Provider List</h2>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* 👇 Scrollable table container */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <div className="max-h-[800px] overflow-y-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-[#d9d7b8] text-gray-800 uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 border text-left">#</th>
                <th className="px-4 py-2 border text-left">Operator Name</th>
                <th className="px-4 py-2 border text-left">Operator Code</th>
                <th className="px-4 py-2 border text-left">SP Key</th>
                <th className="px-4 py-2 border text-left">IsBilling</th>
                <th className="px-4 py-2 border text-left">BusinessModel</th>
                <th className="px-4 py-2 border text-left">LAPU (Com)</th>
                <th className="px-4 py-2 border text-left">Operator (Com)</th>
                <th className="px-4 py-2 border text-left">Min to Max</th>
                <th className="px-4 py-2 border text-left">Incentive</th>
                <th className="px-4 py-2 border text-left">Allowed Channel</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((card: any, index: number) => (
                <tr
                  key={card.Op_code}
                  className={`border ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-2 border">{index + 1}</td>

                  <td className="px-4 py-2 border">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {card.Operator_Name || "—"}
                      </span>
                      <span className="text-gray-500 text-xs">Prepaid</span>
                    </div>
                  </td>

                  <td className="px-4 py-2 border">
                    <span className="font-medium text-gray-800">
                      {card.Op_code || "—"}
                    </span>
                  </td>

                  <td className="px-4 py-2 border text-gray-700">{null}</td>
                  <td className="px-4 py-2 border text-gray-700">False</td>
                  <td className="px-4 py-2 border text-gray-700">{null}</td>
                  <td className="px-4 py-2 border text-gray-700">COM 0 %</td>
                  <td className="px-4 py-2 border text-gray-700">COM 0.00%</td>
                  <td className="px-4 py-2 border text-gray-700">10-10000</td>
                  <td className="px-4 py-2 border text-gray-700"></td>
                  <td className="px-4 py-2 border text-gray-700">B2C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
