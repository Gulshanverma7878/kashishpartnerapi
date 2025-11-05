import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaycard } from "@/apis/paycardService";
// import { toast } from "react-hot-toast";

export const useUpdatePaycard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updatePaycard(id, payload),

    onSuccess: (data) => {
      // toast.success("Paycard updated successfully!");
      // ✅ Refresh paycards list after update
      queryClient.invalidateQueries({ queryKey: ["paycards"] });
    },

    onError: () => {
      // toast.error("Failed to update paycard!");
    },
  });
};
