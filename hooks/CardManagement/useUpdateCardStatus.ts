// hooks/CardManagement/useUpdateCardStatus.ts
import { cardApi } from "@/apis/cardsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCardStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      cardApi.updateStatus(id, status),

    onSuccess: () => {
      // Refetch the cards list automatically after status update
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
