//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const BookingConfirmed = ({ navigation }) => {

const [venueLocation, setVenueLocation] = useState("");
const [venueName, setVenueName] = useState("");
const [bookingId, setBookingId] = useState("");
const [totalAmount, setTotalAmount] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [totalGuest, setTotalGuest] = useState("");

    useEffect(() => {
        SharedPreferences.getItem("date", function (value) {
            setDate(value);
            console.log("date", value);
        });
        SharedPreferences.getItem("time", function (value) {
            setTime(value);
            console.log("time", value);
        });
        SharedPreferences.getItem("totalAmount", function (value) {
            setTotalAmount(value);
            console.log("totalAmount", value);
        });
        SharedPreferences.getItem("bookingId", function (value) {
            setBookingId(value);
            console.log("bookingId", value);
        })
        SharedPreferences.getItem("venueName", function (value) {
            setVenueName(value);
            console.log("venueName", value);
        })
        SharedPreferences.getItem("venueLocation", function (value) {
          setVenueLocation(value);
            console.log("venueLocation", value);
        });
        SharedPreferences.getItem("totalGuest", function (value) {
            setTotalGuest(value);
              console.log("totalGuest", value);
          });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000000" barStyle="dark-content" />

            <ImageBackground source={require('./../../assets/icon/Booking.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignItems: 'center' }}>
                <ScrollView>
                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginTop: 20,top:12 }}>{time}</Text>

                    <View style={{ backgroundColor: 'rgba(53, 53, 53, 0.1)', height: 100, width: 100, borderRadius: 56, justifyContent: 'center', marginTop: responsiveHeight(4),alignSelf:'center' }}>

                        <Image source={require('./../../assets/icon/correct.png')}
                            style={{
                                height: 32, width: 45, alignSelf: 'center',
                            }} />
                    </View>
                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Booking Confirmed</Text>
                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>Your payment for the following song has been</Text>
                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>sent to the artist and will be played in under 30</Text>
                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>minutes, we will refund the amount to your</Text>
                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 40, marginRight: 40 }}>wallet</Text>

                    <View style={{ height: 53, width: responsiveWidth(88), backgroundColor: 'rgba(53, 53, 53, 0.1)', marginTop: responsiveHeight(4), borderRadius: 18, flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.8), fontWeight: '500', left: 30 }}>Booking ID:</Text>
                        <Text style={{ alignSelf: 'center', color: '#FCFCFC', fontSize: responsiveFontSize(1.8), fontWeight: '500', left: 35 }}>{bookingId}</Text>
                        <TouchableOpacity>
                        <Image source={require('./../../assets/icon/Clip.png')}
                            style={{
                                height: 21, width: 21, left: 50, top: 15
                            }} />
                            </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 122, width: 115, backgroundColor: 'rgba(53, 53, 53, 0.1)', marginTop: responsiveHeight(4), borderRadius: 18, right: 5 }}>
                            <Text style={{ textAlign: 'center', color: '#FCFCFC', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginTop: 20,marginLeft:8,marginRight:8}}>{date}</Text>
                            <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.6), marginTop: 20 }}>Booking Date</Text>
                        </View>
                        <View style={{ height: 122, width: 115, backgroundColor: 'rgba(53, 53, 53, 0.1)', marginTop: responsiveHeight(4), borderRadius: 18 }}>
                            <Text style={{ alignSelf: 'center', color: '#FCFCFC', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginTop: 40 }}>{totalGuest}</Text>
                            <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.6), marginTop: 20 }}>Total Guests</Text>
                        </View>
                        <View style={{ height: 122, width: 115, backgroundColor: 'rgba(53, 53, 53, 0.1)', marginTop: responsiveHeight(4), borderRadius: 18, left: 5 }}>
                            <Text style={{ alignSelf: 'center', color: '#FCFCFC', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginTop: 40 }}>₹{totalAmount}</Text>
                            <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.6), marginTop: 20 }}>Amount to pay</Text>
                        </View>
                    </View>

                    <View style={{ height: 122, width: responsiveWidth(88), backgroundColor: 'rgba(53, 53, 53, 0.1)', marginTop: responsiveHeight(2), borderRadius: 18, }}>
                        <Text style={{ textAlign: 'center', color: '#FCFCFC', fontSize: responsiveFontSize(1.5), fontWeight: '400', marginTop: 20, marginLeft:20,marginRight:20}}>{venueName} - {venueLocation}</Text>
                        <Text style={{ textAlign: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.8),marginTop: 10 }}>Location</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Side')}
                        style={{ height: 50, width: responsiveWidth(90), borderWidth: 1.5, borderColor: '#fff', marginTop: responsiveHeight(6), borderRadius: 30, justifyContent: 'center' }}>
                        <Text style={{ color: '#fff', alignSelf: 'center', fontSize: responsiveFontSize(2) }}>Okay</Text>
                    </TouchableOpacity>

                </ScrollView>

            </ImageBackground>
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
export default BookingConfirmed;
