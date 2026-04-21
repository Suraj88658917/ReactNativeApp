import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

const NewPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await AsyncStorage.setItem("userPassword", password);
      console.log("Password saved");

      Alert.alert("Success", "Password reset successful");

      navigation.replace("Confirmpass");
    } catch (e) {
      console.log("Storage error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* LOGO */}
      <View style={{ alignItems: "center", marginTop: hp("3%") }}>
        <Logo width={wp("25%")} height={hp("10%")} />
      </View>

      {/* TITLE */}
      <View style={[styles.center, { marginTop: wp("10%") }]}>
        <Text style={styles.title}>Reset your password</Text>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.desc}>
        We will send you a confirmation code to reset your{"\n"}password
      </Text>

      {/* PASSWORD */}
      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter new password"
          value={password}
          onChangeText={setPassword}
          style={styles.inputField}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      {/* CONFIRM PASSWORD */}
      <Text style={styles.label}>Repeat new password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Repeat new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.inputField}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        >
          <Icon
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={20}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>Save New Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("5%"),
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
  },

  desc: {
    fontSize: wp("3.5%"),
    textAlign: "center",
    fontFamily: FONTS.regular,
    marginTop: hp("1%"),
    color: COLORS.gray,
  },

  label: {
    marginTop: hp("4%"),
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: hp("1%"),
    paddingHorizontal: 10,
  },

  inputField: {
    flex: 1,
    height: hp("6%"),
  },

  loginBtn: {
    backgroundColor: COLORS.green,
    marginTop: hp("5%"),
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