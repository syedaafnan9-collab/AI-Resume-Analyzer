
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import resumeRoutes from "./route/resumeRoutes.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("AI Resume Analyzer Backend is running!");
});

// Resume API routes
app.use("/api/resumes", resumeRoutes);

// Connect database, then start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
