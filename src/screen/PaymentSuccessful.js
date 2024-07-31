//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const PaymentSuccessful = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={{ height: responsiveHeight(100), width: responsiveWidth(100) }}>
                    <LinearGradient
                        colors={['#a40fe4', '#28109e']} // Replace these colors with your desired gradient
                        start={{ x: 0, y: 0 }} // Gradient start point
                        end={{ x: 1, y: 1 }} // Gradient end point
                        style={{
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <View style={{ marginTop: responsiveHeight(5) }}>
                            <Image source={require('./../../assets/icon/paymentsuccess.png')}
                                style={{
                                    height: 112, width: 112, alignSelf: 'center',
                                }} />
                        </View>

                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Payment successful</Text>
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.7), marginTop: responsiveHeight(1), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>Your payment for the following song has been</Text>
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>sent to the artist and will be played in under 30</Text>
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>minutes, we will refund the amount to your</Text>
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>wallet</Text>

                        <ImageBackground source={require('./../../assets/icon/MyEyes.png')} borderRadius={20}
                            style={{ height: 210, width: 350, alignSelf: 'center', marginTop: responsiveHeight(6) }}>

                            <Image source={require('./../../assets/icon/PaySuccess.png')}
                                style={{
                                    height: 106, width: 106, alignSelf: 'center', bottom: 35
                                }} />

                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(2.4), fontWeight: '500', bottom: 20 }}>Travis Scott - MY EYES</Text>
                            <Text style={{ textAlign: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(2), fontWeight: '500', bottom: 20 }}>Travis Scott</Text>
                        </ImageBackground>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Artist')}
                            style={{ height: 50, width: responsiveWidth(90), borderWidth: 1.5, borderColor: '#fff', marginTop: responsiveHeight(10), borderRadius: 30, justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', alignSelf: 'center', fontSize: responsiveFontSize(2) }}>Okay</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default PaymentSuccessful;
