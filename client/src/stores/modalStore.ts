import type { ReactNode } from "react";
import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content: ReactNode) =>
    set({ isOpen: true, modalContent: content }),
  closeModal: () => {
    set({ isOpen: false });
    setTimeout(() => {
      set({ modalContent: null });
    }, 300);
  },
}));
