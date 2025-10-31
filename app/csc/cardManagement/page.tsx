"use client";
import React, { useState } from "react";
import { useCards } from "@/hooks/CardManagement/useCartApi";
import CardTable from "@/components/Cart/CardTable";
import AddCardForm from "@/components/Cart/AddCardForm";

const CardsPage = () => {
  const { cards, isLoading } = useCards();
  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState<any>(null); // 🆕 for edit mode

  const handleEdit = (card: any) => {
    setEditCard(card);
    setShowForm(true);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">Cards Management</h1>
        <button
          onClick={() => {
            setEditCard(null); // reset if adding new
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Card
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <CardTable cards={cards} isLoading={isLoading} onEdit={handleEdit} />
      </div>

      {/* Add / Edit Form Modal */}
      {showForm && (
        <AddCardForm
          onClose={() => setShowForm(false)}
          editCard={editCard} // 🆕 passing card to edit
        />
      )}
    </div>
  );
};

export default CardsPage;
