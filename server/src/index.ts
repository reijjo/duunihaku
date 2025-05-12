import express from "express";
import morgan from "morgan";
import cors from "cors";
import { mongoConnect } from "./db/db";
import { duuniRouter } from "./routes/duuniRoute";
import { notFoundHandler } from "./middleware/notFound";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoConnect();

app.use("/api/v1/duuni", duuniRouter);

app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
