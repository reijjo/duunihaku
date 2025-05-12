import { useSuspenseQuery } from "@tanstack/react-query";
import { getDuunit } from "../api/duuniApi";
import type { Duuni } from "../utils/types";
import { useModal } from "../context/useModal";
import { Modal } from "../components/modal/Modal";
import { ModifyModal } from "../components/modal/modifcation/ModifyModal";
import { formatDate } from "../utils/helperFunctions";
import { Suspense, useState, type ChangeEvent } from "react";
import { Loading } from "../components/Loading";
import { Input } from "../components/ui/Input";

type ColumnKey = keyof Duuni;

type Column = {
  key: ColumnKey;
  label: string;
};

export const DuuniContent = () => {
  const { data: duunit = [] } = useSuspenseQuery<Duuni[]>({
    queryKey: ["duunit"],
    queryFn: getDuunit,
  });
  const { isOpen, openModal, closeModal, modalContent } = useModal();
  const [kaikki, setKaikki] = useState(true);
  const [hae, setHae] = useState("");

  const handleOpenModal = (id: string) => {
    openModal(
      <Suspense fallback={<Loading />}>
        <ModifyModal id={id} />
      </Suspense>
    );
  };

  const vastattu = duunit.filter((d) => d.vastattu).length;
  const eiVastattu = duunit.length - vastattu;

  const columns: Column[] = [
    { key: "haettu", label: "Haettu" },
    { key: "firma", label: "Firma" },
    { key: "title", label: "Title" },
    { key: "vastattu", label: "Vastattu" },
    { key: "vastaus", label: "Vastaus" },
    { key: "extra", label: "Extra" },
  ];

  const filteredDuunit = duunit
    .filter((d) => (kaikki ? true : !d.vastattu))
    .filter(
      (d) =>
        hae.trim() === "" ||
        d.firma.toLowerCase().includes(hae.toLowerCase()) ||
        d.title.toLowerCase().includes(hae.toLowerCase())
    );
  const renderCellContent = (duuni: Duuni, key: ColumnKey): string => {
    const value = duuni[key];

    // Handle date fields
    if (key === "haettu" || key === "vastattu") {
      return value ? formatDate(new Date(value)) : "-";
    }

    // Handle other fields
    return value !== undefined && value !== null ? String(value) : "-";
  };

  const handleHae = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHae(value);
  };

  return (
    <section>
      <h2>Yhteensä: {duunit.length} kpl</h2>
      <div className="responses">
        <h4>Vastattu: {vastattu}</h4>
        <h4>Ei vastattu: {eiVastattu}</h4>
      </div>
      <div className="show-buttons">
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
      <div className="otsikot">
        {columns.map((col) => (
          <div key={col.key}>
            <h4>{col.label}</h4>
          </div>
        ))}
      </div>
      {filteredDuunit.length > 0 && (
        <div className="duuni">
          {filteredDuunit.map((d) => (
            <a
              key={d.id}
              className="duuni-list"
              onClick={() => handleOpenModal(d.id)}
            >
              {columns.map((col) => (
                <p key={col.key}>{renderCellContent(d, col.key)}</p>
              ))}
            </a>
          ))}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        modalContent={modalContent}
      />
    </section>
  );
};
