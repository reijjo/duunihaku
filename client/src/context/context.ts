import { createContext } from "react";
import type { ModalContextType } from "./ModalContext";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
