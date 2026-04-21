import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Logo from "../../assets/Logo/AppLogo.svg";
import { COLORS } from "../../utils/colors";
import { wp, hp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Confirmpass = ({ navigation }) => {

  //  Handle Button Click with AsyncStorage
  const handleSubmit = async () => {
    console.log(" Button Clicked - Going to Login");

    try {
      //  Save flag (optional)
      await AsyncStorage.setItem("passwordReset", "true");
      console.log(" Password reset flag saved");

      //  Remove temporary data (good practice)
      await AsyncStorage.removeItem("resetEmail");
      await AsyncStorage.removeItem("otp");

      console.log(" Old reset data cleared");

      //  Navigate
      navigation.replace("LoginScreen");

    } catch (error) {
      console.log(" AsyncStorage Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Logo width={wp("25%")} height={hp("10%")} />
      </View>

      {/* TITLE */}
      <View style={styles.center}>
        <Text style={styles.title}>
          Perfect! Your password has{"\n"}been changed
        </Text>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.desc}>
        You can now log in with your new password
      </Text>

      {/* BUTTON */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Confirmpass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("5%"),
  },

  logoContainer: {
    alignItems: "center",
    marginTop: hp("5%"),
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
    textAlign: "center",
  },

  desc: {
    fontSize: wp("3.8%"),
    textAlign: "center",
    fontFamily: FONTS.regular,
    marginTop: hp("2%"),
    color: COLORS.gray,
  },

  loginBtn: {
    backgroundColor: COLORS.green,
    marginTop: hp("6%"),
    height: hp("6%"),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    color: COLORS.white,
    fontSize: wp("4%"),
    fontFamily: FONTS.bold,
  },
});