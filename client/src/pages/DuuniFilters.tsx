import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { Input } from "../components/ui/Input";

interface DuuniFiltersProps {
  hae: string;
  setHae: (value: string) => void;
  alkaen: string;
  setAlkaen: Dispatch<SetStateAction<string>>;
  kaikki: boolean;
  setKaikki: Dispatch<SetStateAction<boolean>>;
}

export const DuuniFilters = ({
  hae,
  setHae,
  alkaen,
  setAlkaen,
  kaikki,
  setKaikki,
}: DuuniFiltersProps) => {
  const handleHae = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHae(value);
  };

  return (
    <div className="show-buttons">
      <Input
        type="date"
        id="alkaen"
        name="alkean"
        label="Alkaen"
        value={alkaen}
        onChange={(e) => setAlkaen(e.target.value)}
      />
      <button
        className={kaikki ? "active-btn" : ""}
        onClick={() => setKaikki(true)}
      >
        Kaikki
      </button>
      <button
        className={!kaikki ? "active-btn" : ""}
        onClick={() => setKaikki(false)}
      >
        Ei Vastatut
      </button>
      <div className="search">
        <Input
          type="text"
          placeholder="Hae..."
          value={hae}
          id="hae"
          name="hae"
          onChange={handleHae}
        />
        <button onClick={() => setHae("")}>Tyhjennä</button>
      </div>
    </div>
  );
};
