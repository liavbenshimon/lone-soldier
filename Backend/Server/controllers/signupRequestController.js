import SignupRequest from "../models/signupRequestModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "23h",
  });
};

// Create a new signup request
export const createSignupRequest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      passport,
      email,
      password,
      phone,
      personalIdentificationNumber,
      media,
      type,
    } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const signupRequest = new SignupRequest({
      firstName,
      lastName,
      passport,
      email,
      password: hashedPassword,
      phone,
      personalIdentificationNumber,
      media,
      type,
    });

    await signupRequest.save();

    // Create token for the signup request
    const token = createToken(signupRequest._id);

    res.status(201).json({
      message: "Signup request submitted successfully",
      token,
      request: signupRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all signup requests (admin only)
export const getAllSignupRequests = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.type !== "Admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const requests = await SignupRequest.find()
      .sort({ createdAt: -1 })
      .populate("approvedBy", "firstName lastName");

    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update signup request status (admin only)
export const updateSignupRequestStatus = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.type !== "Admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const { id } = req.params;
    const { progress, approved } = req.body;

    const request = await SignupRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Update status
    if (progress) request.progress = progress;
    if (approved !== undefined) {
      request.approved = approved;
      if (approved) {
        request.approvedBy = req.user._id;
        request.progress = "completed";

        // Create user account if approved
        const newUser = new User({
          firstName: request.firstName,
          lastName: request.lastName,
          passport: request.passport,
          email: request.email,
          password: request.password, // Already hashed
          phone: request.phone,
          personalIdentificationNumber: request.personalIdentificationNumber,
          media: request.media,
          type: request.type,
        });

        await newUser.save();
      }
    }

    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get signup request by ID (admin only)
export const getSignupRequestById = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.type !== "Admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const { id } = req.params;
    const request = await SignupRequest.findById(id).populate(
      "approvedBy",
      "firstName lastName"
    );

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete signup request (admin only)
export const deleteSignupRequest = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.type !== "Admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const { id } = req.params;
    const request = await SignupRequest.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get signup request by email (public route)
export const getSignupRequestByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const request = await SignupRequest.findOne({ email }).populate(
      "approvedBy",
      "firstName lastName"
    );

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
