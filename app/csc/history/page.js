'use client';
import React, { useState } from 'react';

const TransactionSearch = () => {
  const [identifier, setIdentifier] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const getUserIdFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
  };

  const searchTransaction = async () => {
    const userId = getUserIdFromLocalStorage();
alert(userId)
alert(identifier)

    if (!userId || !identifier) {
      setError('User ID or Identifier is missing!');
      return;
    }

    const apiUrl = `https://api.partner.kashishindiapvtltd.com/api/recharge/status?number=${identifier}&id=${userId}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.message === 'SUCCESS') {
        setTransactions(data.data);
        setError(null);
      } else if (data.err) {
        setError(data.err);
        setTransactions([]);
      } else {
        setError('No transactions found or there was an error.');
        setTransactions([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Search CSC Transaction</h1>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Identifier (e.g. 7878837341)"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={searchTransaction}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-sm transition"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Results Table */}
      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">Sr. No</th>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">Transaction ID</th>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">Bill ID</th>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">CSC ID</th>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold border text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn, index) => (
                <tr key={txn.cscTxn} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 text-center border text-blue-700 break-all">{txn.cscTxn}</td>
                  <td className="px-4 py-2 text-center border text-blue-700 break-all">{txn.refId}</td>
                  <td className="px-4 py-2 text-center border text-blue-700 break-all">{txn.cscId}</td>
                  <td className="px-4 py-2 text-center border text-gray-700">₹{txn.txnAmount}</td>
                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === '0'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {txn.status === '0' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center text-gray-600">
                    {new Date(txn.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionSearch;
