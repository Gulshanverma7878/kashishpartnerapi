"use client";

import { fetchPaycards } from "@/apis/paycardService";
import { useQuery } from "@tanstack/react-query";
// import { fetchPaycards } from "@/services/paycardService";
import { useEffect, useState } from "react";

export const usePaycards = (startDate?: string, endDate?: string) => {
  // 👇 React Query setup
  const query = useQuery({
    queryKey: ["paycards", startDate, endDate],
    queryFn: () => fetchPaycards(startDate, endDate),
    staleTime: 1000 * 60 * 5, // cache 5 min
    refetchOnWindowFocus: false,
    enabled: !!startDate && !!endDate, // run only when both dates are set
  });

  return query;
};
