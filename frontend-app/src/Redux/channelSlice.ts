import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    clearChannels: (state) => {
      state.channels = [];
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export const { clearChannels, setChannels } = channelSlice.actions;
export default channelSlice.reducer;
