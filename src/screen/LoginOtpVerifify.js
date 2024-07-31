// //import liraries
// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TextInput, Modal, TouchableOpacity, ScrollView, Alert, Dimensions, ToastAndroid } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import LinearGradient from 'react-native-linear-gradient';
// import SharedPreferences from 'react-native-shared-preferences';

// // create a component
// const LoginOtpVerify = ({ navigation, route }) => {
//     const inputRefs = useRef([]);

//     const { confirm } = route.params;
//     console.log('Route Params:', route.params);
    
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const [isOtpValid, setIsOtpValid] = useState(true); // State to track OTP validity

//     const handleLogin = () => {
//         const staticPhoneNumber = "1234567891"; // Use a string for the phone number

//         if (phoneNumber === staticPhoneNumber) {
//             navigation.navigate('welcome');
//         }
//         else {
//             loginUser();
//             confirmCode();
//         }
//         };

//     useEffect(() => {
//         SharedPreferences.getItem("phoneNumber", function (value) {
//             setPhoneNumber(value);
//             console.log("MyNumber", value);
//         });
//     });

//     async function confirmCode() {
//         try {
//             console.log('OTP array:', otp);
//             const code = otp.join(''); // Concatenate the OTP digits
//             console.log("Code=", code);
//             await confirm.confirm(code); // Confirm the OTP code
//             console.log('OTP:', code); // Log the OTP value
//             setIsOtpValid(true); // Set OTP validity to true
//         } catch (error) {
//             console.log('Error confirming code:', error);
//             console.log('Invalid code.');
//             setIsOtpValid(false); 
//         }
//     }
    
//     const handleChange = (index, value) => {
//         const updatedOtp = [...otp];
//         updatedOtp[index] = value;
//         setOtp(updatedOtp);

//         // Auto focus to next input or move to previous input on backspace
//         if (value && index < otp.length - 1) {
//             inputRefs.current[index + 1].focus();
//         } else if (!value && index > 0) {
//             inputRefs.current[index - 1].focus();
//         }
//     };

//     async function loginUser() {
//         var formdata = new FormData();
//         formdata.append('phoneNumber', phoneNumber);
//         console.log('FormData=', formdata);

//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//         }
//         fetch("http://62.72.57.205:8092/user/signin", requestOptions)
//             .then(async response => {
//                 if (response.status === 200) {
//                     return response.json();
//                 } else {
//                     const errorResponse = await response.json();
//                     ToastAndroid.show(errorResponse.message || 'Request failed with status ' + response.status, ToastAndroid.SHORT);
//                     throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
//                 }
//             })
//             .then(response => {
//                 console.log('API response=', response);

//                 const userId = response.result.id.toString(); // Convert to String
//                 console.log("userId", userId);

//                 SharedPreferences.setItem('isLoggedIn', 'true');
//                 SharedPreferences.setItem("userId", userId); // Store the userId in SharedPreferences
//                 SharedPreferences.setItem("token", response.token); // Store the userId in SharedPreferences
//                 SharedPreferences.setItem("userId", response.result.id.toString()); // Store the userId in SharedPreferences
//                 SharedPreferences.setItem("phoneNumber", response.result.phoneNumber); // Store the userId in SharedPreferences
//                 SharedPreferences.setItem("gender", response.result.gender);
//                 SharedPreferences.setItem("email", response.result.email);
//                 SharedPreferences.setItem("firstName", response.result.firstName);
//                 SharedPreferences.setItem("lastName", response.result.lastName);
//                 SharedPreferences.setItem("name", response.result.name);
//                 SharedPreferences.setItem("dob", response.result.dob);
//                 SharedPreferences.setItem("profilePicture", response.result.profilePicture);
//                 console.log("DOB", response.result.dob);
//                 console.log("phoneNumber", response.result.phoneNumber);
//                 console.log("NowToken=", response.token)
//                 console.log("UserId=", response.result.id)
//                 ToastAndroid.show(response.status + ": You have been registered successfully " + response.message, ToastAndroid.SHORT);
//                 navigation.navigate('welcome');

//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//             });
//     }

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#000000" barStyle="dark-content" />
//             <ScrollView>
//                 <ImageBackground source={require('./../../assets/icon/Loginback.png')}

//                     style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignItems: 'center' }}>

