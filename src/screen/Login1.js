// Import libraries and components
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { CountryPicker } from 'react-native-country-codes-picker';
import SharedPreferences from 'react-native-shared-preferences';
import { firebaseConfig } from './config';
import firebase from 'firebase/compat';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import auth from '@react-native-firebase/auth';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// Create the component
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [shownModal, setShownModal] = useState(false);
  const [appleModal, setAppleModal] = useState(false);
  const [country_code, setCountry_code] = useState("+91")
  const [confirm, setConfirm] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const recaptchaVerifier = useRef(null);

  const animatedStyles = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100],
        }),
      },
    ],
  };


  // Validate phone number
  const validateFields = () => {
    let isValid = true;

    if (!phoneNumber) {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError('Phone Number must be at least 10 digits');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateFields()) {
      signInWithPhoneNumber();
    }else{
      console.log("Error this is not working")
    }
  };

  // Handle login state change
  function onAuthStateChanged(user) {
    if (user) {
      // User is logged in, navigate away from this screen 
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle phone number sign-in
  async function signInWithPhoneNumber() {
    // Format the phone number using the country code
    const formattedPhoneNumber = country_code + phoneNumber;
    console.log("PhonneNumber",formattedPhoneNumber);
    // Send OTP to the formatted phone number
    try {
      setIsLoading(true)
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber, true);
      console.log("confirmation", confirmation);
      setConfirm(confirmation);
      setIsLoading(false)
      navigation.navigate('OtpVerify', { confirm: confirmation });
    } catch (error) {
      console.log('Error sending OTP:', error);
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground
          source={require('./../../assets/icon/Loginback.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <Image
            source={require('./../../assets/icon/logo.png')}
            style={styles.logo}
          />

          <View>
            <Text style={styles.loginText}>Login</Text>
          </View>

          <View style={{ bottom: 40 }}>
            <View style={styles.phoneNumberContainer}>
              <Text style={styles.phoneInputLabel}>
                Enter Registered Phone number
              </Text>
              <View style={{ width: responsiveWidth(90), height: 52, backgroundColor: 'rgba(51, 51, 51, 0.7)', borderRadius: 30, alignSelf: 'center', flexDirection: 'row', marginTop: 8 }}>
                <View style={styles.countryCodeContainer}>
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={styles.countryCodeButton}
                  >
                    <Text style={styles.countryCodeText}>{country_code}</Text>
                  </TouchableOpacity>
                  <CountryPicker
                    show={show}
                    pickerButtonOnPress={(item) => {
                      setCountry_code(item.dial_code);
                      setShow(false);
                    }}
                    selectedCountry={country_code}
                    style={{
                      modal: {
                        height: 500,
                        backgroundColor: '#fff',
                      },
                      textInput: {
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#808080'
                      },
                      countryButtonStyles: {
                        height: 45
                      },
                    }}
                  />
                  <Text style={{ color: '#fff', top: 4, fontSize: 26 }}>|</Text>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                  placeholder="1234567899"
                  placeholderTextColor="#808080"
                  keyboardType='numeric'
                  maxLength={10}
                />
              </View>
            </View>
            {phoneNumberError ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 13, marginTop: 5 }}>{phoneNumberError}</Text> : null}
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                SharedPreferences.setItem("phoneNumber", phoneNumber);
                handleSubmit();
                // navigation.navigate('Home');
              }}
              style={styles.loginButton}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <LinearGradient
                  colors={['#9A0FDE', '#480FB0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientContainer}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </LinearGradient>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ color: '#808080', alignSelf: 'center', fontSize: responsiveFontSize(2), bottom: 18 }}>-Or-</Text>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: responsiveHeight(2), bottom: 24 }}>
            <View>
              <TouchableOpacity onPress={() => setShownModal(!shownModal)}>
                <Image source={require('./../../assets/icon/Google.png')}
                  style={{ height: 25, width: 25, right: 18 }} />
              </TouchableOpacity>

              <Modal
                transparent={true}
                visible={shownModal}
                animationType='fade'
                onRequestClose={() => {
                  setShownModal(!shownModal);
                }}>

                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={{ height: responsiveHeight(7), borderWidth: 0.5, width: responsiveWidth(100), backgroundColor: '#F6F6F6', borderColor: '#ccf2ff', elevation: 5, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setShownModal(false)}>
                          <Text style={{ color: '#1E90FF', fontSize: responsiveFontSize(2) }}>Cancel</Text>
                        </TouchableOpacity>
                        <Image source={require('./../../assets/icon/padlock.png')}
                          style={{
                            height: 13, width: 13, marginTop: responsiveHeight(1.5), borderRadius: 30, marginLeft: responsiveWidth(8), bottom: 5
                          }} />
                        <Text style={{ color: '#222222', fontSize: responsiveFontSize(1.9), marginLeft: responsiveWidth(1), fontWeight: '500' }}>account.google.com</Text>
                        <Text style={{ color: '#1E90FF', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(9) }}>A</Text>
                        <Text style={{ color: '#1E90FF', fontSize: responsiveFontSize(2) }}>A</Text>
                        <Image source={require('./../../assets/icon/reload.png')}
                          style={{
                            height: 22, width: 22, marginTop: responsiveHeight(1), borderRadius: 30, marginLeft: responsiveWidth(6), bottom: 8
                          }} />

                      </View>
                    </View>
                    <View style={{ height: responsiveHeight(4), borderWidth: 0.5, width: responsiveWidth(100), backgroundColor: '#f3f3f3', borderColor: '#ccf2ff', elevation: 5, justifyContent: 'center' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={require('./../../assets/icon/Google.png')}
                          style={{
                            height: 16, width: 16, borderRadius: 30, marginLeft: responsiveWidth(6), top: 4
                          }} />
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8), marginLeft: responsiveWidth(3), fontWeight: '400' }}>Sign in with Google</Text>
                      </View>
                    </View>
                    <Image source={require('./../../assets/icon/Splash.png')}
                      style={{
                        height: 60, width: 60, marginTop: responsiveHeight(2), borderRadius: 12,
                      }} />
                    <Text style={{ color: '#222222',fontSize: responsiveFontSize(2.7), fontWeight: '500', marginTop: 20 }}>Choose an account</Text>
                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(5) }}>
                      <View style={{ height: 45, width: 45, backgroundColor: '#B200ED', justifyContent: 'center', borderRadius: 30, marginRight: responsiveWidth(2) }}>
                        <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>F</Text>
                      </View>
                      <View style={{ marginRight: responsiveWidth(25) }}>
                        <Text style={{ color: '#222222', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Fouad AI Hashimi</Text>
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>fouad.ai.hashimi@gmail.com</Text>
                      </View>
                    </View>
                    <View style={{ height: responsiveHeight(8), width: responsiveWidth(100), borderColor: '#D3D3D3', borderWidth: 0.5, marginTop: responsiveHeight(8), justifyContent: 'center' }}>
                      <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(10) }}>
                        <Image source={require('./../../assets/icon/Profile.png')}
                          style={{
                            height: 25, width: 25, right: responsiveWidth(3)
                          }} />
                        <Text style={{ color: '#222', fontSize: responsiveFontSize(2.2), fontWeight: '500', marginRight: responsiveWidth(25) }}>Use another account</Text>
                      </View>
                    </View>
                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: responsiveHeight(5), marginLeft: responsiveWidth(7), marginRight: responsiveWidth(7) }}>To Continue, Google will share your name,email address,language preference and profile picture with TikTok. Before using this app you can review TikTok's <Text style={{ color: '#1E90FF', fontWeight: '500' }}>privacy policy </Text>and <Text style={{ color: '#1E90FF', fontWeight: '500' }}>Terms of Service.</Text></Text>
                  </View>
                </View>
              </Modal>
            </View>

            <View>
              <TouchableOpacity onPress={() => setAppleModal(!appleModal)}>
                <Image source={require('./../../assets/icon/Apple.png')}
                  style={{ height: 25, width: 25 }} />
              </TouchableOpacity>

              <Modal
                transparent={true}
                visible={appleModal}
                animationType='fade'
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setAppleModal(!appleModal);
                }}>

                <View style={styles.centeredView}>
                  <View style={styles.modalView2}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: '#808080', fontSize: responsiveFontSize(2.5), fontWeight: '500', marginTop: responsiveHeight(3), marginRight: responsiveWidth(50), color: '#FFFFFF' }}>Apple ID</Text>
                      <TouchableOpacity onPress={() => setAppleModal(false)}>
                        <Image source={require('./../../assets/icon/cancel.png')}
                          style={{ height: 25, width: 25, marginTop: responsiveHeight(3), left: 15 }} />
                      </TouchableOpacity>
                    </View>
                    <Image source={require('./../../assets/icon/droplogo.png')}
                      style={{
                        height: 60, width: 60, borderRadius: 12, marginTop: responsiveHeight(1)
                      }} />
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginRight: responsiveWidth(7), marginLeft: responsiveWidth(7), marginTop: responsiveHeight(4) }}>Do you want to sign into Abu Dhabi 360 with your</Text>
                      <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginRight: responsiveWidth(8), marginLeft: responsiveWidth(11) }}>Apple ID "Fouad.ai.hashimi@gmail.com".?</Text>
                    </View>
                    <TouchableOpacity
                      style={{ height: responsiveHeight(6.5), width: responsiveWidth(50), backgroundColor: '#1E90FF', justifyContent: 'center', borderRadius: 12, marginTop: responsiveHeight(3.5) }}>
                      <Text style={{ alignSelf: 'center', fontSize: responsiveFontSize(2), color: '#FFFFFF' }}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('facebook')}>
              <Image source={require('./../../assets/icon/Facebook.png')}
                style={{ height: 25, width: 25, left: 20 }} />
            </TouchableOpacity>
          </View>

          <View style={{ bottom: 20, marginBottom: 10 }}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('signup')}
              style={styles.signupButton}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  backgroundImage: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    alignItems: 'center',
  },
  logo: {
    height: 66,
    width: 124,
    alignSelf: 'center',
    marginTop: responsiveHeight(40),
  },
  loginText: {
    fontSize: responsiveFontSize(3.2),
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    marginTop: 10
  },
  phoneNumberContainer: {
    marginTop: responsiveHeight(8),
  },
  phoneInputLabel: {
    color: '#C70FF7',
    fontSize: responsiveFontSize(1.7),
    marginLeft: 10,
  },
  input: {
    height: 40,
    width: responsiveWidth(60),
    alignSelf: 'flex-end',
    paddingLeft: responsiveWidth(1),
    color: '#FFFFFF',
    marginRight: 20,
    left: 5,
    bottom: 6
  },
  countryCodeContainer: {
    flexDirection: 'row',
  },
  countryCodeButton: {
    width: responsiveWidth(12),
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    left: 10,
    top: 5
  },
  countryCodeText: {
    color: '#d3d3d3',
    fontSize: responsiveFontSize(2),
    right: 3
  },
  loginButton: {
    height: 53,
    width: responsiveWidth(90),
    backgroundColor: '#9A0FDE',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    bottom: 26
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  signupContainer: {
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    marginBottom: 80
  },
  signupText: {
    color: '#808080',
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  signupButton: {
    height: 38,
    width: responsiveWidth(25),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 60
  },
  signupButtonText: {
    fontSize: responsiveFontSize(1.7),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  modalView: {
    width: Dimensions.get('screen').width,
    height: responsiveHeight(80),
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalView1: {
    width: Dimensions.get('screen').width,
    height: responsiveHeight(30),
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalView2: {
    width: Dimensions.get('screen').width,
    height: responsiveHeight(40),
    backgroundColor: 'rgba(51, 51, 51, 0.97)',
    alignItems: 'center',
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    borderRadius: 20,
    padding: 10,
    left: 120,
    height: 40,
    width: 50,
    bottom: 120,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
  },
  dropdown: {
    height: 50,
    width: responsiveWidth(90),
    borderRadius: 30,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderColor: 30,
    marginTop: responsiveHeight(0.5)
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(5)
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#808080',
    paddingLeft: 20
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#FFFFFF',
    paddingLeft: 20
  },
  countryPicker: {
    marginTop: responsiveHeight(50)
  }
});

export default LoginScreen;
