import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {LIGHT_BLUE, THEME_COLOR, globalStyles} from '../utils/Style';
import {useDispatch, useSelector} from 'react-redux';

import {InnerFlatListContext} from './InnerFlatList';

export default function CustomTextInput({fields, isTextArea}) {
  const [selectedvalue, setSelectedValue] = useState(fields.value);
  const updateFromValues = useContext(InnerFlatListContext);

  const handleInputChange = text => {
    if (text.nativeEvent != undefined) {
      setSelectedValue(text.nativeEvent.text);
    } else {
      setSelectedValue(text);
    }
  };
  useEffect(() => {
    if (selectedvalue == '') return;
    setValue();
  }, [selectedvalue]);

  const setValue = () => {
    if (typeof updateFromValues == 'function') {
      updateFromValues(fields.type, selectedvalue);
    }
  };

  return (
    <View
      style={[
        globalStyles.flexBox,
        {backgroundColor: 'transparent', width: '100%', paddingVertical: 10},
      ]}>
      <TextInput
        onChange={handleInputChange}
        placeholderTextColor={fields.value == '' ? 'red' : LIGHT_BLUE}
        style={{
          backgroundColor: 'transparent',
          width: '90%',
          padding: 10,
          borderRadius: 10,
          borderColor: selectedvalue == '' ? 'red' : THEME_COLOR,
          borderWidth: 1,
          fontWeight: '700',
          height: isTextArea ? 100 : null,
        }}
        placeholder={'Enter ' + fields.placeholder}
        defaultValue={fields.value}
        multiline
        numberOfLines={isTextArea ? 4 : 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

// import React, { useContext } from 'react'
// import { InnerFlatListContext } from './InnerFlatList'
// // import { globalStyles } from '../utils/Style';
// import { StyleSheet, Text, TextInput, View, } from 'react-native'
// import React, { useState,useEffect,useContext } from 'react'
// import { LIGHT_BLUE, THEME_COLOR, globalStyles } from '../utils/Style'
// import { useDispatch, useSelector } from 'react-redux';
// import { setFormData, setSendData } from '../../redux/features/GlobalSlice';
// // import { InnerFlatListContext } from './InnerFlatList';

// export default function CustomTextInput({fields,isTextArea}) {
//     const [selectedvalue, setSelectedValue] = useState(fields.value)
//   const api_send_data = useSelector(state => state.global.formData);
//   const updateFromValues = useContext(InnerFlatListContext);
//     const handleInputChange = (text) => {
//     if(text.nativeEvent != undefined){
//       setSelectedValue(text.nativeEvent.text)
//     }
//     else{
//       setSelectedValue(text)
//     }
//     updateFromValues(text.nativeEvent.text);
//   };
//   // console.log('index =>',fields.value)
//   // useEffect(()=>{
//   //  if(fields.value == "") return;
//   //   setValue();
//   // },[selectedvalue])
//   return (
//     <View style={[globalStyles.flexBox,{backgroundColor:'transparent',width:'100%',paddingVertical:10}]}>
//       <TextInput onChange={handleInputChange} placeholderTextColor={ fields.value == '' ? 'red':LIGHT_BLUE} style={{backgroundColor:'transparent',width:'90%',padding:10,borderRadius:10,borderColor:selectedvalue == '' ? 'red':THEME_COLOR,borderWidth:1,fontWeight:'700',height:isTextArea ? 100:null}} placeholder={"Enter "+fields.placeholder} defaultValue={fields.value} multiline numberOfLines={isTextArea ? 4:0} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
