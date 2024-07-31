import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import SharedPreferences from 'react-native-shared-preferences';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginState = () => {
      SharedPreferences.getItem('isLoggedIn', (value) => {
        if (value === 'true') {
          navigation.replace('Side');
        } else {
          navigation.replace('choose');
        }
      });
    };

    const splashTimeout = setTimeout(() => {
      checkLoginState();
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(splashTimeout); // Cleanup timeout on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <Image
        source={require('./../../assets/icon/Splash.png')}
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          alignSelf: 'center',
          bottom: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
});

export default SplashScreen;
