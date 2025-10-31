// // // "use client";

// // // import CscForm from "@/components/csc/CscForm";
// // // import { useState, useEffect } from "react";
// // // import { axiosInstance } from "@/lib/axios";
// // // import CscModal from "@/components/csc/CscModal";
// // // import { ChevronDown, LogIn, Power, Trash2, Eye, Loader, AlertCircle } from "lucide-react";

// // // interface CscDataItem {
// // //   id: string | number;
// // //   name: string;
// // //   cscId: string;
// // //   currentBalance: string | number;
// // //   payment: string;
// // //   billCount: string;
// // //   password: string;
// // //   status_new: "ACTIVE" | "INACTIVE";
// // // }

// // // export default function CscIdsPage(){
// // //   const [showCscForm, setShowCscForm] = useState<boolean>(false);
// // //   const [startDate, setStartDate] = useState<string>("10/07/2025");
// // //   const [endDate, setEndDate] = useState<string>("10/07/2025");
// // //   const [cscData, setCscData] = useState<CscDataItem[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [balanceLoading, setBalanceLoading] = useState<Record<string, boolean>>({});
// // //   const [statusLoading, setStatusLoading] = useState<Record<string, boolean>>({});
// // //   const [iframeUrl, setIframeUrl] = useState<string>("");
// // //   const [userid, setUserid] = useState<string>("");
// // //   const [selecteCscId, setSelecteCscId] = useState<string>("");
// // //   const [iframeLoading, setIframeLoading] = useState<boolean>(false);
// // //   const [showModal, setShowModal] = useState<boolean>(false);
// // //   const [loginType, setLoginType] = useState<"digi" | "normal" | null>(null);

// // //   // ✅ Fetch Balance for a specific CSC ID
// // //   const fetchBalance = async (cscId: string): Promise<void> => {
// // //     try {
// // //       setBalanceLoading((prev) => ({ ...prev, [cscId]: true }));
// // //       const response = await axiosInstance.get(
// // //         `https://api.partner.kashishindiapvtltd.com/api/cscsession/balance/get/${cscId}`
// // //       );

// // //       const balance = response?.data || response?.data?.data || "0";

// // //       setCscData((prevData) =>
// // //         prevData.map((item) =>
// // //           item.cscId === cscId
// // //             ? { ...item, currentBalance: balance }
// // //             : item
// // //         )
// // //       );
// // //     } catch (error) {
// // //       // console.error(`Error fetching balance for ${cscId}:`, error);
// // //       setCscData((prevData) =>
// // //         prevData.map((item) =>
// // //           item.cscId === cscId
// // //             ? { ...item, currentBalance: "0" }
// // //             : item
// // //         )
// // //       );
// // //     } finally {
// // //       setBalanceLoading((prev) => ({ ...prev, [cscId]: false }));
// // //     }
// // //   };

// // //   // ✅ Fetch CSC Data using axiosInstance
// // //   useEffect(() => {
// // //     const fetchCscData = async (): Promise<void> => {
// // //       try {
// // //         const user = JSON.parse(localStorage.getItem("user") || "{}");
// // //         const userId = user?.id;

// // //         if (!userId) {
// // //           console.error("User ID not found in localStorage.");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         setUserid(userId);

// // //         const response = await axiosInstance.get(`/api/csc/${userId}`);

// // //         console.log(response?.data);

// // //         const result = response.data;

// // //         if (result?.data && result.data.length > 0) {
// // //           const formatted: CscDataItem[] = result.data.map((item: any, index: number) => ({
// // //             id: item.id,
// // //             name: user?.name || "N/A",
// // //             cscId: item.csc_id,
// // //             currentBalance: "Login First!",
// // //             payment: "No payments found",
// // //             billCount: "No bills found",
// // //             password: item.password,
// // //             status_new: item.status_new === "ACTIVE" ? "ACTIVE" : "INACTIVE",
// // //           }));
// // //           setCscData(formatted);

// // //           formatted.forEach((item: CscDataItem) => {
// // //             fetchBalance(item.cscId);
// // //           });
// // //         } else {
// // //           setCscData([]);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching CSC IDs:", error);
// // //         setCscData([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCscData();
// // //   }, []);

// // //   const handleRemove = (id: string | number): void => {
// // //     setCscData(cscData.filter((item) => item.id !== id));
// // //   };

// // //   const toggleStatus = async (id: string | number, item: CscDataItem): Promise<void> => {
// // //     try {
// // //       const cscItem = cscData.find((el) => el.id === id);
// // //       if (!cscItem) return;

// // //       const newStatus = cscItem.status_new === "ACTIVE" ? "INACTIVE" : "ACTIVE";

// // //       setStatusLoading((prev) => ({ ...prev, [id]: true }));

// // //       const response = await axiosInstance.put(
// // //         `https://api.partner.kashishindiapvtltd.com/api/cscsession/${item.cscId}`,
// // //         {
// // //           status: newStatus,
// // //           csc_id: cscItem.cscId,
// // //         }
// // //       );

// // //       console.log("Status update response:", response.data);

// // //       setCscData(
// // //         cscData.map((el) =>
// // //           el.id === id
// // //             ? {
// // //                 ...el,
// // //                 status_new: newStatus as "ACTIVE" | "INACTIVE",
// // //               }
// // //             : el
// // //         )
// // //       );

// // //       alert(`Status updated to ${newStatus}`);
// // //     } catch (error) {
// // //       console.error("Error updating status:", error);
// // //       alert("Failed to update status. Please try again.");
// // //     } finally {
// // //       setStatusLoading((prev) => ({ ...prev, [id]: false }));
// // //     }
// // //   };

// // //   // ✅ Handle Digi Login
// // //   const handleDigiLogin = (item: CscDataItem): void => {
// // //     try {
// // //       const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login/digi?user_id=${item.cscId}&password=${item.password}&csc_id=${userid}`;
// // //       console.log("Opening Digi Login URL:", url);
// // //       setIframeUrl(url);
// // //       setLoginType("digi");
// // //       setIframeLoading(true);
// // //     } catch (error) {
// // //       console.error("Error in handleDigiLogin:", error);
// // //       alert("Failed to load Digi Login. Please try again.");
// // //     }
// // //   };

// // //   // ✅ Handle Normal Login
// // //   const handleNormalLogin = (item: CscDataItem): void => {
// // //     try {
// // //       const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login?csc_id=${item.cscId}&password=${item.password}&user_id=${userid}`;
// // //       console.log("Opening Normal Login URL:", url);
// // //       setIframeUrl(url);
// // //       setLoginType("normal");
// // //       setIframeLoading(true);
// // //     } catch (error) {
// // //       console.error("Error in handleNormalLogin:", error);
// // //       alert("Failed to load Normal Login. Please try again.");
// // //     }
// // //   };




// // //   const [uploading, setUploading] = useState(false);

// // // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //   const file = e.target.files?.[0];
// // //   if (!file) return;

// // //   const formData = new FormData();
// // //   formData.append("file", file);
// // //   formData.append("user_id", userid);

// // //   try {
// // //     setUploading(true);
// // //     const response = await axiosInstance.post(
// // //       "https://api.partner.kashishindiapvtltd.com/import", // ✅ Your API endpoint
// // //       formData,
// // //       {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       }
// // //     );

// // //     alert(response.data?.message || "File uploaded successfully!");
// // //     // Optionally refresh CSC data:
// // //     window.location.reload();
// // //   } catch (error: any) {
// // //     console.error("Error uploading file:", error);
// // //     alert(error.response?.data?.message || "Upload failed. Please try again.");
// // //   } finally {
// // //     setUploading(false);
// // //   }
// // // };

// // // const StartLoading = async (item:any) => {
// // //   try {
// // //     // Create an AbortController to handle timeout
// // //     const controller = new AbortController();
// // //     const timeout = setTimeout(() => {
// // //       controller.abort();
// // //       // alert("Request timed out after 10 seconds.");
// // //     }, 10000);

// // //     alert("Started");

// // //     const res = await fetch(
// // //       `https://api.partner.kashishindiapvtltd.com/api/cscsession/topup/get?csc_id=${item.cscId}`,
// // //       { signal: controller.signal }
// // //     );

// // //     clearTimeout(timeout);

// // //     if (!res.ok) {
// // //       throw new Error(`Server returned ${res.status}`);
// // //     }

// // //     const data = await res.json();
// // //     // alert("Started!");
// // //     console.log("Response:", data);

