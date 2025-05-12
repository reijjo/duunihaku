import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { type ModifyDuuni, type Duuni } from "../../../utils/types";
import {
  deleteDuuniById,
  findDuuniById,
  updateDuuniById,
} from "../../../api/duuniApi";
import { formatDate, toInputDateValue } from "../../../utils/helperFunctions";
import "./ModifyModal.css";
import { Input } from "../../ui/Input";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useModal } from "../../../context/useModal";

interface ModifyModalProps {
  id: string;
}

export const ModifyModal = ({ id }: ModifyModalProps) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { data: duuni } = useSuspenseQuery<Duuni>({
    queryKey: ["duunit", id],
    queryFn: () => findDuuniById(id),
  });

  const [updateDuuni, setUpdateDuuni] = useState<ModifyDuuni>({
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(updateDuuni);
  };

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  return (
    <form className="modify-form" onSubmit={handleSubmit}>
      <div className="modify-form-header">
        <h2>{duuni.firma}</h2>
        <h3>{duuni.title}</h3>
        <h5>Haettu: {formatDate(new Date(duuni.haettu))}</h5>
      </div>
      <div className="modify-form-inputs">
        <Input
          type="date"
          label="Vastattu"
          value={updateDuuni.vastattu as string}
          name="vastattu"
          id="vastattu"
          onChange={handleChange}
        />
        <Input
          label="Vastaus"
          value={updateDuuni.vastaus}
          name="vastaus"
          id="vastaus"
          onChange={handleChange}
        />
        <Input
          label="Extra Info"
          value={updateDuuni.extra}
          name="extra"
          id="extra"
          onChange={handleChange}
        />
        <details>
          <summary>Poista</summary>
          <button type="button" onClick={handleDelete}>
            Poista
          </button>
        </details>
        <button type="submit">Valmista!</button>
      </div>
    </form>
  );
};
