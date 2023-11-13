import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {BottomTabs, HomeScreen,InspectionDetails, TopNavigation} from '../../export'
import { THEME_COLOR } from '../utils/Style';
const Stack = createStackNavigator();
export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='tab' component={BottomTabs} options={{headerShown:false}} />
      <Stack.Screen  name="InspectionDetails" component={InspectionDetails} options={{headerShown:true,headerBackTitle:" ",headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})