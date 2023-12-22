import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import Provider from react-redux
import { store } from './redux/store/Index';// Import your Redux store
import { BottomTabs, Login, StackNavigation } from './export';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedIn, setBadges, setUserDetails } from './redux/features/GlobalSlice';
import { View,ActivityIndicator } from 'react-native';
import { allInspection } from './src/services/Api';

const App = () => {
  const isuserLoggedIn = useSelector((state)=> state.global.isUserLoggedIn)
  // const [data, setUserData] = useState({})
  console.log('badges =>',isuserLoggedIn)
  const val = useSelector((s)=>s.global.userDetails)
  
  var user_data = typeof val === 'object' ? val : JSON.parse(val);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // In App.js or another initialization component
useEffect(() => {
  const checkUserLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      // console.log(userData)
      // setUserData(JSON.parse(userData));
      // getBadges(JSON.parse(userData));
      if (userData) {
        // User is logged in, update Redux state
        dispatch(setUserDetails(JSON.parse(userData)));
        dispatch(isLoggedIn(true));
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
    setIsLoading(false);
  };

  checkUserLoginStatus();
}, []);

  // const item = ['today','all','completed','miss','harsh','bhavesh'];


// useEffect(()=>{
//   getBadges();
// },[])

// const getBadges = async(data) =>{

//   item.map(async(val,i)=>{
//   try {
//     // console.log("harsh =>",data)
   
//     const response = await allInspection({id: data.id , status: 'completed'});

//     // console.log("harsh =>",response)
//     if (response.data.data.code != undefined && response.data.data.code) {
      
//       let obj = {...badges};
//       obj[val] = response.data.data.data.length;

//       dispatch(setBadges(obj));
     
//     } else {
//     }
//   } catch (error) {
//     console.log('error ', error);
//   } finally {
    
//   }
// })
// }
// console.log("dfghjk =>",data)
if (isLoading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

  return (
    <NavigationContainer>
     {isuserLoggedIn ?   <StackNavigation />:<Login/>}
    </NavigationContainer>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
