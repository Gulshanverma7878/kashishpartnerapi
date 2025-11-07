// 📁 services/paycardService.ts
// import axiosInstance from "@/lib/axiosInstance";

import { axiosInstance } from "@/lib/axios";

// ?startDate=2025-11-01&endDate=2025-11-06

export async function fetchPaycards(startDate?: string, endDate?: string) {
  try {
     
    const response = await axiosInstance.get(`/paycardlist?startDate=${startDate}&endDate=${endDate}`);

    const result = response.data;

    if (!result.success || !result.cards) {
      throw new Error("Invalid data format");
    }

    // Sort by newest first
    return result.cards.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch paycards");
  }
}






const API_URL = "cscsession/history";

export const updatePaycard  = async (id: string, updatedData: any) => {
  try {
    const response = await axiosInstance.patch(`api/cscsession/history/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update record");
  }
};
