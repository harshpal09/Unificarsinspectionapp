import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AccountSection, HomeScreen,MyInspection, TopNavigation} from '../../export'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { THEME_COLOR } from '../utils/Style';
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor:THEME_COLOR
    }}>
      
      <Tab.Screen
        name="Home"
        component={TopNavigation}
        options={{
          headerShown: true,
          headerStyle:{
            backgroundColor:THEME_COLOR,
          },
          headerTitleStyle:{
            color:"#FFF",
            alignSelf:'flex-start',
            fontWeight:"bold"
            // backgroundColor:'red',
            // width:'100%'
          },
          headerTitle: 'Car Inspection',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
            name="home-analytics" color={color} size={size} />
          ),
          
        }}
      />
      <Tab.Screen
       name="MyInspection" 
       component={MyInspection} 
       options={{
        
        headerShown: false,
        tabBarLabel: 'My Inspections',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="clipboard-text-search" color={color} size={size} />
        ),
      }}
       />
       <Tab.Screen
       name="AccountSection" 
       component={AccountSection} 
       options={{
        headerShown: false,
        tabBarLabel: 'Account',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={size} />
        ),
      }}
       />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})