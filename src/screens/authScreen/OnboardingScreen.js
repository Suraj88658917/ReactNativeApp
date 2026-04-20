import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Logo from "../../assets/Logo/AppLogo.svg";
import { wp, hp } from "../../utils/responsive";
import { COLORS } from "../../utils/colors";
import {FONTS} from "../../utils/fonts";

const data = [
  { id: '1', title: 'Welcome', desc: 'Welcome to our app ' },
  { id: '2', title: 'Search', desc: 'Find anything easily ' },
  { id: '3', title: 'Connect', desc: 'Stay connected ' },
  { id: '4', title: 'Save', desc: 'Save your favorites ' },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('LoginScreen');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      

      {/* Text */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

        <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <View style={{justifyContent:"center" , alignItems:"center"}}>
          <Logo width={wp("25%")} height={hp("10%")} />
      </View>



      {/* Dots */}
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  currentIndex === index ? COLORS.green : COLORS.midWhite,
                width: currentIndex === index ? wp("10%") : wp("10%"),
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>
          STEP {currentIndex + 1}/{data.length}
        </Text>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / wp('100%')
          );
          setCurrentIndex(index);
        }}
      />

      

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.btnText}>
          {currentIndex === data.length - 1 ? 'Next' : 'Next'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
    stepContainer: {
    alignItems: 'center',
    // marginTop: wp("2%"),
  },
  stepText: {
    fontSize: wp("3%"),
    fontWeight: FONTS.medium,
  },

  slide: {
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },

  title: {
    fontSize: wp("6%"),
    marginTop: hp("3%"),
    fontWeight:FONTS.bold,
  },

  desc: {
    fontSize: wp("4%"),
    marginTop: hp("1%"),
    textAlign: "center",
    color: COLORS.gray,
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp("4%"),
    
  },

  dot: {
    height: hp("0.6%"),
    borderRadius: 1,
    marginHorizontal: wp("1%"),
  },

  button: {
    backgroundColor: COLORS.green,
    marginHorizontal: wp("5%"),
    marginBottom: hp("3%"),
    padding: hp("2%"),
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: COLORS.white,
    fontSize: wp("4%"),
  },
});