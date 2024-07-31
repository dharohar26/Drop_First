import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, AlertIOS,ToastAndroid,ActivityIndicator} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Geolocation from 'react-native-geolocation-service';
import SharedPreferences from 'react-native-shared-preferences';

const Location = ({ navigation }) => {

    // const [token, setTokenVal] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     // Fetch token when component mounts
    //     SharedPreferences.getItem("token", function (value) {
    //         setTokenVal(value);
    //         console.log("ContToken", value);
    //     });
    // }, []);

    // const updateLocation = async () => {
    //     try {
    //         setLoading(true);
    //         const formdata = new FormData();
    //         formdata.append('userId', "10");
    //         formdata.append('lat', lat);
    //         formdata.append('lng', lng)
    //         console.log('FormData=', formdata);

    //         const myHeaders = new Headers();
    //         myHeaders.append("token", token);

    //         const requestOptions = {
    //             method: 'POST',
    //             body: formdata,
    //             headers: myHeaders
    //         }
    //         const response = await fetch("http://62.72.57.205:8092/user/updateLocation", requestOptions);
    //         if (response.status === 200) {
    //             if (Platform.OS === 'android') {
    //                 ToastAndroid.show("You've successfully pinpointed your location", ToastAndroid.SHORT);
    //                 navigation.navigate('Side');
    //               } else {
    //                 AlertIOS.alert("You've pinpointed your location");
    //               }
    //         } else {
    //             throw new Error('Request failed with status ' + response.status);
    //         }
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //         setLoading(false);
    //     }
    // }

    // const getLocation = () => {
    //     setLoading(true);
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             if (latitude !== null && longitude !== null) {
    //                 console.log('Latitude:', latitude);
    //                 console.log('Longitude:', longitude);
    //                 setLat(latitude);
    //                 setLng(longitude);
    //                 updateLocation();
    //             } else {
    //                 console.error('Latitude or longitude is null');
    //             }
    //         },
    //         (error) => {
    //             // See error code charts below.
    //             console.error("Your Error",error.code, error.message);
    //             setLoading(false); 
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         )
    // }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#23032b" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                <Image source={require('./../../assets/icon/PlaceMarker.png')}
                    style={{ height: 114, width: 114, alignSelf: 'center', marginTop: responsiveHeight(30) }} />

                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(4), color: '#C70FF7', marginTop: 20 }}>Where are you?</Text>

                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#808080', marginLeft: responsiveWidth(10), marginRight: responsiveWidth(10), marginTop: responsiveHeight(1) }}>This is a random text. Lorem ipsum dolor</Text>
                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#808080', marginLeft: responsiveWidth(10), marginRight: responsiveWidth(10) }}>sit lorem ipsum dolor lorem ipsum. This</Text>
                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#808080', marginLeft: responsiveWidth(10), marginRight: responsiveWidth(10) }}>is a random text. Lorem ipsum dolor sit</Text>
                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.5), color: '#808080', marginLeft: responsiveWidth(10), marginRight: responsiveWidth(10) }}>lorem ipsum.</Text>

                <TouchableOpacity
                    onPress={getLocation}
                    // onPress= {()=> navigation.navigate('Side')}        
                    style={{ height: 50, width: responsiveWidth(80), backgroundColor: '#9A0FDE', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(18) }}>
                         {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                    <LinearGradient
                        colors={['#9A0FDE', '#480FB0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30
                        }}
                    >
                        <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Allow Location access</Text>
                    </LinearGradient>
                )}
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default Location;
