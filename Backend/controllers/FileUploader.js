import File from "../models/file.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File", file);

    // Ensure the 'files' directory exists
    const uploadDir = path.join(__dirname, "files");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Define file path
    const filePath = path.join(uploadDir, `${Date.now()}_${file.name}`);

    // Move file
    file.mv(filePath, (err) => {
      if (err) {
        console.error("File move error:", err);
        return res.status(500).json({ message: "File upload failed." });
      }
      // Send success response only after successful move
      res.json({ success: true, message: "File uploaded successfully!" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

async function uploastoClodinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const imageUpload = async (req, res) => {
  try {
    const { name, email } = req.body;
    const photo = req.files.india;
    const supportedFile = ["png", "jpeg", "jpg"];
    const fileExtension = photo.name.split(".")[1].toLowerCase();
    console.log("File", photo);
    if (!supportedFile.includes(fileExtension)) {
      return res
        .status(400)
        .json({ success: flase, message: "File format not supported" });
    }
    console.log("File", photo);

    const response = await uploastoClodinary(photo, "test");
    const fileData = await File.create({
      name,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      url: response.secure_url,
      message: "File uploaded successfully!",
      fileData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      msg: "File upload failed.",
    });
  }
};

export { uploadFile, imageUpload };
