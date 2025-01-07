import { configureStore } from '@reduxjs/toolkit';
import socketNotificationReducer from './slices/socketNotificationSlice';
import socketReducer from './slices/socketSlice';
import userReducer from './slices/userSlice';

const store:any = configureStore({
  reducer: {
    socketNotifications: socketNotificationReducer,
    socket: socketReducer,
    user:userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
