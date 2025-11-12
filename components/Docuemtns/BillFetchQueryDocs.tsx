"use client";

export default function BillFetchQueryDocs() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 border-t mt-8 pt-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Bill Payment Query Example</h2>

      {/* Query Example */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">📦 Example Query</h3>
        <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
          {`https://api.partner.kashishindiapvtltd.com/api/transaction?client_id={client_id}&client_secret={client_secret}&number=500001038890&op_code=139`}
        </pre>
      </section>

      {/* Parameters */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">🧾 Query Parameters</h3>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Parameter</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Required</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">client_id</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">✅ Yes</td>
              <td className="p-2 border">Your provided client ID</td>
            </tr>
            <tr>
              <td className="p-2 border">client_secret</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">✅ Yes</td>
              <td className="p-2 border">Your secret key</td>
            </tr>
            <tr>
              <td className="p-2 border">number</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">✅ Yes</td>
              <td className="p-2 border">Customer bill number</td>
            </tr>
            <tr>
              <td className="p-2 border">op_code</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">✅ Yes</td>
              <td className="p-2 border">Operator code</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Example Response */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">📤 Example Response</h3>
        <pre className="bg-green-100 p-3 rounded mt-2 text-sm overflow-x-auto">
          {`  {
            "message": "fetched successfully",
            "data": {
              "billnumber": "500001038890",
              "amount": "6180.00",
              "consumerName": "prakashchandra ramchandra swain ",
              "billDate": "2025-09-26",
              "dueDate": "2025-10-13"
            },
            "status": "SUCCESS"
            } `}
        </pre>
      </section>
      {/* Error Response */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">❌ Error Response</h2>
        <pre className="bg-red-100 p-3 rounded mt-2 text-sm">
          {`{
            "message": "failed reason message",
            "data": "null"
            "status":"FAILED"
            }`}
        </pre>
      </section>

      {/* Notes */}
      <section>
        <h3 className="text-lg font-semibold">📌 Notes</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            Make sure you pass both <code>number</code> and <code>op_code</code>{" "}
            in the query.
          </li>
          <li>
            The response contains billing details like amount, bill date, and
            due date.
          </li>
          <li>
            If <code>apistatus</code> is <code>true</code>, the data is valid
            and fetched successfully.
          </li>
        </ul>
      </section>
    </div>
  );
}
