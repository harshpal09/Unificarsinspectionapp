import React from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  CompletedInspection,
  Documents,
  Engine,
  Exterior,
  Final,
  HomeScreen,
  Interior,
  MissInspection,
  NewInspection,
} from '../../export';
import {THEME_COLOR} from '../utils/Style';
import {useSelector} from 'react-redux';

const HeaderTab = createMaterialTopTabNavigator();

const FormTopNavigation = () => {
  const navigation = useNavigation();

  const all = useSelector(s => s.global.all);
  const completed = useSelector(s => s.global.completed);
  const miss = useSelector(s => s.global.miss);
  const today = useSelector(s => s.global.today);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderTab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: THEME_COLOR,
          tabBarIndicatorStyle: {
            backgroundColor: THEME_COLOR,
          },
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {},
          tabBarLabelStyle: {
            fontSize: 6,
            fontWeight: '800',
          },
        })}>
        <HeaderTab.Screen name="documents" component={Documents} />
        <HeaderTab.Screen name="exterior" component={Exterior} />
        <HeaderTab.Screen name="interior" component={Interior} />
        <HeaderTab.Screen name="engine" component={Engine} />
        <HeaderTab.Screen name="final" component={Final} />
      </HeaderTab.Navigator>
    </SafeAreaView>
  );
};

export default FormTopNavigation;
