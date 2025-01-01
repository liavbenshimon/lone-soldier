import EatUp from "../models/eatupModel.js";
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
    await newEatUp.save();

    res
      .status(201)
      .json({ message: "EatUp entry created successfully", data: newEatUp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating EatUp entry", error: error.message });
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
    const deletedEatUp = await EatUp.findByIdAndDelete(id);

    if (!deletedEatUp) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting EatUp entry", error: error.message });
  }
};

// Toggle guest subscription
export const toggleGuestSubscription = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;
  console.log("User ID:", userId); // Debug log

  try {
    // First, get the current state of the EatUp
    const eatup = await EatUp.findById(id);
    console.log("Found EatUp:", eatup); // Debug log

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

    // Check current subscription status
    const isSubscribed = eatup.guests.includes(userId.toString());
    console.log("Is currently subscribed:", isSubscribed); // Debug log

    let updatedEatUp;

    if (isSubscribed) {
      // Remove user from guests
      updatedEatUp = await EatUp.findByIdAndUpdate(
        id,
        { $pull: { guests: userId.toString() } },
        { new: true }
      );
    } else {
      // Add user to guests
      updatedEatUp = await EatUp.findByIdAndUpdate(
        id,
        { $addToSet: { guests: userId.toString() } },
        { new: true }
      );
    }

    // Verify the update was successful
    if (!updatedEatUp) {
      throw new Error("Failed to update EatUp");
    }

    // Check final subscription status
    const finalIsSubscribed = updatedEatUp.guests.includes(userId.toString());
    console.log("Final subscription status:", finalIsSubscribed); // Debug log
    console.log("Updated guest list:", updatedEatUp.guests); // Debug log

    res.status(200).json({
      message: finalIsSubscribed
        ? "Subscribed successfully"
        : "Unsubscribed successfully",
      data: updatedEatUp,
      isSubscribed: finalIsSubscribed,
      guestCount: updatedEatUp.guests.length,
    });
  } catch (error) {
    console.error("Error in toggleGuestSubscription:", error);
    res.status(500).json({
      message: "Error toggling subscription",
      error: error.message,
    });
  }
};
