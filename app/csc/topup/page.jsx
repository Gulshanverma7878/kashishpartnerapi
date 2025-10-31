// 'use client';

// import { useState, useEffect } from 'react';
// import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// export default function PaycardTable() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('createdAt');
//   const [sortDirection, setSortDirection] = useState('desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('https://api.partner.kashishindiapvtltd.com/paycardlist');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
        
//         const result = await response.json();
        
//         if (result.success && result.cards) {
//           setData(result.cards);
//         } else {
//           throw new Error('Invalid data format');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter data based on search
//   const filteredData = data.filter(item =>
//     item.csc_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.card.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Sort data
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (!sortField) return 0;
    
//     const aVal = a[sortField];
//     const bVal = b[sortField];
    
//     if (sortDirection === 'asc') {
//       return aVal > bVal ? 1 : -1;
//     } else {
//       return aVal < bVal ? 1 : -1;
//     }
//   });

//   // Paginate data
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'success':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'inactive':
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//       case 'suspended':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'blocked':
//         return 'bg-red-100 text-red-800 border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     });
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(parseFloat(amount));
//   };

//   return (
//     <div className="w-full p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Paycards</h1>
//           <p className="text-gray-600">Manage and view all paycard transactions</p>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
//           <div className="flex items-center gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by CSC ID, card, or status..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>
//             {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//               Add New Card
//             </button> */}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//               <span className="ml-3 text-gray-600">Loading paycards...</span>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="text-center">
//                 <p className="text-red-600 font-medium mb-2">Error loading data</p>
//                 <p className="text-gray-600 text-sm">{error}</p>
//               </div>
//             </div>
//           ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
//                     SR. No.
//                   </th>
//                   <th className="px-6 py-3 text-left  border-r  border-t">
//                     <button
//                       onClick={() => handleSort('csc_id')}
//                       className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider  hover:text-gray-900"
//                     >
//                       CSC ID
//                       <ArrowUpDown className="w-4 h-4" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
//                     Card Number
//                   </th>
//                   <th className="px-6 py-3 text-left  border-r  border-t">
//                     <button
//                       onClick={() => handleSort('status')}
//                       className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-gray-900"
//                     >
//                       Status
//                       <ArrowUpDown className="w-4 h-4" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
//                     Opening Balance
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
//                     Closing Balance
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
//                     Created At
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
//                     Updated At
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {paginatedData.length > 0 ? (
//                   paginatedData.map((item,index) => (
//                     <tr key={item.id} className="hover:bg-gray-50 transition-colors">
//                          <td className="px-6 py-4 whitespace-nowrap border-r border-t">
//                         <span className="text-sm font-medium text-gray-900">{index+1}</span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
//                         <span className="text-sm font-medium text-gray-900">{item.csc_id}</span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
//                         <span className="text-sm text-gray-700 font-mono">{item.card}</span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
//                         <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right border-r  border-t">
//                         <span className="text-sm font-medium text-gray-900">
//                           {formatCurrency(item.opening_balance)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right border-r  border-t">
//                         <span className="text-sm font-medium text-gray-900">
//                           {formatCurrency(item.closing_balance)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
//                         <span className="text-sm text-gray-600">{formatDate(item.createdAt)}</span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
//                         <span className="text-sm text-gray-600">{formatDate(item.updatedAt)}</span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center  border-t">
//                       <p className="text-gray-500">No paycards found</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           )}

//           {/* Pagination */}
//           {!loading && !error && totalPages > 1 && (
//             <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
//               <div className="text-sm text-gray-600">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <span className="text-sm text-gray-700 px-3">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function PaycardTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.partner.kashishindiapvtltd.com/paycardlist');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        
        if (result.success && result.cards) {
          setData(result.cards);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search
  const filteredData = data.filter(item =>
    item.csc_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.card.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(parseFloat(amount));
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paycards</h1>
          <p className="text-gray-600">Manage and view all paycard transactions</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by CSC ID, card, or status..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Add New Card
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading paycards...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-red-600 font-medium mb-2">Error loading data</p>
                <p className="text-gray-600 text-sm">{error}</p>
              </div>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    SR. No.
                  </th>
                  <th className="px-6 py-3 text-left  border-r  border-t">
                    <button
                      onClick={() => handleSort('csc_id')}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider  hover:text-gray-900"
                    >
                      CSC ID
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    Card Number
                  </th>
                  <th className="px-6 py-3 text-left  border-r  border-t">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-gray-900"
                    >
                      Status
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    Opening Balance
                  </th>
                   <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    TopUp Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    Closing Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider  border-r  border-t">
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item,index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4 whitespace-nowrap border-r border-t">
                        <span className="text-sm font-medium text-gray-900">{index+1}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
                        <span className="text-sm font-medium text-gray-900">{item.csc_id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
                        <span className="text-sm text-gray-700 font-mono">{item.card}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right border-r  border-t">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.opening_balance)}
                        </span>
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right border-r  border-t">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right border-r  border-t">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.closing_balance)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
                        <span className="text-sm text-gray-600">{formatDate(item.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r  border-t">
                        <span className="text-sm text-gray-600">{formatDate(item.updatedAt)}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center  border-t">
                      <p className="text-gray-500">No paycards found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-700 px-3">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}