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
  formData:{

  },
  profileDetails:{

  },
  userDetails:{

  },
  completed:0,
  all:0,
  today:0,
  miss:0,
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
    // setBadges:(state,action)=>{
    //   state.badges.all = action.payload.all;
    //   state.badges.miss = action.payload.miss;
    //   state.badges.completed = action.payload.completed;
    //   state.badges.today = action.payload.today;

    // }
    setCompleted:(state,action)=>{
      state.completed = action.payload
    },
    setAll:(state,action)=>{
      state.all = action.payload
    },
    setToday:(state,action)=>{
      state.today = action.payload
    },
    setMiss:(state,action)=>{
      state.miss = action.payload
    },
    setFormData:(state,action)=>{
      state.formData = action.payload
    }
  },
});

export const { isLoggedIn, setFormData,setWizardCurrentStep,setProfileDetails ,setUserDetails,setCompleted,setAll,setToday,setMiss} = GlobalSlice.actions;

export default GlobalSlice.reducer;
