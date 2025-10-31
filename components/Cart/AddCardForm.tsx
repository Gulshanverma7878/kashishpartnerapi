"use client";
import { useAddCard } from "@/hooks/CardManagement/useAddCard";
import { useUpdateCard } from "@/hooks/CardManagement/useUpdateCard";
import React, { useEffect, useState } from "react";

interface AddCardFormProps {
  onClose: () => void;
  editCard?: any; // 🆕 optional prop for edit
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onClose,editCard }) => {
  const [formData, setFormData] = useState({
    card: "",
    cvv: "",
    expiry_date: "",
    pin: "",
  });

  const { mutate: addCard, isPending } = useAddCard();

  const { mutate: updateCard } = useUpdateCard();

  // prefill if editing
  useEffect(() => {
    if (editCard) {
      setFormData({
        card: editCard.card,
        cvv: editCard.cvv,
        expiry_date: editCard.expiry_date,
        pin: editCard.pin || "",
      });
    }
  }, [editCard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   addCard(formData, {
  //     onSuccess: () => {
  //       alert("Card added successfully!");
  //       onClose();
  //     },
  //   });
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editCard) {
      updateCard({ id: editCard.id, ...formData });
    } else {
      addCard(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-gray-200 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          💳 Add New Card
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Card Number",
              name: "card",
              type: "text",
              placeholder: "Enter 16-digit card number",
            },
            {
              label: "CVV",
              name: "cvv",
              type: "text",
              placeholder: "Enter 3-digit CVV",
            },
            {
              label: "Expiry Date",
              name: "expiry_date",
              type: "text",
              placeholder: "MM/YYYY",
            },
            {
              label: "PIN (optional)",
              name: "pin",
              type: "password",
              placeholder: "Enter card PIN (optional)",
            },
          ].map((input) => (
            <div key={input.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={(formData as any)[input.name]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                required={input.name !== "pin"}
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              {/* {isPending ? "Adding..." : "Add Card"} */}
              {editCard ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
