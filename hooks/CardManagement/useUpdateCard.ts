// 📁 src/hooks/CardManagement/useUpdateCard.ts
import { updateCardService } from "@/apis/cardsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateCardService } from "@/services/CardManagement/updateCard.service";

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCardService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] }); // refresh list after update
    },
  });
};
