
// Import necessary librarie
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, PermissionsAndroid, ToastAndroid, ActivityIndicator, Platform, AlertIOS } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';
import Geolocation from 'react-native-geolocation-service';

// Create the component
const WelcomeScreen = ({ navigation }) => {
    const [lat, setLat] = useState(null); // Initialize as null
    const [lng, setLng] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(false);
    const [token, setTokenVal] = useState("");
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        // Fetch token when the component mounts
        SharedPreferences.getItem("token", function (value) {
            setTokenVal(value);
            console.log("ContToken", value);
        });
        SharedPreferences.getItem("userId", function (value) {
            setUserId(value);
            console.log("ContToken", value);
        });
         SharedPreferences.getItem("firstName", function (value) {
            setFirstName(value);
        });
    }, []);

    useEffect(() => {
        if (lat !== null && lng !== null) {
            updateLocation();
        }
    }, [lat, lng]);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Camera Permission',
                    message: 'Cool Photo App needs access to your camera so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the Location');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const updateLocation = async () => {
        try {
            setLoading(true);

            const formdata = new FormData();
            formdata.append('userId', userId);
            formdata.append('lat', lat.toString()); // Convert to string if needed
            formdata.append('lng', lng.toString()); // Convert to string if needed
            console.log('FormData=', formdata);

            const requestOptions = {
                method: 'POST',
                body: formdata,
            };
            const response = await fetch("http://62.72.57.205:8092/user/updateLocation", requestOptions);
            if (response.status == 200) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show("You've successfully pinpointed your location", ToastAndroid.SHORT);
                     navigation.navigate('Side')
                } else {
                    AlertIOS.alert("You've pinpointed your location");
                    navigation.navigate('location');
                }
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        setLoading(true);
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (latitude !== null && longitude !== null) {
                    setLat(latitude);
                    setLng(longitude);
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                } else {
                    console.error('Latitude or longitude is null');
                    setLoading(false); // Set loading state to false in case of error
                }
            },
            (error) => {
                console.error("Your Error", error.code, error.message);
                setLoading(false); // Set loading state to false in case of error
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/icon/Welcome.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                <Text style={{ fontSize: responsiveFontSize(4.2), color: '#FFFFFF', textAlign: 'center', marginTop: responsiveHeight(35), fontWeight: '500' }}>Welcome</Text>
                <Text style={{ fontSize: responsiveFontSize(4.2), color: '#FFFFFF', textAlign: 'center', fontWeight: '500', bottom: 10 }}>{firstName}!</Text>
                <Text style={{ fontSize: responsiveFontSize(1.6), color: '#FFFFFF', textAlign: 'center', marginLeft: responsiveWidth(11), marginRight: responsiveWidth(11) }}>This is a random text. Lorem ipsum dolor</Text>
                <Text style={{ fontSize: responsiveFontSize(1.6), color: '#FFFFFF', textAlign: 'center', marginLeft: responsiveWidth(11), marginRight: responsiveWidth(11) }}>sit lorem ipsum dolor lorem ipsum. This</Text>
                <Text style={{ fontSize: responsiveFontSize(1.6), color: '#FFFFFF', textAlign: 'center', marginLeft: responsiveWidth(11), marginRight: responsiveWidth(11) }}>is a random text. Lorem ipsum dolor sit</Text>
                <Text style={{ fontSize: responsiveFontSize(1.6), color: '#FFFFFF', textAlign: 'center', marginLeft: responsiveWidth(11), marginRight: responsiveWidth(11) }}>lorem ipsum.</Text>

                <TouchableOpacity onPress={getLocation}
                    style={{ height: 54, width: responsiveWidth(32), backgroundColor: '#9A0FDE', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(3) }}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
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
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>Let's Roll</Text>
                        </LinearGradient>
                    )}
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
});

// Make this component available to the app
export default WelcomeScreen;
