import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { CompletedInspection, HomeScreen, MissInspection, NewInspection } from '../../export';
import { THEME_COLOR } from '../utils/Style';
import { useSelector } from 'react-redux';
import Test from '../screens/Test';

const HeaderTab = createMaterialTopTabNavigator();

const TopNavigation = () => {
  const navigation = useNavigation();

  const all = useSelector((s) => s.global.all);
  const completed = useSelector((s) => s.global.completed);
  const miss = useSelector((s) => s.global.miss);
  const today = useSelector((s) => s.global.today);

  const renderBadge = (count,name) => (
    <View style={{ backgroundColor: 'white' }}>
      <MaterialCommunityIcons
        name={count > 9 ? 'numeric-9-plus-circle' : 'numeric-' + count.toString() + '-circle'}
        color={'red'}
        size={20}
        style={{ fontWeight: '700', position: 'absolute', right:name == 'completed'?-5 : 10, top: 7 }}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: THEME_COLOR,
          tabBarIndicatorStyle: {
            backgroundColor: THEME_COLOR,
          },
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {},
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '800',
          },
        })}
      >
        <HeaderTab.Screen
          name="Today"
          component={NewInspection}
          options={{
            tabBarBadge: () => renderBadge(today,'today'),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate('Today');
            },
          })}
        />
        <HeaderTab.Screen
          name="Completed"
          component={CompletedInspection}
          options={{
            tabBarBadge: () => renderBadge(completed,'completed'),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate('Completed');
            },
          })}
        />
        <HeaderTab.Screen
          name="Miss"
          component={MissInspection}
          options={{
            tabBarBadge: () => renderBadge(miss,'miss'),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate('Miss');
            },
          })}
        />
        <HeaderTab.Screen
          name="All"
          component={HomeScreen}
          options={{
            tabBarBadge: () => renderBadge(all,'all'),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate('All');
            },
          })}
        />
        {/* <HeaderTab.Screen
          name="Test"
          component={Test}
          
        /> */}
      </HeaderTab.Navigator>
    </SafeAreaView>
  );
};

export default TopNavigation;
