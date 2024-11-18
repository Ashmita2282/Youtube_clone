// controllers/channelController.js
import Channel from "../models/Channel.js";
import UserModel from "../models/User.js";

// createChannel api controller
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    const ownerId = req.user._id; // Authenticated user ID

    // Check if the user already has a channel
    const existingChannel = await Channel.findOne({ owner: ownerId });
    if (existingChannel) {
      return res.status(400).json({
        success: false,
        message: "User already has a channel.",
      });
    }

    // Create a new channel
    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner: ownerId,
    });

    await newChannel.save();

    await UserModel.findByIdAndUpdate(ownerId, { channel: newChannel._id });

    res.status(201).json({
      success: true,
      message: "Channel created successfully.",
      data: newChannel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
      message: "error while creating the channel",
    });
  }
};

// Fetch Channel and Videos
export const getChannelById = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId).populate("videos");
    if (!channel)
      return res
        .status(404)
        .json({ success: false, message: "Channel not found." });

    res.status(200).json({ success: true, data: channel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Channel (Only Owner)
export const editChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const updates = req.body;

    const updatedChannel = await Channel.findOneAndUpdate(
      { _id: channelId, owner: req.user._id },
      updates,
      { new: true }
    );
    if (!updatedChannel)
      return res.status(404).json({
        success: false,
        message: "Channel not found or unauthorized.",
      });

    res.status(200).json({ success: true, data: updatedChannel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Channel (Only Owner)
export const deleteChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    const deletedChannel = await Channel.findOneAndDelete({
      _id: channelId,
      owner: req.user._id,
    });
    if (!deletedChannel)
      return res.status(404).json({
        success: false,
        message: "Channel not found or unauthorized.",
      });

    // Check if there are any videos associated with the channel before attempting deletion
    if (deletedChannel.videos && deletedChannel.videos.length > 0) {
      await Video.deleteMany({ _id: { $in: deletedChannel.videos } });
    }

    res
      .status(200)
      .json({ success: true, message: "Channel deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
