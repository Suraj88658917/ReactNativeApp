import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useState , useEffect } from 'react';
import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import Google from "../../assets/images/google.svg";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("email");

      if (savedEmail) {
        setEmail(savedEmail);
        setRemember(true);

        console.log(" Email loaded:", savedEmail);
      }
    } catch (error) {
      console.log("Load Error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      console.log(" Login Attempt");

      if (!email || !password) {
        console.log(" Enter email & password");
        return;
      }

      const fakeToken = "demo-token-123";

      if (remember) {
        await AsyncStorage.setItem("token", fakeToken);
        await AsyncStorage.setItem("email", email);

        console.log(" Token Saved:", fakeToken);
        console.log(" Email Saved:", email);
      } else {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("email");

        console.log(" Data cleared (remember off)");
      }

      navigation.replace("MainApp");

    } catch (error) {
      console.log(" Login Error:", error);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container1}>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

          {/* Logo */}
          <View style={styles.center}>
            <Logo width={wp("25%")} height={hp("10%")} />
          </View>

          {/* Title */}
          <View style={[styles.center, { marginTop: wp("10%") }]}>
            <Text style={styles.title}>Log in</Text>
          </View>

          {/* Signup */}
          <View style={styles.rowCenter}>
            <Text style={styles.text}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={[styles.text, { color: COLORS.green }]}> Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleBtn}>
            <Google width={wp("6%")} height={hp("4%")} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.or}>or</Text>
            <View style={styles.line} />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder='Enter the Email'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='Enter the Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              style={{ flex: 1 }}
            />

            {/* Eye Icon */}
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Icon
                name={secure ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={COLORS.green}
              />
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: wp("2%") }}>
            <TouchableOpacity>
              <Text style={{ color: COLORS.green, fontFamily: FONTS.bold, fontSize: wp("3.3%") }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Checkbox + Forgot */}
          <View style={styles.rowBetween}>

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRemember(!remember)}
            >
              <View style={[
                styles.checkbox,
                { backgroundColor: remember ? COLORS.green :"#fff" }
              ]}>
                {remember && (
                  <Icon name="checkmark" size={14} color="#fff" />
                )}
              </View>

              <Text style={{ marginLeft: 5 }}>Keep me logged in</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin}
           style={styles.loginBtn}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: wp("5%"),
  },
  container1: {
    flex: 1
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: wp("7%"),
    fontFamily: FONTS.bold,
  },

  text: {
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    color: COLORS.text
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("1%"),
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Button,
    padding: hp("1%"),
    borderRadius: 10,
    marginTop: hp("4%"),
  },

  googleText: {
    marginLeft: wp("2%"),
    fontFamily: FONTS.bold,
    fontSize: wp("3.6%")
  },

  or: {
    textAlign: "center",
    marginVertical: hp("2%"),
    color: COLORS.text
  },

  label: {
    marginTop: hp("1%"),
    fontFamily: FONTS.regular,
    color: COLORS.text
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: hp("1.5%"),
    marginTop: hp("1%"),
    color: COLORS.text
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: hp("1%"),
    color: COLORS.text
  },

  rowBetween: {
    marginTop: hp("3%"),
    color: COLORS.text
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: COLORS.text,

  },

  checkbox: {
    width: wp("4%"),
    height: hp("2%"),
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  loginBtn: {
    backgroundColor: COLORS.green,
    padding: hp("1.6%"),
    borderRadius: 10,
    marginTop: hp("3%"),
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontFamily: FONTS.bold,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("3%"),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor:"#dcdada",
  },

  or: {
    marginHorizontal: wp("3%"),
    fontSize: wp("3.5%"),
    color:COLORS.text,
    fontFamily: FONTS.regular,
  },
});