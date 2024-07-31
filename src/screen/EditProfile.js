//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TextInput, TouchableOpacity, Modal, Alert, Image, ScrollView, ToastAndroid, FlatList } from 'react-native';
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
import SignUpViewModel from '../Model-View/SignupViewModel';
import SharedPreferences from 'react-native-shared-preferences';

// create a component 
const EditProfile = ({ navigation }) => {

    const { openCameraLib, openGallery } = SignUpViewModel;
    const [open, setOpen] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState("");
    const [isFocus, setIsFocus] = useState("");
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setTokenVal] = useState('');
    const [genreData, setGenreData] = useState("");
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);

    const handleGenreSelection = (genreId) => {
        // Check if the genreId is already in selectedGenreIds
        const isSelected = selectedGenreIds.includes(genreId);

        if (isSelected) {
            // If the genre is already selected, remove it from selectedGenreIds
            setSelectedGenreIds(selectedGenreIds.filter(id => id !== genreId));
        } else {
            // If the genre is not selected, add it to selectedGenreIds
            setSelectedGenreIds([...selectedGenreIds, genreId]);
        }
    };

    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
        const year = dateObj.getFullYear();
        const formattedDay = (day < 10 ? '0' : '') + day;
        const formattedMonth = (month < 10 ? '0' : '') + month;
        return `${formattedDay}-${formattedMonth}-${year}`;
    };

    const handleDateChange = (selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
        setDob(formatDate(selectedDate)); // Update dob state with formatted date
    };

    const handleGenderChange = (item) => {
        setValue(item.value);
        setGender(item.label);
        setIsFocus(false);
    };

    useEffect(() => {
        SharedPreferences.getItem("firstName", function (value) {
            setFirstName(value);
            console.log(value);
        });
        SharedPreferences.getItem("lastName", function (value) {
            setLastName(value);
            console.log(value);
        });
        SharedPreferences.getItem("phoneNumber", function (value) {
            setPhoneNumber(value);
            console.log(value);
        });
        SharedPreferences.getItem("email", function (value) {
            setEmail(value);
            console.log(value);
        });
        SharedPreferences.getItem("gender", function (value) {
            setGender(value);
            console.log(value);
        });
        SharedPreferences.getItem("dob", function (value) {
            setDob(value);
            console.log(value);
        });
        SharedPreferences.getItem("profilePicture", function (value) {
            setProfilePicture(value);
            console.log(value);
        });
        SharedPreferences.getItem("userId", function (value) {
            setUserId(value);
            console.log("userId", value);
        });
        SharedPreferences.getItem("selectedGenreIds", function (value) {
            const genreIds = value ? value.split(',') : []; // Split and initialize as an array
            setSelectedGenreIds(genreIds);
            console.log("selectedGenreIds", genreIds);
        });
    }, []);
    const data = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
    ];

    const goBack = () => {
        navigation.goBack();
    };


    const renderItem = ({ item, index }) => {
        const isSelected = selectedGenreIds.includes(item.id);

        return (
            <View>
                <TouchableOpacity
                    onPress={() => handleGenreSelection(item.id)}
                    style={{ borderColor: isSelected ? '#910BB3' : 'transparent', borderWidth: 2, borderRadius: 18, marginTop: 10 }}>
                    <ImageBackground source={{ uri: item.image }} style={{ height: 75, width: 85, justifyContent: 'center' }} borderRadius={18}>
                        <Text style={{ color: '#fff', alignSelf: 'center' }}>{item.name}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    };

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

    async function editUserProfile() {
        try {
            SharedPreferences.getItem("token", async function (value) {
                console.log("acceptToken", value);

                const result = await retrieveResult('cameraResult');

                const fileUri = result.assets[0].uri;
                const fileName = result.assets[0].fileName;
                const fileType = result.assets[0].type;

                var formdata = new FormData();

                // Append profile picture directly
                formdata.append('profilePicture', {
                    uri: fileUri,
                    type: fileType || "image/jpeg",
                    name: fileName,
                });
                formdata.append('firstName', firstName);
                formdata.append('lastName', lastName);
                formdata.append('email', email);
                formdata.append('userId', userId);
                formdata.append('dob', dob); // Use formatted dob
                formdata.append('gender', gender);
                            if (Array.isArray(selectedGenreIds)) {
                selectedGenreIds.forEach(genreId => {
                    formdata.append('genre', genreId);
                });
            } else {
                console.error('selectedGenreIds is not an array:', selectedGenreIds);
            }
                console.log('FormData=', formdata);

                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'multipart/form-data');
                myHeaders.append("Authorization", value);
                console.log("edittoken", value);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    headers: myHeaders,
                };

                fetch("http://62.72.57.205:8092/user/editProfile", requestOptions)
                    .then(async response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            const errorResponse = await response.json();
                            ToastAndroid.show(errorResponse.message || 'Request failed with status ' + response.status, ToastAndroid.SHORT);
                            throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
                        }
                    })
                    .then(response => {
                        console.log('API response=', response);
                        SharedPreferences.setItem("dob", dob);
                        SharedPreferences.setItem("firstName", firstName);
                        SharedPreferences.setItem("lastName", lastName);
                        SharedPreferences.setItem("gender", gender);
                        SharedPreferences.setItem("profilePicture", profilePicture);

                        ToastAndroid.show(response.code + ": Edit Profile successfully " + response.message, ToastAndroid.SHORT);
                        goBack();
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    });
            })
        } catch (error) {
            console.error('Error retrieving camera result:', error);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
    }


    const selectGenre = async () => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("venueToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Main API calling function
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
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            // Display alert for error
                            Alert.alert("Error", error.message || "Unknown error occurred");
                        });
                } else {
                    console.log("No token available.");
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };

    useEffect((item) => {
        selectGenre();
    }, []);

    return (
        <View style={styles.container}>

            <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ alignSelf: 'center' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
                            <TouchableOpacity onPress={goBack}>
                                <Image source={require('./../../assets/icon/backarrow.png')}
                                    style={{
                                        height: 34, width: 34
                                    }} />
                            </TouchableOpacity>

                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), textAlign: 'center', left: 100, fontWeight: '500' }}>Edit Profile</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
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
                                    profilePicture && { borderRadius: 42 } // Apply border radius if profile picture is selected
                                ]} />
                            <View>

                                <Modal
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
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

                                                <TouchableOpacity onPress={() => {
                                                    openGallery(setModalVisible, setProfilePicture)
                                                }}
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
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
                            <View>
                                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(4) }}>First Name</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        setFirstName(text);
                                    }}
                                    value={firstName} // Bind TextInput value to firstName state variable
                                    placeholder="John"
                                    placeholderTextColor="#808080"
                                />
                            </View>

                            <View>
                                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(7) }}>Last Name</Text>

                                <TextInput
                                    style={styles.input2}
                                    onChangeText={setLastName}
                                    value={lastName}
                                    placeholder="Doe"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: 15 }}>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8) }}>Date of Birth</Text>

                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={date instanceof Date ? date : new Date()} // Ensure date is a Date object
                            onConfirm={handleDateChange}
                            onCancel={() => {
                                setOpen(false);
                            }}
                            customStyles={{
                                dateText: {
                                    color: '#FFFFFF',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                },
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setOpen(true)} style={{ justifyContent: 'center', height: 50, width: responsiveWidth(90), alignSelf: 'center', marginTop: responsiveHeight(0.5), borderRadius: 30, backgroundColor: 'rgba(51, 51, 51, 0.5)' }}>

                            <Image source={require('./../../assets/icon/calendar.png')}
                                style={{ height: 16, width: 16, marginLeft: responsiveWidth(80), top: 7 }} />

                            <Text style={{ marginLeft: 20, color: '#fff', bottom: 8 }}>
                                {date ? formatDate(date) : dob}
                            </Text>

                            {/* <Text style={{ marginLeft: 20, color: date ? "#fff" : '#fff', bottom: 8 }}>{date ? date.toLocaleDateString() : dob}</Text> */}
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 1, marginTop: 15 }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8) }}>Choose Gender</Text>

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
                                placeholder={!isFocus ? gender : '...'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={handleGenderChange}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), }}>Enter Email Address</Text>
                        <TextInput
                            style={styles.input4}
                            onChangeText={setEmail}
                            value={email}
                            placeholderTextColor="#808080"
                        />
                    </View>

                    <View style={{ flex: 4, marginTop: 15, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(4) }}>Favourite Genres</Text>
                        <FlatList
                            data={genreData}
                            renderItem={renderItem}
                            horizontal
                        />
                    </View>

                    <View style={{ flex: 1, marginBottom: 40 }}>
                        <TouchableOpacity onPress={editUserProfile}

                            style={{ height: 50, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: 50 }}>
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

                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Save</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </ImageBackground>
        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
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
        height: 50,
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        paddingLeft: 60,
        color: '#fff'
    },
    input4: {
        height: 50,
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
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
        marginTop: responsiveHeight(1),
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        paddingLeft: 30,
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
        color: '#fff',
        paddingLeft: 20
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#FFFFFF',
        paddingLeft: 20
    },

});

//make this component available to the app
export default EditProfile;


