"use client";
import { useUpdateCardStatus } from "@/hooks/CardManagement/useUpdateCardStatus";
import React from "react";
import StatusButton from "./StatusButton";
import CardActionButtons from "./CardActionButtons";
import { useDeleteCard } from "@/hooks/CardManagement/useDeleteCard";

interface CardTableProps {
  cards: any[];
  isLoading: boolean;
  onEdit: (card: any) => void; // 🆕
}
const CardTable: React.FC<CardTableProps> = ({  cards, isLoading, onEdit }) => {
  const { mutate: updateStatus, isPending } = useUpdateCardStatus();
  const { mutate: deleteCard, isPending: isDeleting } = useDeleteCard();


  const handleStatusClick = (id: string, status: string) => {
    const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    updateStatus({ id, status: newStatus });
  };

   const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard(id);
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                "Sr. No",
                "Card Number",
                "CVV",
                "Expiry Date",
                "PIN",
                "Status",
                "Created At",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="border border-gray-300 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 border border-gray-300"
                >
                  Loading...
                </td>
              </tr>
            ) : cards.length > 0 ? (
              cards.map((card: any, index: number) => (
                <tr
                  key={card.id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-800">
                    {card.card}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-600">
                    {card.cvv}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-600">
                    {card.expiry_date}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-600">
                    {card.pin || "-"}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm">
                    <StatusButton
                      status={card.status}
                      isPending={isPending}
                      onToggle={() => handleStatusClick(card.id, card.status)}
                    />
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-600">
                    {new Date(card.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-sm text-gray-600">
                    <CardActionButtons
                      id={card.id}
                      onEdit={() => onEdit(card)}
                      onDelete={handleDeleteClick}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-sm py-6 text-gray-500 border border-gray-300"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardTable;
