import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBadges } from '../../redux/features/GlobalSlice'



export  const login = async({email,password}) => {
    console.log("agya")
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

export  const allInspection = async({id ,status,dispatch,badges}) => {
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
        let obj = {...badges};
        // console.log(" obj =>",obj)
        obj[status] = response.data.data.data.length;
         
        dispatch(setBadges(obj));
        // console.log("api badges=>",badges);
      return response;
     
  }
  catch(error){
    // console.log("error =>",error);

      response.error = error
      return response;
  }
}
export  const documentsForm = async({leadId}) => {
  // console.log("agya")
    let response ={
        error:'',
        data:{},
    };
    try{
         response.data = await axios.post(
            'https://crm.unificars.com/api/cjinspection',
            {
              lead_id:leadId
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



