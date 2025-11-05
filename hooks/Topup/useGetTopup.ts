// 📁 hooks/usePaycards.ts
import { fetchPaycards } from "@/apis/paycardService";
import { useQuery } from "@tanstack/react-query";
// import { fetchPaycards } from "@/services/paycardService";

export const usePaycards = () => {
  return useQuery({
    queryKey: ["paycards"],
    queryFn: fetchPaycards,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};


