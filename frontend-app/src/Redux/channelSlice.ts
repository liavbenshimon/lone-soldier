import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api";

interface Channel {
  _id: string;
  name: string;
  members: string[];
  isPublic: boolean;
  isClosed: boolean;
  createdAt: string;
}
interface ChannelList {
  channels: Channel[];
}

const initialState: ChannelList = {
  channels: [],
};

// Async thunk for fetching channels
export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/channels");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch channels"
      );
    }
  }
);

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    clearChannels: (state) => {
      state.channels = [];
    },
    setChannels: (state) => {
      // state.channels = await api.get();
    },
  },
});

export const { setChannels, clearChannels } = channelSlice.actions;
export default channelSlice.reducer;
