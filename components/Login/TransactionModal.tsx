"use client";
import { useEffect, useState } from "react";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  txnId: string | null;
  cscId: string;
  data:TransactionDetails | null;
}

export interface TransactionDetails {
  csc_txn?: string;
  txn_session_id?: string;
  csc_id?: string;
  txn_mode?: string;
  txn_amount?: string;
  txn_tdr_amount?: string;
  wallet_code?: string;
  txn_status?: string;
  txn_remarks?: string;
  pg_name?: string;
  pg_mode?: string;
  pg_txn?: string;
  wallet_txn?: string;
  wallet_bank_ref_id?: string;
  add_param?: string;
  chargeback?: string;
  creation_date?: string;
  ip_addr?: string;
}

export default function TransactionModal({
  open,
  onClose,
  txnId,
  cscId,
  data
}: TransactionModalProps) {
//   const [data, setData] = useState<TransactionDetails | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!txnId || !open) return;

//     const fetchDetails = async () => {
//       setLoading(true);
//       setError(null);
//       setData(null);
//       setMessage(null);

//       try {
//         const res = await fetch(
//           `https://api.partner.kashishindiapvtltd.com/api/history-details?txn_id=${txnId}&csc_id=${cscId}`
//         );

//         if (!res.ok) throw new Error("Failed to fetch transaction details");

//         const result = await res.json();

//         if (result.data?.details) {
//           setData(result.data.details);
//         } else if (result.message) {
//           setMessage(result.message);
//         } else {
//           setMessage("No transaction details found.");
//         }
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [txnId, open, cscId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-4xl relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Transaction Details
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading details...</p>
        )}

        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && message && (
          <p className="text-center text-gray-700 font-medium">{message}</p>
        )}

        {!loading && !error && data && (
          <div className="max-h-[450px] overflow-y-auto rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg divide-y divide-gray-100">
            {Object.entries(data).map(([key, value], index) => (
              <div
                key={key}
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-900 font-semibold capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="text-gray-700 break-all font-medium">
                  {value || "-"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
