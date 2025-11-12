"use client";

export default function RechargeApiDocs() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📄 Recharge API Documentation</h1>

      {/* Endpoint */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🔗 Endpoint</h2>
        <pre className="bg-gray-100 p-3 rounded mt-2">
           https://api.partner.kashishindiapvtltd.com/api/transaction?
        </pre>
      </section>

      {/* Headers
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🔐 Headers</h2>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Key</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">client_id</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Your provided client ID</td>
            </tr>
            <tr>
              <td className="p-2 border">client_secret</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Your secret key</td>
            </tr>
          </tbody>
        </table>
      </section> */}

      {/* Body */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📦 Query Parameters</h2>
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Key</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
             <tr>
              <td className="p-2 border">client_id</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Your provided client ID</td>
            </tr>
            <tr>
              <td className="p-2 border">client_secret</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Your secret key</td>
            </tr>
            <tr>
              <td className="p-2 border">number</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Customer's mobile number</td>
            </tr>
            <tr>
              <td className="p-2 border">amount</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Recharge amount (e.g., "100")</td>
            </tr>
            <tr>
              <td className="p-2 border">operatorCode</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Operator code (e.g., "1")</td>
            </tr>
            {/* <tr>
              <td className="p-2 border">operatorCircle</td>
              <td className="p-2 border">string</td>
              <td className="p-2 border">Operator Circle (e.g., "RJ")</td>
            </tr> */}
           
          </tbody>
        </table>
      </section>

      {/* Method */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">🔄 Method</h2>
        <p className="mt-2">GET</p>
        {/* <p className="mt-1">
          Content-Type:{' '}
          <code className="bg-gray-200 px-2 py-1 rounded">
            application/x-www-form-urlencoded
          </code>
        </p> */}
      </section>

      {/* https://api.partner.kashishindiapvtltd.com/api/recharge/recharge?client_secret=cc3ff96f5e2155beb89ce26c877a7ccd1e1079f26f77f7c942f1aabdc19357d9&client_id=a59e58bccdefba5427a89155&operatorCode=#OPRCODE#&customerMobile=#MOBILENO#&amount=#AMOUNT# */}

      {/* Example Request */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">📦 Prepaid Recharge & DTH  Example Query</h3>
        <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
          {`https://api.partner.kashishindiapvtltd.com/api/transaction?client_id={client_id}&client_secret={client_secret}&number=9166622257&op_code=1`}
        </pre>
      </section>

      {/* Success Response */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📤 Success Response</h2>
        <pre className="bg-green-100 p-3 rounded mt-2 text-sm">
{`  {
              "status":" SUCCESS",
              "message":"Transaction successfully",
              "balance":"1234846.22",
              "error":null,
              "nubmer":"9166622257",
              "amount":149",
              "transactionId":"KIPL6331602864",
              "clientId:"123456",
              "opref":"937891337"
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

      {/* Pending Response */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">
          ⚠️ Pending Response - <span>status code: 400</span>
        </h2>
        <pre className="bg-yellow-100 p-3 rounded mt-2 text-sm">
{`{
    "status": "PENDING"
    "message": "pending reason message",
    "data": "null"
}`}
        </pre>
      </section>

      {/* Notes */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">📌 Notes</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Make sure all values are properly URL-encoded.</li>
          <li>API expects a <code>POST</code> request only.</li>
          <li>Check the response status to determine success or failure.</li>
        </ul>
      </section>
    </div>
  );
}
