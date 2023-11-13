import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HomeScreen, MissInspection, NewInspection,StackNavigation} from '../../export';
import { THEME_COLOR } from '../utils/Style';



const HeaderTab = createMaterialTopTabNavigator();

export default function TopNavigation({navigation}) {

  return (
    <SafeAreaView style={{flex:1}}>
      <HeaderTab.Navigator 
      screenOptions={{
        tabBarActiveTintColor:THEME_COLOR,
        tabBarIndicatorStyle:{
            backgroundColor:THEME_COLOR
        },
        tabBarInactiveTintColor:"grey",
      tabBarStyle: {

      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight:'800',
      },
      tabBarIndicatorContainerStyle: {
       
      },
    }}
      >
        <HeaderTab.Screen name="All" component={HomeScreen} />
        <HeaderTab.Screen name="New Inspection" component={NewInspection} />
        <HeaderTab.Screen name="Miss inspection" component={MissInspection} />
      </HeaderTab.Navigator>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
