export type Duuni = {
  id: string;
  haettu: string;
  firma: string;
  title: string;
  vastattu: string;
  vastaus: string;
  extra: string;
};

export type ModifyDuuni = Omit<Duuni, "id" | "firma" | "title" | "haettu">;
export type AddDuuni = Omit<Duuni, "id" | "vastattu" | "vastaus" | "extra">;
