import dotenv from "dotenv";
dotenv.config(); // ✅ MUST BE FIRST LINE

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";



const app = express();

connectDB(); // now env is loaded before this

app.use(cors());
app.use(express.json());
app.use("/api", routes); // 🔥 IMPORTANT

app.get("/", (req, res) => {
  res.send("EduTrack API running 🚀");
});

export default app;