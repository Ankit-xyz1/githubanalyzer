import { createSlice } from "@reduxjs/toolkit"

interface chatHistoryState{
    value:any[]
}

const initialState:chatHistoryState={
    value:[]
}
export const chatHistorySlice = createSlice({
    name:"chatHistory",
    initialState,
    reducers:{
        loadChatsHistoryFromLocalStorage: (state,action) => {
           const loadedChat =  JSON.parse(localStorage.getItem("chatHistory") || "[]");
           state.value =  Array.isArray(loadedChat)? loadedChat : []
        },

    }
})

export const {} = chatHistorySlice.actions;
export default chatHistorySlice.reducer;