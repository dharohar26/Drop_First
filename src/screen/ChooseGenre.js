//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList, ToastAndroid, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const ChooseGenre = ({ navigation }) => {

    const [genreData, setGenreData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [email, setEmail] = useState('');
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const [countryCode, setCountryCode] = useState("");

    SharedPreferences.getItem("firstName", function (value) {
        setFirstName(value);
        console.log("MyNumber", value);
    });

    SharedPreferences.getItem("lastName", function (value) {
        setLastName(value);
        console.log("MyNumber", value);
    });

    SharedPreferences.getItem("dob", function (value) {
        setDob(value);
        console.log("dob", value);
    });

    SharedPreferences.getItem("gender", function (value) {
        setGender(value);
        console.log("gender", value);
    });

    SharedPreferences.getItem("phoneNumber", function (value) {
        setPhoneNumber(value);
        console.log("phoneNumber", value);
    });

    SharedPreferences.getItem("profilePicture", function (value) {
        setProfilePicture(value);
        console.log("profilePicture", value);
    });

    SharedPreferences.getItem("email", function (value) {
        setEmail(value);
        console.log("email", value);
    });

    SharedPreferences.getItem("countryCode", function (value) {
        setCountryCode(value);
        console.log("MyNumber", value);
    });



    const selectGenre = async () => {
        try {
            setIsLoading(true);

            const requestOptions = {
                method: "GET",
                redirect: "follow"
              };
              
              fetch("http://62.72.57.205:8092/user/getAllGenre", requestOptions)
                                 .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                // Handle unsuccessful response here
                                const data = await response.json();
                                throw new Error(data.message || 'Request failed with status ' + response.status);
                            }
                        })
                        .then(responseData => {
                            console.log("API Response:", responseData);
                            if (responseData.result) {
                                setGenreData(responseData.result);
                                console.log("GenreData", responseData.result);
                            }
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            // Display alert for error
                            Alert.alert("Error", error.message || "Unknown error occurred");
                            setIsLoading(false);
                        });

        } catch (error) {
            console.log("Error retrieving token:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        selectGenre();
    }, []);

    const retrieveResult = async (key) => {
        try {
            const result = await AsyncStorage.getItem(key);
            if (result !== null) {
                console.log('Retrieved result:', JSON.parse(result));
                return JSON.parse(result);
            }
        } catch (error) {
            console.log('Error retrieving result:', error);
        }
    };

    const handleSignup = () => {
        if (selectedItems.length === 0) {
            Alert.alert("Please select genre.");
            return;
        }
        finishSelection(); // Ensure selectedGenreIds is updated before proceeding
        signupUser();
    };


    const finishSelection = () => {
        // Map selected indices to corresponding genre IDs
        const selectedGenreIds = selectedItems.map(index => genreData[index].id);
        setSelectedGenreIds(selectedGenreIds); // Set selectedGenreIds state here
        SharedPreferences.setItem("selectedGenreIds", selectedGenreIds.toString());
        console.log("Selected Genre IDs:", selectedGenreIds);
    };

    async function signupUser() {
        try {
            const result = await retrieveResult('cameraResult');

            const fileUri = result.assets[0].uri;
            const fileName = result.assets[0].fileName;
            const fileType = result.assets[0].type;

            var formdata = new FormData();

            // Append profile picture directly
            formdata.append('profilePicture', {
                uri: fileUri,
                name: fileName,
                type: fileType || "image/jpeg",
            });

            // Append other form data
            formdata.append('firstName', firstName);
            formdata.append('lastName', lastName);
            formdata.append('email', email);
            formdata.append('dob', parseInt(dob));
            formdata.append('gender', gender);
            formdata.append('genre', selectedGenreIds);
            formdata.append('countryCode', countryCode);
            formdata.append('phoneNumber', parseInt(phoneNumber));

            console.log('FormData=', formdata);

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'multipart/form-data');

            var requestOptions = {
                method: 'POST',
                body: formdata,
                headers: myHeaders,
            };

            fetch("http://62.72.57.205:8092/user/signup", requestOptions)
                .then(response => {
                    if (response.ok) {
                        // Alert.alert("You have been registered successfully");
                        return response.json();
                    } else {
                        throw new Error('Request failed with status ' + response.status);
                    }
                })
                .then(response => {
                    console.log('API response=', response);
                    // finishSelection();
                    ToastAndroid.show(response.status + ": You have been registered successfully " + response.message, ToastAndroid.SHORT);
                    navigation.navigate('login')
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        } catch (error) {
            console.error('Error retrieving camera result:', error);
        }
    }

    const handlePress = (index) => {
        const isSelected = selectedItems.includes(index);
        if (isSelected) {
            setSelectedItems(selectedItems.filter(item => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };


    const renderItem = ({ item, index }) => {
        const isSelected = selectedItems.includes(index);

        return (
            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3), marginLeft: 20 }}>
                <View style={{ flexDirection: 'column', }}>
                    <TouchableOpacity
                        style={{ borderColor: isSelected ? '#910BB3' : 'transparent', borderWidth: 2, borderRadius: 13, }}
                        onPress={() => handlePress(index)}>

                        <View style={{ borderRadius: 14, overflow: 'hidden' }}>
                            <ImageBackground source={{ uri: item.image }}
                                style={{ height: responsiveHeight(18), width: responsiveWidth(40), }}>
                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(2.3), fontWeight: '500', marginTop: responsiveHeight(12) }}>{item.name}</Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', marginTop: responsiveHeight(5), alignSelf: 'center', color: '#FFFFFF' }}> What is your favourite</Text>
                <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', alignSelf: 'center', color: '#FFFFFF' }}>Genre?</Text>

                <FlatList
                    data={genreData}
                    renderItem={renderItem}
                    numColumns={2}
                />

                <TouchableOpacity onPress={handleSignup} style={{ height: 52, width: responsiveWidth(90), alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(3), marginBottom: 30 }}>
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
                        <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Finish</Text>
                    </LinearGradient>
                </TouchableOpacity>
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ChooseGenre;