// // //   } catch (error:any) {
// // //     if (error.name === "AbortError") {
// // //       console.warn("Fetch aborted due to timeout");
// // //     } else {
// // //       console.error("Error:", error);
// // //       // alert("Failed to start process.");
// // //     }
// // //   }
// // // };



// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8">
// // //       <div className="max-w-7xl mx-auto">
// // //         {/* Header */}
// // //         <div className="text-center mb-10">
// // //           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
// // //             My CSC IDs
// // //           </h1>
// // //           <p className="text-slate-300 text-lg">Manage and monitor your CSC accounts efficiently</p>
// // //         </div>

// // //         {/* Filter Section */}
// // //         <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-slate-600/50">
// // //           <div className="flex flex-wrap items-center justify-center gap-4">
// // //             <div className="flex flex-col gap-2">
// // //               <label className="text-slate-300 font-semibold text-sm">Start Date</label>
// // //               <input
// // //                 type="text"
// // //                 value={startDate}
// // //                 onChange={(e) => setStartDate(e.target.value)}
// // //                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
// // //               />
// // //             </div>

// // //             <div className="flex flex-col gap-2">
// // //               <label className="text-slate-300 font-semibold text-sm">End Date</label>
// // //               <input
// // //                 type="text"
// // //                 value={endDate}
// // //                 onChange={(e) => setEndDate(e.target.value)}
// // //                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
// // //               />
// // //             </div>

// // //             <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6">
// // //              Filter
// // //             </button>

// // //             <button
// // //               onClick={() => setShowCscForm(true)}
// // //               className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6"
// // //             >
// // //               Add CSC IDs
// // //             </button>

            
// // //           </div>
// // //            <div className="relative mt-6">
// // //     <input
// // //       type="file"
// // //       id="xlsxFile"
// // //       accept=".xlsx"
// // //       onChange={handleFileUpload}
// // //       className="hidden"
// // //     />
// // //     <label
// // //       htmlFor="xlsxFile"
// // //       className="cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
// // //     >
// // //       Import from Excel
// // //     </label>
// // //   </div>
// // //         </div>

// // //         {showCscForm && (
// // //           <CscForm userid={userid} onClose={() => setShowCscForm(false)} />
// // //         )}

// // //         {/* Table Section */}
// // //         <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-slate-600/50">
// // //           <div className="overflow-x-auto">
// // //             {loading ? (
// // //               <div className="flex justify-center items-center py-16">
// // //                 <div className="animate-spin">
// // //                   <Loader className="w-12 h-12 text-emerald-400" />
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <table className="w-full">
// // //                 <thead>
// // //                   <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Sr. No</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">CSC ID</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Balance</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Payments</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Digi Login</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Status</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Start Loading</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Actions</th>
// // //                     <th className="px-6 py-4 text-left font-bold text-sm">Session</th>
// // //                   </tr>
// // //                 </thead>

// // //                 <tbody className="divide-y divide-slate-700">
// // //                   {cscData.length === 0 ? (
// // //                     <tr>
// // //                       <td colSpan={8} className="text-center py-16">
// // //                         <div className="flex flex-col items-center justify-center text-slate-400">
// // //                           <AlertCircle className="w-16 h-16 mb-4 text-slate-500" />
// // //                           <p className="text-xl font-semibold mb-2">No CSC IDs Found</p>
// // //                           <p className="text-sm">Click "Add CSC IDs" to get started</p>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ) : (
// // //                     cscData.map((item, index) => (
// // //                       <tr
// // //                         key={item.id}
// // //                         className="hover:bg-slate-700/50 transition duration-200 border-slate-700"
// // //                       >
// // //                         <td className="px-6 py-4 text-slate-300 font-semibold">{index + 1}</td>
// // //                         <td className="px-6 py-4">
// // //                           <span className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full font-mono text-sm font-bold">
// // //                             {item.cscId}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <div className="flex items-center gap-2">
// // //                             <span
// // //                               className={
// // //                                 item.currentBalance === "Login First!" ||
// // //                                 item.currentBalance === "Error fetching"
// // //                                   ? "text-red-400 font-bold"
// // //                                   : "text-emerald-400 font-bold text-lg"
// // //                               }
// // //                             >
// // //                               {item.currentBalance}
// // //                             </span>
// // //                             {balanceLoading[item.cscId] && (
// // //                               <span className="text-xs text-slate-400 animate-pulse">
// // //                                 (loading...)
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         </td>
// // //                         <td className="px-6 py-4 text-slate-400">{item.payment}</td>
// // //                         <td className="px-6 py-4">
// // //                           <button
// // //                             onClick={() => handleDigiLogin(item)}
// // //                             className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg px-4 py-2 transition duration-300 transform hover:scale-105 font-semibold flex items-center gap-2 shadow-lg"
// // //                           >
// // //                             <LogIn className="w-4 h-4" /> Digi
// // //                           </button>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <button
// // //                             onClick={() => toggleStatus(item.id, item)}
// // //                             disabled={statusLoading[item.id as string]}
// // //                             className={`px-4 py-2 rounded-lg font-bold transition duration-300 flex items-center gap-2 shadow-lg ${
// // //                               item.status_new === "ACTIVE"
// // //                                 ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
// // //                                 : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
// // //                             } ${statusLoading[item.id as string] ? "opacity-60 cursor-not-allowed" : "hover:scale-105 transform"}`}
// // //                           >
// // //                             {statusLoading[item.id as string] ? (
// // //                               <>
// // //                                 <Loader className="w-4 h-4 animate-spin" />
// // //                                 Updating...
// // //                               </>
// // //                             ) : (
// // //                               <>
// // //                                 <Power className="w-4 h-4" />
// // //                                 {item.status_new}
// // //                               </>
// // //                             )}
// // //                           </button>
// // //                         </td>
// // //                         <td className="px-6 py-4 ">
// // //                            <button
// // //                             onClick={() => StartLoading(item)}
// // //                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// // //                             title="start laoding"
// // //                           >
// // //                             <Power className="w-5 h-5" />
// // //                           </button>
// // //                         </td>
// // //                         <td className="px-6 py-4 flex text-center mt-4 gap-2 ">
// // //                           <button
// // //                             onClick={() => handleNormalLogin(item)}
// // //                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// // //                             title="Normal Login"
// // //                           >
// // //                             <LogIn className="w-4 h-4" />
// // //                           </button>
// // //                           <button
// // //                             onClick={() => handleRemove(item.id)}
// // //                             className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// // //                             title="Remove"
// // //                           >
// // //                             <Trash2 className="w-4 h-4" />
// // //                           </button>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <button
// // //                             onClick={() => {
// // //                               setSelecteCscId(item.cscId);
// // //                               setShowModal(true);
// // //                             }}
// // //                             className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
// // //                           >
// // //                             <Eye className="w-4 h-4" /> View
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Login Modal */}
// // //       {iframeUrl && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
// // //           <div className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-600">
// // //             {/* Header */}
// // //             <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-5 flex justify-between items-center shadow-lg">
// // //               <div>
// // //                 <h2 className="text-white font-black text-lg">
// // //                   {loginType === "digi" ? "🔐 Digi Login" : "🔓 Normal Login"}
// // //                 </h2>
// // //                 <p className="text-emerald-100 text-xs mt-1">Secure Session</p>
// // //               </div>
// // //               <button
// // //                 onClick={() => {
// // //                   setIframeUrl("");
// // //                   setLoginType(null);
// // //                 }}
// // //                 className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-bold text-xl shadow-lg transform hover:scale-110"
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             {/* Loading State */}
// // //             {iframeLoading && (
// // //               <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 flex-col gap-4 backdrop-blur-sm">
// // //                 <div className="w-14 h-14 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
// // //                 <p className="text-white font-bold text-lg">Loading Portal...</p>
// // //               </div>
// // //             )}

// // //             {/* iFrame */}
// // //             <div className="flex-1 overflow-hidden bg-slate-700">
// // //               <iframe
// // //                 key={iframeUrl}
// // //                 src={iframeUrl}
// // //                 className="w-full h-full border-none"
// // //                 title="CSC Login Session"
// // //                 onLoad={() => setIframeLoading(false)}
// // //                 onError={() => setIframeLoading(false)}
// // //                 sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
// // //               ></iframe>
// // //             </div>

