import { addCardApi, CardData } from "@/apis/cardsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addCardApi, CardData } from "@/services/CardManagement/cardService";

export const useAddCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CardData) => addCardApi(data),
    onSuccess: () => {
      // refresh the card list after successful addition
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
