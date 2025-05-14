import "./ApplicationModal.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "../../ui/Input";
import { type AddDuuni } from "../../../utils/types";
import { toInputDateValue } from "../../../utils/helperFunctions";
import { useAddDuuni } from "../../../hooks/useAddDuuni";
import { useModalStore } from "../../../stores/modalStore";

export const ApplicationModal = () => {
  const [uus, setUus] = useState<AddDuuni>({
    haettu: toInputDateValue(new Date()),
    firma: "",
    title: "",
  });

  const { closeModal } = useModalStore();
  const mutation = useAddDuuni(closeModal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(uus);
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Uus hakemus</h2>
      <Input
        type="date"
        placeholder="Hakupvm"
        label="Hakupvm"
        id="hakupvm"
        name="hakupvm"
        value={uus.haettu}
        onChange={handleChange}
      />
      <Input
        placeholder="Firma"
        label="Firma"
        id="firma"
        name="firma"
        value={uus.firma}
        onChange={handleChange}
      />
      <Input
        placeholder="Titteli"
        label="Titteli"
        id="title"
        name="title"
        value={uus.title}
        onChange={handleChange}
      />
      <button type="submit">Lisää</button>
    </form>
  );
};
