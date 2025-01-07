import Message from "../models/messageModel.js";
import Channel from "../models/channelModel.js";

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { channelId, content } = req.body;

    // Check if user is a member of the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    if (!channel.members.includes(req.user._id)) {
      return res.status(403).json({ error: "Not a member of this channel" });
    }

    const message = new Message({
      channelId,
      content,
      sender: req.user._id,
    });

    await message.save();

    // Populate sender info before sending response
    await message.populate("sender", "firstName lastName profileImage");

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get messages for a channel
export const getMessagesByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    // Check if user is a member of the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    if (!channel.members.includes(req.user._id)) {
      return res.status(403).json({ error: "Not a member of this channel" });
    }

    const messages = await Message.find({ channelId })
      .populate("sender", "firstName lastName profileImage")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a message
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      message.sender.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this message" });
    }

    message.content = req.body.content;
    message.isEdited = true;
    await message.save();

    await message.populate("sender", "firstName lastName profileImage");

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      message.sender.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
