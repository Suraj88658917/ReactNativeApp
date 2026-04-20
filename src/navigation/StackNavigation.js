import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from "../screens/authScreen/SplashScreen";
import LoginScreen from "../screens/authScreen/LoginScreen";
import SignUpScreen from "../screens/authScreen/SignUpScreen";
import TabNavigation from "./TabNavigation";
import EmailVerification from "../screens/authScreen/EmailVerification";
import Step1 from "../screens/authScreen/Step1";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator  initialRouteName="SplashScreen" screenOptions={{ headerShown: false,}}>
       <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
       <Stack.Screen name="EmailVerification" component={EmailVerification} />
       <Stack.Screen name="Step1" component={Step1} />
      <Stack.Screen name="MainApp" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;