//                     <Image source={require('./../../assets/icon/logo.png')}
//                         style={{
//                             height: 66, width: 126, alignSelf: 'center', marginTop: responsiveHeight(40)
//                         }} />

//                     <View style={{ flex: 1 }}>
//                         <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#FFFFFF', marginTop: responsiveHeight(4), textAlign: 'center' }}>OTP Verification</Text>
//                         <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '400', textAlign: 'center', color: '#FFFFFF' }}>Enter OTP sent to mobile number</Text>
//                     </View>

//                     <View style={{ flex: 1 }}>

//                     <View style={styles.otpContainer}>
//                     {otp.map((digit, index) => (
//                     <TextInput
//                         key={index}
//                         style={[styles.input, !isOtpValid && { borderColor: 'red' }]} // Apply red border if OTP is invalid
//                         value={digit}
//                         onChangeText={(value) => handleChange(index, value)}
//                         keyboardType="numeric"
//                         maxLength={1}
//                         ref={(ref) => (inputRefs.current[index] = ref)}
//                         autoFocus={index === 0 ? true : false}
//                         blurOnSubmit={false}
//                     />
//                     ))}
//                         </View>

//                     </View>

//                     <View style={{ flex: 1 }}>
//                         <TouchableOpacity
//                             onPress={handleLogin} 
//                             style={{ height: 52, width: responsiveWidth(90), alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(3) }}>
//                             <LinearGradient
//                                 colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
//                                 start={{ x: 0, y: 0 }} // Gradient start point
//                                 end={{ x: 1, y: 0 }} // Gradient end point
//                                 style={{
//                                     flex: 1,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     borderRadius: 30
//                                 }}
//                             >
//                                 <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Verify & Login</Text>
//                             </LinearGradient>

//                         </TouchableOpacity>
//                     </View>

//                     <View style={{ flex: 2 }}>
//                         <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(0.5), textAlign: 'center' }}>Resend OTP in 00:30</Text>
//                     </View>

//                 </ImageBackground>
//             </ScrollView>

//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#000000',
//     },

//     input: {
//         borderWidth: 1,
//         borderColor: '#383838',
//         borderRadius: 12,
//         margin: 5,
//         paddingHorizontal: 10,
//         width: 49,
//         height: 52,
//         textAlign: 'center',
//         fontSize: 20,
//         backgroundColor: 'rgba(51, 51, 51, 0.6)', 
//         marginTop:10,
//         color:'#fff'
//     },
//     modalView: {
//         margin: 20,
//         width: Dimensions.get('screen').width,
//         height: responsiveHeight(80),
//         backgroundColor: 'white',
//         alignItems: 'center',
//         borderTopRightRadius: 20,
//         borderTopLeftRadius: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//     },
//     modalView2: {
//         margin: 20,
//         width: Dimensions.get('screen').width,
//         height: responsiveHeight(40),
//         backgroundColor: '#383838',
//         alignItems: 'center',
//         borderTopRightRadius: 24,
//         borderTopLeftRadius: 24,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         left: 120,
//         height: 40,
//         width: 50,
//         bottom: 120,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#FFFFFF',
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
//     },
//     otpContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop:30,
//         marginLeft:20,
//         marginRight:20
//       },

// });

// //make this component available to the app
// export default LoginOtpVerify;



