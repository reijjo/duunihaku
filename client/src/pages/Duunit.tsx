import "./Duunit.css";
import { Suspense } from "react";
import { Loading } from "../components/Loading";
import { DuuniContent } from "./DuuniContent";
import { Modal } from "../components/modal/Modal";
import { ApplicationModal } from "../components/modal/application/ApplicationModal";
import { useModalStore } from "../stores/modalStore";

const Duunit = () => {
  const { openModal } = useModalStore();

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

      <Modal />
    </main>
  );
};

export default Duunit;
