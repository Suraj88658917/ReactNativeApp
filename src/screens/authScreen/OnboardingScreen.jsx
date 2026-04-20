import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Welcome 🚀', desc: 'Welcome to our app' },
  { id: '2', title: 'Search 🔍', desc: 'Find anything easily' },
  { id: '3', title: 'Connect 🤝', desc: 'Stay connected' },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = async () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await AsyncStorage.setItem('onboarded', 'true');
      navigation.replace('LoginScreen');
    }
  };

  let flatListRef;

  const renderItem = ({ item }) => (
    <View
      style={{
        width,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28 }}>{item.title}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        ref={(ref) => (flatListRef = ref)}
      />

      {/* Dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
        {data.map((_, i) => (
          <View
            key={i}
            style={{
              height: 8,
              width: currentIndex === i ? 20 : 8,
              backgroundColor: 'black',
              margin: 5,
              borderRadius: 5,
            }}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: 'blue',
          padding: 15,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          {currentIndex === data.length - 1 ? 'Start' : 'Next'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default OnboardingScreen;