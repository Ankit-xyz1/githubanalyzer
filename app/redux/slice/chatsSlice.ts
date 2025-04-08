import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    changeToChatsFromHistory : (state ,action)=>{
      state.value = action.payload;
    }
  },
});

export const { newChat ,changeToNewChat,changeToChatsFromHistory } = chatSlice.actions;
export default chatSlice.reducer;
