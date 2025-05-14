import { useModalStore } from "../../stores/modalStore";
import "./Modal.css";
// import type { ReactNode } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   modalContent: ReactNode | null;
// }

// export const Modal = ({ isOpen, closeModal, modalContent }: ModalProps) => {
export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {modalContent}
        <a className="modal-close" onClick={closeModal}>
          x
        </a>
      </div>
    </div>
  );
};
