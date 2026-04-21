import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    //  Email validation
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    // Handle Submit
    const handleSubmit = async () => {
        console.log(" Entered Email:", email);

        if (!email) {
            console.log(" Email is empty");
            Alert.alert("Error", "Please enter email");
            return;
        }

        if (!isValidEmail(email)) {
            console.log(" Invalid Email Format");
            Alert.alert("Error", "Enter valid email");
            return;
        }

        try {
            //  Save email in AsyncStorage
            await AsyncStorage.setItem("resetEmail", email);

            console.log(" Email saved in AsyncStorage:", email);

            Alert.alert("Success", "Reset link sent (mock)");

            //  Navigate if needed
            navigation.navigate("VerifyCode" , {
                email:email
            });

        } catch (error) {
            console.log(" Storage Error:", error);
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
                We will send you a confirmation code to reset your {"\n"}password
            </Text>

            {/* EMAIL LABEL */}
            <Text style={styles.label}>Email</Text>

            {/* INPUT */}
            <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* BUTTON */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>

            {/* BACK */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>I remember my password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotScreen;

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
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginTop: hp("1%"),
        width: wp("90%"),
        height: hp("6%"),
        fontSize: wp("4%"),
    },

    loginBtn: {
        backgroundColor: COLORS.green,
        marginTop: hp("4%"),
        width: wp("90%"),
        height: hp("6%"),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    loginText: {
        color: COLORS.white,
        fontSize: wp("4%"),
        fontFamily: FONTS.bold,

    },

    backText: {
        textAlign: "center",
        marginTop: hp("2%"),
        color: COLORS.green,
        fontFamily: FONTS.bold,
    },
});