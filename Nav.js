import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './data/Reducer'

import HomeScreen from './screens/HomeScreen';
import Favourites from './screens/Favourites'; 

const store = configureStore({
    reducer: rootReducer, 
  });

  function Nav() {
    const Tab = createBottomTabNavigator();
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen}/>
            <Tab.Screen name='Favourites' component={Favourites}/>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
  
  export default Nav;