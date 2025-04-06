import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface Messages {
  role: String;
  user: boolean;
  userMessage: string | undefined | "no data";
  aiMessage: any[] | undefined;
}

interface chat {
  value: any[];
}
const initialState: chat = {
  value: [],
};
export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    newChat: (state, action: PayloadAction<Messages[]>) => {
      state.value.push(...action.payload);
    },
    changeToNewChat: (state) => {
      state.value = [];
    },
  },
});

export const { newChat ,changeToNewChat } = chatSlice.actions;
export default chatSlice.reducer;
