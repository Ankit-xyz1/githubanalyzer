import { createSlice } from "@reduxjs/toolkit"

interface ChatHistoryState {
    value: any[]
}

const initialState: ChatHistoryState = {
    value: []
}

export const chatHistorySlice = createSlice({
    name: "chatHistory",
    initialState,
    reducers: {
        loadChatsHistoryFromLocalStorage: (state) => {
            const loadedChat = JSON.parse(localStorage.getItem("ChatHistory") || "[]");
            state.value = Array.isArray(loadedChat) ? loadedChat : [];
        },
    }
});

// ✅ Correctly export the action
export const { loadChatsHistoryFromLocalStorage } = chatHistorySlice.actions;

// ✅ Export reducer
export default chatHistorySlice.reducer;
