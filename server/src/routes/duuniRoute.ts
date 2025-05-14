import { Router } from "express";
import {
  addDuuni,
  deleteDuuni,
  // findDuuniById,
  getAllDuunit,
  updateDuuni,
} from "../controllers/duuniController";

const routerV1 = Router();
const routerV2 = Router();

routerV1.get("/", getAllDuunit);
routerV1.post("/", addDuuni);

// routerV1.get("/:id", findDuuniById);
routerV1.patch("/:id", updateDuuni);
routerV1.delete("/:id", deleteDuuni);

export const duuniRouterV1 = routerV1;
export const duuniRouterV2 = routerV2;
