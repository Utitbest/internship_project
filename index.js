import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import integrationRoutes from "./src/routes/integrationRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("You're Welcome, The API is running. Use /api/integrations/esp endpoints.");
});

app.use("/api/integrations/esp", integrationRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>{
       console.log(`Server running at http://localhost:${PORT}`)
       console.log("MongoDB connected successfully");
    })
  })
  .catch((err) => console.error("Database Connection Failed:", err));
