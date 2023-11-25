import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'
export  const login = async({email,password}) => {

    let response ={
        error:'',
        data:{},
    };
    try{
         let response = await axios.post(
            'https://crm.unificars.com/api/cjlogin',
            {
                email:email,
                password:password,
            }
          );
        console.log('respoendfdfdfdf =>',response.data)
       
    }
    catch(error){
        console.log("response =",error)
        response.error = error
        return response;
    }
  return (
    <View>
      <Text>Api</Text>
    </View>
  )
}

export  const allInspection = async({id ,status}) => {

  let response ={
      error:'',
      data:{},
  };
  try{
       let response = await axios.post(
          'https://crm.unificars.com/api/todayinspection',
          {
              cj_id:id,
              status:status,
          }
        );
      // console.log('all inspactions =>',response.data)
      return response;
     
  }
  catch(error){
      console.log("response =",error)
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



