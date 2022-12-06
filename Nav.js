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
import CartScreen from './screens/CartScreen'
import { Button, Overlay, Icon, Input, ButtonGroup, ThemeConsumer } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

const store = configureStore({
    reducer: rootReducer, 
  });

  function Nav() {
    const Tab = createBottomTabNavigator();
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='Login'  screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'AboutUs') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'HomeScreen') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'AboutUs') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            } 
            else if (route.name === 'Favourites') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            } else if (route.name === 'CartScreen') {
              iconName = focused ? 'ios-cart' : 'ios-cart-outline';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'navy',
          tabBarInactiveTintColor: 'gray',
        })}>
            {/* <Tab.Screen name="Login" component={LoginScreen}/> */}
            <Tab.Screen name='HomeScreen' component={HomeNavigator}/>
             
            <Tab.Screen name='Favourites' component={Favourites}/>
            <Tab.Screen name='AboutUs' component={AboutUsNavigator}/>
            <Tab.Screen name='CartScreen' component={CartScreen}/>
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