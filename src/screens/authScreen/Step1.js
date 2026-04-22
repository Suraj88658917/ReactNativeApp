import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import Frame from "../../assets/images/Frame.svg";
import { launchImageLibrary } from 'react-native-image-picker';
import CountryPicker, { Flag } from "react-native-country-picker-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Step1 = ({ navigation }) => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const [step, setStep] = useState(1);
  const [companyname, setCompanyname] = useState("");
  const [employeesno, setEmployeesno] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [phone, setPhone] = useState("");

  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const employeeOptions = [
    "1 - 10",
    "11 - 50",
    "51 - 200",
    "201 - 500",
    "500+"
  ];

 const handleNext = async () => {
  console.log(` Current Step: ${step}`);

  if (step === 1) {
    console.log(" Step 1 Data:", { companyname });

    if (!companyname) {
      console.log(" Enter company name");
      return;
    }
  }

  if (step === 2) {
    console.log(" Step 2 Data:", {
      employeesno,
      address,
      website,
      description
    });

    if (!employeesno) {
      console.log(" Select employees number");
      return;
    }
  }

  if (step === 3) {
    console.log(" Step 3 Image:", imageUri);
  }

  if (step === 4) {
    console.log(" Step 4 Phone:", fullPhone);

    if (!phone) {
      console.log(" Enter phone number");
      return;
    }
  }

  // OTP Step
  if (step === 5) {
    const otpCode = otp.join("");

    console.log(" Step 5 OTP Entered:", otpCode);

    if (otpCode.length !== 6) {
      console.log(" Enter complete OTP");
      return;
    }

    console.log(" OTP Verified:", otpCode);

    const userData = {
      companyname,
      employeesno,
      address,
      website,
      description,
      phone: fullPhone,
      imageUri,
    };

    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log(" Data Saved Successfully:", userData);
    } catch (e) {
      console.log(" Storage Error:", e);
    }

    console.log(" Navigating to MainApp");
    navigation.replace("MainApp");
    return;
  }

  console.log(" Moving to Next Step:", step + 1);
  setStep(step + 1);
};


  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        console.log('Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const fullPhone = `+${country?.callingCode?.[0] || "91"} ${phone}`;

  const handleOtpChange = (text, index) => {
    if (/^[0-9]?$/.test(text)) {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

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

 const handleResend = () => {
  console.log(" OTP Resent to", fullPhone);
  setTimer(30);
  setIsDisabled(true);
};

  return (
     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* LOGO */}
      <View style={styles.header}>
        <View style={{ width: wp("65%"), justifyContent: "Center", alignItems: "flex-end" }}>
          <Logo width={wp("25%")} height={hp("10%")} />
        </View>
        <View style={{ width: wp("30%"), height: hp("10%"), justifyContent: "center", alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.replace("MainApp")}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DOTS */}
      <View style={styles.dotContainer}>
        {[1, 2, 3, 4, 5].map((item) => (
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
      <Text style={styles.stepText}>STEP {step}/5</Text>

      {/* CONTENT */}
      <View style={styles.content}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Text style={styles.title}>Enter company name</Text>
            <View style={{ paddingHorizontal: wp("5%") }}>
              <TextInput
                placeholder='Company name'
                value={companyname}
                onChangeText={setCompanyname}
                style={styles.input}
              />
            </View>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >

                <Text style={styles.title}> Enter Company Details</Text>

                {/* DROPDOWN */}
                <Text style={styles.desc1}>Number of employees</Text>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setDropdownVisible(true)}
                >
                  <Text>
                    {employeesno || "Select number of employees"}
                  </Text>
                </TouchableOpacity>

                {/* MODAL DROPDOWN */}
                <Modal visible={dropdownVisible} transparent animationType="slide">
                  <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                      <FlatList
                        data={employeeOptions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                              setEmployeesno(item);
                              setDropdownVisible(false);
                            }}
                          >
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />

                      <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                        <Text style={{ textAlign: "center", marginTop: 10 }}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {/* ADDRESS */}
                <Text style={styles.desc1}>HQ Address</Text>
                <TextInput
                  placeholder='Enter address'
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
                />

                {/* WEBSITE */}
                <Text style={styles.desc1}>Website (optional)</Text>
                <TextInput
                  placeholder='Enter website'
                  value={website}
                  onChangeText={setWebsite}
                  style={styles.input}
                />

                {/* DESCRIPTION */}
                <Text style={styles.desc1}> Short description</Text>
                <TextInput
                  placeholder='Tell something about your company'
                  value={description}
                  onChangeText={setDescription}
                  style={[styles.input, { height: hp("16%"), textAlignVertical: "top" }]}
                  multiline
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {step === 3 && (
              <>
                <Text style={styles.title}>Upload a profile picture</Text>

                <View style={{ justifyContent: "center", alignItems: "center" }}>

                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        width: wp("35%"),
                        height: wp("35%"),
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Frame width={wp("35%")} height={hp("25%")} />
                  )}

                </View>

                <View style={{ marginTop: hp("2%") }}>
                  <TouchableOpacity onPress={pickImage}>
                    <Text
                      style={{
                        fontSize: wp("3.5%"),
                        fontFamily: FONTS.bold,
                        textAlign: "center",
                        color: COLORS.green,
                      }}
                    >
                      {imageUri ? "Change Image" : "Upload Image"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    fontSize: wp("3.5%"),
                    textAlign: "center",
                    color: COLORS.gray,
                    marginTop: hp("1%"),
                  }}
                >
                  Recommended resolution 300x300 px{"\n"}
                  Max size – 2 MB{"\n"}
                  Formats: jpg, png
                </Text>
              </>
            )}
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <Text style={styles.title}>Enter your phone number</Text>

            <Text style={styles.desc2}>
              Phone number will help protect your account as well as{"\n"}
              let employers contact you much easier
            </Text>

            <View style={{ marginTop: wp("4%") }}>
              <Text style={{ fontFamily: FONTS.regular, color: COLORS.midWhite }}>
                Phone number
              </Text>
            </View>

            {/* PHONE INPUT WITH COUNTRY PICKER */}
            <View style={styles.phoneRow}>

              {/* COUNTRY PICKER BUTTON */}
              <TouchableOpacity
                style={styles.countryBtn}
                onPress={() => setPickerVisible(true)}
              >
                   <Flag
                    countryCode={countryCode}
                    size={18}
                  />

                  <Text style={styles.codeText}>
                    +{country?.callingCode?.[0] || "91"}
                  </Text>

                  <Text style={{ marginLeft: 4 }}>▼</Text>

                {/* </View> */}
              </TouchableOpacity>
              {/* PHONE INPUT */}
              <TextInput
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.phoneInput}
              />
            </View>

            {/* COUNTRY PICKER MODAL */}
           <View>
             <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode
              withEmoji
              withModal
              visible={pickerVisible}
              onClose={() => setPickerVisible(false)}
              onSelect={(c) => {
                onSelectCountry(c);
                setPickerVisible(false);
              }}
            />
           </View>
          </>
        )}
        {step === 5 && (
          <>
            <Text style={styles.title}>Confirm your phone number</Text>
            <Text style={styles.desc3}>Please enter the code we’ve sent to  {fullPhone}</Text>

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

            <View style={{ marginTop: wp("12%"), alignItems: "center" }}>
              <TouchableOpacity
                disabled={isDisabled}
                onPress={handleResend}
              >
                <Text
                  style={{
                    fontSize: wp("3.6%"),
                    fontFamily: FONTS.bold,
                    color: isDisabled ? COLORS.gray : COLORS.green
                  }}
                >
                  {isDisabled
                    ? `Resend in ${timer}s `
                    : "Send code again "}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: wp("2%"), alignItems: "center" }}>
              <TouchableOpacity onPress={() => setStep(4)}>
              <Text style={{
                fontSize: wp("3.6%"),
                fontFamily: FONTS.bold,
                color: COLORS.green
              }}>
                Enter a different phone number
              </Text>
            </TouchableOpacity>
            </View>
          </>
        )}

      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.btnText}>
          {step === 5 ? "Next" : "Next"}
        </Text>
      </TouchableOpacity>

   </SafeAreaView>
  );
};

