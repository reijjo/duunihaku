import { useMemo, useState } from "react";
import type { Duuni } from "../utils/types";

export const useFilteredDuunit = (duunit: Duuni[]) => {
  const [kaikki, setKaikki] = useState(true);
  const [hae, setHae] = useState("");
  const [alkaen, setAlkaen] = useState("");

  const filtered = useMemo(() => {
    return duunit
      .filter((d) => (kaikki ? true : !d.vastattu))
      .filter(
        (d) =>
          hae.trim() === "" ||
          d.firma.toLowerCase().includes(hae.toLowerCase()) ||
          d.title.toLowerCase().includes(hae.toLowerCase())
      )
      .filter((d) => {
        if (!alkaen) return true;
        return new Date(d.haettu) >= new Date(alkaen);
      });
  }, [duunit, kaikki, hae, alkaen]);

  return {
    kaikki,
    setKaikki,
    hae,
    setHae,
    alkaen,
    setAlkaen,
    filtered,
  };
};
