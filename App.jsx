import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Logo from "./src/assets/Logo/AppLogo.svg";
import {FONTS} from "./src/utils/fonts";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 , fontFamily:FONTS.medium }}>This is App</Text>

      <Logo width={90} height={90} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center"
  }
});

