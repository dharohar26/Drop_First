// //import liraries
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView, Alert, ToastAndroid, FlatList, Dimensions, RefreshControl } from 'react-native';
// import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
// import { RadioButton } from 'react-native-paper';
// import SharedPreferences from 'react-native-shared-preferences';

// // create a component
// const MyProfile = ({ navigation }) => {

//     const [checked, setChecked] = useState(['first']);
//     const [userId, setUserId] = useState('');
//     const [token, setTokenVal] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [gender, setGender] = useState('');
//     const [dob, setDob] = useState('');
//     const [profilePicture, setProfilePicture] = useState("");
//     const [bankDetails, setBankDetails] = useState([]);
//     const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
//     const [refreshing, setRefreshing] = useState(false);

//     const goBack = () => {
//         navigation.goBack();
//     };

//     const onRefresh = () => {
//         // Set refreshing state to true
//         setRefreshing(true);
//         // Fetch data again
//         getProfile();
//         // Set refreshing state to false when done
//         setRefreshing(false);
//     };

//     const responsiveHeight = (percentage) => {
//         return (percentage * screenHeight) / 100;
//     };

//     const responsiveWidth = (percentage) => {
//         return (percentage * screenWidth) / 100;
//     };

//     useEffect(() => {
//         SharedPreferences.getItem("token", function (value) {
//             setTokenVal(value);
//             console.log("Token", value);
//         })
//         SharedPreferences.getItem("firstName", function (value) {
//             setFirstName(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("phoneNumber", function (value) {
//             setPhoneNumber(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("email", function (value) {
//             setEmail(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("gender", function (value) {
//             setGender(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("dob", function (value) {
//             setDob(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("profilePicture", function (value) {
//             setProfilePicture(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("userId", function (value) {
//             setUserId(value);
//             console.log(value);
//         });
//         SharedPreferences.getItem("lastName", function (value) {
//             setLastName(value);
//             console.log(value);
//         });
//     }, []);

//     const toggleChecked = (itemId) => {
//         // Toggle the state of the selected item
//         if (checked.includes(itemId)) {
//             setChecked(checked.filter((id) => id !== itemId)); // Remove item if it's already checked
//         } else {
//             setChecked([...checked, itemId]); // Add item if it's not already checked
//         }
//     };

//     const renderItem = ({ item }) => {
//         return (
//             <View style={{ marginTop: responsiveHeight(1), flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(4) }}>
//                  {/* <Image source={{ uri: item.image }}
//                     style={{ height: responsiveHeight(5), width: responsiveHeight(5),borderRadius:8}}
//                 /> */}
//                         <Image source={require('./../../assets/icon/Credit.png')}
//                                         style={{ height: responsiveHeight(5), width: responsiveHeight(5),borderRadius:8}} />

//                 <View style={{ flex: 1, marginLeft: responsiveWidth(4) }}>
//                     <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8) }}>{item.bankName}</Text>
//                     <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6) }}>{item.accountNumber}</Text>
//                 </View>

//                 <View style={{ marginLeft: 'auto', marginRight: responsiveWidth(4) }}>
//                     <RadioButton
//                         value={item.id}
//                         status={checked.includes(item.id) ? 'checked' : 'unchecked'}
//                         onPress={() => toggleChecked(item.id)}
//                         uncheckedColor={'#808080'}
//                         color={'#fff'}
//                     />
//                 </View>
//             </View>
//         );
//     };

//     const getProfile = () => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", token);
//         console.log("This is", token);

//         var requestOptions = {
//             method: 'GET',
//             headers: myHeaders,
//         };
//         fetch(`http://62.72.57.205:8092/user/viewProfile/${userId}`, requestOptions)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 if (data.code === 200) {
//                     ToastAndroid.show(data.code + ": " + data.message, ToastAndroid.SHORT);
//                     setFirstName(data.result.firstName);
//                     setLastName(data.result.lastName);
//                     setGender(data.result.gender);
//                     setEmail(data.result.email);
//                     setDob(data.result.dob);
//                     setProfilePicture(data.result.profilePicture);
//                     setBankDetails(data.result.bankDetails); // Set bank details from API response
//                     console.log("bankdetail", data.result.bankDetails)
//                 }
//                 else {
//                     console.log("Error showing:", error);
//                     //    Alert.alert(data.status + " : " + data.message);
//                 }
//             })
//             // If API is faliure state
//             .catch(error => console.log('error', error));
//     }

//     useEffect(() => {
//         getProfile()
//     }, [userId]);



//     return (
//         <View style={styles.container}>
//             <ScrollView
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                     />
//                 }> 
//             <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
//                 style={{ alignSelf: 'center' }}>
//                     <View style={{ flex: 1 }}>
//                         <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), justifyContent: 'space-between', marginRight: 15, marginLeft:15 }}>
//                             <TouchableOpacity onPress={goBack}>
//                                 <Image source={require('./../../assets/icon/backarrow.png')}
//                                     style={{
//                                         height: 34, width: 34
//                                     }} />
//                             </TouchableOpacity>

