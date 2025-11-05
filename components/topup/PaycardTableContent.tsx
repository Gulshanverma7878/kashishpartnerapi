"use client";

import { useState } from "react";
import EditModal from "./EditModal";
import { FiEdit } from "react-icons/fi";
import { useUpdatePaycard } from "@/hooks/Topup/useUpdatePaycard";
// import { useUpdatePaycard } from "@/hooks/Topup/useUpdatePaycard";

interface PaycardTableContentProps {
  data: any[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusColor: (status: string) => string;
}

export default function PaycardTableContent({
  data,
  formatDate,
  formatCurrency,
  getStatusColor,
}: PaycardTableContentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { mutate: updatePaycard, isPending } = useUpdatePaycard();

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleChange = (e: any) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e: any) => {
//     // https://api.partner.kashishindiapvtltd.com/api/cscsession/history/:id
// //     {
// //     "status":"SUCCESS",
// //     "closing_balance":"1000383.28”,
// // “opening_balance:””,

// // }

// // status:”PENDING”,”SUCCESS”,”FAILED”
//     e.preventDefault();
//     console.log("Updated Data:", selectedItem);
//     setIsModalOpen(false);
//   };


  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!selectedItem?.id) return alert("Invalid Paycard ID");

    const payload = {
      status: selectedItem.status,
      opening_balance: selectedItem.opening_balance,
      closing_balance: selectedItem.closing_balance,
    };

    updatePaycard(
      { id: selectedItem.id, payload },
      {
        onSuccess: () => setIsModalOpen(false),
      }
    );
  };


  return (
    <>
   

    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Table Header */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {[
              "SR. No.",
              "CSC ID",
              "Card Number",
              "Status",
              "Opening Balance",
              "TopUp Amount",
              "Closing Balance",
              "Created At",
              "Updated At",
              "Actions"
            ].map((header) => (
              <th
                key={header}
                className={`px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider border-t border-r ${
                  header.includes("Balance") ? "text-right" : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 border-r border-t">{index + 1}</td>
                <td className="px-6 py-4 border-r border-t">{item.csc_id}</td>
                <td className="px-6 py-4 border-r border-t font-mono">
                  {item.card}
                </td>
                <td className="px-6 py-4 border-r border-t">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right border-r border-t">
                  {formatCurrency(item.opening_balance)}
                </td>
                <td className="px-6 py-4 text-right border-r border-t">
                  {formatCurrency(item.amount)}
                </td>
                <td className="px-6 py-4 text-right border-r border-t">
                  {formatCurrency(item.closing_balance)}
                </td>
                <td className="px-6 py-4 border-r border-t text-gray-600 text-sm">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-4 border-r border-t text-gray-600 text-sm">
                  {formatDate(item.updatedAt)}
                </td>
                <td className="px-6 py-4 border-r border-t text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                      <FiEdit className="text-lg" /> {/* ✨ Edit Icon */}
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-6 py-12 text-center border-t">
                <p className="text-gray-500">No paycards found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>



    </div>
 {/* Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItem={selectedItem}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
     </>
  );
}
