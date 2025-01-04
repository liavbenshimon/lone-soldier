import Message from "../models/messageModel.js";

// Get all messages for a channel
export const getChannelMessages = async (req, res) => {
  try {
    const messages = await Message.find({ channelId: req.params.channelId })
      .populate("sender", "firstName lastName")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create/send a message to a channel
export const createMessage = async (req, res) => {
  try {
    const { content, sender } = req.body;
    const channelId = req.params.channelId;

    const message = new Message({
      channelId,
      content,
      sender,
      readBy: [sender],
      status: "sent",
    });

    await message.save();

    // Populate after saving
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "firstName lastName")
      .populate("readBy", "firstName lastName");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(400).json({ error: error.message });
  }
};
