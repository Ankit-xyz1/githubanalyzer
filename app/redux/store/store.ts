import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counterSlice'


const store = configureStore({
  reducer: {
    counter: counterReducer, // Add slice reducer
  },
});

// ✅ Define RootState type based on store
export type RootState = ReturnType<typeof store.getState>;

// ✅ Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;

