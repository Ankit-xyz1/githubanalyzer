import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name:"Chats",
    initialState:{
        value:[],
    },
    reducers:{

    }
})

export  const {} = chatSlice.actions;
export default chatSlice.reducer;