// // //             {/* Footer */}
// // //             <div className="bg-slate-800 px-6 py-3 border-t border-slate-600 text-xs text-slate-400">
// // //               Session Type: <span className="text-emerald-400 font-bold">{loginType === "digi" ? "Digi Login" : "Normal Login"}</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* CSC Modal */}
// // //       {showModal && (
// // //         <CscModal selecteCscId={selecteCscId} onClose={() => setShowModal(false)} />
// // //       )}
// // //     </div>
// // //   );
// // // }





















// // "use client";

// // import CscForm from "@/components/csc/CscForm";
// // import { useState, useEffect } from "react";
// // import { axiosInstance } from "@/lib/axios";
// // import CscModal from "@/components/csc/CscModal";
// // import { ChevronDown, LogIn, Power, Trash2, Eye, Loader, AlertCircle, Edit } from "lucide-react";

// // interface CscDataItem {
// //   id: string | number;
// //   name: string;
// //   cscId: string;
// //   currentBalance: string | number;
// //   payment: string;
// //   billCount: string;
// //   password: string;
// //   mpin: string;
// //   status_new: "ACTIVE" | "INACTIVE";
// // }

// // export default function CscIdsPage(){
// //   const [showCscForm, setShowCscForm] = useState<boolean>(false);
// //   const [startDate, setStartDate] = useState<string>("10/07/2025");
// //   const [endDate, setEndDate] = useState<string>("10/07/2025");
// //   const [cscData, setCscData] = useState<CscDataItem[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [balanceLoading, setBalanceLoading] = useState<Record<string, boolean>>({});
// //   const [statusLoading, setStatusLoading] = useState<Record<string, boolean>>({});
// //   const [iframeUrl, setIframeUrl] = useState<string>("");
// //   const [userid, setUserid] = useState<string>("");
// //   const [selecteCscId, setSelecteCscId] = useState<string>("");
// //   const [iframeLoading, setIframeLoading] = useState<boolean>(false);
// //   const [showModal, setShowModal] = useState<boolean>(false);
// //   const [loginType, setLoginType] = useState<"digi" | "normal" | null>(null);
// //   const [editingItem, setEditingItem] = useState<CscDataItem | null>(null);
// //   const [showEditModal, setShowEditModal] = useState<boolean>(false);

// //   // ✅ Fetch Balance for a specific CSC ID
// //   const fetchBalance = async (cscId: string): Promise<void> => {
// //     try {
// //       setBalanceLoading((prev) => ({ ...prev, [cscId]: true }));
// //       const response = await axiosInstance.get(
// //         `https://api.partner.kashishindiapvtltd.com/api/cscsession/balance/get/${cscId}`
// //       );

// //       const balance = response?.data || response?.data?.data || "0";

// //       setCscData((prevData) =>
// //         prevData.map((item) =>
// //           item.cscId === cscId
// //             ? { ...item, currentBalance: balance }
// //             : item
// //         )
// //       );
// //     } catch (error) {
// //       console.error(`Error fetching balance for ${cscId}:`, error);
// //       setCscData((prevData) =>
// //         prevData.map((item) =>
// //           item.cscId === cscId
// //             ? { ...item, currentBalance: "0" }
// //             : item
// //         )
// //       );
// //     } finally {
// //       setBalanceLoading((prev) => ({ ...prev, [cscId]: false }));
// //     }
// //   };

// //   // ✅ Fetch CSC Data using axiosInstance
// //   useEffect(() => {
// //     const fetchCscData = async (): Promise<void> => {
// //       try {
// //         const user = JSON.parse(localStorage.getItem("user") || "{}");
// //         const userId = user?.id;

// //         if (!userId) {
// //           console.error("User ID not found in localStorage.");
// //           setLoading(false);
// //           return;
// //         }

// //         setUserid(userId);

// //         const response = await axiosInstance.get(`/api/csc/${userId}`);

// //         console.log(response?.data);

// //         const result = response.data;

// //         if (result?.data && result.data.length > 0) {
// //           const formatted: CscDataItem[] = result.data.map((item: any, index: number) => ({
// //             id: item.id,
// //             name: user?.name || "N/A",
// //             cscId: item.csc_id,
// //             currentBalance: "Login First!",
// //             payment: "No payments found",
// //             billCount: "No bills found",
// //             password: item.password,
// //             status_new: item.status_new === "ACTIVE" ? "ACTIVE" : "INACTIVE",
// //           }));
// //           setCscData(formatted);

// //           formatted.forEach((item: CscDataItem) => {
// //             fetchBalance(item.cscId);
// //           });
// //         } else {
// //           setCscData([]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching CSC IDs:", error);
// //         setCscData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCscData();
// //   }, []);

// //   const handleRemove = (id: string | number): void => {
// //     const confirmed = window.confirm("Are you sure you want to delete this CSC record?");
    
// //     if (!confirmed) return;

// //     setCscData(cscData.filter((item) => item.id !== id));

// //     const URL = `https://api.partner.kashishindiapvtltd.com/api/csc/${id}`;
    
// //     axiosInstance.delete(URL)
// //       .then(response => {
// //         console.log("Deleted successfully:", response.data);
// //       })
// //       .catch(error => {
// //         console.error("Error deleting CSC ID:", error);
// //       });
// //   };

// //   // ✅ Handle Edit Button Click
// //   const handleEdit = (item: CscDataItem): void => {
// //     setEditingItem({ ...item });
// //     setShowEditModal(true);
// //   };

// //   // ✅ Handle Edit Form Submit
// //   const handleEditSubmit = async (): Promise<void> => {
// //     if (!editingItem) return;

// //     try {
// //       const response = await axiosInstance.put(
// //         `https://api.partner.kashishindiapvtltd.com/api/csc/${editingItem.id}`,
// //         {
// //           csc_id:editingItem.cscId,
// //           password: editingItem.password,
// //           status_new: editingItem.status_new,
// //         }
// //       );

// //       console.log("Update response:", response.data);

// //       // Update local state
// //       setCscData(
// //         cscData.map((item) =>
// //           item.id === editingItem.id ? editingItem : item
// //         )
// //       );

// //       alert("CSC ID updated successfully!");
// //       setShowEditModal(false);
// //       setEditingItem(null);
// //     } catch (error) {
// //       console.error("Error updating CSC ID:", error);
// //       alert("Failed to update CSC ID. Please try again.");
// //     }
// //   };

// //   const toggleStatus = async (id: string | number, item: CscDataItem): Promise<void> => {
// //     try {
// //       const cscItem = cscData.find((el) => el.id === id);
// //       if (!cscItem) return;

// //       const newStatus = cscItem.status_new === "ACTIVE" ? "INACTIVE" : "ACTIVE";

// //       setStatusLoading((prev) => ({ ...prev, [id]: true }));

// //       const response = await axiosInstance.put(
// //         `https://api.partner.kashishindiapvtltd.com/api/cscsession/${item.cscId}`,
// //         {
// //           status: newStatus,
// //           csc_id: cscItem.cscId,
// //         }
// //       );

// //       console.log("Status update response:", response.data);

// //       setCscData(
// //         cscData.map((el) =>
// //           el.id === id
// //             ? {
// //                 ...el,
// //                 status_new: newStatus as "ACTIVE" | "INACTIVE",
// //               }
// //             : el
// //         )
// //       );

// //       alert(`Status updated to ${newStatus}`);
// //     } catch (error) {
// //       console.error("Error updating status:", error);
// //       alert("Failed to update status. Please try again.");
// //     } finally {
// //       setStatusLoading((prev) => ({ ...prev, [id]: false }));
// //     }
// //   };

// //   const handleDigiLogin = (item: CscDataItem): void => {
// //     try {
// //       const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login/digi?user_id=${item.cscId}&password=${item.password}&csc_id=${userid}`;
// //       console.log("Opening Digi Login URL:", url);
// //       setIframeUrl(url);
// //       setLoginType("digi");
// //       setIframeLoading(true);
// //     } catch (error) {
// //       console.error("Error in handleDigiLogin:", error);
// //       alert("Failed to load Digi Login. Please try again.");
// //     }
// //   };

// //   const handleNormalLogin = (item: CscDataItem): void => {
// //     try {
// //       const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login?csc_id=${item.cscId}&password=${item.password}&user_id=${userid}`;
// //       console.log("Opening Normal Login URL:", url);
// //       setIframeUrl(url);
// //       setLoginType("normal");
// //       setIframeLoading(true);
// //     } catch (error) {
// //       console.error("Error in handleNormalLogin:", error);
// //       alert("Failed to load Normal Login. Please try again.");
// //     }
// //   };

