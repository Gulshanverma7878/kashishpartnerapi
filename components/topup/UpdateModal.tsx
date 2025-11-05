"use client";
import React, { useEffect, useState } from "react";

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProcessData {
  id: string;
  createdAt: number;
  status: string;
  user_id: string;
  stages: {
    [key: string]: {
      status: string;
      message: string;
      updatedAt: string;
      finishedAt?: string;
    };
  };
}

const ProcessModal: React.FC<ProcessModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<ProcessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.partner.kashishindiapvtltd.com/viewprocess");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();

        if (Array.isArray(result)) {
          // Sort by createdAt (latest first)
          setData(result.sort((a, b) => b.createdAt - a.createdAt));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white backdrop-blur-md rounded-3xl shadow-2xl p-6 w-full max-w-6xl relative border border-gray-200 overflow-hidden">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-2xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          🔍 Process History
        </h2>

        {loading ? (
          <p className="text-center text-blue-600 py-4">Loading data...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-4">❌ {error}</p>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 shadow-inner">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-blue-50 sticky top-0">
                <tr>
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Process ID</th>
                  <th className="border p-2 text-left">User ID</th>
                  <th className="border p-2 text-left">Created At</th>
                  <th className="border p-2 text-left">Stage</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Message</th>
                  <th className="border p-2 text-left">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {data.map((process, i) => {
                  const stages = Object.entries(process.stages);
                  return stages.map(([key, stage], idx) => (
                    <tr
                      key={`${process.id}-${key}`}
                      className="hover:bg-gray-50 transition"
                    >
                      {idx === 0 && (
                        <>
                          <td
                            rowSpan={stages.length}
                            className="border p-2 text-gray-700 align-top"
                          >
                            {i + 1}
                          </td>
                          <td
                            rowSpan={stages.length}
                            className="border p-2 text-blue-600 font-medium align-top"
                          >
                            {process.id}
                          </td>
                          <td
                            rowSpan={stages.length}
                            className="border p-2 text-gray-700 align-top"
                          >
                            {process.user_id}
                          </td>
                          <td
                            rowSpan={stages.length}
                            className="border p-2 text-gray-500 align-top"
                          >
                            {new Date(process.createdAt).toLocaleString()}
                          </td>
                        </>
                      )}
                      <td className="border p-2 text-gray-800">{key}</td>
                      <td
                        className={`border p-2 font-semibold ${
                          stage.status.toLowerCase() === "success"
                            ? "text-green-600"
                            : stage.status.toLowerCase() === "failed"
                            ? "text-red-600"
                            : stage.status.toLowerCase() === "pending"
                            ? "text-yellow-600"
                            : "text-gray-700"
                        }`}
                      >
                        {stage.status}
                      </td>
                      <td className="border p-2 text-gray-700">
                        {stage.message}
                      </td>
                      <td className="border p-2 text-gray-500">
                        {new Date(stage.updatedAt).toLocaleString()}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessModal;







// "use client";
// import React, { useEffect, useState } from "react";

// export default function ProcessModalAccordion({ isOpen, onClose }: any) {
//   const [data, setData] = useState<any[]>([]);
//   const [open, setOpen] = useState<number | null>(null);

//   useEffect(() => {
//     if (!isOpen) return;
//     fetch("https://api.partner.kashishindiapvtltd.com/viewprocess")
//       .then((res) => res.json())
//       .then((result) =>
//         setData(result.sort((a: any, b: any) => b.createdAt - a.createdAt))
//       );
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-2xl w-[90%] max-w-5xl shadow-xl relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-5 text-2xl font-bold text-gray-500 hover:text-red-500"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
//           🔍 Process History (Accordion View)
//         </h2>

//         <div className="max-h-[70vh] overflow-y-auto space-y-3">
//           {data.map((p, i) => (
//             <div key={i} className="border rounded-xl shadow-sm">
//               <button
//                 onClick={() => setOpen(open === i ? null : i)}
//                 className="w-full flex justify-between items-center bg-blue-50 px-4 py-3"
//               >
//                 <span>
//                   <b>#{i + 1}</b> — {p.id} ({p.user_id})
//                 </span>
//                 <span className="text-gray-600">{open === i ? "▲" : "▼"}</span>
//               </button>

//               {open === i && (
//                 <div className="p-4 bg-white border-t text-sm space-y-2">
//                   <p className="text-gray-500">
//                     Created: {new Date(p.createdAt).toLocaleString()}
//                   </p>
//                   {Object.entries(p.stages).map(([stageName, stage]: any) => (
//                     <div
//                       key={stageName}
//                       className="border rounded-md p-3 hover:bg-gray-50"
//                     >
//                       <p>
//                         <b>Stage:</b> {stageName}
//                       </p>
//                       <p>
//                         <b>Status:</b>{" "}
//                         <span
//                           className={`font-semibold ${
//                             stage.status === "success"
//                               ? "text-green-600"
//                               : stage.status === "failed"
//                               ? "text-red-600"
//                               : "text-yellow-600"
//                           }`}
//                         >
//                           {stage.status}
//                         </span>
//                       </p>
//                       <p>
//                         <b>Message:</b> {stage.message}
//                       </p>
//                       <p className="text-gray-500 text-xs">
//                         Updated: {new Date(stage.updatedAt).toLocaleString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useEffect, useState } from "react";

// export default function ProcessModalCards({ isOpen, onClose }: any) {
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     if (!isOpen) return;
//     fetch("https://api.partner.kashishindiapvtltd.com/viewprocess")
//       .then((res) => res.json())
//       .then((result) =>
//         setData(result.sort((a: any, b: any) => b.createdAt - a.createdAt))
//       );
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-2xl w-[90%] max-w-6xl shadow-xl relative overflow-y-auto max-h-[85vh]">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-gray-500 text-2xl font-bold hover:text-red-500"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
//           📋 Process History (Card View)
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {data.map((p) => (
//             <div
//               key={p.id}
//               className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="font-semibold text-blue-700">
//                 Process ID: {p.id}
//               </h3>
//               <p className="text-gray-500 text-sm mb-2">
//                 User: {p.user_id} <br />
//                 Created: {new Date(p.createdAt).toLocaleString()}
//               </p>

//               {Object.entries(p.stages).map(([name, stage]: any) => (
//                 <div
//                   key={name}
//                   className="border-t mt-2 pt-2 text-sm text-gray-700"
//                 >
//                   <p>
//                     <b>{name}</b> —{" "}
//                     <span
//                       className={`font-semibold ${
//                         stage.status === "success"
//                           ? "text-green-600"
//                           : stage.status === "failed"
//                           ? "text-red-600"
//                           : "text-yellow-600"
//                       }`}
//                     >
//                       {stage.status}
//                     </span>
//                   </p>
//                   <p>{stage.message}</p>
//                   <p className="text-xs text-gray-500">
//                     Updated: {new Date(stage.updatedAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
