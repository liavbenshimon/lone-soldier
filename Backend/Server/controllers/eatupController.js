import EatUp from "../models/eatupModel.js";
import Channel from "../models/channelModel.js";

// Create a new EatUp
export const createEatUp = async (req, res) => {
  try {
    const eatupData = { ...req.body, owner: req.user._id };
    const eatup = new EatUp(eatupData);
    await eatup.save();

    // Create associated channel with name from EatUp title
    const channel = new Channel({
      name: eatupData.title || `EatUp-${eatup._id}`,
      eatupId: eatup._id,
      type: "eatup",
      members: [req.user._id],
    });
    await channel.save();

    // Add channel reference to eatup
    eatup.channel = channel._id;
    await eatup.save();

    res.status(201).json({ data: { eatup, channel } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all EatUps
export const getAllEatUps = async (req, res) => {
  try {
    const eatups = await EatUp.find().populate("owner", "firstName lastName");
    res.status(200).json(eatups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single EatUp
export const getEatUpById = async (req, res) => {
  try {
    const eatup = await EatUp.findById(req.params.id).populate(
      "owner",
      "firstName lastName"
    );
    if (!eatup) {
      return res.status(404).json({ error: "EatUp not found" });
    }
    res.status(200).json(eatup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an EatUp
export const updateEatUp = async (req, res) => {
  try {
    const eatup = await EatUp.findById(req.params.id);
    if (!eatup) {
      return res.status(404).json({ error: "EatUp not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      eatup.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this EatUp" });
    }

    const updatedEatUp = await EatUp.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedEatUp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an EatUp
export const deleteEatUp = async (req, res) => {
  try {
    const eatup = await EatUp.findById(req.params.id);
    if (!eatup) {
      return res.status(404).json({ error: "EatUp not found" });
    }

    // Check ownership unless user is admin
    if (
      req.user.type !== "Admin" &&
      eatup.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this EatUp" });
    }

    // Delete associated channel
    if (eatup.channel) {
      await Channel.findByIdAndDelete(eatup.channel);
    }

    await eatup.deleteOne();
    res.status(200).json({ message: "EatUp deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle guest subscription
export const toggleGuestSubscription = async (req, res) => {
  try {
    const eatup = await EatUp.findById(req.params.id);
    if (!eatup) {
      return res.status(404).json({ error: "EatUp not found" });
    }

    // Find associated channel
    const channel = await Channel.findOne({ eatupId: eatup._id });
    if (!channel) {
      return res.status(404).json({ error: "Associated channel not found" });
    }

    const userId = req.user._id;
    const isSubscribed = eatup.guests?.includes(userId);

    if (isSubscribed) {
      // Remove from guests and channel members
      eatup.guests = eatup.guests.filter(
        (id) => id.toString() !== userId.toString()
      );
      channel.members = channel.members.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Add to guests and channel members
      if (!eatup.guests) eatup.guests = [];
      if (!channel.members) channel.members = [];
      eatup.guests.push(userId);
      channel.members.push(userId);
    }

    await Promise.all([eatup.save(), channel.save()]);

    res.status(200).json({
      message: isSubscribed
        ? "Unsubscribed successfully"
        : "Subscribed successfully",
      eatup,
      channel,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
