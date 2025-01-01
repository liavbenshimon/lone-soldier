import Request from '../models/requestModel.js';

// Create a new request
export const createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    const userId = req.user._id 
    request.user = userId
    console.log(userId);
     
    await request.save();
    res.status(201).json({ message: 'Request created successfully', data: request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user','firstName lastName phone');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single request by ID
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
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
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
