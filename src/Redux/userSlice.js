import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        isFetching:true,
        isError:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
        },
        loginSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.isFetching = false;
            state.isError = false;
        },
        loginFailure:(state)=>{
            state.isError = true;
        }
    }
});

export const {loginSuccess,loginStart,loginFailure} = userSlice.actions;

export default userSlice.reducer