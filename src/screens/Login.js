import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../redux/features/GlobalSlice';
const Stack = createStackNavigator();

const LoginComponent = () => {
const isGlobalBoolean =  useSelector((state)=>state.isUserLoggedIn.isUserLoggedIn);
const dispatch =  useDispatch();

  useSelector
  return (
    <SafeAreaView>
      <Text>Global Boolean: {isGlobalBoolean ? 'True' : 'False'}</Text>
      <Button title="Toggle Boolean" onPress={()=>{dispatch(isLoggedIn(!isGlobalBoolean))}} />
        <AntDesign name='stepforward' size={23} />
        <AntDesign name='android' size={45} />
    </SafeAreaView>
  );
};



export default function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginComponent} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
