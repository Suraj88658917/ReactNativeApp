import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";

const SplashScreen = ({ navigation }) => {

  const isMounted = useRef(true);

  useEffect(() => {

    checkAppState();

    return () => {
      isMounted.current = false;
    };

  }, []);

  const checkAppState = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token:", token);

      setTimeout(() => {
        if (!isMounted.current) return; 

        if (!token) {
          console.log("Go to Login");
          navigation.replace('LoginScreen');
        } else {
          console.log("Go to MainApp");
          navigation.replace('MainApp');
        }

      }, 1500);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Logo width={wp("33%")} height={hp("20%")} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
});