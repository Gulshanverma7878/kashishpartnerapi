'use client'
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface CscFormProps {
  onClose: () => void;
  userid: string;
}

const CscForm = ({ onClose, userid }: CscFormProps) => {
  const [cscId, setCscId] = useState("");  
  const [mpin, setMpin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      userid,
      csc_id: cscId,
      mpin,
      password,
    };

    try {
      const response = await axiosInstance.post("/api/csc", formData);
      console.log("API response:", response.data);

      toast('Success', { description: 'CSC ID submitted successfully!' });
      onClose();
    } catch (err: any) {
      console.error(err);
      toast('Error', {
        description: err?.response?.data?.err || err?.message || 'Submission failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40">
      <div className="relative w-full max-w-md bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl shadow-2xl border border-white/30 p-8 transform transition-all duration-300 hover:scale-[1.02]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800">
          CSC ID Refresh / Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* CSC ID */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              CSC ID
            </label>
            <input
              type="text"
              value={cscId}
              onChange={(e) => setCscId(e.target.value)}
              placeholder="Enter your CSC ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm transition"
              required
            />
          </div>

          {/* MPIN */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              MPIN
            </label>
            <input
              type="password"
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
              placeholder="Enter your MPIN"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:from-green-600 hover:to-emerald-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CscForm;
