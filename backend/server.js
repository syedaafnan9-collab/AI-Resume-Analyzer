import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import resumeRoutes from './route/resumeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
// app.use("/api/resumes", resumeRoutes);

app.use('/api/resumes', resumeRoutes);

import connectDB from './config/db.js';
import { Router } from "express";
connectDB();


