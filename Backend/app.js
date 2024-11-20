import express from "express";
import { connect } from "./config/db.js";
import { cloudinaryConnect } from "./config/cloud.js";
import authRoutes from "./routes/authRoutes.js";
import video from "./routes/videoRoutes.js";
import channel from "./routes/channelRoutes.js";
import upload from "./routes/upload.js";
import cors from "cors";
import fileUpload from "express-fileupload"; // For ES Modules
const app = express();

import dotenv from "dotenv";

dotenv.config();

// Enable CORS
app.use(cors());

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api", authRoutes);
app.use("/api", video);
app.use("/api", channel);
app.use("/api", upload);

connect();
cloudinaryConnect();

export { app };
