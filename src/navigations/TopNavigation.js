import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CompletedInspection, HomeScreen, MissInspection, NewInspection, StackNavigation } from '../../export';
import { THEME_COLOR } from '../utils/Style';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const HeaderTab = createMaterialTopTabNavigator();

export default function TopNavigation({ navigation }) {

  const badges = useSelector(s => s.global.badges);

  // console.log("badges =>",badges)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: THEME_COLOR,
          tabBarIndicatorStyle: {
            backgroundColor: THEME_COLOR
          },
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '800',
          },
          tabBarIndicatorContainerStyle: {

          },
          tabBarBadge: route.name === 'Today' ? badges.today : null,
        })}
      >
        <HeaderTab.Screen name="Today" component={NewInspection} options={{
          tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={badges.today > 9 ? 'numeric-9-plus-circle' : 'numeric-'+badges.today.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:10,top:7}} /></View>,
        }} />
        <HeaderTab.Screen name="Completed" component={CompletedInspection}
          options={{
            tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={badges.completed > 9 ? 'numeric-9-plus-circle' : 'numeric-'+badges.completed.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:-5,top:7}} /></View>,
          }}
        />
        <HeaderTab.Screen name="Miss" component={MissInspection}
          options={{
            tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={badges.miss > 9 ? 'numeric-9-plus-circle' : 'numeric-'+badges.miss.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:10,top:7}} /></View>,
          }}
        />
        <HeaderTab.Screen name="All" component={HomeScreen} options={{

          tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={badges.all > 9 ? 'numeric-9-plus-circle' : 'numeric-'+badges.all.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:10,top:7}} /></View>,
        }} />

      </HeaderTab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