//                             <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), textAlign: 'center' }}>My Profile</Text>

//                             <TouchableOpacity 
//                                 onPress={() => {
//                                     SharedPreferences.setItem("profilePicture", profilePicture);
//                                     SharedPreferences.setItem("firstName", firstName);
//                                     SharedPreferences.setItem("lastName", lastName);
//                                     SharedPreferences.setItem("dob", dob);
//                                     SharedPreferences.setItem("gender", gender);
//                                     SharedPreferences.setItem("profilePicture", profilePicture);
//                                     navigation.navigate('edit')
//                                 }}>
//                                 <Image source={require('./../../assets/icon/editPencil.png')}
//                                     style={{
//                                         height: 34, width: 34
//                                     }} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     <View style={{ flex: 1, marginTop: 20 }}>
//                         <Image source={{ uri: profilePicture }}

//                             style={{
//                                 height: 84, width: 84, alignSelf: 'center', marginTop: responsiveHeight(1), borderRadius: 40
//                             }} />
//                         <Text style={{ color: '#C70FF7', textAlign: 'center', marginTop: 10, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{firstName}</Text>
//                     </View>

//                     <View style={{ flex: 2 }}>

//                         <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginLeft: 20, marginTop: responsiveHeight(3.2) }}>Personal Info</Text>

//                         <View style={{ height: 167, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14, marginTop: 10 }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20, marginTop: 10 }}>
//                                 <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Date of birth</Text>
//                                 <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>{dob}</Text>
//                             </View>

//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
//                                 <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Gender</Text>
//                                 <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>{gender}</Text>
//                             </View>

//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
//                                 <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Phone number</Text>
//                                 <Image source={require('./../../assets/icon/right.png')}
//                                     style={{
//                                         height: 15, width: 15, marginTop: 15, left: 45
//                                     }} />
//                                 <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>+91{phoneNumber}</Text>
//                             </View>

//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
//                                 <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Email Address</Text>
//                                 <Image source={require('./../../assets/icon/right.png')}
//                                     style={{
//                                         height: 15, width: 15, marginTop: 15, left: 24
//                                     }} />
//                                 <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>{email}</Text>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ marginTop: responsiveHeight(1) }}>

//                         <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginLeft: 20, marginTop: 10 }}>My Bank accounts</Text>

//                         <View style={{ width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14, marginTop: 10, marginBottom: 20 }}>
//                             <FlatList
//                                 data={bankDetails}
//                                 renderItem={renderItem}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 contentContainerStyle={{ paddingBottom: 20 }} // Adjust this value as needed
//                                 scrollEnabled={false}
//                             />
//                             <TouchableOpacity onPress={() => navigation.navigate('newbank')}>
//                                 <Text style={{ textAlign: 'center', color: '#C70FF7', marginTop: 16, fontSize: responsiveFontSize(1.9), fontWeight: '500', bottom: 14 }}>Add new bank</Text>
//                             </TouchableOpacity>
//                         </View>
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
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#000000',
//     },
// });

// //make this component available to the app
// export default MyProfile;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ToastAndroid, FlatList, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { RadioButton } from 'react-native-paper';
import SharedPreferences from 'react-native-shared-preferences';
import { useFocusEffect } from '@react-navigation/native';

