// hooks/useCards.ts
"use client";
import { fetchCardsApi } from "@/apis/cardsApi";
import { useQuery } from "@tanstack/react-query";
// import { fetchCardsApi } from "@/services/cardsApi";

export function useCards() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCardsApi,
  });

  return {
    cards: data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}



