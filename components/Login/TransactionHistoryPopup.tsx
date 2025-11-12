"use client";

import { Eye, History, X } from "lucide-react";
import { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";
import StatusModal from "./StatusModal";

// 🧾 Define the type of each transaction
interface Ledger {
  sno: string;
  csc_txn: string;
  csc_id: string;
  txn_mode: string;
  creation_date: string;
  detailData?: {
    details?: {
      txn_status?: string;
      txn_remarks?: string;
    };
  };
}

// ⚙️ Define props type for the popup component
interface TransactionHistoryPopupProps {
  cscId: string;
  onClose: () => void;
}

export default function TransactionHistoryPopup({
  cscId,
  onClose,
}: TransactionHistoryPopupProps) {
  const [data, setData] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [liveOpen, setLiveOpen] = useState<boolean>(false);
  const [selectedTxnId, setSelectedTxnId] = useState<string | null>(null);

  const handleOpen = (txnId: string) => {
    setSelectedTxnId(txnId);
    setOpen(true);
  };
  const handleLiveOpen = (txnId: string) => {
    setSelectedTxnId(txnId);
    setLiveOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTxnId(null);
  };

  const handleLiveClose = () => {
    setLiveOpen(false);
    setSelectedTxnId(null);
  };

  // 🧠 Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.partner.kashishindiapvtltd.com/api/gethistory?csc_id=${cscId}`
        );

        if (!res.ok) throw new Error("Failed to fetch transaction history");

        const result = await res.json();
        setData(result.ledgers || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cscId]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-white backdrop-blur-md  shadow-2xl p-8 w-full h-full  relative border border-gray-200">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition"
        >
          Close
        </button>

        {/* 🧾 Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <History className="text-blue-700 w-6 h-6" />
          <h2 className="text-2xl font-bold text-blue-700">
            CSC Transaction History
          </h2>
        </div>

        {/* 📋 Content */}
        {loading && (
          <p className="text-center text-gray-600">Loading transactions...</p>
        )}

        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <>
            {data.length === 0 ? (
              <p className="text-center text-gray-500">
                No transaction history found.
              </p>
            ) : (
              <div className="overflow-x-auto max-h-[80vh] border rounded-xl">
                <table className="min-w-full text-sm text-left border border-gray-300">
                  <thead className="bg-blue-600 text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        S.No
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        CSC TXN
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        CSC ID
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        Mode
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        Date
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        txt_status
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-center">
                        txt_remark
                      </th>

                      <th className="px-4 py-2 border border-gray-300 text-center">
                        Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((txn, i) => (
                      <tr key={txn.sno} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 font-medium border border-gray-300 text-center">
                          {i + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {txn.csc_txn}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {txn.csc_id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {txn.txn_mode}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {new Date(txn.creation_date).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {txn.detailData?.details?.txn_status === "100" ? (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Success
                            </span>
                          ) : txn.detailData?.details?.txn_status === "103" ? (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Failed
                            </span>
                          ) : (
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                              Pending
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {txn.detailData?.details?.txn_remarks}
                        </td>
                        <td className="px-6 py-4 border border-gray-300 text-center flex justify-center items-center">
                          <button
                            onClick={() => handleOpen(txn.csc_txn)}
                            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" /> Detail
                          </button>
                          <button
                            onClick={() => handleLiveOpen(txn.csc_txn)}
                            className="bg-gradient-to-r ml-2 from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" /> Live Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* 🔍 Modal */}
      <TransactionModal
        open={open}
        onClose={handleClose}
        txnId={selectedTxnId}
        cscId={cscId}
      />
      <StatusModal
        open={liveOpen}
        onClose={handleLiveClose}
        txnId={selectedTxnId}
        cscId={cscId}
      />
    </div>
  );
}
