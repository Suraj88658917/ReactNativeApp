import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      await AsyncStorage.setItem('token', 'dummy-token');
      navigation.replace('HomeScreen');
    } else {
      alert('Enter details');
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <Text style={{ fontSize: 28 }}>Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth:1, marginVertical:10, padding:10 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth:1, marginVertical:10, padding:10 }}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text style={{ backgroundColor:'blue', color:'#fff', padding:10, textAlign:'center' }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={{ marginTop:15 }}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;