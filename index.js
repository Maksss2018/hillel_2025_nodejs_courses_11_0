import express from "express";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/database.js";
import { runServer } from "./config/serverRuntime.js";
import sellerRoutes from "./routes/sellers.js";
import storeRoutes from "./routes/stores.js";
import saleRoutes from "./routes/sales.js";

import { ROUTES, STATUS_CODES, MESSAGES } from "./common/index.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

app.use(express.json());
app.use(
  morgan("tiny", {
    skip: (req) => req.url.startsWith("/.well-known"),
  }),
);
app.use(mongoSanitize());

app.use(`${BASE_URL}/sellers`, sellerRoutes);
app.use(`${BASE_URL}/stores`, storeRoutes);
app.use(`${BASE_URL}/sales`, saleRoutes);

app.use((req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.NOT_FOUND);
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
  });
};

runServer(startServer);
