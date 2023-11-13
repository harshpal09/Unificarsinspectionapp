import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux'; // Import Provider from react-redux
// import { Store } from 'redux';
import { store } from './redux/store/Index';// Import your Redux store


import { BottomTabs, Login, StackNavigation } from './export';



const App = () => {
  const isuserLoggedIn = useSelector((state)=> state.isUserLoggedIn.isUserLoggedIn)
  return (
    <NavigationContainer>
     {isuserLoggedIn ?  <Login/>: <StackNavigation />}
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
