import { cardApi } from "@/apis/cardsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // API call to delete the card
      return await cardApi.deleteCard(id);
    },
    onSuccess: () => {
      // Automatically refresh cards list after delete
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
