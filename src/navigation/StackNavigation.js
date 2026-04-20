import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from "../screens/authScreen/SplashScreen";
import OnboardingScreen from "../screens/authScreen/OnboardingScreen";
import LoginScreen from "../screens/authScreen/LoginScreen";
import SignUpScreen from "../screens/authScreen/SignUpScreen";
import HomeScreen from "../screens/AppScreen/HomeScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator  initialRouteName="SplashScreen" screenOptions={{ headerShown: false,}}>
       <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;