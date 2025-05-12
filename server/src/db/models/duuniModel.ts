import mongoose from "mongoose";

const duuniSchema = new mongoose.Schema({
  haettu: { type: Date, default: Date.now },
  firma: { type: String, required: true },
  title: { type: String, required: true },
  vastattu: { type: Date, default: null },
  vastaus: { type: String, default: "" },
  extra: { type: String, default: "" },
});

duuniSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const DuuniModel = mongoose.model("Duuni", duuniSchema);

export default DuuniModel;
