import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import Logo from "../../assets/Logo/AppLogo.svg";

const VerifyCode = ({ route, navigation }) => {
  const { email } = route.params || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  // OTP Input Handler
const handleOtpChange = (text, index) => {
  if (/^[0-9]?$/.test(text)) {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus forward
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Check if all digits filled
    const otpCode = newOtp.join("");
    if (otpCode.length === 6 && !newOtp.includes("")) {
      handleVerify(otpCode); 
    }
  }
};

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // TIMER
  useEffect(() => {
    let interval;

    if (isDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isDisabled]);

  // VERIFY OTP
 const handleVerify = async (otpCodeParam) => {
  const otpCode = otpCodeParam || otp.join("");

  console.log("Entered OTP:", otpCode);

  if (otpCode.length !== 6) {
    console.log("Enter complete OTP");
    return;
  }

  try {
    await AsyncStorage.setItem("otp", otpCode);
    console.log("OTP saved");

    //  Auto navigate
    navigation.replace("NewPassword");

  } catch (e) {
    console.log("Storage error:", e);
  }
};

  // RESEND OTP
  const handleResend = () => {
    console.log("OTP resent to:", email);
    setTimer(30);
    setIsDisabled(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />


            {/* LOGO */}
            <View style={{ alignItems: "center", marginTop: hp("3%") }}>
                <Logo width={wp("25%")} height={hp("10%")} />
            </View>

      <Text style={styles.title}>Enter Confirmation code</Text>

      <Text style={styles.desc}>
        Please enter the code we’ve sent to {email}
      </Text>

      {/* OTP BOX */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(ref) => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      {/* RESEND */}
      <TouchableOpacity
        disabled={isDisabled}
        onPress={handleResend}
        style={{ marginTop: hp("4%") }}
      >
        <Text
          style={{
            color: isDisabled ? COLORS.gray : COLORS.green,
            fontFamily: FONTS.bold,
          }}
        >
          {isDisabled ? `Resend in ${timer}s` : "Send code again"}
        </Text>
      </TouchableOpacity>

      {/* CHANGE NUMBER */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.changeText}>
          Enter a different email
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
    marginTop: hp("5%"),
  },

  desc: {
    fontSize: wp("3.9%"),
    color: COLORS.gray,
    textAlign: "center",
    marginTop: hp("1%"),
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("6%"),
    width: "100%",
  },

  otpBox: {
    width: wp("12%"),
    height: wp("12%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: wp("5%"),
    fontFamily: FONTS.bold,
  },

  button: {
    backgroundColor: COLORS.green,
    width: "100%",
    padding: hp("2%"),
    borderRadius: 10,
    marginTop: hp("6%"),
    alignItems: "center",
  },

  btnText: {
    color: COLORS.white,
    fontSize: wp("4%"),
  },

  changeText: {
    marginTop: hp("2%"),
    color: COLORS.green,
    fontFamily: FONTS.bold,
  },
});