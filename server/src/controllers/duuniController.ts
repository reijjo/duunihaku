import type { NextFunction, Request, Response } from "express";
import DuuniModel from "../db/models/duuniModel";

export const getAllDuunit = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const duunit = await DuuniModel.find({}).sort({ haettu: -1 });

    console.log(`Found ${duunit.length} documents`);

    res.status(200).json(duunit);
  } catch (err) {
    console.log("Error getting duunit", err);
    res.status(500).json({ error: "Server error getting data" });
  }
};

export const addDuuni = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { firma, title } = req.body;

  if (!firma || !title) {
    res.status(400).json({ error: "firma or title missing" });
    return;
  }

  const duunit = new DuuniModel({
    firma,
    title,
  });

  console.log(duunit);

  try {
    await duunit.save();
    res.status(201).json({ message: `Saved ${firma} -${title}` });
  } catch (err) {
    console.error("Error saving duuni:", err);
    res.status(500).json({ error: "Failed to save duuni." });
  }
};

export const findDuuniById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.params;

  try {
    const duuni = await DuuniModel.findById(id);

    if (!duuni) {
      res.status(401).json({ error: "Nothing found with that ID!" });
      return;
    }

    res.status(200).json(duuni);
  } catch (err) {
    res.status(500).json({ error: "Server fail finding duuni" });
  }
};

export const updateDuuni = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updated = await DuuniModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ error: "Duuni not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error", err);
    res.status(500).json({ error: "Failed to update duuni" });
  }

  console.log("id", id);
  console.log("updatedate", updateData);

  res.status(200);
};

export const deleteDuuni = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const toDelete = await DuuniModel.findByIdAndDelete(id);
    if (!toDelete) {
      res.status(404).json({ error: "Duuni not found" });
      return;
    }
    res.status(200).json({ message: "Duuni deleted" });
  } catch (err) {
    console.error("Delete error", err);
    res.status(500).json({ error: "Failed to delete duuni" });
  }
};
