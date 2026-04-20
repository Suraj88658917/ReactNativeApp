import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    const onboarded = await AsyncStorage.getItem('onboarded');
    const token = await AsyncStorage.getItem('token');

    setTimeout(() => {
      if (!onboarded) {
        navigation.replace('OnboardingScreen');
      } else if (!token) {
        navigation.replace('LoginScreen');
      } else {
        navigation.replace('MainApp');
      }
    }, 1500);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28 }}>My App 🚀</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;