export default Step1;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  center: {
    alignItems: "center",
    marginTop: hp("3%"),
  },

  stepText: {
    textAlign: "center",
    fontSize: wp("3.5%"),
    marginTop: hp("2%"),
    color: COLORS.gray
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp("2%"),
  },

  dot: {
    width: wp("10%"),
    height: hp("0.6%"),
    marginHorizontal: wp("1%"),
    borderRadius: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: wp("5%"),
  },

  title: {
    fontSize: wp("6%"),
    marginBottom: hp("0.5%"),
    textAlign: "center",
    fontFamily: FONTS.bold
  },

  desc: {
    fontSize: wp("3%"),
    textAlign: "center",
    color: COLORS.gray,
  },

  desc1: {
    marginTop: hp("2%"),
    fontSize: wp("4%"),
    color: COLORS.gray,
  },
  desc2: {
    fontSize: wp("3.4%"),
    color: COLORS.gray,
    textAlign: "center"
  },
  desc3: {
    fontSize: wp("3.4%"),
    color: COLORS.gray,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: hp("1.5%"),
    marginTop: hp("1%"),
  },

  button: {
    backgroundColor: COLORS.green,
    margin: wp("5%"),
    padding: hp("2%"),
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: COLORS.white,
    fontSize: wp("4%"),
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },

  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp("4%"),
  },

  skip: {
    fontSize: wp("4%"),
    fontFamily: FONTS.medium,
    color: COLORS.gray
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: hp("1%"),
     overflow: "hidden",
  },

  countryBtn: {
   flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: wp("3%"),
  paddingVertical: hp("1.5%"),
  borderRightWidth: 1,
  borderColor: "#ccc",
  gap: wp("2%"),
  },

  phoneInput: {
    flex: 1,
  paddingHorizontal: wp("3%"),
  fontSize: wp("3.8%"),
},
  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("20%"),
    paddingHorizontal: 6,
  },

  codeText: {
    fontSize: wp("3.8%"),
  fontFamily: FONTS.medium,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("5%"),
    paddingHorizontal: wp("5%"),
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

});