import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import { mongoConnect } from "./db/db";
import { duuniRouterV1, duuniRouterV2 } from "./routes/duuniRoute";
import { notFoundHandler } from "./middleware/notFound";
import { ApolloServer } from "@apollo/server";
import { envs } from "./utils";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./db/schema";

const { PORT } = envs;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
await mongoConnect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(
  "/api/v2",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ headers: req.headers }),
  })
);

app.use("/api/v1/duuni", duuniRouterV1);
app.use(notFoundHandler);

await new Promise<void>((resolve) => {
  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is running on port ${PORT}`);
    resolve();
  });
});
