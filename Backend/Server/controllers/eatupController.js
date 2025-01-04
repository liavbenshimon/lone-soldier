import EatUp from "../models/eatupModel.js";
import Channel from "../models/channelModel.js";
import Message from "../models/messageModel.js";
//TODO: fix subsription

// יצירת רשומת EatUp חדשה
export const createEatUp = async (req, res) => {
  try {
    const {
      zone,
      title,
      media,
      owner,
      date,
      kosher,
      description,
      language,
      hosting,
      religios,
      authorId,
      limit,
    } = req.body;

    // יצירת אובייקט חדש של הסכמה
    const newEatUp = new EatUp({
      zone,
      title,
      media: media || [], // הגדרת ברירת מחדל במקרה שלא נשלחה מדיה
      owner,
      date,
      kosher,
      description,
      language,
      hosting,
      religios,
      authorId,
      limit,
      guests: [],
    });

    // שמירת הרשומה במסד הנתונים
    const savedEatUp = await newEatUp.save();

    // Create associated channel
    const channel = new Channel({
      name: `EatUp: ${title}`,
      type: "eatup",
      members: [authorId],
      eatupId: savedEatUp._id,
      isPublic: false,
    });

    // Save the channel
    const savedChannel = await channel.save();

    // Verify the channel was created correctly
    const verifyChannel = await Channel.findOne({ eatupId: savedEatUp._id });
    console.log("Verified channel in database:", verifyChannel);

    if (!verifyChannel || !verifyChannel.eatupId) {
      throw new Error("Channel creation failed - missing required fields");
    }

    res.status(201).json({
      message: "EatUp and channel created successfully",
      data: {
        eatup: savedEatUp,
        channel: savedChannel,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating EatUp and channel",
      error: error.message,
    });
  }
};

// קבלת כל רשומות ה-EatUp
export const getAllEatUps = async (req, res) => {
  try {
    const eatups = await EatUp.find().populate("authorId", "name email"); // תצוגת שדות נבחרים של authorId
    res
      .status(200)
      .json({ message: "EatUp entries retrieved successfully", data: eatups });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving EatUp entries",
      error: error.message,
    });
  }
};

// קבלת רשומת EatUp ספציפית לפי ID
export const getEatUpById = async (req, res) => {
  const { id } = req.params;
  try {
    const eatup = await EatUp.findById(id).populate("authorId", "name email");

    if (!eatup) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry found", data: eatup });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving EatUp entry", error: error.message });
  }
};

// עדכון רשומת EatUp לפי ID
export const updateEatUp = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedEatUp = await EatUp.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate("authorId", "name email");

    if (!updatedEatUp) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({
      message: "EatUp entry updated successfully",
      data: updatedEatUp,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating EatUp entry", error: error.message });
  }
};

// מחיקת רשומת EatUp לפי ID
export const deleteEatUp = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the channel first to get its ID
    const channel = await Channel.findOne({ eatupId: id });

    if (channel) {
      // Delete all messages associated with this channel
      await Message.deleteMany({ channelId: channel._id });

      // Delete the channel
      await Channel.findByIdAndDelete(channel._id);
    }

    // Delete the EatUp
    await EatUp.findByIdAndDelete(id);

    res.status(200).json({
      message: "EatUp, channel, and all messages deleted successfully",
      channelId: channel?._id, // Return channelId so frontend knows which channel was deleted
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting EatUp and associated data",
      error: error.message,
    });
  }
};

// Toggle guest subscription
export const toggleGuestSubscription = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // First, get the current state of the EatUp
    const eatup = await EatUp.findById(id);
    if (!eatup) {
      return res.status(404).json({ message: "EatUp not found" });
    }

    // Initialize guests array if it doesn't exist
    if (!eatup.guests) {
      eatup.guests = [];
    }

    // Check if there's a guest limit and if it's reached
    if (
      eatup.limit &&
      eatup.guests.length >= eatup.limit &&
      !eatup.guests.includes(userId.toString())
    ) {
      return res.status(400).json({ message: "Guest limit reached" });
    }

    // Find the associated channel using eatupId
    const channel = await Channel.findOne({ eatupId: id });

    if (!channel) {
      return res.status(404).json({ message: "Associated channel not found" });
    }

    // Check current subscription status
    const isSubscribed = eatup.guests.includes(userId.toString());
    let updatedEatUp;

    if (isSubscribed) {
      // Remove user from guests and channel
      updatedEatUp = await EatUp.findByIdAndUpdate(
        id,
        { $pull: { guests: userId.toString() } },
        { new: true }
      );
      await Channel.findByIdAndUpdate(
        channel._id,
        { $pull: { members: userId } },
        { new: true }
      );
    } else {
      // Add user to guests and channel
      updatedEatUp = await EatUp.findByIdAndUpdate(
        id,
        { $addToSet: { guests: userId.toString() } },
        { new: true }
      );
      await Channel.findByIdAndUpdate(
        channel._id,
        { $addToSet: { members: userId } },
        { new: true }
      );
    }

    // Verify the update was successful
    if (!updatedEatUp) {
      throw new Error("Failed to update EatUp");
    }

    const finalIsSubscribed = updatedEatUp.guests.includes(userId.toString());

    // Return more detailed response for debugging
    res.status(200).json({
      message: finalIsSubscribed
        ? "Subscribed successfully and joined channel"
        : "Unsubscribed successfully and left channel",
      data: updatedEatUp,
      isSubscribed: finalIsSubscribed,
      guestCount: updatedEatUp.guests.length,
      channelId: channel._id,
      channelName: channel.name,
      eatupId: id,
      userId: userId,
    });
  } catch (error) {
    console.error("Error in toggleGuestSubscription:", error);
    res.status(500).json({
      message: "Error toggling subscription",
      error: error.message,
      details: {
        eatupId: id,
        userId: userId,
      },
    });
  }
};
