import EatUp from "../models/eatupModel.js";

// Function to create a new EatUp entry
export const createEatUp = async (req, res) => {
  try {
    const { zone, title, owner, date, kosher, description, language, hosting, religios } = req.body;

    // Create a new instance of the EatUp model
    const newEatUp = new EatUp({
      zone,
      title,
      owner,
      date,
      kosher,
      description,
      language,
      hosting,
      religios
    });

    // Save the new EatUp instance to the database
    await newEatUp.save();

    // Return a success response
    res.status(201).json({ message: "EatUp entry created successfully", data: newEatUp });
  } catch (error) {
    res.status(500).json({ message: "Error creating EatUp entry", error: error.message });
  }
};

// Function to get all EatUp entries
export const getAllEatUps = async (req, res) => {
  try {
    const eatups = await EatUp.find();
    res.status(200).json({ message: "EatUp entries retrieved successfully", data: eatups });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving EatUp entries", error: error.message });
  }
};

// Function to get a specific EatUp entry by ID
export const getEatUpById = async (req, res) => {
  const { id } = req.params;
  try {
    const eatup = await EatUp.findById(id);

    if (!eatup) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry found", data: eatup });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving EatUp entry", error: error.message });
  }
};

// Function to update an existing EatUp entry by ID
export const updateEatUp = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedEatUp = await EatUp.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEatUp) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry updated successfully", data: updatedEatUp });
  } catch (error) {
    res.status(500).json({ message: "Error updating EatUp entry", error: error.message });
  }
};

// Function to delete an EatUp entry by ID
export const deleteEatUp = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEatUp = await EatUp.findByIdAndDelete(id);

    if (!deletedEatUp) {
      return res.status(404).json({ message: "EatUp entry not found" });
    }

    res.status(200).json({ message: "EatUp entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting EatUp entry", error: error.message });
  }
};
