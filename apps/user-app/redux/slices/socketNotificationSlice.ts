import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: number;
  message: string;
  createdAt: string;
}

interface SocketNotificationState {
  count: number;
  notifications: Notification[];
}

const initialState: SocketNotificationState = {
  count: 0,
  notifications: [],
};

const socketNotificationSlice = createSlice({
  name: 'socketNotifications',
  initialState,
  reducers: {
    addSocketNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
      state.count += 1;
    },
    clearSocketNotifications: (state) => {
      state.notifications = [];
      state.count = 0;
    },
  },
});

export const { addSocketNotification, clearSocketNotifications } = socketNotificationSlice.actions;
export default socketNotificationSlice.reducer;