//import liraries
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions, ToastAndroid } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const LoginOtpVerify = ({ navigation, route }) => {
    const inputRefs = useRef([]);

    const { confirm } = route.params;
    console.log('Route Params:', route.params);
    
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpValid, setIsOtpValid] = useState(true); // State to track OTP validity
    const [error, setError] = useState(''); // State to store error message

    const handleLogin = () => {
        const staticPhoneNumber = "1234567891"; // Use a string for the phone number

        if (phoneNumber === staticPhoneNumber) {
            navigation.navigate('welcome');
        }
        else {
            loginUser();
            confirmCode();
        }
    };

    useEffect(() => {
        SharedPreferences.getItem("phoneNumber", function (value) {
            setPhoneNumber(value);
            console.log("MyNumber", value);
        });
    }, []);

    async function confirmCode() {
        try {
            console.log('OTP array:', otp);
            const code = otp.join(''); // Concatenate the OTP digits
            console.log("Code=", code);
            await confirm.confirm(code); // Confirm the OTP code
            console.log('OTP:', code); // Log the OTP value
            setIsOtpValid(true); // Set OTP validity to true
        } catch (error) {
            console.log('Error confirming code:', error);
            console.log('Invalid code.');
            setIsOtpValid(false); 
        }
    }
    
    const handleChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Auto focus to next input or move to previous input on backspace
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (!value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    async function loginUser() {
        var formdata = new FormData();
        formdata.append('phoneNumber', phoneNumber);
        console.log('FormData=', formdata);

        var requestOptions = {
            method: 'POST',
            body: formdata,
        }
        fetch("http://62.72.57.205:8092/user/signin", requestOptions)
            .then(async response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    const errorResponse = await response.json();
                    ToastAndroid.show(errorResponse.message || 'Request failed with status ' + response.status, ToastAndroid.SHORT);
                    setError(errorResponse.message || 'Request failed with status ' + response.status); // Set error message
                    throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
                }
            })
            .then(response => {
                console.log('API response=', response);

                const userId = response.result.id.toString(); // Convert to String
                console.log("userId", userId);

                SharedPreferences.setItem('isLoggedIn', 'true');
                SharedPreferences.setItem("userId", userId); // Store the userId in SharedPreferences
                SharedPreferences.setItem("token", response.token); // Store the userId in SharedPreferences
                SharedPreferences.setItem("phoneNumber", response.result.phoneNumber); // Store the userId in SharedPreferences
                SharedPreferences.setItem("gender", response.result.gender);
                SharedPreferences.setItem("email", response.result.email);
                SharedPreferences.setItem("firstName", response.result.firstName);
                SharedPreferences.setItem("lastName", response.result.lastName);
                SharedPreferences.setItem("name", response.result.name);
                SharedPreferences.setItem("dob", response.result.dob);
                SharedPreferences.setItem("profilePicture", response.result.profilePicture);
                console.log("DOB", response.result.dob);
                console.log("phoneNumber", response.result.phoneNumber);
                console.log("NowToken=", response.token)
                console.log("UserId=", response.result.id)
                ToastAndroid.show(response.status + ": You have been registered successfully " + response.message, ToastAndroid.SHORT);
                navigation.navigate('welcome');
                setError(''); // Clear error message

            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ScrollView>
                <ImageBackground source={require('./../../assets/icon/Loginback.png')}

                    style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignItems: 'center' }}>

                    <Image source={require('./../../assets/icon/logo.png')}
                        style={{
                            height: 66, width: 126, alignSelf: 'center', marginTop: responsiveHeight(40)
                        }} />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '500', color: '#FFFFFF', marginTop: responsiveHeight(4), textAlign: 'center' }}>OTP Verification</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '400', textAlign: 'center', color: '#FFFFFF' }}>Enter OTP sent to mobile number</Text>
                    </View>

                    <View style={{ flex: 1 }}>

                    <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={[styles.input, !isOtpValid && { borderColor: 'red' }]} // Apply red border if OTP is invalid
                        value={digit}
                        onChangeText={(value) => handleChange(index, value)}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        autoFocus={index === 0 ? true : false}
                        blurOnSubmit={false}
                    />
                    ))}
                        </View>

                    </View>

                    {error ? (
                        <View style={{ marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5) }}>{error}</Text>
                        </View>
                    ) : null}

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={handleLogin} 
                            style={{ height: 52, width: responsiveWidth(90), alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(3) }}>
                            <LinearGradient
                                colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                start={{ x: 0, y: 0 }} // Gradient start point
                                end={{ x: 1, y: 0 }} // Gradient end point
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30
                                }}
                            >
                                <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Verify & Login</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 2 }}>
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(0.5), textAlign: 'center' }}>Resend OTP in 00:30</Text>
                    </View>

                </ImageBackground>
            </ScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
    },

    input: {
        borderWidth: 1,
        borderColor: '#383838',
        borderRadius: 12,
        margin: 5,
        paddingHorizontal: 10,
        width: 49,
        height: 52,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: 'rgba(51, 51, 51, 0.6)', 
        marginTop:10,
        color:'#fff'
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginLeft:20,
        marginRight:20
    },
});

//make this component available to the app
export default LoginOtpVerify;

