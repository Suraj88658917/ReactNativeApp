import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('LoginScreen');
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize: 28 }}>Welcome Home 🎉</Text>

      <TouchableOpacity onPress={logout}>
        <Text style={{ marginTop:20, backgroundColor:'red', color:'#fff', padding:10 }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;