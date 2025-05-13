import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newDuuni } from "../api/duuniApi";
import type { AddDuuni } from "../utils/types";

export const useAddDuuni = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddDuuni) => newDuuni(data),
    onSuccess: (res) => {
      queryClient.setQueryData(["duunit", res.id], res);
      queryClient.invalidateQueries({ queryKey: ["duunit"] });
      onSuccessCallback?.();
    },
  });
};
