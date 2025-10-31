'use client';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';

interface CscModalProps {
  onClose: () => void;
  selecteCscId: string;
}

export default function CscModal({ selecteCscId, onClose }: CscModalProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/cscsession/${selecteCscId}`);
        console.log(res);
        setData(res.data?.data || []);
      } catch (error) {
        console.error('Error fetching CSC IDs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selecteCscId]);

  const convertToIST = (timestamp: string): string => {
    const date = new Date(timestamp); // Convert timestamp to Date object
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata', // IST timezone
    };

    // Format the date in IST
    return date.toLocaleString('en-IN', options);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[100vw] h-[100vh] bg-white rounded-none shadow-xl p-8 overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg font-medium transition"
        >
          Close
        </button>

        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          CSC Session Details
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No Data Found</p>
        ) : (
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">Sr. No</th>
                  <th className="px-4 py-3 text-left">CSC ID</th>
                  {/* <th className="px-4 py-3 text-left">Session</th> */}
                  <th className="px-4 py-3 text-left">Opening Balance</th>
                  <th className="px-4 py-3 text-left">Closing Balance</th>
                  <th className="px-4 py-3 text-left">Total Success Recharge</th>
                  <th className="px-4 py-3 text-left">Total Success Amount</th>
                  <th className="px-4 py-3 text-left">Total Charged Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-green-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">{item.csc_id}</td>
                    {/* <td className="px-4 py-3 truncate max-w-[200px]">{item.session}</td> */}
                    <td className="px-4 py-3">{item.opening_balance}</td>
                    <td className="px-4 py-3">{item.closingBalance || ""}</td>
                    <td className="px-4 py-3">
                      {item.recharge_count || '0'}
                    </td>
                    <td className="px-4 py-3">
                      {item.total_txn_amount || 0}
                    </td>
                     <td className="px-4 py-3">
                      {item.total_charged_amount || 0}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${item.status === 'ACTIVE'
                          ? 'text-green-600'
                          : 'text-red-500'
                        }`}
                    >
                      {item.status}
                    </td>
                    <td className="px-4 py-3">{convertToIST(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
