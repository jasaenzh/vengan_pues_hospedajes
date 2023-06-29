import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Estado inicial
  id: null,
  name: "",
  email: "",
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      const { id, name, email, loggedIn } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.loggedIn = loggedIn;
    },
  },
});


export const { action1 } = userSlice.actions;
export default userSlice.reducer;