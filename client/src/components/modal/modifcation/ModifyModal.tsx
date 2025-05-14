import { formatDate } from "../../../utils/helperFunctions";
import "./ModifyModal.css";
import { Input } from "../../ui/Input";
import { type FormEvent } from "react";
import { useModifyDuuni } from "../../../hooks/useModifyDuuni";

interface ModifyModalProps {
  id: string;
}

export const ModifyModal = ({ id }: ModifyModalProps) => {
  const { mutation, updateDuuni, duuni, handleChange } = useModifyDuuni(id);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleDelete = () => {
    // deleteMutation.mutate(id);
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
        <details className="eka-details">
          <summary>Lisää</summary>
          <div>
            <Input
              type="text"
              label="Firma"
              id="firma"
              name="firma"
              onChange={handleChange}
              value={updateDuuni.firma}
            />
            <Input
              type="text"
              label="Titteli"
              id="title"
              name="title"
              onChange={handleChange}
              value={updateDuuni.title}
            />
          </div>
          <details className="toka-details">
            <summary>Poista</summary>
            <button type="button" onClick={handleDelete}>
              Poista
            </button>
          </details>
        </details>
        <button type="submit">Valmista!</button>
      </div>
    </form>
  );
};
