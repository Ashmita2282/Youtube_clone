import express from "express";
import { connect } from "./config/db.js";
import { cloudinaryConnect } from "./config/cloud.js";
import authRoutes from "./routes/authRoutes.js";
import video from "./routes/videoRoutes.js";
import channel from "./routes/channelRoutes.js";
import cors from "cors";

const app = express();

import dotenv from "dotenv";

dotenv.config();

// Enable CORS
app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", video);
app.use("/api", channel);

connect();
cloudinaryConnect();

export { app };
