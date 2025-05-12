import mongoose from "mongoose";
import { envs } from "../utils";

const { MONGODB_PASSWD, MONGODB_CLUSTER, MONGODB_USER } = envs;

const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWD}@${MONGODB_CLUSTER}`;

mongoose.set("strictQuery", false);

export const mongoConnect = async () => {
  try {
    await mongoose.connect(url);

    console.log("✅ Connected to MongoDB Atlas");

    // List all collections in the database to verify connection
    const collections = await mongoose?.connection?.db?.collections();
    console.log(
      "Available collections:",
      collections?.map((c) => c.collectionName).join(", ")
    );
  } catch (err) {
    console.log("Mongoose error", err);
  }
};
