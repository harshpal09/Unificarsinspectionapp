// globalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  wizardObj: {
    currentStep: 'documents',
    index:0
  },
  profileDetails:{

  },
  userDetails:{

  },
};

export const GlobalSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    isLoggedIn: (state,action) => {
      state.isUserLoggedIn = action.payload;
    },
    setWizardCurrentStep: (state, action) => {
      state.wizardObj.currentStep = action.payload.currentStep;
      state.wizardObj.index = action.payload.index;
    },
    setProfileDetails:(state,action)=>{
      state.profileDetails = action.payload
    },
    setUserDetails:(state,action)=>{
      state.userDetails = action.payload
    }
  },
});

export const { isLoggedIn, setWizardCurrentStep,setProfileDetails ,setUserDetails} = GlobalSlice.actions;

export default GlobalSlice.reducer;
