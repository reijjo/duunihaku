import { useState, type ChangeEvent } from "react";

import { toInputDateValue } from "../utils/helperFunctions";
import type { Duuni, ModifyDuuni } from "../utils/types";
import { useModalStore } from "../stores/modalStore";
import { FIND_DUUNI_BY_ID, GET_ALL_DUUNIT } from "../graphql/queries";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { UPDATE_DUUNI } from "../graphql/mutations";

export const useModifyDuuni = (id: string) => {
  const { closeModal } = useModalStore();

  const { data: duuni } = useSuspenseQuery<{ findDuuniById: Duuni }>(
    FIND_DUUNI_BY_ID,
    {
      variables: { id },
    }
  );
  const [updateMutation] = useMutation(UPDATE_DUUNI, {
    onCompleted: () => {
      closeModal();
    },
    refetchQueries: [GET_ALL_DUUNIT, "GetAllDuunit"],
  });

  const [updateDuuni, setUpdateDuuni] = useState<ModifyDuuni>({
    firma: duuni.findDuuniById.firma,
    title: duuni.findDuuniById.title,
    vastattu: duuni.findDuuniById.vastattu
      ? toInputDateValue(new Date(duuni.findDuuniById.vastattu))
      : "",
    vastaus: duuni.findDuuniById.vastaus ?? "",
    extra: duuni.findDuuniById.extra ?? "",
  });

  const mutation = {
    mutate: () => {
      updateMutation({
        variables: {
          id,
          input: {
            ...updateDuuni,
          },
        },
      });
    },
  };

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => deleteDuuniById(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["duunit"] });
  //     closeModal();
  //   },
  // });

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
    // deleteMutation,
    duuni: duuni.findDuuniById,
    handleChange,
  };
};
