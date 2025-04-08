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
            const data: string | null = localStorage.getItem("ChatHistory");
            const realdata = data ? data : "data is null"
            if (data) { 
                const loadedChat = JSON.parse(realdata);
                console.log("value from localstrage", loadedChat);
                state.value = Array.isArray(loadedChat) ? loadedChat : [];
            }
        },
    }
});

// ✅ Correctly export the action
export const { loadChatsHistoryFromLocalStorage } = chatHistorySlice.actions;

// ✅ Export reducer
export default chatHistorySlice.reducer;
