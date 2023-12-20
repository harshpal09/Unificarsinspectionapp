import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import {BottomTabs, HomeScreen,InspectionDetails, TopNavigation,Step_1,Step_2,Step_3,Step_4,Step_5, WizardProgressBar} from '../../export'
import { THEME_COLOR } from '../utils/Style';
const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS, // Use SlideFromRightIOS transition preset
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 0 } },
        close: { animation: 'timing', config: { duration: 0 } },
      },
    }}

    >
      <Stack.Screen name='tab' component={BottomTabs} options={{headerShown:false,}} />
      <Stack.Screen name='WizardProgressBar' component={WizardProgressBar} options={{headerShown:false}} />
      <Stack.Screen  name="InspectionDetails" component={InspectionDetails} options={{headerShown:true,headerBackTitle:"Back",headerBackTitleVisible:true,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen name='Step_1' component={Step_1} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}}/>
      {/* <Stack.Screen  name="Step_2" component={Step_2} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_3" component={Step_3} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_4" component={Step_4} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_5" component={Step_5} options={{ headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} /> */}

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})