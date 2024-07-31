//import liraries
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TextInput, TouchableOpacity, Modal, Alert, Image, ScrollView, ToastAndroid, Button, KeyboardAvoidingView } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryPicker } from "react-native-country-codes-picker";
import SignUpViewModel from '../Model-View/SignupViewModel';
import { firebaseConfig } from './config';
import firebase from 'firebase/compat';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AndroidConfig } from 'expo/config-plugins';
import SharedPreferences from 'react-native-shared-preferences';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// create a component 
const SignUpScreen = ({ navigation }) => {

  const { openCameraLib, openGallery } = SignUpViewModel;
  const [open, setOpen] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState("");
  const [isFocus, setIsFocus] = useState("");
  const [value, setValue] = useState('');
  const [shownModal, setShownModal] = useState(false);
  const [appleModal, setAppleModal] = useState(false);
  const [referral, setReferral] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState("+91");
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const recaptchaVerifier = useRef(null)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  // Function to handle form submission
  const handleSignup = () => {
    // Make API call to signup
    validateFields();
    signInWithPhoneNumber(phoneNumber)
};


  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '865769074175-dd6sj3is7lbe2p4l0jc3ujomj3vcf22j.apps.googleusercontent.com',
      androidClientId:
        '865769074175-7l06h2mtcnhhll4uie0475g8kvebniro.apps.googleusercontent.com'
      // forceCodeForRefreshToken: true,
      // offlineAccess:true,
    });
  })

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // // Handle the button press
  // async function signInWithPhoneNumber(phoneNumber) {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // }

  // Handle the button press
  async function signInWithPhoneNumber() {
    // Format the phone number using the country code
    const formattedPhoneNumber = countryCode + phoneNumber;
    // Send OTP to the formatted phone number
    try {
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber, true);
      console.log("confirmation", confirmation);
      setConfirm(confirmation);
      navigation.navigate('OtpVerification', { confirm: confirmation });
    } catch (error) {
      console.log('Error sending OTP:', error);
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Hello Everyone", userInfo);
      setUserInfo(userInfo); // Set user info to component state
      // Ensure navigation object is correctly passed to the component
      navigation.navigate('Home', { userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showToastMsg('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showToastMsg('Signing In...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Not Available or Outdated');
      } else {
        // Log the error for further investigation
        console.log("Unsuccessfull", error);
      }
    }
  };

  const data = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ];

 
