import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const SignUpScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (email && password) {
      alert('Registered Successfully');
      navigation.replace('LoginScreen');
    } else {
      alert('Fill all fields');
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <Text style={{ fontSize: 28 }}>Sign Up</Text>

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

      <TouchableOpacity onPress={handleSignup}>
        <Text style={{ backgroundColor:'green', color:'#fff', padding:10, textAlign:'center' }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;