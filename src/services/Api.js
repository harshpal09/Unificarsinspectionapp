import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBadges } from '../../redux/features/GlobalSlice'



export  const login = async({email,password}) => {
    // console.log("agya")
    let response ={
        error:'',
        data:{},
    };
    try{
         response.data = await axios.post(
            'https://crm.unificars.com/api/cjlogin',
            {
                email:email,
                password:password,
            }
          );
          return response;
    }
    catch(error){
        response.error = error
        return response;
    }
  
}
export  const submitForm = async({data}) => {
  // console.log("==========================================================")
  // console.log("api data =>",data)
  // console.log("==========================================================")


  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
        'https://crm.unificars.com/api/submitbyinspection',
        data
        );
      

        return response;
  }
  catch(error){
    console.log("==========================================================")
    console.log("error =>",error)
    console.log("==========================================================")
      response.error = error
      return response;
  }

}

export  const allInspection = async({id ,status}) => {
// console.log('id =>',id," status =>",status);\
  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          'https://crm.unificars.com/api/todayinspection',
          {
              cj_id:id,
              status:status,
          }
        );
        // console.log("for res ",status," =>",response.data.data);
        // console.log(" obj =>",obj)
         
        // dispatch(setBadges(obj));
        // console.log("api badges=>",badges);
      return response;
     
  }
  catch(error){
      response.error = error
      return response;
  }
}
export  const documentsForm = async({leadId,type}) => {
  // console.log("agya")
    let response ={
        error:'',
        data:{},
    };
    try{
         response.data = await axios.post(
            'https://crm.unificars.com/api/cjinspection1',
            {
              lead_id:leadId,
              type:type
            }
          );
        return response;
       
    }
    catch(error){
        response.error = error
        return response;
    }
  }
export  const getUserProfileDetails = async({id}) => {

  // let response ={
  //     error:'',
  //     data:{},
  // };
  try{
       let response = await axios.post(
          'https://crm.unificars.com/api/cjprofile',
          {
              cj_id:id,
          }
        );
      console.log('all inspactions =>',response.data)
      return response;
     
  }
  catch(error){
      console.log("response =",error)
      return error;
  }
}


export const submitCarNumber = async (carNumber) => {
  try {
    // if (carNumber.length === 13) {
      const number = carNumber.replace(/\s/g, ''); // Remove spaces from the car number
      console.log(number, "number");

      const response = await axios.post(
        "https://api.emptra.com/vehicleRegistrations",
        {
          vehicleNumber: number,
          blacklistCheck: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            secretKey: "rt50rd1OViWQyA6pv40WbWJJmHCwIvGUBEAM6OLmaqTyhE61RiJ8whOOQDHdslXVT",
            clientId: "932bee8472f77a75f9a328430973d1ab:87937c1398e424117fe02fcf3f070290",
          },
        }
      );

      return  response.data;
  
    // } else {
    //   console.error("Invalid car number length");
    // }
  } catch (error) {
      console.log(error);
  }
};



