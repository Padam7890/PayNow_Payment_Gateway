import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Directly assign the payload to user.
    },
    clearUser: (state) => {
      state.user = null; // Set user to null when clearing.
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
