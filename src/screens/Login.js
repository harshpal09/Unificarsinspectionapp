import {SafeAreaView, StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {isLoggedIn} from '../../redux/features/GlobalSlice';
import {
  DarkTextLarge,
  MainContainer,
  ProfileContainer,
  StyledButton,
  StyledTextInput,
} from '../components/StyledComponent';
import {THEME_COLOR, globalStyles, width} from '../utils/Style';
const Stack = createStackNavigator();

const LoginComponent = () => {
  const isGlobalBoolean = useSelector(state => state.global.isUserLoggedIn);
  const dispatch = useDispatch();

  const [focusInEmail,setFocusInEmail] = useState(false)
  const [focusInPass,setFocusInPass] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [toggle,setToggle] = useState(false);
  const [error,setError] = useState({
    email:'',
    password:'',
  })
  
  const handleClickEmail = (event) => {
    event.persist();
    const emailValue = event.nativeEvent.text;
    setEmail(emailValue);
    setError((prev) => ({ ...prev, email: '' }));
  };
  
  const handleClickPass = (event) => {
    event.persist();
    const passwordValue = event.nativeEvent.text;
    setPassword(passwordValue);
    setError((prev) => ({ ...prev, password: '' }));
  };
  console.log('email =>',email);
  console.log('Password =>',password);
  console.log("error = ",error);


  const onSubmit = async() =>{
      setToggle(true);
      if(email == '' ){  
       setError(prev => ({ ...prev, email: 'Please enter your email' })) 
      }
      if(password == ''){
        setError(prev => ({ ...prev, password: 'Please enter your Password' }))
      }
      if(error.email != "" || error.password != "") {
        setToggle(false); 
        return;
      }
      setTimeout(()=>{setToggle(false),dispatch(isLoggedIn(!isGlobalBoolean))},1000);

      
      

  }
  return (
    <MainContainer>
      <View
        style={{
          height: 370,
          backgroundColor: THEME_COLOR,
          width: width + 100,
          borderBottomLeftRadius: (width + 270) / 2,
          borderBottomRightRadius: (width + 270) / 2,
        }}></View>
      <ProfileContainer
        style={[{marginTop: -200, width: '85%'}, globalStyles.flexBox]}>
        <DarkTextLarge
          style={{
            fontSize: 20,
            marginVertical: 20,
            fontSize: 22,
            fontWeight: '600',
          }}>
          Sign In Your Account
        </DarkTextLarge>
        <StyledTextInput
          style={[{borderBottomColor:focusInEmail ? THEME_COLOR : 'grey'}]}
          placeholder="Email"
          placeholderTextColor={focusInEmail ? THEME_COLOR : 'grey'}
          onFocus={()=>setFocusInEmail(true)}
          onBlur={()=>setFocusInEmail(false)}
          onChange={handleClickEmail}
          />
        {error.email != '' &&<Text style={{fontSize:13,color:'red'}}>{error.email}</Text>}
        <StyledTextInput
         style={[{borderBottomColor:focusInPass ? THEME_COLOR : 'grey'}]}
         placeholder="Password"
         placeholderTextColor={focusInPass ? THEME_COLOR : 'grey'}
         onFocus={()=>setFocusInPass(true)}
         onBlur={()=>setFocusInPass(false)}
         onChange={handleClickPass}

        />
        {error.password != '' && <Text style={{fontSize:13,color:'red'}}>{error.password}</Text>}
        <StyledButton style={[globalStyles.flexBox]} onPress={onSubmit}>
          {toggle ? <ActivityIndicator size={'small'}  />:
          <Text style={{color: 'white', fontWeight: '800', fontSize: 17}}>
            Sign In
          </Text>
          }
        </StyledButton>
      </ProfileContainer>
    </MainContainer>
  );
};

export default function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginComponent}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0, // For iOS
            borderBottomWidth: 0, // For iOS
          },
          headerTitleStyle: {
            color: '#FFF',
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            // backgroundColor:'red',
            // width:'100%'
          },
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
