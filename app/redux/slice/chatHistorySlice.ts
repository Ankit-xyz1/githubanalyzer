import { createSlice } from "@reduxjs/toolkit"

export const chatHistorySlice = createSlice({
    name:"chatHistory",
    initialState:{
        value:[]
    },
    reducers:{

    }
})

export const {} = chatHistorySlice.actions;
export default chatHistorySlice.reducer;