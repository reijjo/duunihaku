import { Router } from "express";
import {
  addDuuni,
  findDuuniById,
  getAllDuunit,
  updateDuuni,
} from "../controllers/duuniController";

const router = Router();

router.get("/", getAllDuunit);
router.post("/", addDuuni);

router.get("/:id", findDuuniById);
router.patch("/:id", updateDuuni);

export const duuniRouter = router;
