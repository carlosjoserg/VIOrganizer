import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function News() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{marginTop: insets.top}, styles.container]}>
      <Image style={styles.logo} source={require('../assets/logo.jpg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
