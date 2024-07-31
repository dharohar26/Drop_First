//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TextInput, TouchableOpacity, ToastAndroid, Alert, FlatList, RefreshControl, Dimensions, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';
import { useIsFocused } from '@react-navigation/native';

// create a component
const ArtistProfile = ({ navigation }) => {

    const [activeButton, setActiveButton] = useState('artist');
    const [showMyRequest, setShowMyRequest] = useState(true);
    const [showLiveSong, setShowLiveSong] = useState(false);
    const [search, setSearch] = useState([]);
    const [myRequest, setMyRequest] = useState("");
    const [liveRequest, setLiveRequest] = useState("");
    const [artistData, setArtistData] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [status, setStatus] = useState("");
    const [hometown, setHometown] = useState("");
    const [stars, setStars] = useState("");
    const [type, setType] = useState("");
    const [theme, setTheme] = useState("");
    const [venueName, setVenueName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [venueId, setVenueId] = useState('');
    const [userId, setUserId] = useState('');
    const [query, setQuery] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [genre, setGenre] = useState('');
    const [artistId, setArtistId] = useState('');
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const onRefresh = () => {
        setRefreshing(true);
        // Fetch updated data here
        artistProfileData(); // Call your API function to refresh data
        myRequestSong();
        liveSongRequest();
        setRefreshing(false);
    };

    const goBack = () => {
        navigation.goBack();
    };

    SharedPreferences.getItem("venueId", function (value) {
        setVenueId(value);
        console.log("venueIdzzzz", value);
    });
    SharedPreferences.getItem("userId", function (value) {
        setUserId(value);
        console.log("userId", value);
    });
    SharedPreferences.getItem("artistId", function (value) {
        setArtistId(value);
        console.log("artistId=>", value);
    });

    const responsiveHeight = (percentage) => {
        return (percentage * screenHeight) / 100;
    };

    const responsiveWidth = (percentage) => {
        return (percentage * screenWidth) / 100;
    };

    const responsiveFontSize = (percentage) => {
        const tempHeight = Math.sqrt(Math.pow(screenHeight, 2) + Math.pow(screenWidth, 2));
        return (percentage * tempHeight) / 100;
    };

    const handleArtistPress = () => {
        setActiveButton('artist');
        setShowMyRequest(true);
        setShowLiveSong(false);
    };

    const handleVenuesPress = () => {
        setActiveButton('venues');
        setShowMyRequest(false);
        setShowLiveSong(true);
    };


    useEffect(() => {
        if (venueId && artistId) {
            console.log("Fetching artist data with venueId:", venueId, "and artistId:", artistId);
            artistProfileData();
        } else {
            console.log("Missing venueId or artistId. venueId:", venueId, "artistId:", artistId);
        }
    }, [venueId, artistId]);


    const artistProfileData = async () => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", async function (value) {
                console.log("database", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow",
                    };

                    const url = `http://62.72.57.205:8092/user/getArtistById?venueId=${venueId}&artistId=${artistId}`;
                    console.log("Profile Url", url);

                    try {
                        const response = await fetch(url, requestOptions);
                        const responseData = await response.json();
                        console.log("API Response Profile:", responseData);

                        if (response.ok) {
                            console.log("API Response Bio:", responseData);
                            ToastAndroid.show(response.status + ": This is your " + response.message, ToastAndroid.SHORT);
                            if (responseData.result) {
                                // Update state with response data
                                setArtistData(responseData.result);
                                setProfilePicture(responseData.result.profilePicture);
                                setStatus(responseData.result.status);
                                setFirstName(responseData.result.firstName);
                                setLastName(responseData.result.lastName);
                                setStars(responseData.result.stars);
                                setType(responseData.result.type);
                                setTheme(responseData.result.theme);
                                setVenueName(responseData.result.venueName);
                                setHometown(responseData.result.hometown)
                                setBio(responseData.result.bio);
                                setGenre(responseData.result.genre);
                                SharedPreferences.setItem("hometown", responseData.result.hometown);
                            }
                            setIsLoading(false);
                        } else {
                            throw new Error(responseData.message || 'Request failed with status ' + response.status);
                        }
                    } catch (fetchError) {
                        console.log("Error fetching data:", fetchError);
                        ToastAndroid.show(fetchError.message, ToastAndroid.SHORT);
                    }
                } else {
                    console.log("No token or missing venueId/artistId. venueId:", venueId, "artistId:", artistId);
                }
            });
        } catch (error) {
            console.log("Error retrieving token or processing data:", error);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setIsLoading(false);
        }
    };


    const myRequestSong = async () => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("MyRequestToken", value);

                if (value && userId && artistId) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);
                    console.log("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Construct the URL with userId and artistId
                    const url = `http://62.72.57.205:8092/user/allSongRequest?userId=${userId}&artistId=${artistId}`;
                    console.log("url Data", url);

                    // Main API calling function
                    fetch(url, requestOptions)
                        // Log the response object
                        .then(async response => {
                            console.log("Response Status:", response.status); // Log the status
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                const data = await response.json();
                                throw new Error(data.message || 'Request failed with status ' + response.status)
                            }
                        })
                        .then(responseData => {
                            console.log("API Request Response:", responseData);
                            if (responseData.result) {
                                setMyRequest(responseData.result)
                                console.log("Got it", responseData.result);
                            }
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            // Alert.alert("Error", error.message || "Unknown error occurred");
                        });
                } else {
                    console.log("No token or userId or artistId available.");
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };

    // useEffect(() => {
    //     myRequestSong();
    // }, [userId, artistId]);

    useEffect(() => {
        if (isFocused) {
            myRequestSong();
        }
      }, [isFocused,userId, artistId]);


    const liveSongRequest = async () => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("MyRequestToken", value);

                if (value && userId && artistId) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const url = `http://62.72.57.205:8092/user/liveRequests?userId=${userId}&artistId=${artistId}`;
                    console.log("LiveUri=", url);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Main API calling function
                    fetch(url, requestOptions)
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
                            console.log("API Response:==", responseData);
                            if (responseData.result) {
                                setLiveRequest(responseData.result)
                                console.log("Live Song", responseData.result);
                            }
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            // Display alert for error
                            Alert.alert("Error", error.message || "Unknown error occurred");
                        });
                }

                else {
                    console.log("No token available.");
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };

    useEffect((item) => {
        liveSongRequest();
    }, [userId, artistId]);



      
    const searchSong = async (txt) => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("homeToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);
                    console.log("artisIDDD", artistId);

                    const queryParams = new URLSearchParams({
                        query: query,
                        artistId: artistId
                    });

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Main API calling function
                    fetch("http://62.72.57.205:8092/search?" + queryParams, requestOptions)
                        .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                const data = await response.json();
                                throw new Error(data.message || 'Request failed with status ' + response.status);
                            }
                        })
                        .then(responseData => {
                            console.log("API Response now:", responseData);
                            if (responseData.result) {
                                setSearch(responseData.result);
                                console.log("set", responseData.result);
                                navigation.navigate('searchsong');

                            }
                        })
                        .catch(error => {
                            console.log("API Error:", error);
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

    const renderItem = ({ item }) => {
        let statusColor = '#FFB803'; // Default color for status

        // Set color based on status
        switch (item.status) {
            case 'Pending Approval':
                statusColor = '#FFB803';
                break;
            case 'Settled':
            case 'live': // Combine cases with same color
                statusColor = '#5ABF0B';
                break;
            case 'Rejected':
                statusColor = '#F52424';
                break;
            default:
                break;
        }

        return (
            <View>
                <View style={{ width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14, marginTop: responsiveHeight(1) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: item.songImage }}
                            style={{
                                height: responsiveHeight(7), width: responsiveWidth(16), borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                            }} />

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: responsiveWidth(2) }}>
                            <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.3) }}>{item.songName}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('./../../assets/icon/Eee.png')}
                                    style={{
                                        height: 13, width: 13, borderRadius: 10, bottom: 7
                                    }} />
                                <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.5), marginLeft: responsiveWidth(1), bottom: 8 }}>{item.songArtistName}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginRight: responsiveWidth(2), alignItems: 'flex-end' }}>
                            <Text style={{ color: statusColor, marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>{item.status}</Text>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.3), marginTop: responsiveHeight(0.5) }}>Waiting 00:04:48</Text>
                        </View>
                    </View>

                    <View style={{ width: '94%', backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1.8) }}>
                        <Text style={{ color: '#FFFFFF', marginHorizontal: responsiveWidth(5), fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1), textAlign: 'center' }}>{item.note}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderItems = ({ item }) => {
        return (
            <View>
                <View style={{ width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: responsiveHeight(2) }}>

                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                        <Image source={require('./../../assets/icon/Ellipse.png')}
                            style={{
                                height: responsiveWidth(8), // Adjusted for responsiveness
                                width: responsiveWidth(8), // Adjusted for responsiveness
                                borderRadius: 10,
                                marginLeft: responsiveWidth(4),
                                bottom: responsiveHeight(0.6) // Adjusted for responsiveness
                            }} />
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.5), bottom: responsiveHeight(0.2) }}>Martha Smith</Text>
                    </View>

                    <Image source={require('./../../assets/icon/line.png')}
                        style={{
                            height: responsiveHeight(0.3), // Adjusted for responsiveness
                            width: responsiveWidth(80),
                            borderRadius: 10,
                            marginTop: responsiveHeight(0.2),
                            marginLeft: responsiveWidth(4)
                        }} />

                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1), marginBottom: 14 }}>
                        <Image source={{ uri: item.songImage }}
                            style={{
                                height: responsiveWidth(13), // Adjusted for responsiveness
                                width: responsiveWidth(14), // Adjusted for responsiveness
                                borderRadius: 8,
                                marginLeft: responsiveWidth(3)
                            }} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#FFFFFF', fontWeight: '400', fontSize: responsiveFontSize(1.4), marginLeft: responsiveWidth(5), marginRight: responsiveWidth(40) }}>{item.songName}</Text>

                            <Image source={require('./../../assets/icon/Eee.png')}
                                style={{
                                    height: responsiveHeight(1.4), // Adjusted for responsiveness
                                    width: responsiveWidth(3), // Adjusted for responsiveness
                                    borderRadius: 10,
                                    marginTop: responsiveHeight(0.8),
                                    marginLeft: responsiveWidth(5)
                                }} />

                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.3), bottom: responsiveHeight(2), marginLeft: responsiveWidth(10) }}>{item.songArtistName}</Text>
                        </View>

                        <View style={{ marginRight: screenWidth * 0.05 }}>
                            <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(0.1), fontWeight: '400', fontSize: responsiveFontSize(1.8), right: responsiveWidth(26) }}>{item.amountPaid}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ alignSelf: 'center', width: responsiveWidth(100), height: responsiveHeight(100) }}>
                {isLoading ? ( // Show loader if loading state is true
                    <ActivityIndicator size="large" color="#E16DFF" style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
                ) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>

                        <View style={{ flex: 5, }}>
                            <ImageBackground source={require('./../../assets/icon/Rectangle.png')}
                                style={{
                                    height: 230, width: responsiveWidth(100), alignSelf: 'center'
                                }}>

                        <TouchableOpacity onPress={goBack}>
                                <Image source={require('./../../assets/icon/before.png')}
                                    style={{
                                        height: 34, width: 34, marginLeft: 20,marginTop:20
                                    }} />
                            </TouchableOpacity>
                </ImageBackground>
                            

                            <TouchableOpacity onPress={() => {
                                SharedPreferences.setItem("firstName", firstName);
                                SharedPreferences.setItem("lastName", lastName);
                                SharedPreferences.setItem("status", status);
                                SharedPreferences.setItem("bio", bio);
                                SharedPreferences.setItem("type", type);
                                SharedPreferences.setItem("profilePicture", profilePicture);
                                SharedPreferences.setItem("stars", stars.toString());
                                SharedPreferences.setItem("genre", genre.toString());
                                console.log("lastName", genre);
                                navigation.navigate('artistbio');
                            }}>
                                <Image
                                    source={profilePicture ? { uri: profilePicture } : require('./../../assets/icon/Artist.png')}
                                    style={{
                                        height: 75,
                                        width: 75,
                                        alignSelf: 'center',
                                        bottom: 40,
                                        borderWidth: 2,
                                        borderColor: '#C70FF7',
                                        borderRadius: 40
                                    }}
                                />

                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, bottom: 40 }}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ height: 8, width: 8, backgroundColor: '#4EDA2C', borderRadius: 20, marginLeft: 165, }}></View>
                                <Text style={{ color: '#4EDA2C', textAlign: 'center', fontSize: responsiveFontSize(1.4), left: 5, bottom: 4 }}>{status}</Text>
                            </View>
                            <Text style={{ color: '#FFFFFF', textAlign: 'center', bottom: 20, fontSize: responsiveFontSize(2.2), fontWeight: '400', marginTop: 15 }}>{firstName}{lastName}<Text style={{ color: '#808080' }}>({type})</Text></Text>
                        </View>

                        <View style={{ flex: 1, bottom: 10, bottom: 50 }}>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: 7 }}>
                                <Image source={require('./../../assets/icon/Sitara.png')}
                                    style={{
                                        height: 11, width: 10,
                                    }} />
                                <Image source={require('./../../assets/icon/Sitara.png')}
                                    style={{
                                        height: 11, width: 10, left: 3
                                    }} />

                                <Image source={require('./../../assets/icon/Sitara.png')}
                                    style={{
                                        height: 11, width: 10, left: 6
                                    }} />

                                <Image source={require('./../../assets/icon/Sitara.png')}
                                    style={{
                                        height: 11, width: 10, left: 9
                                    }} />

                                <Image source={require('./../../assets/icon/Sitara.png')}
                                    style={{
                                        height: 11, width: 10, left: 12
                                    }} />
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), fontWeight: '500', alignSelf: 'center', left: 16, bottom: 5 }}>{stars}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: 5 }}>
                                <Image source={require('./../../assets/icon/direction.png')}
                                    style={{
                                        height: responsiveHeight(2.3), width: responsiveWidth(4)
                                    }} />
                                <Text style={{ color: '#808080', marginLeft: 5, fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>{hometown}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 2, bottom: 40 }}>
                            <View style={{ width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14 }}>
                                <Text style={{ color: '#C70FF7', textAlign: 'center', marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Theme of the day</Text>
                                <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(7), marginRight: responsiveWidth(7), fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1), textAlign: 'center', marginBottom: 16 }}>{theme}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, bottom: 30, }}>
                            <View style={{ flexDirection: 'row', bottom: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={txt => setQuery(txt)}
                                    value={query}
                                    placeholder="Search a song to a request"
                                    placeholderTextColor={"#808080"}
                                />

                                <TouchableOpacity style={{ height: 45, width: responsiveWidth(22), marginTop: 12, marginLeft: 5 }} onPress={() => {
                                    SharedPreferences.setItem("query", query)
                                    console.log("query", query);
                                    searchSong();
                                }}>

                                    <LinearGradient
                                        colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                        start={{ x: 0, y: 0 }} // Gradient start point
                                        end={{ x: 1, y: 0 }} // Gradient end point
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            borderRadius: 30,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require('./../../assets/icon/Search.png')}
                                                style={{
                                                    height: 14, width: 14, top: 2
                                                }} />

                                            <Text style={{ textAlign: 'center', color: '#FFFFFF', left: 5, fontSize: responsiveFontSize(1.5) }}>Search</Text>
                                        </View>

                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', bottom: 20 }}>
                            <Image source={require('./../../assets/icon/line.png')}
                                style={{
                                    height: 2, width: responsiveWidth(90), alignSelf: 'center',
                                }} />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', bottom: 20 }}>

                            <View style={{
                                justifyContent: 'center',
                                width: responsiveWidth(60),
                                height: responsiveHeight(8),
                                flexDirection: 'row',
                                marginTop: responsiveHeight(2),
                                marginLeft: responsiveWidth(5)
                            }}>

                                <TouchableOpacity onPress={handleArtistPress} style={{
                                    height: 40, width: responsiveWidth(27),
                                    backgroundColor: activeButton === 'artist' ? '#B438D5' : 'transparent',
                                    borderRadius: 30, justifyContent: 'center'
                                }}>

                                    <Text style={{
                                        textAlign: 'center', fontSize: responsiveFontSize(1.7),
                                        color: activeButton === 'artist' ? '#FFFFFF' : '#808080',
                                        fontWeight: '400'
                                    }}>My Request</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleVenuesPress} style={{
                                    height: 40, width: responsiveWidth(27),
                                    backgroundColor: activeButton === 'venues' ? '#B438D5' : 'transparent',
                                    borderRadius: 30, justifyContent: 'center', marginLeft: 2
                                }}>
                                    <Text style={{
                                        textAlign: 'center', fontSize: responsiveFontSize(1.7),
                                        color: activeButton === 'venues' ? '#FFFFFF' : '#808080',
                                        fontWeight: '400'
                                    }}>Live Song</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ bottom: 30 }}>
                            {showMyRequest && (
                                <View style={{ marginBottom: 30 }}>
                                    {/* Render ActivityIndicator if artistData is empty */}
                                    {isLoading ? (
                                        <View style={styles.loader}>
                                            <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                                        </View>
                                    ) : (
                                        <View>
                                            {myRequest.length === 0 ? (
                                                <Image source={require('./../../assets/icon/no-data.png')}
                                                    style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(20) }} />
                                            ) : (
                                                <View>
                                                    <FlatList
                                                        data={myRequest}
                                                        renderItem={renderItem}
                                                        scrollEnabled={false}
                                                        refreshControl={
                                                            <RefreshControl
                                                                refreshing={refreshing}
                                                                onRefresh={onRefresh}
                                                            />
                                                        }
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('ongoing')}
                                                        style={{ height: 40, width: 100, borderWidth: 1, borderColor: '#FFFFFF', alignSelf: 'center', marginBottom: 20, borderRadius: 30, justifyContent: 'center', marginTop: 12 }}>
                                                        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>See All</Text>
                                                    </TouchableOpacity>

                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}

                            {showLiveSong && (
                                <View style={{ marginBottom: 30 }}>
                                    {/* Render ActivityIndicator if artistData is empty */}
                                    {isLoading ? (
                                        <View style={styles.loader}>
                                            <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                                        </View>
                                    ) : (
                                        <View>
                                            {liveRequest.length === 0 ? (
                                                <Image source={require('./../../assets/icon/no-data.png')}
                                                    style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(2) }} />
                                            ) : (
                                                <FlatList
                                                    data={liveRequest}
                                                    renderItem={renderItems}
                                                    scrollEnabled={false}
                                                    refreshControl={
                                                        <RefreshControl
                                                            refreshing={refreshing}
                                                            onRefresh={onRefresh}
                                                        />
                                                    }
                                                />
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}

                        </View>
                    </ScrollView>
                )}
            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    input: {
        height: 45,
        width: responsiveWidth(65),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        borderRadius: 30,
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(6),
        paddingLeft: 20,
        color: '#FFFFFF'
    },
    ratingInput: {
        height: responsiveHeight(20),
        width: responsiveWidth(70),
        backgroundColor: '#808080',
        borderRadius: 12,
        color: '#FFFFFF',
        paddingLeft: 20,
        alignSelf: 'center',
        marginTop: responsiveHeight(2)
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#E16DFF'
    },
});

//make this component available to the app
export default ArtistProfile;




