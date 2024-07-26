import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: number;
  message: string;
  createdAt: string;
}

interface SocketNotificationState {
  count: number;
}

const initialState: SocketNotificationState = {
  count: 0,
};

const socketNotificationSlice = createSlice({
  name: 'socketNotifications',
  initialState,
  reducers: {
    addSocketNotification: (state, action: PayloadAction<Notification>) => {
      state.count += 1;
      localStorage.setItem('socketNotificationCount', JSON.stringify(state.count));
    },
    clearSocketNotifications: (state) => {
      state.count = 0;
      localStorage.setItem('socketNotificationCount', JSON.stringify(0));
    },
    loadSocketNotifications: (state) => {
      const count = parseInt(localStorage.getItem('socketNotificationCount') || '0');
      state.count = count;
    },
  },
});

export const { addSocketNotification, clearSocketNotifications, loadSocketNotifications } = socketNotificationSlice.actions;
export default socketNotificationSlice.reducer;
