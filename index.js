import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import githubRoutes from "./routes/github.routes.js";

const app = express();
const PORT = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

// Simple logger so we can see incoming requests in the terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", githubRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
