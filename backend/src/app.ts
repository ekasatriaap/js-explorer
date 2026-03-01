import express from "express";
import cors from "cors";
import routes from "./interfaces/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