const MyProfile = ({ navigation, route }) => {

    const [checked, setChecked] = useState(['first']);
    const [userId, setUserId] = useState('');
    const [token, setTokenVal] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [profilePicture, setProfilePicture] = useState("");
    const [bankDetails, setBankDetails] = useState([]);
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State variable for loader
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);

    const goBack = () => {
        navigation.goBack();
    };

    const onRefresh = () => {
        setRefreshing(true);
        getProfile();
        setRefreshing(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            if (userId) {
                getProfile();
            }
        }, [userId])
    );

    const responsiveHeight = (percentage) => {
        return (percentage * screenHeight) / 100;
    };

    const responsiveWidth = (percentage) => {
        return (percentage * screenWidth) / 100;
    };

    useEffect(() => {
        SharedPreferences.getItem("token", function (value) {
            setTokenVal(value);
            console.log("Token", value);
        });
        SharedPreferences.getItem("userId", function (value) {
            setUserId(value);
            console.log(value);
        });
    }, []);

    const toggleChecked = (itemId) => {
        if (checked.includes(itemId)) {
            setChecked(checked.filter((id) => id !== itemId));
        } else {
            setChecked([...checked, itemId]);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: responsiveHeight(1), flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(4) }}>
                <Image source={require('./../../assets/icon/Credit.png')}
                    style={{ height: responsiveHeight(5), width: responsiveHeight(5), borderRadius: 8 }} />
                <View style={{ marginLeft: responsiveWidth(4) }}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8) }}>{item.bankName}</Text>
                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6) }}>{item.accountNumber}</Text>
                </View>
                <View style={{ marginLeft: 'auto', marginRight: responsiveWidth(4) }}>
                    <RadioButton
                        value={item.id}
                        status={checked.includes(item.id) ? 'checked' : 'unchecked'}
                        onPress={() => toggleChecked(item.id)}
                        uncheckedColor={'#808080'}
                        color={'#fff'}
                    />
                </View>
            </View>
        );
    };

    const getProfile = () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        console.log("This is", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`http://62.72.57.205:8092/user/viewProfile/${userId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code === 200) {
                    ToastAndroid.show(data.code + ": " + data.message, ToastAndroid.SHORT);
                    setFirstName(data.result.firstName);
                    setLastName(data.result.lastName);
                    setPhoneNumber(data.result.phoneNumber);
                    setGender(data.result.gender);
                    setEmail(data.result.email);
                    setDob(data.result.dob);
                    setProfilePicture(data.result.profilePicture);
                    setBankDetails(data.result.bankDetails);
                    const genreIds = data.result.genre.map(genre => genre.id.toString());
                    setSelectedGenreIds(genreIds);

                    console.log("genreIds", genreIds);
                    console.log("DateOfBirth",data.result.dob);

                    console.log("bankdetail", data.result.bankDetails);
                    setIsLoading(false); // Hide loader after data is fetched
                } else {
                    console.log("Error showing:", error);
                }
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        getProfile();
    }, [userId]);

    useEffect(() => {
        // Update profile data when 'updated' parameter changes
        if (route.params?.updated) {
            getProfile(); // Fetch updated profile data
        }
    }, [route.params?.updated]);

    return (
        <View style={styles.container}>

            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            >
                <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                    style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), justifyContent: 'space-between', marginRight: 15, marginLeft: 15 }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{ height: 34, width: 34 }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), textAlign: 'center' }}>My Profile</Text>
                        <TouchableOpacity onPress={() => {
                            SharedPreferences.setItem("profilePicture", profilePicture);
                            SharedPreferences.setItem("firstName", firstName);
                            SharedPreferences.setItem("lastName", lastName);
                            SharedPreferences.setItem("dob", dob);
                            SharedPreferences.setItem("email", email);
                            SharedPreferences.setItem("gender", gender);
                            SharedPreferences.setItem("selectedGenreIds", selectedGenreIds.toString());
                            console.log("Select", selectedGenreIds);
                            navigation.navigate('edit');

                        }}>
                            <Image source={require('./../../assets/icon/editPencil.png')}
                                style={{ height: 34, width: 34 }} />
                        </TouchableOpacity>
                    </View>

                    {isLoading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#C70FF7" />
                        </View>
                    ) : (
                        <View>


                            <View style={{ marginTop: 20 }}>
                                {profilePicture ? (
                                    <Image source={{ uri: profilePicture }}
                                        style={{
                                            height: 84, width: 84, alignSelf: 'center', marginTop: responsiveHeight(1), borderRadius: 40
                                        }} />
                                ) : (
                                    <Text style={{ color: '#C70FF7', textAlign: 'center', marginTop: 10, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>No Profile Picture</Text>
                                )}
                                <Text style={{ color: '#C70FF7', textAlign: 'center', marginTop: 10, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{firstName}</Text>
                            </View>

                            <View>
                                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginLeft: 28, marginTop: responsiveHeight(3.2) }}>Personal Info</Text>
                                <View style={{ height: 167, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20, marginTop: 10 }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Date of birth</Text>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>{dob}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Gender</Text>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>{gender}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Phone number</Text>
                                        <Image source={require('./../../assets/icon/right.png')}
                                            style={{ height: 15, width: 15, marginTop: 15, left: 50 }} />
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>+91{phoneNumber}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>Email Address</Text>
                                        <Image source={require('./../../assets/icon/right.png')}
                                            style={{ height: 15, width: 15, marginTop: 15, left: 20 }} />
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginTop: 12 }}>{email}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: responsiveHeight(1) }}>
                                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.8), fontWeight: '500', marginLeft: 28, marginTop: 10 }}>My Bank accounts</Text>
                                <View style={{ width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14, marginTop: 10, marginBottom: 20 }}>
                                    {isLoading ? (
                                        // Show loader if isLoading is true
                                        <View style={styles.loaderContainer}>
                                            <ActivityIndicator size="large" color="#C70FF7"/>
                                        </View>
                                    ) : (
                                        // Render FlatList with bank details if data is not loading
                                        <FlatList
                                            data={bankDetails}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) => index.toString()}
                                            contentContainerStyle={{ paddingBottom: 20 }}
                                        />
                                    )}
                                    <TouchableOpacity onPress={() => navigation.navigate('newbank')}>
                                        <Text style={{ textAlign: 'center', color: '#C70FF7', marginTop: 16, fontSize: responsiveFontSize(1.9), fontWeight: '500', bottom: 14 }}>Add new bank</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </ImageBackground>
            </RefreshControl>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyProfile;


