import { Suspense } from "react";
import "./Duunit.css";
import { Loading } from "../components/Loading";
import { DuuniContent } from "./DuuniContent";
import { useModal } from "../context/useModal";
import { Modal } from "../components/modal/Modal";
import { ApplicationModal } from "../components/modal/application/ApplicationModal";

const Duunit = () => {
  const { isOpen, openModal, closeModal, modalContent } = useModal();

  const handleOpenModal = () => {
    openModal(<ApplicationModal />);
  };

  return (
    <main className="wrapper">
      <section className="summary">
        <div className="summary-header">
          <h1>DUUNIHAKEMUKSET</h1>
          <button type="button" className="btn-cta" onClick={handleOpenModal}>
            Lisää hakemus
          </button>
        </div>
        <Suspense fallback={<Loading text="Ladataan hakemuksia..." />}>
          <DuuniContent />
        </Suspense>
      </section>

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        modalContent={modalContent}
      />
    </main>
  );
};

export default Duunit;
