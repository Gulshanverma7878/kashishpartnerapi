"use client";

import BillFetchQueryDocs from "./BillFetchQueryDocs";

// import BillFetchQueryDocs from "@/components/BillFetchQueryDocs";

export default function BillFetchApiDocs() {
  return (
    <div>
      {/* Existing Bill Fetch Documentation */}
      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">📄 Bill Fetch API Documentation</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">🔗 Endpoint</h2>
          <pre className="bg-gray-100 p-3 rounded mt-2">
             https://api.partner.kashishindiapvtltd.com/api/fetchbill?
          </pre>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">🔄 Method</h2>
          <p className="mt-2">GET</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">📦 Query Parameters</h2>
          <table className="w-full mt-2 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Parameter</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border text-center">client_id</td>
                <td className="p-2 border text-center">string</td>
                <td className="p-2 border text-center">Your provided client ID</td>
              </tr>

              <tr>
                <td className="p-2 border text-center">client_secret</td>
                <td className="p-2 border text-center">string</td>
                <td className="p-2 border text-center">Your secret key</td>
              </tr>
              <tr>
                <td className="p-2 border text-center">number</td>
                <td className="p-2 border text-center">string</td>
                <td className="p-2 border text-center">Customer bill number (e.g., "500001038890")</td>
                
              </tr>
              <tr>
                <td className="p-2 border text-center">op_code</td>
                <td className="p-2 border text-center">string</td>
                <td className="p-2 border text-center">Operator code (e.g., "139")</td>
              </tr>

            </tbody>
          </table>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">📌 Notes</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use this API to fetch electricity or utility bill details.</li>
            <li>Response includes customer name, amount, and due date.</li>
            <li>Supports only GET requests.</li>
          </ul>
        </section>
      </div>

      {/* 👇 Include the query example component */}
      <BillFetchQueryDocs />
    </div>
  );
}
