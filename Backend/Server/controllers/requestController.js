import Donationrequest from '../models/requestModel.js';

// Create a new request
export const createRequest = async (req, res) => {
  try {
    const request = new Donationrequest(req.body);
    const userId = req.user._id 
    request.user = userId
    
    await request.save();
    res.status(201).json({ message: 'Request created successfully', data: request });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ error: error.message });
  }
};

// Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Donationrequest.find().populate('user','firstName lastName phone email');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single request by ID
export const getRequestById = async (req, res) => {
  try {
    const request = await Donationrequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // משתמש ב- findOneAndDelete כדי למחוק את הבקשה על פי ה-ID
    const request = await Donationrequest.findOneAndDelete({ _id: id });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting request" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updates = req.body;

    delete updates.status;

    const updatedRequest = await Donationrequest.findByIdAndUpdate(requestId, updates, {
      new: true,
      runValidators: true, 
    });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const {...responseData } = updatedRequest.toObject();
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for updating the status of a donation request (admin only!)
export const updateStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    // Ensure that the new status is one of the valid options
    if (!['approved', 'deny', 'in process'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Update the status only (admins can update status)
    const updatedRequest = await Donationrequest.findByIdAndUpdate(requestId, { status }, {
      new: true, // Return the updated document
      runValidators: true, // Ensure that schema validation occurs
    });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Send the updated request with the new status
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller to get all approved donation requests (Intended for use on the donors' page)
export const getApprovedRequests = async (req, res) => {
  try {
    // Fetch all donation requests with status 'approved'
    const approvedRequests = await Donationrequest.find({ status: 'approved' });

    if (!approvedRequests || approvedRequests.length === 0) {
      return res.status(404).json({ message: 'No approved requests found' });
    }

    res.status(200).json(approvedRequests);
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  // Controller to get all donation requests by a specific user

export const getRequestByUserId = async (req, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user._id;

    // Fetch all donation requests created by this user
    const userRequests = await Donationrequest.find({ user: userId });

    if (!userRequests || userRequests.length === 0) {
      return res.status(404).json({ message: 'No requests found for this user.' });
    }

    res.status(200).json(userRequests);
  } catch (error) {
    console.error("Error fetching user requests:", error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
