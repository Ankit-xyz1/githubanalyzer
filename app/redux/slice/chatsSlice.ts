import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface messages{
    role:String,
    user:boolean,
    message:string | undefined
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
    newChat: (state, action:PayloadAction<messages[]>) => {
     state.value.push(...action.payload)
    },
  },
});

export const {newChat} = chatSlice.actions;
export default chatSlice.reducer;