// //   const [uploading, setUploading] = useState(false);

// //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("user_id", userid);

// //     try {
// //       setUploading(true);
// //       const response = await axiosInstance.post(
// //         "https://api.partner.kashishindiapvtltd.com/import",
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         }
// //       );

// //       alert(response.data?.message || "File uploaded successfully!");
// //       window.location.reload();
// //     } catch (error: any) {
// //       console.error("Error uploading file:", error);
// //       alert(error.response?.data?.message || "Upload failed. Please try again.");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const StartLoading = async (item:any) => {
// //     try {
// //       const controller = new AbortController();
// //       const timeout = setTimeout(() => {
// //         controller.abort();
// //       }, 10000);

// //       alert("Started");

// //       const res = await fetch(
// //         `https://api.partner.kashishindiapvtltd.com/api/cscsession/topup/get?csc_id=${item.cscId}`,
// //         { signal: controller.signal }
// //       );

// //       clearTimeout(timeout);

// //       if (!res.ok) {
// //         throw new Error(`Server returned ${res.status}`);
// //       }

// //       const data = await res.json();
// //       console.log("Response:", data);

// //     } catch (error:any) {
// //       if (error.name === "AbortError") {
// //         console.warn("Fetch aborted due to timeout");
// //       } else {
// //         console.error("Error:", error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-10">
// //           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
// //             My CSC IDs
// //           </h1>
// //           <p className="text-slate-300 text-lg">Manage and monitor your CSC accounts efficiently</p>
// //         </div>

// //         {/* Filter Section */}
// //         <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-slate-600/50">
// //           <div className="flex flex-wrap items-center justify-center gap-4">
// //             <div className="flex flex-col gap-2">
// //               <label className="text-slate-300 font-semibold text-sm">Start Date</label>
// //               <input
// //                 type="text"
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
// //               />
// //             </div>

// //             <div className="flex flex-col gap-2">
// //               <label className="text-slate-300 font-semibold text-sm">End Date</label>
// //               <input
// //                 type="text"
// //                 value={endDate}
// //                 onChange={(e) => setEndDate(e.target.value)}
// //                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
// //               />
// //             </div>

// //             <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6">
// //              Filter
// //             </button>

// //             <button
// //               onClick={() => setShowCscForm(true)}
// //               className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6"
// //             >
// //               Add CSC IDs
// //             </button>
// //           </div>
// //           <div className="relative mt-6">
// //             <input
// //               type="file"
// //               id="xlsxFile"
// //               accept=".xlsx"
// //               onChange={handleFileUpload}
// //               className="hidden"
// //             />
// //             <label
// //               htmlFor="xlsxFile"
// //               className="cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
// //             >
// //               Import from Excel
// //             </label>
// //           </div>
// //         </div>

// //         {showCscForm && (
// //           <CscForm userid={userid} onClose={() => setShowCscForm(false)} />
// //         )}

