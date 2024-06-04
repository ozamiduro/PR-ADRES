import express, { type Application } from "express";
const cors = require("cors");
import "./config/db/index";
import { routes } from "./routes/index.route";

import corsOptions from "./config/cors";

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

export default app;
