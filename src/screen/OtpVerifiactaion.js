//import liraries
import React, { useState,useRef,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground,StatusBar, TextInput,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const OtpVerification = ({ navigation,route}) => {
    const inputRefs = useRef([]);

    const { confirm } = route.params;
    console.log('Route Params:', route.params);

    const [otp, setOtp] = useState(['', '', '', '', '','']); 
    const [isOtpValid, setIsOtpValid] = useState(true); // State to track OTP validity

    async function confirmCode() {
        try {
            console.log('OTP array:', otp);
            const code = otp.join(''); // Concatenate the OTP digits
            console.log("Code=",code)
            await confirm.confirm(code); // Confirm the OTP code
            console.log('OTP:', code); // Log the OTP value
            setIsOtpValid(true); // Set OTP validity to true
            navigation.navigate('choosegenre');
        } catch (error) {
            console.log('Error confirming code:', error);
            console.log('Invalid code.');
            setIsOtpValid(false); // Set OTP validity to false
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

    return (
        <View style={styles.container}>
                <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')} resizeMode={'contain'}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4) }}>
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{ height: responsiveHeight(4), width: responsiveWidth(8), marginLeft: responsiveWidth(8) }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', marginLeft: responsiveWidth(13.5),color:'#FFFFFF' }}>OTP Verification</Text>
                </View>

                <Text style={{ fontSize: responsiveFontSize(1.4), fontWeight: '400', alignSelf: 'center', color:'#808080'}}>Enter OTP sent to mobile number</Text>

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

                <TouchableOpacity 
                onPress={confirmCode} 
                // onPress={() => navigation.navigate('choosegenre')}

                style={{ height: 50, width: responsiveWidth(85), alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(5) }}>
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
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Verify & Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={{ alignSelf: 'center', color: '#808080', fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(1.8) }}>Resend OTP in 00:30</Text>
            </ImageBackground>
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginLeft:20,
        marginRight:20
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
});

//make this component available to the app
export default OtpVerification;
