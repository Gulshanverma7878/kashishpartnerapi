"use client";
import { useEffect, useState } from "react";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  txnId: string | null;
  cscId: string | null;
}

export default function StatusModal({ open, onClose, txnId, cscId }: TransactionModalProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !txnId) return;

    const fetchTransaction = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.partner.kashishindiapvtltd.com/api/get-live-status?txn_id=${txnId}&csc_id=${cscId}`
        );
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        setError("Failed to fetch transaction details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [open, txnId, cscId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-gray-200 relative animate-fadeIn">
        {/* ❌ Close Button (Top-Right Corner) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Transaction Status
        </h2>

        {/* Loader */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto mb-3"></div>
            <p className="text-gray-500 text-sm">Fetching details...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 bg-red-50 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Data */}
        {!loading && !error && data && (
          <div className="max-h-[350px] overflow-y-auto mt-3 border rounded-lg p-4 bg-gray-50/60">
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 border-b border-gray-200 text-sm"
              >
                <span className="font-medium text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-gray-800 font-semibold">
                  {value?.toString() || "—"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
