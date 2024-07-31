//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Image,TextInput,Modal,TouchableOpacity, ScrollView,Alert,Dimensions} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {CountryPicker} from "react-native-country-codes-picker";

// create a component
const InvalidOTP = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView> 
            <StatusBar backgroundColor="#490157" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/Loginback.png')}
            
                style={{ height: responsiveHeight(110), width: responsiveWidth(100), alignSelf: 'center'}}>

                <Image source={require('./../../assets/icon/logo.png')}
                    style={{
                        height: responsiveHeight(11), width: responsiveWidth(42), alignSelf: 'center', marginTop: responsiveHeight(40)
                    }} />


        <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '600',color:'#FFFFFF',marginTop:responsiveHeight(4),alignSelf:'center' }}>OTP Verification</Text>

                <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: '400', alignSelf: 'center',color:'#FFFFFF' }}>Enter OTP sent to mobile number</Text>

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: responsiveHeight(5) }}>
                    <View style={{ height: 54, width: 58, backgroundColor: '#383838', borderRadius: 10,borderWidth:1,borderColor:'#FF0000' }}></View>
                    <View style={{ height: 54, width: 58, backgroundColor: '#383838', borderRadius: 10, marginLeft: 7,borderWidth:1,borderColor:'#FF0000' }}></View>
                    <View style={{ height: 54, width: 58, backgroundColor: '#383838', borderRadius: 10, marginLeft: 7,borderWidth:1,borderColor:'#FF0000' }}></View>
                    <View style={{ height: 54, width: 58, backgroundColor: '#383838', borderRadius: 10, marginLeft: 7,borderWidth:1,borderColor:'#FF0000' }}></View>
                    <View style={{ height: 54, width: 58, backgroundColor: '#383838', borderRadius: 10, marginLeft: 7,borderWidth:1,borderColor:'#FF0000' }}></View>
                </View>

                <TouchableOpacity style={{ height: responsiveHeight(6), width: responsiveWidth(85), alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(5) }}>
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
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF',fontSize:responsiveFontSize(1.8),fontWeight:'600' }}>Verify & Login</Text>
                    </LinearGradient>

                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', color: '#FF0000', fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(1.8) }}>Invalid OTP</Text>

                <Text style={{ alignSelf: 'center', color: '#808080', fontSize: responsiveFontSize(1.6), marginTop: responsiveHeight(1.8) }}>Resend OTP in 00:30</Text>

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
        backgroundColor: '#FFFFFF',
    },
    input:{
        height:responsiveHeight(6.5),
        width: responsiveWidth(85),
        borderRadius:32,
        backgroundColor:'#383838',
        alignSelf:'center',
        marginTop:responsiveHeight(1),
        paddingLeft:55,
        color:'#FFFFFF'
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
    
});

//make this component available to the app
export default InvalidOTP;