// //         {/* Table Section */}
// //         <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-slate-600/50">
// //           <div className="overflow-x-auto">
// //             {loading ? (
// //               <div className="flex justify-center items-center py-16">
// //                 <div className="animate-spin">
// //                   <Loader className="w-12 h-12 text-emerald-400" />
// //                 </div>
// //               </div>
// //             ) : (
// //               <table className="w-full">
// //                 <thead>
// //                   <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Sr. No</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">CSC ID</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Balance</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Payments</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Digi Login</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Status</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Start Loading</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Actions</th>
// //                     <th className="px-6 py-4 text-left font-bold text-sm">Session</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody className="divide-y divide-slate-700">
// //                   {cscData.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={9} className="text-center py-16">
// //                         <div className="flex flex-col items-center justify-center text-slate-400">
// //                           <AlertCircle className="w-16 h-16 mb-4 text-slate-500" />
// //                           <p className="text-xl font-semibold mb-2">No CSC IDs Found</p>
// //                           <p className="text-sm">Click "Add CSC IDs" to get started</p>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ) : (
// //                     cscData.map((item, index) => (
// //                       <tr
// //                         key={item.id}
// //                         className="hover:bg-slate-700/50 transition duration-200 border-slate-700"
// //                       >
// //                         <td className="px-6 py-4 text-slate-300 font-semibold">{index + 1}</td>
// //                         <td className="px-6 py-4">
// //                           <span className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full font-mono text-sm font-bold">
// //                             {item.cscId}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="flex items-center gap-2">
// //                             <span
// //                               className={
// //                                 item.currentBalance === "Login First!" ||
// //                                 item.currentBalance === "Error fetching"
// //                                   ? "text-red-400 font-bold"
// //                                   : "text-emerald-400 font-bold text-lg"
// //                               }
// //                             >
// //                               {item.currentBalance}
// //                             </span>
// //                             {balanceLoading[item.cscId] && (
// //                               <span className="text-xs text-slate-400 animate-pulse">
// //                                 (loading...)
// //                               </span>
// //                             )}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 text-slate-400">{item.payment}</td>
// //                         <td className="px-6 py-4">
// //                           <button
// //                             onClick={() => handleDigiLogin(item)}
// //                             className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg px-4 py-2 transition duration-300 transform hover:scale-105 font-semibold flex items-center gap-2 shadow-lg"
// //                           >
// //                             <LogIn className="w-4 h-4" /> Digi
// //                           </button>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <button
// //                             onClick={() => toggleStatus(item.id, item)}
// //                             disabled={statusLoading[item.id as string]}
// //                             className={`px-4 py-2 rounded-lg font-bold transition duration-300 flex items-center gap-2 shadow-lg ${
// //                               item.status_new === "ACTIVE"
// //                                 ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
// //                                 : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
// //                             } ${statusLoading[item.id as string] ? "opacity-60 cursor-not-allowed" : "hover:scale-105 transform"}`}
// //                           >
// //                             {statusLoading[item.id as string] ? (
// //                               <>
// //                                 <Loader className="w-4 h-4 animate-spin" />
// //                                 Updating...
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <Power className="w-4 h-4" />
// //                                 {item.status_new}
// //                               </>
// //                             )}
// //                           </button>
// //                         </td>
// //                         <td className="px-6 py-4 ">
// //                            <button
// //                             onClick={() => StartLoading(item)}
// //                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// //                             title="start loading"
// //                           >
// //                             <Power className="w-5 h-5" />
// //                           </button>
// //                         </td>
// //                         <td className="px-6 py-4 flex text-center mt-4 gap-2 ">
// //                           <button
// //                             onClick={() => handleEdit(item)}
// //                             className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// //                             title="Edit"
// //                           >
// //                             <Edit className="w-4 h-4" />
// //                           </button>
// //                           <button
// //                             onClick={() => handleNormalLogin(item)}
// //                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// //                             title="Normal Login"
// //                           >
// //                             <LogIn className="w-4 h-4" />
// //                           </button>
// //                           <button
// //                             onClick={() => handleRemove(item.id)}
// //                             className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
// //                             title="Remove"
// //                           >
// //                             <Trash2 className="w-4 h-4" />
// //                           </button>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <button
// //                             onClick={() => {
// //                               setSelecteCscId(item.cscId);
// //                               setShowModal(true);
// //                             }}
// //                             className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
// //                           >
// //                             <Eye className="w-4 h-4" /> View
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Edit Modal */}
// //       {showEditModal && editingItem && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
// //           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-600">
// //             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
// //               <Edit className="w-6 h-6 text-yellow-400" />
// //               Edit CSC ID
// //             </h2>
            
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-slate-300 font-semibold mb-2">CSC ID</label>
// //                 <input
// //                   type="text"
// //                   value={editingItem.cscId}
// //                   onChange={(e) => setEditingItem({ ...editingItem, cscId: e.target.value })}
// //                   className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-slate-300 font-semibold mb-2">Password</label>
// //                 <input
// //                   type="password"
// //                   value={editingItem.password}
// //                   onChange={(e) => setEditingItem({ ...editingItem, password: e.target.value })}
// //                   className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-slate-300 font-semibold mb-2">Status</label>
// //                 <select
// //                   value={editingItem.status_new}
// //                   onChange={(e) => setEditingItem({ ...editingItem, status_new: e.target.value as "ACTIVE" | "INACTIVE" })}
// //                   className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
// //                 >
// //                   <option value="ACTIVE">ACTIVE</option>
// //                   <option value="INACTIVE">INACTIVE</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="flex gap-3 mt-6">
// //               <button
// //                 onClick={handleEditSubmit}
// //                 className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
// //               >
// //                 Save Changes
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setShowEditModal(false);
// //                   setEditingItem(null);
// //                 }}
// //                 className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Login Modal */}
// //       {iframeUrl && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
// //           <div className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-600">
// //             <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-5 flex justify-between items-center shadow-lg">
// //               <div>
// //                 <h2 className="text-white font-black text-lg">
// //                   {loginType === "digi" ? "🔐 Digi Login" : "🔓 Normal Login"}
// //                 </h2>
// //                 <p className="text-emerald-100 text-xs mt-1">Secure Session</p>
// //               </div>
// //               <button
// //                 onClick={() => {
// //                   setIframeUrl("");
// //                   setLoginType(null);
// //                 }}
// //                 className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-bold text-xl shadow-lg transform hover:scale-110"
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             {iframeLoading && (
// //               <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 flex-col gap-4 backdrop-blur-sm">
// //                 <div className="w-14 h-14 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
// //                 <p className="text-white font-bold text-lg">Loading Portal...</p>
// //               </div>
// //             )}

// //             <div className="flex-1 overflow-hidden bg-slate-700">
// //               <iframe
// //                 key={iframeUrl}
// //                 src={iframeUrl}
// //                 className="w-full h-full border-none"
// //                 title="CSC Login Session"
// //                 onLoad={() => setIframeLoading(false)}
// //                 onError={() => setIframeLoading(false)}
// //                 sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
// //               ></iframe>
// //             </div>

// //             <div className="bg-slate-800 px-6 py-3 border-t border-slate-600 text-xs text-slate-400">
// //               Session Type: <span className="text-emerald-400 font-bold">{loginType === "digi" ? "Digi Login" : "Normal Login"}</span>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* CSC Modal */}
// //       {showModal && (
// //         <CscModal selecteCscId={selecteCscId} onClose={() => setShowModal(false)} />
// //       )}
// //     </div>
// //   );
// // }
















// "use client";

// import CscForm from "@/components/csc/CscForm";
// import { useState, useEffect } from "react";
// import { axiosInstance } from "@/lib/axios";
// import CscModal from "@/components/csc/CscModal";
// import { ChevronDown, LogIn, Power, Trash2, Eye, Loader, AlertCircle, Edit } from "lucide-react";

// interface CscDataItem {
//   id: string | number;
//   name: string;
//   cscId: string;
//   currentBalance: string | number;
//   payment: string;
//   billCount: string;
//   password: string;
//   mpin: string;
//   status_new: "ACTIVE" | "INACTIVE";
// }

// export default function CscIdsPage(){
//   const [showCscForm, setShowCscForm] = useState<boolean>(false);
//   const [startDate, setStartDate] = useState<string>("10/07/2025");
//   const [endDate, setEndDate] = useState<string>("10/07/2025");
//   const [AmountLimit, setAmountLimit] = useState<string>("");
//   const [cscData, setCscData] = useState<CscDataItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [balanceLoading, setBalanceLoading] = useState<Record<string, boolean>>({});
//   const [statusLoading, setStatusLoading] = useState<Record<string, boolean>>({});
//   const [iframeUrl, setIframeUrl] = useState<string>("");
//   const [userid, setUserid] = useState<string>("");
//   const [selecteCscId, setSelecteCscId] = useState<string>("");
//   const [iframeLoading, setIframeLoading] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [loginType, setLoginType] = useState<"digi" | "normal" | null>(null);
//   const [editingItem, setEditingItem] = useState<CscDataItem | null>(null);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);

//   // ✅ Fetch Balance for a specific CSC ID
//   const fetchBalance = async (cscId: string): Promise<void> => {
//     try {
//       setBalanceLoading((prev) => ({ ...prev, [cscId]: true }));
//       const response = await axiosInstance.get(
//         `https://api.partner.kashishindiapvtltd.com/api/cscsession/balance/get/${cscId}`
//       );

//       const balance = response?.data || response?.data?.data || "0";

//       setCscData((prevData) =>
//         prevData.map((item) =>
//           item.cscId === cscId
//             ? { ...item, currentBalance: balance }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error(`Error fetching balance for ${cscId}:`, error);
//       setCscData((prevData) =>
//         prevData.map((item) =>
//           item.cscId === cscId
//             ? { ...item, currentBalance: "0" }
//             : item
//         )
//       );
//     } finally {
//       setBalanceLoading((prev) => ({ ...prev, [cscId]: false }));
//     }
//   };

//   // ✅ Fetch CSC Data using axiosInstance
//   useEffect(() => {
//     const fetchCscData = async (): Promise<void> => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user") || "{}");
//         const userId = user?.id;

//         if (!userId) {
//           console.error("User ID not found in localStorage.");
//           setLoading(false);
//           return;
//         }

//         setUserid(userId);

//         const response = await axiosInstance.get(`/api/csc/${userId}`);
//         ///updateTopup
    

//         console.log(response?.data);
//          const responseAmountLimit = await axiosInstance.get(`/getTopup`);
//          console.log("Amount",responseAmountLimit?.data);
//          setAmountLimit(responseAmountLimit?.data?.amountToAdd || "");

//         const result = response.data;

//         if (result?.data && result.data.length > 0) {
//           const formatted: CscDataItem[] = result.data.map((item: any, index: number) => ({
//             id: item.id,
//             name: user?.name || "N/A",
//             cscId: item.csc_id,
//             currentBalance: "Login First!",
//             payment: "No payments found",
//             billCount: "No bills found",
//             password: item.password,
//             status_new: item.status_new === "ACTIVE" ? "ACTIVE" : "INACTIVE",
//           }));
//           setCscData(formatted);

//           formatted.forEach((item: CscDataItem) => {
//             fetchBalance(item.cscId);
//           });
//         } else {
//           setCscData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching CSC IDs:", error);
//         setCscData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCscData();
//   }, []);

//   const handleRemove = (id: string | number): void => {
//     const confirmed = window.confirm("Are you sure you want to delete this CSC record?");
    
//     if (!confirmed) return;

//     setCscData(cscData.filter((item) => item.id !== id));

//     const URL = `https://api.partner.kashishindiapvtltd.com/api/csc/${id}`;
    
//     axiosInstance.delete(URL)
//       .then(response => {
//         console.log("Deleted successfully:", response.data);
//       })
//       .catch(error => {
//         console.error("Error deleting CSC ID:", error);
//       });
//   };

//   // ✅ Handle Edit Button Click
//   const handleEdit = (item: CscDataItem): void => {
//     setEditingItem({ ...item });
//     setShowEditModal(true);
//   };

//   // ✅ Handle Edit Form Submit
//   const handleEditSubmit = async (): Promise<void> => {
//     if (!editingItem) return;

//     try {
//       const response = await axiosInstance.put(
//         `https://api.partner.kashishindiapvtltd.com/api/csc/${editingItem.id}`,
//         {
//           csc_id:editingItem.cscId,
//           password: editingItem.password,
//           status_new: editingItem.status_new,
//         }
//       );

//       console.log("Update response:", response.data);

//       // Update local state
//       setCscData(
//         cscData.map((item) =>
//           item.id === editingItem.id ? editingItem : item
//         )
//       );

//       alert("CSC ID updated successfully!");
//       setShowEditModal(false);
//       setEditingItem(null);
//     } catch (error) {
//       console.error("Error updating CSC ID:", error);
//       alert("Failed to update CSC ID. Please try again.");
//     }
//   };

//   const toggleStatus = async (id: string | number, item: CscDataItem): Promise<void> => {
//     try {
//       const cscItem = cscData.find((el) => el.id === id);
//       if (!cscItem) return;

//       const newStatus = cscItem.status_new === "ACTIVE" ? "INACTIVE" : "ACTIVE";

//       setStatusLoading((prev) => ({ ...prev, [id]: true }));

//       const response = await axiosInstance.put(
//         `https://api.partner.kashishindiapvtltd.com/api/cscsession/${item.cscId}`,
//         {
//           status: newStatus,
//           csc_id: cscItem.cscId,
//         }
//       );

//       console.log("Status update response:", response.data);

//       setCscData(
//         cscData.map((el) =>
//           el.id === id
//             ? {
//                 ...el,
//                 status_new: newStatus as "ACTIVE" | "INACTIVE",
//               }
//             : el
//         )
//       );

//       alert(`Status updated to ${newStatus}`);
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update status. Please try again.");
//     } finally {
//       setStatusLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleDigiLogin = (item: CscDataItem): void => {
//     try {
//       const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login/digi?user_id=${item.cscId}&password=${item.password}&csc_id=${userid}`;
//       console.log("Opening Digi Login URL:", url);
//       setIframeUrl(url);
//       setLoginType("digi");
//       setIframeLoading(true);
//     } catch (error) {
//       console.error("Error in handleDigiLogin:", error);
//       alert("Failed to load Digi Login. Please try again.");
//     }
//   };

//   const handleNormalLogin = (item: CscDataItem): void => {
//     try {
//       const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login?csc_id=${item.cscId}&password=${item.password}&user_id=${userid}`;
//       console.log("Opening Normal Login URL:", url);
//       setIframeUrl(url);
//       setLoginType("normal");
//       setIframeLoading(true);
//     } catch (error) {
//       console.error("Error in handleNormalLogin:", error);
//       alert("Failed to load Normal Login. Please try again.");
//     }
//   };

//   const [uploading, setUploading] = useState(false);

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("user_id", userid);

//     try {
//       setUploading(true);
//       const response = await axiosInstance.post(
//         "https://api.partner.kashishindiapvtltd.com/import",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       alert(response.data?.message || "File uploaded successfully!");
//       window.location.reload();
//     } catch (error: any) {
//       console.error("Error uploading file:", error);
//       alert(error.response?.data?.message || "Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const StartLoading = async (item:any) => {
//     try {
//       const controller = new AbortController();
//       const timeout = setTimeout(() => {
//         controller.abort();
//       }, 10000);

//       alert("Started");

//       const res = await fetch(
//         `https://api.partner.kashishindiapvtltd.com/api/cscsession/topup/get?csc_id=${item.cscId}`,
//         { signal: controller.signal }
//       );

//       clearTimeout(timeout);

//       if (!res.ok) {
//         throw new Error(`Server returned ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("Response:", data);

//     } catch (error:any) {
//       if (error.name === "AbortError") {
//         console.warn("Fetch aborted due to timeout");
//       } else {
//         console.error("Error:", error);
//       }
//     }
//   };

//   const handleAmountLimitChange = () => {
//     fetch(`https://api.partner.kashishindiapvtltd.com/updateTopup?amount=${AmountLimit}`)
//       .then((res) => res.json())
//       .then((data) => {
//         alert("Amount limit updated successfully");
//         console.log("Amount limit updated:", data);
//       })
//       .catch((error) => {
//         console.error("Error updating amount limit:", error);
//       });
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
//             My CSC IDs
//           </h1>
//           <p className="text-slate-300 text-lg">Manage and monitor your CSC accounts efficiently</p>
//         </div>

//         {/* Filter Section */}
//         <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-slate-600/50">
//           <div className="flex flex-wrap items-center justify-center gap-4">
//             <div className="flex flex-col gap-2">
//               <label className="text-slate-300 font-semibold text-sm">Start Date</label>
//               <input
//                 type="text"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="text-slate-300 font-semibold text-sm">End Date</label>
//               <input
//                 type="text"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
//               />
//             </div>

//             <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6">
//              Filter
//             </button>
//             {/* <input type="text" name={AmountLimit} id='amountlimit' value={AmountLimit} /> */}
             
//              <div className="flex flex-col gap-2">
//               <label className="text-slate-300 font-semibold text-sm">TopUp Limit</label>
//                <input
//                 type="text"
//                 value={AmountLimit}
//                 onChange={(e) => setAmountLimit(e.target.value)}
//                 className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"

//               />

//              </div>
            
//               <div  className="flex flex-col gap-2">
//             <button
//               onClick={handleAmountLimitChange}
//               className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6"
//             >
//               Set TopUp Limit
//             </button>
//               </div>

//             <button
//               onClick={() => setShowCscForm(true)}
//               className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg mt-6"
//             >
//               Add CSC IDs
//             </button>
//           </div>
//           <div className="relative mt-6">
//             <input
//               type="file"
//               id="xlsxFile"
//               accept=".xlsx"
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//             <label
//               htmlFor="xlsxFile"
//               className="cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Import from Excel
//             </label>
//           </div>
//         </div>

//         {showCscForm && (
//           <CscForm userid={userid} onClose={() => setShowCscForm(false)} />
//         )}

//         {/* Table Section */}
//         <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-slate-600/50">
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="flex justify-center items-center py-16">
//                 <div className="animate-spin">
//                   <Loader className="w-12 h-12 text-emerald-400" />
//                 </div>
//               </div>
//             ) : (
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
//                     <th className="px-6 py-4 text-left font-bold text-sm">Sr. No</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">CSC ID</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Balance</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Payments</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Digi Login</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Status</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Start Loading</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Actions</th>
//                     <th className="px-6 py-4 text-left font-bold text-sm">Session</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-700">
//                   {cscData.length === 0 ? (
//                     <tr>
//                       <td colSpan={9} className="text-center py-16">
//                         <div className="flex flex-col items-center justify-center text-slate-400">
//                           <AlertCircle className="w-16 h-16 mb-4 text-slate-500" />
//                           <p className="text-xl font-semibold mb-2">No CSC IDs Found</p>
//                           <p className="text-sm">Click "Add CSC IDs" to get started</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     cscData.map((item, index) => (
//                       <tr
//                         key={item.id}
//                         className="hover:bg-slate-700/50 transition duration-200 border-slate-700"
//                       >
//                         <td className="px-6 py-4 text-slate-300 font-semibold">{index + 1}</td>
//                         <td className="px-6 py-4">
//                           <span className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full font-mono text-sm font-bold">
//                             {item.cscId}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <span
//                               className={
//                                 item.currentBalance === "Login First!" ||
//                                 item.currentBalance === "Error fetching"
//                                   ? "text-red-400 font-bold"
//                                   : "text-emerald-400 font-bold text-lg"
//                               }
//                             >
//                               {item.currentBalance}
//                             </span>
//                             {balanceLoading[item.cscId] && (
//                               <span className="text-xs text-slate-400 animate-pulse">
//                                 (loading...)
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-slate-400">{item.payment}</td>
//                         <td className="px-6 py-4">
//                           <button
//                             onClick={() => handleDigiLogin(item)}
//                             className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg px-4 py-2 transition duration-300 transform hover:scale-105 font-semibold flex items-center gap-2 shadow-lg"
//                           >
//                             <LogIn className="w-4 h-4" /> Digi
//                           </button>
//                         </td>
//                         <td className="px-6 py-4">
//                           <button
//                             onClick={() => toggleStatus(item.id, item)}
//                             disabled={statusLoading[item.id as string]}
//                             className={`px-4 py-2 rounded-lg font-bold transition duration-300 flex items-center gap-2 shadow-lg ${
//                               item.status_new === "ACTIVE"
//                                 ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
//                                 : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
//                             } ${statusLoading[item.id as string] ? "opacity-60 cursor-not-allowed" : "hover:scale-105 transform"}`}
//                           >
//                             {statusLoading[item.id as string] ? (
//                               <>
//                                 <Loader className="w-4 h-4 animate-spin" />
//                                 Updating...
//                               </>
//                             ) : (
//                               <>
//                                 <Power className="w-4 h-4" />
//                                 {item.status_new}
//                               </>
//                             )}
//                           </button>
//                         </td>
//                         <td className="px-6 py-4 ">
//                            <button
//                             onClick={() => StartLoading(item)}
//                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
//                             title="start loading"
//                           >
//                             <Power className="w-5 h-5" />
//                           </button>
//                         </td>
//                         <td className="px-6 py-4 flex text-center mt-4 gap-2 ">
//                           <button
//                             onClick={() => handleEdit(item)}
//                             className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
//                             title="Edit"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleNormalLogin(item)}
//                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
//                             title="Normal Login"
//                           >
//                             <LogIn className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleRemove(item.id)}
//                             className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
//                             title="Remove"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </td>
//                         <td className="px-6 py-4">
//                           <button
//                             onClick={() => {
//                               setSelecteCscId(item.cscId);
//                               setShowModal(true);
//                             }}
//                             className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
//                           >
//                             <Eye className="w-4 h-4" /> View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {showEditModal && editingItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-600">
//             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//               <Edit className="w-6 h-6 text-yellow-400" />
//               Edit CSC ID
//             </h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-slate-300 font-semibold mb-2">CSC ID</label>
//                 <input
//                   type="text"
//                   value={editingItem.cscId}
//                   onChange={(e) => setEditingItem({ ...editingItem, cscId: e.target.value })}
//                   className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-slate-300 font-semibold mb-2">Password</label>
//                 <input
//                   type="password"
//                   value={editingItem.password}
//                   onChange={(e) => setEditingItem({ ...editingItem, password: e.target.value })}
//                   className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-slate-300 font-semibold mb-2">Status</label>
//                 <select
//                   value={editingItem.status_new}
//                   onChange={(e) => setEditingItem({ ...editingItem, status_new: e.target.value as "ACTIVE" | "INACTIVE" })}
//                   className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                 >
//                   <option value="ACTIVE">ACTIVE</option>
//                   <option value="INACTIVE">INACTIVE</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={handleEditSubmit}
//                 className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setEditingItem(null);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Login Modal */}
//       {iframeUrl && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//           <div className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-600">
//             <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-5 flex justify-between items-center shadow-lg">
//               <div>
//                 <h2 className="text-white font-black text-lg">
//                   {loginType === "digi" ? "🔐 Digi Login" : "🔓 Normal Login"}
//                 </h2>
//                 <p className="text-emerald-100 text-xs mt-1">Secure Session</p>
//               </div>
//               <button
//                 onClick={() => {
//                   setIframeUrl("");
//                   setLoginType(null);
//                 }}
//                 className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-bold text-xl shadow-lg transform hover:scale-110"
//               >
//                 ✕
//               </button>
//             </div>

//             {iframeLoading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 flex-col gap-4 backdrop-blur-sm">
//                 <div className="w-14 h-14 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
//                 <p className="text-white font-bold text-lg">Loading Portal...</p>
//               </div>
//             )}

//             <div className="flex-1 overflow-hidden bg-slate-700">
//               <iframe
//                 key={iframeUrl}
//                 src={iframeUrl}
//                 className="w-full h-full border-none"
//                 title="CSC Login Session"
//                 onLoad={() => setIframeLoading(false)}
//                 onError={() => setIframeLoading(false)}
//                 sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
//               ></iframe>
//             </div>

//             <div className="bg-slate-800 px-6 py-3 border-t border-slate-600 text-xs text-slate-400">
//               Session Type: <span className="text-emerald-400 font-bold">{loginType === "digi" ? "Digi Login" : "Normal Login"}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CSC Modal */}
//       {showModal && (
//         <CscModal selecteCscId={selecteCscId} onClose={() => setShowModal(false)} />
//       )}
//     </div>
//   );
// }



































"use client";

import CscForm from "@/components/csc/CscForm";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import CscModal from "@/components/csc/CscModal";
import { ChevronDown, LogIn, Power, Trash2, Eye, Loader, AlertCircle, Edit } from "lucide-react";

interface CscDataItem {
  id: string | number;
  name: string;
  cscId: string;
  currentBalance: string | number;
  payment: string;
  billCount: string;
  password: string;
  mpin: string;
  status_new: "ACTIVE" | "INACTIVE";
}

export default function CscIdsPage() {
  const [showCscForm, setShowCscForm] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("10/07/2025");
  const [endDate, setEndDate] = useState<string>("10/07/2025");
  const [AmountLimit, setAmountLimit] = useState<string>("");
  const [AutoLoading, setAutoLoading] = useState<string>("");

  const [cscData, setCscData] = useState<CscDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [balanceLoading, setBalanceLoading] = useState<Record<string, boolean>>({});
  const [statusLoading, setStatusLoading] = useState<Record<string, boolean>>({});
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [userid, setUserid] = useState<string>("");
  const [selecteCscId, setSelecteCscId] = useState<string>("");
  const [iframeLoading, setIframeLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<"digi" | "normal" | null>(null);
  const [editingItem, setEditingItem] = useState<CscDataItem | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // ✅ Fetch Balance for a specific CSC ID
  const fetchBalance = async (cscId: string): Promise<void> => {
    try {
      setBalanceLoading((prev) => ({ ...prev, [cscId]: true }));
      const response = await axiosInstance.get(
        `https://api.partner.kashishindiapvtltd.com/api/cscsession/balance/get/${cscId}`
      );

      const balance = response?.data || response?.data?.data || "0";

      setCscData((prevData) =>
        prevData.map((item) =>
          item.cscId === cscId
            ? { ...item, currentBalance: balance }
            : item
        )
      );
    } catch (error) {
      console.error(`Error fetching balance for ${cscId}:`, error);
      setCscData((prevData) =>
        prevData.map((item) =>
          item.cscId === cscId
            ? { ...item, currentBalance: "0" }
            : item
        )
      );
    } finally {
      setBalanceLoading((prev) => ({ ...prev, [cscId]: false }));
    }
  };

  // ✅ Fetch CSC Data using axiosInstance
  useEffect(() => {
    const fetchCscData = async (): Promise<void> => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user?.id;

        if (!userId) {
          console.error("User ID not found in localStorage.");
          setLoading(false);
          return;
        }

        setUserid(userId);

        const response = await axiosInstance.get(`/api/csc/${userId}`);
        ///updateTopup


        console.log(response?.data);
        const responseAmountLimit = await axiosInstance.get(`/getTopup`);
        const responseAutoLoading = await axiosInstance.get(`/getAutoLoading`);
        console.log("AutoLoading", responseAutoLoading?.data);
        setAutoLoading(responseAutoLoading?.data?.autoLoading || "");
        setAmountLimit(responseAmountLimit?.data?.amountToAdd || "");

        const result = response.data;

        if (result?.data && result.data.length > 0) {
          const formatted: CscDataItem[] = result.data.map((item: any, index: number) => ({
            id: item.id,
            name: user?.name || "N/A",
            cscId: item.csc_id,
            currentBalance: "Login First!",
            payment: "No payments found",
            billCount: "No bills found",
            password: item.password,
            status_new: item.status_new === "ACTIVE" ? "ACTIVE" : "INACTIVE",
          }));
          setCscData(formatted);

          formatted.forEach((item: CscDataItem) => {
            fetchBalance(item.cscId);
          });
        } else {
          setCscData([]);
        }
      } catch (error) {
        console.error("Error fetching CSC IDs:", error);
        setCscData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCscData();
  }, []);

  const handleRemove = (id: string | number): void => {
    const confirmed = window.confirm("Are you sure you want to delete this CSC record?");

    if (!confirmed) return;

    setCscData(cscData.filter((item) => item.id !== id));

    const URL = `https://api.partner.kashishindiapvtltd.com/api/csc/${id}`;

    axiosInstance.delete(URL)
      .then(response => {
        console.log("Deleted successfully:", response.data);
      })
      .catch(error => {
        console.error("Error deleting CSC ID:", error);
      });
  };

  // ✅ Handle Edit Button Click
  const handleEdit = (item: CscDataItem): void => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  // ✅ Handle Edit Form Submit
  const handleEditSubmit = async (): Promise<void> => {
    if (!editingItem) return;

    try {
      const response = await axiosInstance.put(
        `https://api.partner.kashishindiapvtltd.com/api/csc/${editingItem.id}`,
        {
          csc_id: editingItem.cscId,
          password: editingItem.password,
          status_new: editingItem.status_new,
        }
      );

      console.log("Update response:", response.data);

      // Update local state
      setCscData(
        cscData.map((item) =>
          item.id === editingItem.id ? editingItem : item
        )
      );

      alert("CSC ID updated successfully!");
      setShowEditModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating CSC ID:", error);
      alert("Failed to update CSC ID. Please try again.");
    }
  };

  const toggleStatus = async (id: string | number, item: CscDataItem): Promise<void> => {
    try {
      const cscItem = cscData.find((el) => el.id === id);
      if (!cscItem) return;

      const newStatus = cscItem.status_new === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      setStatusLoading((prev) => ({ ...prev, [id]: true }));

      const response = await axiosInstance.put(
        `https://api.partner.kashishindiapvtltd.com/api/cscsession/${item.cscId}`,
        {
          status: newStatus,
          csc_id: cscItem.cscId,
        }
      );

      console.log("Status update response:", response.data);

      setCscData(
        cscData.map((el) =>
          el.id === id
            ? {
              ...el,
              status_new: newStatus as "ACTIVE" | "INACTIVE",
            }
            : el
        )
      );

      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setStatusLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDigiLogin = (item: CscDataItem): void => {
    try {
      const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login/digi?user_id=${item.cscId}&password=${item.password}&csc_id=${userid}`;
      console.log("Opening Digi Login URL:", url);
      setIframeUrl(url);
      setLoginType("digi");
      setIframeLoading(true);
    } catch (error) {
      console.error("Error in handleDigiLogin:", error);
      alert("Failed to load Digi Login. Please try again.");
    }
  };

  const handleNormalLogin = (item: CscDataItem): void => {
    try {
      const url = `https://api.partner.kashishindiapvtltd.com/api/cscsession/Logincsc/login?csc_id=${item.cscId}&password=${item.password}&user_id=${userid}`;
      console.log("Opening Normal Login URL:", url);
      setIframeUrl(url);
      setLoginType("normal");
      setIframeLoading(true);
    } catch (error) {
      console.error("Error in handleNormalLogin:", error);
      alert("Failed to load Normal Login. Please try again.");
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userid);

    try {
      setUploading(true);
      const response = await axiosInstance.post(
        "https://api.partner.kashishindiapvtltd.com/import",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data?.message || "File uploaded successfully!");
      window.location.reload();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      alert(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const StartLoading = async (item: any) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 10000);

      alert("Started");

      const res = await fetch(
        `https://api.partner.kashishindiapvtltd.com/api/cscsession/topup/get?csc_id=${item.cscId}`,
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      console.log("Response:", data);

    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn("Fetch aborted due to timeout");
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleAmountLimitChange = () => {
    fetch(`https://api.partner.kashishindiapvtltd.com/updateTopup?amount=${AmountLimit}`)
      .then((res) => res.json())
      .then((data) => {
        alert("Amount limit updated successfully");
        console.log("Amount limit updated:", data);
      })
      .catch((error) => {
        console.error("Error updating amount limit:", error);
      });
  }


  const changeAutoLoading = (val: any) => {
    setAutoLoading(val);
    fetch(`https://api.partner.kashishindiapvtltd.com/setautoLoading?status=` + val)
      .then((res) => res.json())
      .then((data) => {
        alert("Amount limit updated successfully");
        console.log("Amount limit updated:", data);
      })
      .catch((error) => {
        console.error("Error updating amount limit:", error);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            My CSC IDs
          </h1>
          <p className="text-slate-300 text-lg">Manage and monitor your CSC accounts efficiently</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-slate-600/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Filters Row */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm">Start Date</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm">End Date</label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm opacity-0">Filter</label>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                Filter
              </button>
            </div>

            {/* TopUp Limit Row */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm">TopUp Limit</label>
              <input
                type="text"
                value={AmountLimit}
                onChange={(e) => setAmountLimit(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm opacity-0">Set</label>
              <button
                onClick={handleAmountLimitChange}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Set TopUp Limit
              </button>
            </div>

            {/* Auto Loading */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm">Auto Loading 
                <label className="text-blue-500"> {AutoLoading == "ON" ? "Started" : "OFF"}</label>
              </label>
              <button
                onClick={() => changeAutoLoading(AutoLoading === "ON" ? "OFF" : "ON")}
                className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200 hover:bg-slate-600/50"
                value={AutoLoading === "ON" ? "OFF" : "ON"}
              >
                {AutoLoading === "ON" ? "Turn Off" : "Turn On"}
              </button>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm opacity-0">Action</label>
              <button
                onClick={() => setShowCscForm(true)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Add CSC IDs
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-300 font-semibold text-sm opacity-0">Import</label>
              <div className="relative">
                <input
                  type="file"
                  id="xlsxFile"
                  accept=".xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="xlsxFile"
                  className="cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-8 py-2.5 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Import from Excel
                </label>
              </div>
            </div>
          </div>
        </div>
        {showCscForm && (
          <CscForm userid={userid} onClose={() => setShowCscForm(false)} />
        )}

        {/* Table Section */}
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-slate-600/50">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin">
                  <Loader className="w-12 h-12 text-emerald-400" />
                </div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                    <th className="px-6 py-4 text-left font-bold text-sm">Sr. No</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">CSC ID</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Balance</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Payments</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Digi Login</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Status</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Start Loading</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Actions</th>
                    <th className="px-6 py-4 text-left font-bold text-sm">Session</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {cscData.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <AlertCircle className="w-16 h-16 mb-4 text-slate-500" />
                          <p className="text-xl font-semibold mb-2">No CSC IDs Found</p>
                          <p className="text-sm">Click "Add CSC IDs" to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    cscData.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-700/50 transition duration-200 border-slate-700"
                      >
                        <td className="px-6 py-4 text-slate-300 font-semibold">{index + 1}</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full font-mono text-sm font-bold">
                            {item.cscId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                item.currentBalance === "Login First!" ||
                                  item.currentBalance === "Error fetching"
                                  ? "text-red-400 font-bold"
                                  : "text-emerald-400 font-bold text-lg"
                              }
                            >
                              {item.currentBalance}
                            </span>
                            {balanceLoading[item.cscId] && (
                              <span className="text-xs text-slate-400 animate-pulse">
                                (loading...)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{item.payment}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDigiLogin(item)}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg px-4 py-2 transition duration-300 transform hover:scale-105 font-semibold flex items-center gap-2 shadow-lg"
                          >
                            <LogIn className="w-4 h-4" /> Digi
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleStatus(item.id, item)}
                            disabled={statusLoading[item.id as string]}
                            className={`px-4 py-2 rounded-lg font-bold transition duration-300 flex items-center gap-2 shadow-lg ${item.status_new === "ACTIVE"
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                              } ${statusLoading[item.id as string] ? "opacity-60 cursor-not-allowed" : "hover:scale-105 transform"}`}
                          >
                            {statusLoading[item.id as string] ? (
                              <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <Power className="w-4 h-4" />
                                {item.status_new}
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 ">
                          <button
                            onClick={() => StartLoading(item)}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
                            title="start loading"
                          >
                            <Power className="w-5 h-5" />
                          </button>
                        </td>
                        <td className="px-6 py-4 flex text-center mt-4 gap-2 ">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleNormalLogin(item)}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
                            title="Normal Login"
                          >
                            <LogIn className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg px-3 py-2 transition duration-300 transform hover:scale-105 font-semibold shadow-lg"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelecteCscId(item.cscId);
                              setShowModal(true);
                            }}
                            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-600">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Edit className="w-6 h-6 text-yellow-400" />
              Edit CSC ID
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">CSC ID</label>
                <input
                  type="text"
                  value={editingItem.cscId}
                  onChange={(e) => setEditingItem({ ...editingItem, cscId: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={editingItem.password}
                  onChange={(e) => setEditingItem({ ...editingItem, password: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Status</label>
                <select
                  value={editingItem.status_new}
                  onChange={(e) => setEditingItem({ ...editingItem, status_new: e.target.value as "ACTIVE" | "INACTIVE" })}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                }}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {iframeUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-600">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-5 flex justify-between items-center shadow-lg">
              <div>
                <h2 className="text-white font-black text-lg">
                  {loginType === "digi" ? "🔐 Digi Login" : "🔓 Normal Login"}
                </h2>
                <p className="text-emerald-100 text-xs mt-1">Secure Session</p>
              </div>
              <button
                onClick={() => {
                  setIframeUrl("");
                  setLoginType(null);
                }}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-bold text-xl shadow-lg transform hover:scale-110"
              >
                ✕
              </button>
            </div>

            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 flex-col gap-4 backdrop-blur-sm">
                <div className="w-14 h-14 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-white font-bold text-lg">Loading Portal...</p>
              </div>
            )}

            <div className="flex-1 overflow-hidden bg-slate-700">
              <iframe
                key={iframeUrl}
                src={iframeUrl}
                className="w-full h-full border-none"
                title="CSC Login Session"
                onLoad={() => setIframeLoading(false)}
                onError={() => setIframeLoading(false)}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
              ></iframe>
            </div>

            <div className="bg-slate-800 px-6 py-3 border-t border-slate-600 text-xs text-slate-400">
              Session Type: <span className="text-emerald-400 font-bold">{loginType === "digi" ? "Digi Login" : "Normal Login"}</span>
            </div>
          </div>
        </div>
      )}

      {/* CSC Modal */}
      {showModal && (
        <CscModal selecteCscId={selecteCscId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}