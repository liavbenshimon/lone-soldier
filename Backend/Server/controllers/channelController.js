import Channel from "../models/channelModel.js";

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { name, members, isPublic } = req.body;
    const newChannel = await Channel.create({ name, members, isPublic });
    res.status(201).json(newChannel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a channel
export const deleteChannel = async (req, res) => {
  try {
    await Channel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Close a channel
export const closeChannel = async (req, res) => {
  try {
    await Channel.findByIdAndUpdate(req.params.id, { isClosed: true });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add multiple members to a channel
export const addMembers = async (req, res) => {
  try {
    const { members } = req.body; // array of user IDs
    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      { $push: { members: { $each: members } } },
      { new: true }
    );
    res.json(channel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ members: { $in: req.user._id } });
    res.json(channels);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add single member to a channel
export const addMember = async (req, res) => {
  try {
    await Channel.findByIdAndUpdate(req.params.id, {
      $push: { members: req.params.userId },
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChannelsForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const channels = await Channel.find({
      members: userId
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: channels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching channels",
      error: error.message
    });
  }
};
