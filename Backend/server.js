import { app } from "./app.js";
import cors from "cors"; // Corrected from "cores" to "cors"

import dotenv from "dotenv";

dotenv.config();

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log("Server is started");
});
