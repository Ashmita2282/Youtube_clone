// Import the Cloudinary SDK
import { v2 as cloudinary } from "cloudinary"; // Use "v2" for Cloudinary's modern API
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Cloudinary Configuration Function
export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected successfully.");
  } catch (err) { // Corrected error handling
    console.error("Cloudinary connection error:", err);
  }
};

// Export Cloudinary instance (optional if needed elsewhere)
export default cloudinary;
