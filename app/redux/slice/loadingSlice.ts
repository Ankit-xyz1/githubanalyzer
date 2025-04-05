import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name:"loading",
    initialState:{
        value:false
    },
    reducers:{
        toggle:(state)=>{
            state.value = !state.value
        }
    }
})

export const {toggle} = loadingSlice.actions;
export default loadingSlice.reducer