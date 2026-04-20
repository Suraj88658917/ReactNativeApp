import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput
} from 'react-native';

import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

const step1 = ({ navigation }) => {

  const [step, setStep] = useState(1);
  const[companyname , setCompanyname] = useState("")

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigation.replace('MainApp');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* LOGO */}
      <View style={styles.center}>
        <Logo width={wp("25%")} height={hp("10%")} />
      </View>

      {/* DOTS */}
      <View style={styles.dotContainer}>
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            style={[
              styles.dot,
              {
                backgroundColor:
                  step === item ? COLORS.green : COLORS.midWhite,
              }
            ]}
          />
        ))}
      </View>

        {/* STEP TEXT */}
      <Text style={styles.stepText}>
        STEP {step}/4
      </Text>

      {/* CONTENT */}
      <View style={styles.content}>

        {step === 1 && (
          <>
            <Text style={styles.title}>Great! Let’s take a few steps before you post a job.</Text>
            <Text style={styles.desc}>First, please enter company name</Text>
            <View style={{marginTop:wp("7%") , paddingHorizontal:wp("6%")}}>
                <Text style={{fontFamily:FONTS.regular , fontSize:wp("3.5%") , color:COLORS.gray}}>Company name</Text>
            </View>
           <View style={{paddingHorizontal:wp("5%")}}>
             <TextInput
            placeholder=''
            value={companyname}
            onChangeText={setCompanyname}
            style={styles.input}
            />
           </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.title}>Enter company details</Text>
            <Text style={styles.desc}>Find anything easily</Text>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.title}>Connect</Text>
            <Text style={styles.desc}>Stay connected</Text>
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.title}>Save</Text>
            <Text style={styles.desc}>Save your favorites</Text>
          </>
        )}

      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.btnText}>
          {step === 4 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default step1;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%")
  },

  stepText: {
    textAlign: "center",
    fontSize: wp("3.5%"),
    fontFamily: FONTS.medium,
    marginTop: hp("2%"),
    color: COLORS.gray
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp("2%")
  },

  dot: {
    width: wp("10%"),
    height: hp("0.6%"),
    marginHorizontal: wp("1%"),
    borderRadius: 2
  },

  content: {
    flex: 1,
    marginTop:wp("2%")
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
    marginBottom: hp("1%"),
    textAlign:"center"
  },

  desc: {
    fontSize: wp("4%"),
    color: COLORS.gray,
    textAlign: "center"
  },

  button: {
    backgroundColor: COLORS.green,
    margin: wp("5%"),
    padding: hp("2%"),
    borderRadius: 10,
    alignItems: "center"
  },

  btnText: {
    color: COLORS.white,
    fontSize: wp("4%"),
    fontFamily: FONTS.bold
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.midWhite,
    borderRadius: 8,
    width:wp("90%"),
    height:hp("6%"),
    marginTop: hp("1%"),
    color: COLORS.text,
  },


});