import { createSlice } from "@reduxjs/toolkit";

export const currentGithub = createSlice({
    name:"currentGithub",
    initialState:{
        value:"",
    },
    reducers:{
        changeCurrentGithub:(state,action)=>{
            state.value = action.payload;
        }
        
    }
})

export  const {changeCurrentGithub} = currentGithub.actions;
export default currentGithub.reducer;