const validateFields = () => {
    let isValid = true;

    if (!email) {
        setEmailError('Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid Email format');
        isValid = false;
    } else {
      setEmailError('');
    }
 if (!phoneNumber) {
    setPhoneNumberError('Phone Number is required');
    isValid = false;
  } else if (phoneNumber.length < 10) {
    setPhoneNumberError('Phone Number must be at least 10 digits');
    isValid = false;
  } else {
    setPhoneNumberError('');
  }
};

  firebase.initializeApp(firebaseConfig);

  if (!confirm) {
    return (
      <View style={styles.container}>

        <StatusBar backgroundColor="#000000" barStyle="dark-content" />
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

        <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
          style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              enableOnAndroid={true}
              extraScrollHeight={100}
              enableAutomaticScroll={true}
              keyboardOpeningTime={0}>        

            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(3), alignSelf: 'center', marginTop: responsiveHeight(3), fontWeight: '500', }}>Sign Up</Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(true);
              }}>
                <Image
                  source={profilePicture ? { uri: profilePicture } : require('./../../assets/icon/camera.png')}
                  style={[
                    {
                      height: 84,
                      width: 84,
                      alignSelf: 'center',
                      marginTop: responsiveHeight(2)
                    },
                    profilePicture && { borderRadius: 42 }
                  ]} />
                <View>

                  <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>

                    <View style={styles.centeredView}>
                      <View style={styles.modalView1}>
                        <Text style={{ color: '#808080', fontSize: 20, fontWeight: '500', marginTop: 20 }}>Choose an action</Text>

                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                          <TouchableOpacity onPress={() => openCameraLib(setModalVisible, setProfilePicture)}
                            style={{ right: 20 }}>
                            <Image
                              source={require('./../../assets/icon/camera1.png')}
                              style={{
                                height: 60, width: 60, marginTop: responsiveHeight(1), borderRadius: 30,
                              }} />

                            <Text style={{ color: '#222222', textAlign: 'center', fontWeight: '500' }}>Camera</Text>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => openGallery(setModalVisible, setProfilePicture)}
                            style={{ left: 20 }}>
                            <Image source={require('./../../assets/icon/burst.png')}
                              style={{
                                height: 60, width: 60, marginTop: responsiveHeight(1), borderRadius: 30,
                              }} />
                            <Text style={{ color: '#222222', textAlign: 'center', fontWeight: '500' }}>Gallery</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View>
                  <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(3),top:4 }}>First Name</Text>

                  <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstName}
                    placeholder="John"
                    placeholderTextColor="#808080"
                    ref={input1Ref}
                    onSubmitEditing={() => input2Ref.current.focus()}
                  />
                </View>

                <View>
                  <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(6),top:4  }}>Last Name</Text>

                  <TextInput
                    style={styles.input2}
                    onChangeText={setLastName}
                    value={lastName}
                    placeholder="Doe"
                    placeholderTextColor="#808080"
                    ref={input2Ref}
                    onSubmitEditing={() => input3Ref.current.focus()}
                  />
                </View>
              </View>
              <View>
                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(1.5) }}>Date of Birth</Text>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date instanceof Date ? date : new Date()} // Ensure date is a Date object
                  onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                    setDob(selectedDate.toISOString()); // Set Date of Birth here
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  customStyles={{
                    dateText: {
                      color: '#FFFFFF',
                      fontSize: 20, // adjust the font size as needed
                      fontWeight: 'bold', // adjust the font weight as needed
                    },
                  }}
                />

                <TouchableOpacity
                  onPress={() => setOpen(true)} style={{ justifyContent: 'center', height: 50, width: responsiveWidth(90), alignSelf: 'center', marginTop: responsiveHeight(0.5), borderRadius: 30, backgroundColor: 'rgba(51, 51, 51, 0.5)' }}>

                  <Image source={require('./../../assets/icon/calendar.png')}
                    style={{ height: 16, width: 16, marginLeft: responsiveWidth(80), top: 7 }} />

                  <Text style={{ marginLeft: 20, color: date ? "#fff" : '#808080', bottom: 8 }}>{date ? date.toLocaleDateString() : "Select Date"}</Text>
                </TouchableOpacity>

              </View>

              <View>
                <TouchableOpacity>
                  <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(1.5) }}>Choose Gender</Text>

                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    iconColor={'#FFFFFF'}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.value);
                      setIsFocus(false);
                      setGender(item.label); // Set Gender here
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(1.5) }}>Enter Phone number</Text>
                <View style={{ width: responsiveWidth(90), height: 52, backgroundColor: 'rgba(51, 51, 51, 0.7)', borderRadius: 30, alignSelf: 'center', flexDirection: 'row',marginTop:4 }}>
                  <View style={styles.countryCodeContainer}>
                    <TouchableOpacity
                      onPress={() => setShow(true)}
                      style={styles.countryCodeButton}
                    >
                      <Text style={{ color: '#FFFFFF', fontSize: 14, }}>{countryCode}</Text>
                    </TouchableOpacity>
                    <CountryPicker
                      show={show}
                      pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                      }}
                      selectedCountry={countryCode} // Set the selected country
                      style={{
                        // Styles for whole modal [View]
                        modal: {
                          height: 500,
                          backgroundColor: '#fff',
                        },
                        // Styles for input [TextInput]
                        textInput: {
                          height: 50,
                          borderWidth: 1,
                          borderColor: '#808080'
                        },
                        // Styles for country button [TouchableOpacity]
                        countryButtonStyles: {
                          height: 45
                        },
                      }}
                    />
                    <Text style={{ color: '#fff', top: 4, fontSize: 26 }}>|</Text>
                  </View>
                  <TextInput
                    style={styles.input3}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder={"1234567899"}
                    placeholderTextColor="#808080"
                    keyboardType='numeric'
                    maxLength={10}
                    ref={input3Ref}
                    onSubmitEditing={() => input4Ref.current.focus()}
                  />

                </View>
                {phoneNumberError ? <Text style={{ color: 'red', marginLeft: 30, fontSize: 13, marginTop: 5 }}>{phoneNumberError}</Text> : null}

              </View>


              <View>
                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(1.5) }}>Enter Email Address</Text>
                <TextInput
                  style={styles.input4}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="john@gmail.com"
                  placeholderTextColor="#808080"
                  ref={input4Ref}
                  onSubmitEditing={() => input5Ref.current.focus()}
                />
                  {emailError ? <Text style={{ color: 'red', marginLeft: 30, fontSize: 13, marginTop: 5 }}>{emailError}</Text> : null}

              </View>

              <View>
                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(1.5) }}>Referral Code(Optional)</Text>

                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <TextInput
                    style={styles.input5}
                    onChangeText={setReferral}
                    value={referral}
                    placeholder="ABCD123"
                    placeholderTextColor="#808080"
                    ref={input5Ref}
                  />
                  <Image source={require('./../../assets/icon/right.png')}
                    style={{ height: 20, width: 20, marginLeft: responsiveWidth(80), position: 'absolute', marginTop: 23 }} />
                </View>
              </View>

              <TouchableOpacity
                onPress={async () => {
                  SharedPreferences.setItem("firstName", firstName);
                  SharedPreferences.setItem("lastName", lastName);
                  SharedPreferences.setItem("dob", dob);
                  SharedPreferences.setItem("gender", gender); // Convert boolean to string
                  SharedPreferences.setItem("email", email);
                  SharedPreferences.setItem("phoneNumber", phoneNumber); // Convert to string
                  SharedPreferences.setItem("profilePicture", profilePicture);
                  SharedPreferences.setItem("countryCode", countryCode);

                  console.log("firstName=", firstName)
                  console.log("lastName=", lastName)
                  console.log("dob=", dob)
                  console.log("email=", email)
                  console.log("phoneNumber=", phoneNumber)
                  console.log("profilePicture=", profilePicture)
                  handleSignup();
                }}

                style={{ height: 55, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: 30 }}>
                <LinearGradient
                  colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                  start={{ x: 0, y: 0 }} // Gradient start point
                  end={{ x: 1, y: 0 }} // Gradient end point
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30
                  }}>
                  <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View>
                <Text style={{ color: '#808080', alignSelf: 'center', fontSize: responsiveFontSize(2), marginTop: responsiveHeight(2) }}>-Or-</Text>
              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: responsiveHeight(2) }}>
                <View>

                  <TouchableOpacity
                  // onPress={signIn} 
                  >
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

                        <Text style={{ color: '#222222', fontSize: responsiveFontSize(2.7), fontWeight: '500', marginTop: 20 }}>Choose an account</Text>

                        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(5) }}>
                          <View style={{ height: 45, width: 45, backgroundColor: '#B200ED', justifyContent: 'center', borderRadius: 30, marginRight: responsiveWidth(2), }}>
                            <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>F</Text>
                          </View>
                          <View style={{ marginRight: responsiveWidth(25) }}>
                            <Text style={{ color: '#222222', fontSize: responsiveFontSize(1.8), fontWeight: '500', }}>Fouad AI Hashimi</Text>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8), fontWeight: '500', }}>fouad.ai.hashimi@gmail.com</Text>
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
                  <TouchableOpacity
                  // onPress={() => setAppleModal(!appleModal)}
                  >
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

                <TouchableOpacity
                // onPress={() => navigation.navigate('facebook')}
                >
                  <Image source={require('./../../assets/icon/Facebook.png')}
                    style={{ height: 25, width: 25, left: 20 }} />
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: '#808080', fontSize: responsiveFontSize(2), alignSelf: 'center', marginTop: responsiveHeight(3) }}>Already a User?</Text>

                <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ height: 34, width: 80, borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 30, justifyContent: 'center', alignSelf: 'center', marginTop: responsiveHeight(1.6) }}>
                  <Text style={{ fontSize: responsiveFontSize(1.8), color: '#FFFFFF', alignSelf: 'center' }}>Login</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  verticleLine: {
    height: '100%',
    width: 1.5,
    backgroundColor: '#909090',
    bottom: 35,
    left: 38
  },
  input: {
    height: 50,
    width: responsiveWidth(44),
    borderRadius: 30,
    paddingLeft: 20,
    color: '#fff',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    marginTop: 8
  },
  input2: {
    height: 50,
    width: responsiveWidth(44),
    borderRadius: 30,
    paddingLeft: 20,
    marginLeft: 7,
    color: '#fff',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    marginTop: 8
  },
  input3: {
    height: 40,
    width: responsiveWidth(60),
    alignSelf: 'flex-end',
    paddingLeft: responsiveWidth(1),
    color: '#FFFFFF',
    marginRight: 20,
    left: 5,
    bottom: 6
  },
  input4: {
    height: 50,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: 4,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    paddingLeft: 20,
    color: '#fff'
  },
  input5: {
    height: 50,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: 4,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    paddingLeft: 20,
    color: '#fff'

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080', // Semi-transparent background
  },
  modalView: {
    margin: 20,
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
    margin: 20,
    width: Dimensions.get('screen').width,
    height: responsiveHeight(40),
    backgroundColor: '#383838',
    alignItems: 'center',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
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
    paddingLeft: 10
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#FFFFFF',
    paddingLeft: 20
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

});

//make this component available to the app
export default SignUpScreen;

