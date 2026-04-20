import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';
import React, { useState } from 'react';
import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import { FONTS } from '../../utils/fonts';
import Google from "../../assets/images/google.svg";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);

 const handleRegister = async () => {
  try {
    console.log(" Register Clicked");

    if (!email || !password || !confirmPassword) {
      console.log(" Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log(" Password not match");
      return;
    }

    // Fake token (for now)
    const fakeToken = "signup-token-123";

    //  Save in AsyncStorage
    await AsyncStorage.setItem("token", fakeToken);
    await AsyncStorage.setItem("email", email);

    console.log(" Token Saved:", fakeToken);
    console.log(" Email Saved:", email);

    //  Navigate to login or directly app
    navigation.replace("EmailVerification" , {
      email:email
    }
    );

  } catch (error) {
    console.log(" Register Error:", error);
  }
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: wp("5%")  }}>

          {/* Header */}
          <View style={styles.header}>
            <Logo width={wp("18%")} height={hp("6%")} />

            <TouchableOpacity>
              <Text style={styles.signupText}>
                Sign up as an individual
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Sign up and {"\n"} post a job for free
          </Text>

          {/* Login Redirect */}
          <View style={styles.rowCenter}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={[styles.text, { color: COLORS.green }]}> Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Google */}
          <TouchableOpacity style={styles.googleBtn}>
            <Google width={wp("6%")} height={hp("4%")} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.or}>or</Text>
            <View style={styles.line} />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Icon name={secure ? "eye-off-outline" : "eye-outline"} size={22} color={COLORS.green} />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Repeat Password</Text>
          <View style={styles.passwordBox}>
            <TextInput
              placeholder="Repeat Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secure2}
              style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={() => setSecure2(!secure2)}>
              <Icon name={secure2 ? "eye-off-outline" : "eye-outline"} size={22} color={COLORS.green} />
            </TouchableOpacity>
          </View>

          <View style={{marginTop:wp("4%")}}>
             <Text style={styles.termsText}>
            By signing up, you confirm that you agree to{" "}

            <Text style={styles.linkText}>
              Terms & Conditions
            </Text>

            {" "}and{" "}

            <Text style={styles.linkText}>
              Privacy Policy
            </Text>
          </Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>


        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  signupText: {
    fontFamily: FONTS.medium,
    color: COLORS.green,
    fontSize: wp("3.5%"),
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: wp("5.5%"),
    textAlign: "center",
    marginTop: hp("4%"),
  },

  text: {
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    color: COLORS.text
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("2%"),
  },

  googleBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Button,
    width: wp("90%"),
    height: hp("5%"),
    borderRadius: 10,
    marginTop: hp("4%"),
  },

  googleText: {
    marginLeft: wp("2%"),
    fontFamily: FONTS.bold,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("2%"),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },

  or: {
    marginHorizontal: wp("3%"),
    color: COLORS.text,
  },

  label: {
    marginTop: hp("1%"),
    fontFamily: FONTS.regular,
    color:COLORS.text
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: hp("1.5%"),
    marginTop: hp("1%"),
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: hp("1%"),
  },

  registerBtn: {
    backgroundColor: COLORS.green,
    width:wp("90%"),
    height:hp("6%"),
    borderRadius: 10,
    marginTop: hp("4%"),
    alignItems: "center",
    justifyContent:"center"
  },

  registerText: {
    color: "#fff",
    fontFamily: FONTS.bold,
  },
  termsText: {
    fontSize: wp("3.5%"),
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginTop: hp("2%"),
    lineHeight: hp("2.2%"),
  },

  linkText: {
    fontSize: wp("3.5%"),
    fontFamily: FONTS.medium,
    color: COLORS.green,
  },
});