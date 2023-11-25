import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { LIGHT_BLUE, THEME_COLOR, globalStyles } from '../utils/Style'

export default function CustomTextInput({placeholder}) {
  return (
    <View style={[globalStyles.flexBox,{backgroundColor:'transparent',width:'100%',paddingVertical:10}]}>
      <TextInput placeholderTextColor={LIGHT_BLUE} style={{backgroundColor:'transparent',width:'90%',padding:10,borderRadius:10,borderColor:THEME_COLOR,borderWidth:1,fontWeight:'500'}} placeholder={placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({})