const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  };

const authSlice = createSlice({

    name:'auto',
    initialState,
    reducers:{
        setUser:(state,action)=>{

        }
    }
})

export const{setUser} = authSlice.actions;
export default authSlice.reducer;
