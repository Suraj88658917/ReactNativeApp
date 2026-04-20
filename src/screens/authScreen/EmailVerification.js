import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors"
import { FONTS } from '../../utils/fonts';

const EmailVerification = ({ route, navigation }) => {

  const email = route?.params?.email || "your email";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const [timer, setTimer] = useState(30);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // move next
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // auto verify when 6 digits filled
    if (newOtp.join("").length === 6) {
      verifyOtp(newOtp.join(""));
    }
  };


  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOtp = (code) => {
    console.log("OTP Entered:", code);

    // fake check
    if (code === "123456") {
      console.log("OTP Verified");
      navigation.replace("Step1");
    } else {
      console.log("Wrong OTP");
    }
  };


  const resendOtp = () => {
    console.log("Resend OTP");
    setTimer(30);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Logo */}
      <View style={styles.center}>
        <Logo width={wp("25%")} height={hp("10%")} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Confirm your email</Text>

      {/* Email */}
      <Text style={styles.email}>{email}</Text>

      {/* OTP Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {/* Timer + Resend */}
      <View style={styles.resendContainer}>
        {timer > 0 ? (
          <Text style={styles.timer}>
            Resend code in {timer}s
          </Text>
        ) : (
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.resend}>
              Send code again
            </Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
}

export default EmailVerification;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center"
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%")
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
    marginTop: hp("3%")
  },

  email: {
    fontSize: wp("3.8%"),
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginTop: hp("1%")
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("80%"),
    marginTop: hp("5%")
  },

  otpBox: {
    width: wp("12%"),
    height: wp("12%"),
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: wp("5%"),
    borderRadius: 8
  },

  resendContainer: {
    marginTop: hp("4%")
  },

  timer: {
    fontSize: wp("3.5%"),
    color: COLORS.gray
  },

  resend: {
    fontSize: wp("3.5%"),
    color: COLORS.green,
    fontFamily: FONTS.bold
  }
});