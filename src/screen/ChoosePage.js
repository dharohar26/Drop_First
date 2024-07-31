import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';

const ChoosePage = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <ImageBackground
        source={require('./../../assets/icon/Choose.png')}
        style={styles.backgroundImage}
      >
        <Image
          source={require('./../../assets/icon/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.headerText}>YO! YO! YO!</Text>
        <Text style={styles.subHeaderText}>
          Lets Get Inside. Choose login or, if you don’t
          </Text>

        <Text style={styles.subHeaderText}>
           have an account, sign up now & let’s rock n roll.
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
            style={styles.signupButton}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  logo: {
    height: responsiveHeight(8),
    width: responsiveWidth(30),
    alignSelf: 'center',
    marginTop: responsiveHeight(8),
  },
  headerText: {
    color: '#FFFFFF',
    marginTop: responsiveHeight(58),
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    textAlign:'center',
    marginBottom:10
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.5),
    alignSelf: 'center',
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(8),
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: responsiveHeight(3),
    justifyContent: 'center',
    marginLeft:20,
    marginRight:20
  },
  signupButton: {
    flex: 1,
    height: responsiveHeight(6),
    borderRadius: 30,
    backgroundColor: '#120219',
    borderWidth: 2,
    borderColor: '#C70FF7',
    justifyContent: 'center',
    marginLeft: responsiveWidth(2),
  },
  loginButton: {
    flex: 1,
    height: responsiveHeight(6),
    borderRadius: 30,
    backgroundColor: '#5227B6',
    borderWidth: 2,
    borderColor: '#5227B6',
    justifyContent: 'center',
    marginLeft: responsiveWidth(5),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ChoosePage;
