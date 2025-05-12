import { Router } from "express";
import {
  addDuuni,
  deleteDuuni,
  findDuuniById,
  getAllDuunit,
  updateDuuni,
} from "../controllers/duuniController";

const router = Router();

router.get("/", getAllDuunit);
router.post("/", addDuuni);

router.get("/:id", findDuuniById);
router.patch("/:id", updateDuuni);
router.delete("/:id", deleteDuuni);

export const duuniRouter = router;
