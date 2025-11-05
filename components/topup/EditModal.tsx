"use client";
import React from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-4xl relative border border-gray-200">
          {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Paycard</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* CSC ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">CSC ID</label>
            <input
              type="text"
              name="csc_id"
              value={selectedItem?.csc_id || ""}
              onChange={onChange}
              readOnly
              disabled
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              name="card"
              value={selectedItem?.card || ""}
              onChange={onChange}
              readOnly
              disabled
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={selectedItem?.status || ""}
              onChange={onChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="PENDING">Pending</option>
              <option value="SUCCESS">Success</option>
              <option value="FAILED">Failed</option>
    
            </select>
          </div>

          {/* Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Balance</label>
              <input
                type="number"
                name="opening_balance"
                value={selectedItem?.opening_balance || ""}
                onChange={onChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">TopUp Amount</label>
              <input
                type="number"
                name="amount"
                value={selectedItem?.amount || ""}
                onChange={onChange}
                readOnly
                disabled
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Closing Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Closing Balance</label>
            <input
              type="number"
              name="closing_balance"
              value={selectedItem?.closing_balance || ""}
              onChange={onChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
