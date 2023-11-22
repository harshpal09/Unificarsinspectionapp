// globalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  wizardObj: {
    currentStep: 0,
    index:0
  },
  profileDetails:{

  }
};

export const GlobalSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    isLoggedIn: (state) => {
      state.isUserLoggedIn = !state.isUserLoggedIn;
    },
    setWizardCurrentStep: (state, action) => {
      state.wizardObj.currentStep = action.payload.currentStep;
      state.wizardObj.index = action.payload.index;
    },
    setProfileDetails:(state,action)=>{
      state.profileDetails = action.payload
    }
  },
});

export const { isLoggedIn, setWizardCurrentStep,setProfileDetails } = GlobalSlice.actions;

export default GlobalSlice.reducer;
