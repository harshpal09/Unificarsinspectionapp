// globalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  wizardObj: {
    currentStep: 'documents',
    index:0,
    success:{
      documents:false,
      exterior:false,
      interior:false,
      engine:false,
      other:false,
    },
    successStep:-1,
  },
  profileDetails:{

  },
  userDetails:{

  },
  badges:{
    today:0,
    completed:0,
    all:0,
    miss:0,
  }
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
    },
    setBadges:(state,action)=>{
      state.badges.all = action.payload.all;
      state.badges.miss = action.payload.miss;
      state.badges.completed = action.payload.completed;
      state.badges.today = action.payload.today;

    }
  },
});

export const { isLoggedIn, setWizardCurrentStep,setProfileDetails ,setUserDetails,setBadges} = GlobalSlice.actions;

export default GlobalSlice.reducer;
