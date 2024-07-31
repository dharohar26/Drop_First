//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Modal, FlatList, Alert, ToastAndroid,Dimensions,ActivityIndicator,RefreshControl} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { AirbnbRating } from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const OngoingSongList = ({ navigation }) => {

    const [activeButton, setActiveButton] = useState('ongoing');
    const [showOngoing, setShowOngoing] = useState(true);
    const [showSettled, setShowSettled] = useState(false);
    const [showRejected, setShowRejected] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [thanksModal, setThanksModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [onGoing, setOnGoing] = useState([]);
    const [settled, setSettled] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [note, setNote] = useState("");
    const [star, setStar] = useState("");
    const [token, setTokenVal] = useState("");
    const [userId, setUserId] = useState('');
    const [artistId, setArtistId] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

    SharedPreferences.getItem("userId", function (value) {
        setUserId(value);
        console.log("userId", value);
    });

    SharedPreferences.getItem("artistId", function (value) {
        setArtistId(value);
        console.log("artistId=>", value);
    });

    const handleStarRating = (rating) => {
        setStar(rating);
    };

    const goBack = () => {
        navigation.goBack();
    };

    const onRefresh = () => {
        setRefreshing(true);
        rejectedSongList();
        getSettleSong();
        ongoingList();
        setRefreshing(false);
    };

    const toggleRatingModal = () => {
        setRatingModal(!ratingModal);
        if (thanksModal) {
            setRatingModal(false);
        }
    };

    const toggleThanksModal = () => {
        setThanksModal(!thanksModal);
        if (ratingModal) {
            setRatingModal(false);
        }
    };

    const handleOngoingPress = () => {
        setActiveButton('ongoing');
        setShowOngoing(true);
        setShowSettled(false);
        setShowRejected(false);
    };

    const handleSettledPress = () => {
        setActiveButton('settled');
        setShowOngoing(false);
        setShowSettled(true);
        setShowRejected(false);
    };

    const handleRejectedPress = () => {
        setActiveButton('rejected');
        setShowOngoing(false);
        setShowSettled(false);
        setShowRejected(true);
    };

    async function reviewSong() {

        SharedPreferences.getItem("token", function (value) {
            setTokenVal(value);
            console.log("reviewToken",value);

        var formdata = new FormData();
        formdata.append('userId', userId);
        formdata.append('artistId', artistId);
        formdata.append('note', note);
        formdata.append('star', star);
        console.log('FormData=', formdata);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", value);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            headers: myHeaders,
        }
        fetch("http://62.72.57.205:8092/user/addReview", requestOptions)
            .then(async response => {
                // Check the status code directly within this block
                if (response.status === 200) {
                    ToastAndroid.show(response.status + "Your rating has been sent " + response.message, ToastAndroid.SHORT);

                    setStar(star);
                    toggleThanksModal();
                    return response.json();
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then(response => {
                console.log('API response=', response);
                // Handle further operations with the response data if needed
            })
        })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }


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
                                    height: responsiveHeight(2), width: responsiveWidth(3), borderRadius: 10, marginTop: responsiveHeight(0.5),
                                }} />
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.5), marginLeft: responsiveWidth(1) }}>{item.songArtistName}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginRight: responsiveWidth(3), alignItems: 'flex-end' }}>
                        <Text style={{ color: statusColor, marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>{item.status}</Text>
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.3), marginTop: responsiveHeight(0.5) }}>Waiting 00:04:48</Text>
                    </View>
                </View>

                <View style={{ width: '94%', backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: responsiveHeight(1), marginBottom: responsiveHeight(2) }}>
                    <Text style={{ color: '#FFFFFF', marginHorizontal: responsiveWidth(5), fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1), textAlign: 'center' }}>{item.note}</Text>
                </View>

            </View>
        </View>
        );
    };

    const renderItem2 = ({ item }) => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <View style={{ alignSelf: 'center' }}>
                    <ImageBackground
                        source={require('./../../assets/icon/walletbutton.png')}
                        style={styles.superman}
                        imageStyle={{ borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingRight: 20, marginTop: 12 }}>
                            <Image source={{ uri: item.songImage }}
                                style={{
                                    height: 47, width: 51, borderRadius: 10
                                }} />
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.4), right: 20,textAlign:'left', width:responsiveWidth(35) }}>{item.songName}</Text>
                            <Text style={{ color: '#5ABF0B',fontSize: responsiveFontSize(1.5) }}>{item.status}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(23), bottom: 25, justifyContent: 'space-between', marginRight: 20 }}>
                            <Image source={require('./../../assets/icon/Eee.png')}
                                style={{
                                    height: 12, width: 12, top: 8
                                }} />
                            <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.3), top: 8, right: 62 }}>{item.songArtistName}</Text>

                            <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.2), top: 2 }}>2 mins ago</Text>
                        </View>

                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            imageStyle={{ borderRadius: 10 }}
                            style={{ height: 58, width: responsiveWidth(82), alignSelf: 'center', bottom: 6 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingRight: 20, marginTop: responsiveHeight(2.5) }}>
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.4) }}>{item.note}</Text>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.4), }}>₹{item.amountPaid}</Text>
                            </View>
                        </ImageBackground>

                        <TouchableOpacity onPress={() => toggleRatingModal()}>
                            <Text style={{ color: '#C70FF7', textAlign: 'center', marginTop: 5, fontSize: responsiveFontSize(1.7) }}>Write a review</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            visible={ratingModal}
                            onRequestClose={() => {
                                setRatingModal(!ratingModal);
                            }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
                                <View style={{ height: responsiveHeight(50), width: responsiveWidth(80), backgroundColor: '#383838', alignSelf: 'center', borderRadius: 20 }}>
                                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: responsiveHeight(1.8), fontSize: responsiveFontSize(2), fontWeight: '600' }}>Write a review</Text>
                                    <View style={{ marginTop: responsiveHeight(3) }}>
                                        <AirbnbRating
                                            defaultRating={2}
                                            selectedColor={'#FFB803'}
                                            unSelectedColor="#808080"
                                            size={35}
                                            showRating={false}
                                            onFinishRating={handleStarRating} // Call handleStarRating when the user finishes rating
                                        />
                                    </View>


                                    <TextInput
                                        style={styles.ratingInput}
                                        onChangeText={setNote}
                                        value={note}
                                        placeholder="Write here..."
                                        placeholderTextColor={"#FFFFFF"}
                                        textAlignVertical="top" // Change vertical position (e.g., bottom
                                    />

                                    <TouchableOpacity onPress={() => reviewSong()}

                                        style={{ height: 45, width: responsiveWidth(70), marginTop: responsiveHeight(3), alignSelf: 'center' }}>

                                        <LinearGradient
                                            colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                            start={{ x: 0, y: 0 }} // Gradient start point
                                            end={{ x: 1, y: 0 }} // Gradient end point
                                            style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                borderRadius: 30,
                                                justifyContent: 'center'
                                            }}>

                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', left: 5, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Submit</Text>

                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                            transparent={true}
                            visible={thanksModal}
                            onRequestClose={() => {
                                setThanksModal(!thanksModal);
                            }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
                                <View style={{ height: 181, width: responsiveWidth(75), backgroundColor: '#383838', alignSelf: 'center', borderRadius: 20 }}>
                                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', marginTop: responsiveHeight(1.8), fontSize: responsiveFontSize(2.5), fontWeight: '600', marginTop: responsiveHeight(3) }}>Thank you</Text>
                                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontSize: responsiveFontSize(1.8), fontWeight: '400' }}>This helps us improve our platform.</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Artist')}
                                        style={{ height: 45, width: responsiveWidth(50), marginTop: responsiveHeight(3), alignSelf: 'center' }}>

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

                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', left: 5, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Okay</Text>

                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </ImageBackground>
                </View>
            </View>
        );
    };

    const renderItem3 = ({ item }) => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <ImageBackground
                    source={require('./../../assets/icon/walletbutton.png')}
                    style={styles.superman}
                    imageStyle={{ borderRadius: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingRight: 20, marginTop: 12 }}>
                        <Image source={{ uri: item.songImage }}
                            style={{
                                height: 47, width: 51, borderRadius: 10
                            }} />
                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.4),marginLeft:10,marginRight:responsiveWidth(40) }}>{item.songName}</Text>
                        <Text style={{ color: '#F52424',right:responsiveWidth(24), fontSize: responsiveFontSize(1.4)}}>{item.status}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: responsiveWidth(24), bottom: 25, justifyContent: 'space-between', marginRight: 20 }}>
                        <Image source={require('./../../assets/icon/Eee.png')}
                            style={{
                                height: 12, width: 12, top: 5
                            }} />
                        <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.3), marginTop: 10, right: 42 }}>{item.songArtistName}</Text>

                        <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.2), top: 2 }}>2 mins ago</Text>
                    </View>

                    <ImageBackground
                        source={require('./../../assets/icon/walletbutton.png')}
                        imageStyle={{ borderRadius: 10 }}
                        style={{ height: 58, width: responsiveWidth(82), alignSelf: 'center', bottom: 6 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingRight: 20, marginTop: responsiveHeight(2.5) }}>
                            <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.6) }}>{item.note}</Text>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6) }}>₹{item.amountPaid}</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ color: '#CB7878', fontSize: responsiveFontSize(1.4), textAlign: 'center' }}>Reason : <Text style={{ color: '#F52424', fontSize: responsiveFontSize(1.4), textAlign: 'center' }}>The requested song was not according to the theme</Text></Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const rejectedSongList = async () => {
        try {
            setIsLoading(true);
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
            console.log("RejectToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    const url = `http://62.72.57.205:8092/user/rejectedSongs?userId=${userId}&artistId=${artistId}`
                    console.log("Reject url", url);
                    // Main API calling function
                    fetch(url, requestOptions)
                        .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                const errorResponse = await response.json();
                                ToastAndroid.show(errorResponse.message || 'Request failed with status ' + response.status, ToastAndroid.SHORT);
                                throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
                            }
                        })
                        .then(responseData => {
                            console.log("API Response rejected:", responseData);
                            if (responseData.result) {
                                setRejected(responseData.result);
                                console.log("GetVenue", responseData.result);
                            }
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            setIsLoading(false);
                        });

                } else {
                    console.log("No token available.");
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };

    const getSettleSong = async () => {
        try {
            setIsLoading(true);
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("settleToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    console.log("userId==", userId);
                    console.log("artistId==", artistId);

                    // Main API calling function
                    fetch(`http://62.72.57.205:8092/user/settledSongs?userId=${userId}&artistId=${artistId}`, requestOptions)
                        .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                // Handle unsuccessful response here
                                const errorResponse = await response.json();
                                ToastAndroid.show(errorResponse.message || 'Request failed with status ' + response.status, ToastAndroid.SHORT);
                                throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
                            }
                        })
                        .then(responseData => {
                            console.log("API Response Settle:", responseData);
                            if (responseData.result) {
                                setSettled(responseData.result);
                                console.log("GetVenue", responseData.result);
                            }
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            setIsLoading(false);
                        });
                } else {
                    console.log("No token available.");
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };

    const ongoingList = async () => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("rejectToken", value);
    
                if (value) {
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
                            const errorResponse = await response.json();
                            ToastAndroid.show(errorResponse.message || 'Request failed with status ' + response.status, ToastAndroid.SHORT);
                            throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
                        }
                    })
                    .then(responseData => {
                        console.log("API Request Response:", responseData);
                        if (responseData.result) {
                            setOnGoing(responseData.result)
                            console.log("Got it", responseData.result);
                        }
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log("API Error:", error);                        
                    });
                } else {
                    console.log("No token or userId or artistId available.");
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };
    

    useEffect((item) => {
        getSettleSong();
    }, [artistId,userId]);

    useEffect((item) => {
        rejectedSongList();
    }, [artistId,userId]);

    useEffect((item) => {
        ongoingList();
    }, [artistId,userId]);


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3), paddingLeft: 20 }}>
                    <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34
                            }} />
                    </TouchableOpacity>

                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), textAlign: 'center', left: responsiveWidth(16) }}>Requested song list</Text>
                </View>

                <View style={{
                    width: responsiveWidth(60),
                    height: responsiveHeight(8),
                    flexDirection: 'row',
                    marginTop: responsiveHeight(3),
                    marginLeft: responsiveWidth(5),
                    justifyContent: 'space-between',
                }}>

                    <TouchableOpacity onPress={handleOngoingPress} style={{
                        height: 40, width: responsiveWidth(27),
                        backgroundColor: activeButton === 'ongoing' ? '#B438D5' : 'rgba(51, 51, 51, 0.5)',
                        borderRadius: 30, justifyContent: 'center'
                    }}>

                        <Text style={{
                            textAlign: 'center', fontSize: responsiveFontSize(1.8),
                            color: activeButton === 'ongoing' ? '#FFFFFF' : '#808080',
                            fontWeight: '600'
                        }}>Ongoing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSettledPress} style={{
                        height: 40, width: responsiveWidth(27),
                        backgroundColor: activeButton === 'settled' ? '#B438D5' : 'rgba(51, 51, 51, 0.5)',
                        borderRadius: 30, justifyContent: 'center', marginLeft: 8
                    }}>
                        <Text style={{
                            textAlign: 'center', fontSize: responsiveFontSize(1.8),
                            color: activeButton === 'settled' ? '#FFFFFF' : '#808080',
                            fontWeight: '600'
                        }}>Settled</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRejectedPress} style={{
                        height: 40, width: responsiveWidth(27),
                        backgroundColor: activeButton === 'rejected' ? '#B438D5' : 'rgba(51, 51, 51, 0.5)',
                        borderRadius: 30, justifyContent: 'center', marginLeft: 8
                    }}>
                        <Text style={{
                            textAlign: 'center', fontSize: responsiveFontSize(1.8),
                            color: activeButton === 'rejected' ? '#FFFFFF' : '#808080',
                            fontWeight: '600'
                        }}>Rejected</Text>
                    </TouchableOpacity>
                </View>

                {showOngoing && (
                                <View style={{ marginBottom: 30 }}>
                                    {/* Render ActivityIndicator if artistData is empty */}
                                    {isLoading ? (
                                        <View style={styles.loader}>
                                            <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                                        </View>
                                    ) : (
                                        <View>
                                            {onGoing.length === 0 ? (
                                                <Image source={require('./../../assets/icon/no-data.png')}
                                                    style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(20) }} />
                                            ) : (
                                                <View>
                                                    <FlatList
                                                        data={onGoing}
                                                        renderItem={renderItem}
                                                        scrollEnabled={false}
                                                        refreshControl={
                                                            <RefreshControl
                                                                refreshing={refreshing}
                                                                onRefresh={onRefresh}
                                                            />
                                                        }
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}


                            {showSettled && (
                                <View style={{ marginBottom: 30 }}>
                                    {/* Render ActivityIndicator if artistData is empty */}
                                    {isLoading ? (
                                        <View style={styles.loader}>
                                            <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                                        </View>
                                    ) : (
                                        <View>
                                            {settled.length === 0 ? (
                                                <Image source={require('./../../assets/icon/no-data.png')}
                                                    style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(20) }} />
                                            ) : (
                                                <View>
                                                    <FlatList
                                                        data={settled}
                                                        renderItem={renderItem2}
                                                        scrollEnabled={false}
                                                        refreshControl={
                                                            <RefreshControl
                                                                refreshing={refreshing}
                                                                onRefresh={onRefresh}
                                                            />
                                                        }
                                                    />
                                                  
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}

{showRejected && (
                                <View style={{ marginBottom: 30 }}>
                                    {/* Render ActivityIndicator if artistData is empty */}
                                    {isLoading ? (
                                        <View style={styles.loader}>
                                            <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                                        </View>
                                    ) : (
                                        <View>
                                            {rejected.length === 0 ? (
                                                <Image source={require('./../../assets/icon/no-data.png')}
                                                    style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(20) }} />
                                            ) : (
                                                <View>
                                                    <FlatList
                                                        data={rejected}
                                                        renderItem={renderItem3}
                                                        scrollEnabled={false}
                                                        refreshControl={
                                                            <RefreshControl
                                                                refreshing={refreshing}
                                                                onRefresh={onRefresh}
                                                            />
                                                        }
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}

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
        backgroundColor: '#000000',
    },
    ratingInput: {
        height: responsiveHeight(20),
        width: responsiveWidth(70),
        backgroundColor: '#616161',
        borderRadius: 12,
        color: '#FFFFFF',
        paddingLeft: 20,
        alignSelf: 'center',
        marginTop: responsiveHeight(2)
    },
    superman: {
        height: 168,
        width: responsiveWidth(90), // You might need to define responsiveWidth()
        marginTop: 10,
        borderRadius: 12,
        overflow: 'hidden', // Ensures image respects borderRadius
    }
});

//make this component available to the app
export default OngoingSongList;