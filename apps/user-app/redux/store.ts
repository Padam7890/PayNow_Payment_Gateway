import { configureStore } from '@reduxjs/toolkit';
import socketNotificationReducer from './slices/socketNotificationSlice';
import socketReducer from './slices/socketSlice';

const store:any = configureStore({
  reducer: {
    socketNotifications: socketNotificationReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
