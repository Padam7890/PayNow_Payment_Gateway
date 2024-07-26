// redux/slices/socketNotificationSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface FetchUnreadCountResponse {
  count: number;
}

interface SocketNotificationState {
  count: number;
  status: 'idle' | 'loading' | 'failed';
}

// Define the initial state
const initialState: SocketNotificationState = {
  count: 0,
  status: 'idle',
};

// Define the async thunk
export const fetchUnreadCount = createAsyncThunk<number, void, { rejectValue: string }>(
  'socketNotifications/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/notifications/unread');
      if (!response.ok) {
        throw new Error('Failed to fetch unread count');
      }
      const data: FetchUnreadCountResponse = await response.json();
      return data.count;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

const socketNotificationSlice = createSlice({
  name: 'socketNotifications',
  initialState,
  reducers: {
    addSocketNotification: (state) => {
      state.count += 1;
      localStorage.setItem('socketNotificationCount', JSON.stringify(state.count));
    },
    clearSocketNotifications: (state) => {
      state.count = 0;
      localStorage.setItem('socketNotificationCount', JSON.stringify(0));
    },
    decrementNotificationCount: (state) => {
      if (state.count > 0) {
        state.count -= 1;
        localStorage.setItem('socketNotificationCount', JSON.stringify(state.count));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnreadCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'idle';
        state.count = action.payload;
        localStorage.setItem('socketNotificationCount', JSON.stringify(state.count));
      })
      .addCase(fetchUnreadCount.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Failed to fetch unread count:', action.payload);
      });
  },
});

export const { addSocketNotification, clearSocketNotifications, decrementNotificationCount } = socketNotificationSlice.actions;
export default socketNotificationSlice.reducer;
