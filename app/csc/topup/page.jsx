"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import SummaryGrid from "@/components/topup/SummaryGrid";
import PaycardTableContent from "@/components/topup/PaycardTableContent";
import Pagination from "@/components/topup/Pagination";
import { usePaycards } from "@/hooks/Topup/useGetTopup";
import { formatCurrency, formatDate, getStatusColor } from "@/utils/paycardUtils";

export default function PaycardTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // 👈 added new state
  const itemsPerPage = 10;

  // ✅ Custom Hook
  const { data = [], isLoading, isError, error } = usePaycards();

  // 🔹 Filter + Sort
  const filteredData = data
    .filter((item) => {
      // 📅 Date filter
      if (startDate && endDate) {
        const createdDate = new Date(item.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!(createdDate >= start && createdDate <= new Date(end.setHours(23, 59, 59, 999)))) {
          return false;
        }
      }

      // ⚙️ Status filter
      if (statusFilter !== "All" && item.status?.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Summary Grid */}
        <SummaryGrid
          cardData={filteredData}
          cscData={filteredData}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        {/* 🔹 Status Filter */}
        <div className="flex  items-center gap-3 my-4 px-4">
          <label htmlFor="status" className="text-gray-700 font-medium">
            Filter by Status:
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            <option value="Failed">Failed</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* 🔹 Table Section */}
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

        {/* 🔹 Pagination */}
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














// "use client";

// import { useState } from "react";
// import { Loader2 } from "lucide-react";
// // import { usePaycards } from "@/hooks/usePaycards";
// import SummaryGrid from "@/components/topup/SummaryGrid";
// import PaycardTableContent from "@/components/topup/PaycardTableContent";
// import Pagination from "@/components/topup/Pagination";
// import { usePaycards } from "@/hooks/Topup/useGetTopup";
// import { formatCurrency, formatDate, getStatusColor } from "@/utils/paycardUtils";

// export default function PaycardTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const itemsPerPage = 10;
  

//   // ✅ Custom Hook
//   const { data = [], isLoading, isError, error } = usePaycards();

//   // 🔹 Filter and Sort
//   const filteredData = data
//     .filter((item) => {
//       if (!startDate || !endDate) return true;
//       const createdDate = new Date(item.createdAt);
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       return createdDate >= start && createdDate <= new Date(end.setHours(23, 59, 59, 999));
//     })
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   // 🔹 Pagination
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);



//   return (
//     <div className="w-full  bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <SummaryGrid
//           cardData={filteredData}
//           cscData={filteredData}
//           startDate={startDate}
//           endDate={endDate}
//           setStartDate={setStartDate}
//           setEndDate={setEndDate}
//         />

//         {isLoading ? (
//           <div className="flex justify-center items-center py-10">
//             <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
//           </div>
//         ) : isError ? (
//           <p className="text-center text-red-600 py-4">❌ Error: {error.message}</p>
//         ) : (
//           <PaycardTableContent
//             data={paginatedData}
//             formatDate={formatDate}
//             formatCurrency={formatCurrency}
//             getStatusColor={getStatusColor}
//           />
//         )}

//         {!isLoading && !isError && totalPages > 1 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalItems={filteredData.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
