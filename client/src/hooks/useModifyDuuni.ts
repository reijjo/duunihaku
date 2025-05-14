import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import {
  findDuuniById,
  updateDuuniById,
  deleteDuuniById,
} from "../api/duuniApi";
import { toInputDateValue } from "../utils/helperFunctions";
import type { Duuni, ModifyDuuni } from "../utils/types";
import { useModalStore } from "../stores/modalStore";

export const useModifyDuuni = (id: string) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  const { data: duuni } = useSuspenseQuery<Duuni>({
    queryKey: ["duunit", id],
    queryFn: () => findDuuniById(id),
  });

  const [updateDuuni, setUpdateDuuni] = useState<ModifyDuuni>({
    firma: duuni.firma,
    title: duuni.title,
    vastattu: duuni.vastattu ? toInputDateValue(new Date(duuni.vastattu)) : "",
    vastaus: duuni.vastaus ?? "",
    extra: duuni.extra ?? "",
  });

  const mutation = useMutation({
    mutationFn: (data: ModifyDuuni) => updateDuuniById(id, data),
    onSuccess: (updateDuuni) => {
      queryClient.setQueryData(["duunit", id], updateDuuni);
      queryClient.invalidateQueries({ queryKey: ["duunit"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDuuniById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["duunit"] });
      closeModal();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateDuuni((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    mutation,
    updateDuuni,
    deleteMutation,
    duuni,
    handleChange,
  };
};
