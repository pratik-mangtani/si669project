import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './data/Reducer'

import HomeScreen from './screens/HomeScreen';
import Favourites from './screens/Favourites'; 
import ProductDetailScreen from './screens/ProductDetailScreen';
import LoginScreen from './screens/LoginScreen';
import AboutUs from './screens/AboutUs'
import Navigation from './screens/Navigation'

const store = configureStore({
    reducer: rootReducer, 
  });

  function Nav() {
    const Tab = createBottomTabNavigator();
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='Login'>
            <Tab.Screen name="Login" component={LoginScreen}/>
            <Tab.Screen name='HomeScreen' component={HomeNavigator}/>
            <Tab.Screen name='Favourites' component={Favourites}/>
            <Tab.Screen name='AboutUs' component={AboutUsNavigator}/>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

  function AboutUsNavigator(){
    const Stack = createNativeStackNavigator()

    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
            name="AboutUs"
            component={AboutUs}
        />
          <Stack.Screen 
            name="Navigation"
            component={Navigation}
        />
        
      </Stack.Navigator>

    )

  }

  function HomeNavigator(){
    const Stack = createNativeStackNavigator()

    return(
      <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
        />
          <Stack.Screen 
            name="ProductDetailScreen"
            component={ProductDetailScreen}
        />
        
      </Stack.Navigator>

    )

  }
  
  export default Nav;