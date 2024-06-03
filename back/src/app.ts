import express, { type Application } from "express";
import "./config/db/index";
import { routes } from "./routes/index.route";

const app: Application = express();

app.use(express.json());
app.use("/api", routes);

export default app;
