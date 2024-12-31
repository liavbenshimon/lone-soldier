import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  passport: "",
  email: "",
  password: "",
  phone: "",
  personalIdentificationNumber: "",
  media: "",
  type: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPassport: (state, action) => {
      state.passport = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phone = action.payload;
    },
    setPersonalIdentificationNumber: (state, action) => {
      state.personalIdentificationNumber = action.payload;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const {
  setFirstName,
  setLastName,
  setPassport,
  setEmail,
  setPhoneNumber,
  setPersonalIdentificationNumber,
  setMedia,
  setType,
  setUser,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
