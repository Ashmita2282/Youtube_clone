// routes/channelRoutes.js
import express from "express";
import {
  createChannel,
  getChannelById,
  deleteChannel,
  editChannel,
} from "../controllers/channelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-channel", authMiddleware, createChannel);
router.get("/channel/:channelId", authMiddleware, getChannelById);
router.put("/edit-channel/:channelId", authMiddleware, editChannel);
router.delete("/delete-channel/:channelId", authMiddleware, deleteChannel);
// DELETE /api/channels/:channelId

export default router;
