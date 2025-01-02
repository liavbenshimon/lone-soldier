import Message from "../models/messageModel.js";

// Get all messages for a channel
export const getChannelMessages = async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.channelId })
      .populate("sender", "firstName lastName")
      .sort({ createdAt: 1 }); // sort by oldest first
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create/send a message to a channel
export const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const newMessage = await Message.create({
      channel: req.params.channelId,
      sender: req.user._id,
      content,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
