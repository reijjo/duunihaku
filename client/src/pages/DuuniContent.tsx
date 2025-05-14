// import { useSuspenseQuery } from "@tanstack/react-query";
import type { Duuni } from "../utils/types";
// import { useModal } from "../context/useModal";
// import { Modal } from "../components/modal/Modal";
import { ModifyModal } from "../components/modal/modifcation/ModifyModal";
import { formatDate } from "../utils/helperFunctions";
import { Suspense } from "react";
import { Loading } from "../components/Loading";
import { useFilteredDuunit } from "../hooks/useFilteredDuunit";
import { DuuniFilters } from "./DuuniFilters";
import { GET_ALL_DUUNIT } from "../graphql/queries";
import { useSuspenseQuery } from "@apollo/client/react";
import { useModalStore } from "../stores/modalStore";

type ColumnKey = keyof Duuni;

type Column = {
  key: ColumnKey;
  label: string;
};

export const DuuniContent = () => {
  const { data } = useSuspenseQuery<{ getAllDuunit: Duuni[] }>(GET_ALL_DUUNIT);
  const { openModal } = useModalStore();
  // const { isOpen, openModal, closeModal, modalContent } = useModal();
  const {
    kaikki,
    setKaikki,
    hae,
    setHae,
    alkaen,
    setAlkaen,
    filtered: filteredDuunit,
  } = useFilteredDuunit(data?.getAllDuunit ?? []);

  const handleOpenModal = (id: string) => {
    openModal(
      <Suspense fallback={<Loading />}>
        <ModifyModal id={id} />
      </Suspense>
    );
  };

  const vastattu = filteredDuunit.filter((d) => d.vastattu).length;
  const eiVastattu = filteredDuunit.length - vastattu;

  const columns: Column[] = [
    { key: "haettu", label: "Haettu" },
    { key: "firma", label: "Firma" },
    { key: "title", label: "Title" },
    { key: "vastattu", label: "Vastattu" },
    { key: "vastaus", label: "Vastaus" },
    { key: "extra", label: "Extra" },
  ];

  const renderCellContent = (duuni: Duuni, key: ColumnKey): string => {
    const value = duuni[key];

    // Handle date fields
    if (key === "haettu" || key === "vastattu") {
      return value ? formatDate(new Date(value)) : "-";
    }

    // Handle other fields
    return value !== undefined && value !== null ? String(value) : "-";
  };

  return (
    <section>
      <h2>Yhteensä: {filteredDuunit.length} kpl</h2>
      <div className="responses">
        <h4>Vastattu: {vastattu}</h4>
        <h4>Ei vastattu: {eiVastattu}</h4>
        <h4>Haastattelut: 5</h4>
      </div>
      <DuuniFilters
        hae={hae}
        setHae={setHae}
        alkaen={alkaen}
        setAlkaen={setAlkaen}
        kaikki={kaikki}
        setKaikki={setKaikki}
      />
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
      {/* <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        modalContent={modalContent}
      /> */}
    </section>
  );
};
