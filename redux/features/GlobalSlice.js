import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isUserLoggedIn: false,
}

export const GlobalSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    isLoggedIn: (state,action)=>{
        state.isUserLoggedIn  = !state.isUserLoggedIn
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { isLoggedIn} = GlobalSlice.actions

export default GlobalSlice.reducer