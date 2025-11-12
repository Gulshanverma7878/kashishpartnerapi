import { axiosInstance } from "@/lib/axios";
import axios from "axios";

export const fetchCardsApi = async () => {
  const res = await axiosInstance.get("api/fetchbill/get/list");
  return res.data?.data || [];
};
