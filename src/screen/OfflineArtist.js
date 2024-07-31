//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { AirbnbRating } from 'react-native-ratings';

// create a component
const OfflineArtist = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [activeButton, setActiveButton] = useState('artist');
    const [showMyRequest, setShowMyRequest] = useState(true); // State to manage My Request visibility
    const [showLiveSong, setShowLiveSong] = useState(false); // State to manage Live Song visibility
    const [ratingModal, setRatingModal] = useState("");
    const [rating, setRating] = useState("");

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

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>

                    <Image source={require('./../../assets/icon/Rectangle.png')}
                        style={{
                            height: 250, width: responsiveWidth(100), alignSelf: 'center'
                        }} />

                    <Image source={require('./../../assets/icon/Artist.png')}
                        style={{
                            height: 75, width: 75, alignSelf: 'center', bottom: 35
                        }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 8, width: 8, backgroundColor: '#FFB803', borderRadius: 20, marginLeft: 130, bottom:20}}></View>
                        <Text style={{ color: '#808080', alignSelf: 'center', bottom: 25, fontSize: responsiveFontSize(1.4),left:5}}>Last seen 5 min ago</Text>
                    </View>
                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', bottom: 20, fontSize: responsiveFontSize(2.2), fontWeight: '400' }}>DJ Hritik Dsouza(DJ)</Text>

                    <TouchableOpacity onPress={() => setRatingModal(!ratingModal)}>
                        <Image source={require('./../../assets/icon/Star.png')}
                            style={{
                                height: 15, width: responsiveWidth(25), alignSelf: 'center', bottom: 20
                            }} />
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={ratingModal}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
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
                                    />
                                </View>


                                <TextInput
                                    style={styles.ratingInput}
                                    onChangeText={setRating}
                                    value={rating}
                                    placeholder="Write here..."
                                    placeholderTextColor={"#FFFFFF"}
                                    textAlignVertical="top" // Change vertical position (e.g., bottom
                                />

                                <TouchableOpacity style={{ height: 45, width: responsiveWidth(70), marginTop: responsiveHeight(3), alignSelf: 'center' }}>

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

                                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', left: 5, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Submit</Text>

                                    </LinearGradient>

                                </TouchableOpacity>
                            </View>

                        </View>

                    </Modal>


                    <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: 14 }}>
                        <Image source={require('./../../assets/icon/Vector.png')}
                            style={{
                                height: responsiveHeight(2.3), width: responsiveWidth(4)
                            }} />

                        <Text style={{ color: '#808080', marginLeft: 5, fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>Bottles and Barrels Pub</Text>
                    </View>

                    <View style={{ height: 107, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14 }}>
                        <Text style={{ color: '#C70FF7', alignSelf: 'center', marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Theme of the day</Text>
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(7), marginRight: responsiveWidth(7), fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1) }}>This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearch}
                            value={search}
                            placeholder="Search a song to to a request"
                            placeholderTextColor={"#808080"}
                        />
                        <TouchableOpacity style={{ height: 45, width: responsiveWidth(22), marginTop: 12, marginLeft: 5 }}>

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

                                    <Text style={{ alignSelf: 'center', color: '#FFFFFF', left: 5, fontSize: responsiveFontSize(1.5) }}>Search</Text>
                                </View>

                            </LinearGradient>

                        </TouchableOpacity>
                    </View>

<Text style={{color:'#808080',fontSize:responsiveFontSize(1.4),alignSelf:'center',marginTop:15}}>Artist is not available to take requests.<Text style={{color:'#C70FF7'}}> Notify me</Text></Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(3) }}>
                        <View style={{ flex: 1, height: 1.4, backgroundColor: '#808080', marginLeft: responsiveWidth(8) }} />
                        <View>
                        </View>
                        <View style={{ flex: 1, height: 1.4, backgroundColor: '#808080', marginRight: responsiveWidth(8) }} />
                    </View>

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
                                alignSelf: 'center', fontSize: responsiveFontSize(1.8),
                                color: activeButton === 'artist' ? '#FFFFFF' : '#808080',
                                fontWeight: '600'
                            }}>My Request</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleVenuesPress} style={{
                            height: 40, width: responsiveWidth(27),
                            backgroundColor: activeButton === 'venues' ? '#B438D5' : 'transparent',
                            borderRadius: 30, justifyContent: 'center', marginLeft: 2
                        }}>
                            <Text style={{
                                alignSelf: 'center', fontSize: responsiveFontSize(1.8),
                                color: activeButton === 'venues' ? '#FFFFFF' : '#808080',
                                fontWeight: '600'
                            }}>Live Song</Text>
                        </TouchableOpacity>
                    </View>


                    {showMyRequest && (
                        <View>
                            {/* ... Your My Request JSX */}
                            <View style={{ height: 166, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, borderWidth: 1, borderColor: '#C70FF7' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../../assets/icon/holy.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(2)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFB803', marginLeft: responsiveWidth(10), marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>In Progress</Text>
                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.4), marginRight: 10, marginTop: responsiveHeight(0.5) }}>Pay within 00:04:48</Text>
                                    </View>
                                </View>
                                <View style={{ height: 60, width: responsiveWidth(85), backgroundColor: 'rgba(51, 51, 51, 11)', alignSelf: 'center', borderRadius: 12 }}>
                                    <Text style={{ color: '#d3d3d3', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.5), alignSelf: 'center', marginRight: responsiveWidth(4) }}>Please play this song for my best friend who just got heart broken</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('songpay')}>
                                    <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.8), alignSelf: 'center', fontWeight: '600', marginTop: responsiveHeight(0.5) }}>PAY NOW</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 166, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../../assets/icon/Anime.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(2)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Superman - Eminem</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>I was never there</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFB803', marginRight: responsiveWidth(6), marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.8), left: 12 }}>Pending Approval</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.4), marginRight: responsiveWidth(6), marginTop: responsiveHeight(0.5), left: 35 }}>Waiting 00:04:48</Text>
                                    </View>
                                </View>
                                <View style={{ height: 60, width: responsiveWidth(85), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12 }}>
                                    <Text style={{ color: '#d3d3d3', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.5), alignSelf: 'center', marginRight: responsiveWidth(4) }}>Please play this song for my best friend who just got heart broken</Text>
                                </View>

                            </View>

                            <View style={{ height: 166, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../../assets/icon/Ghost.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(2)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#5ABF0B', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.8), left: 50 }}>Success</Text>
                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.4), marginRight: 10, marginTop: responsiveHeight(0.5) }}>Pay within 00:04:48</Text>
                                    </View>
                                </View>
                                <View style={{ height: 60, width: responsiveWidth(85), backgroundColor: 'rgba(51, 51, 51, 10)', alignSelf: 'center', borderRadius: 12 }}>
                                    <Text style={{ color: '#d3d3d3', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.5), alignSelf: 'center', marginRight: responsiveWidth(4) }}>Please play this song for my best friend who just got heart broken</Text>
                                </View>

                            </View>


                            <View style={{ height: 166, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20, marginBottom: 30 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('./../../assets/icon/holy.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(2)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#f94449', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.8), left: 50 }}>Rejected</Text>
                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.4), marginRight: 10, marginTop: responsiveHeight(0.5) }}>Pay within 00:04:48</Text>
                                    </View>
                                </View>
                                <View style={{ height: 60, width: responsiveWidth(85), backgroundColor: 'rgba(51, 51, 51, 10)', alignSelf: 'center', borderRadius: 12 }}>
                                    <Text style={{ color: '#d3d3d3', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.5), alignSelf: 'center', marginRight: responsiveWidth(4) }}>Please play this song for my best friend who just got heart broken</Text>
                                </View>
                                <Text style={{ color: '#f94449', fontSize: responsiveFontSize(1.3), alignSelf: 'center', marginTop: responsiveHeight(1) }}>Reason : The requested song was not according to the theme</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ongoing')}
                                style={{ height: 44, width: 115, borderWidth: 1, borderColor: '#FFFFFF', alignSelf: 'center', marginBottom: 30, borderRadius: 30, justifyContent: 'center' }}>
                                <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontSize: responsiveFontSize(1.9), fontWeight: '500' }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    )}


                    {showLiveSong && (
                        /* JSX for Live Song section */
                        <View>
                            <View style={{ height: 120, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20 }}>

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                    <Image source={require('./../../assets/icon/Ellipse.png')}
                                        style={{
                                            height: 30, width: 30, borderRadius: 10, marginLeft: responsiveWidth(4), bottom: 5
                                        }} />
                                    <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.8), bottom: 2 }}>Martha Smith</Text>
                                </View>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 2, width: responsiveWidth(80), borderRadius: 10, marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(4)
                                    }} />

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                                    <Image source={require('./../../assets/icon/Anime.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginLeft: responsiveWidth(3)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8), left: 80 }}>200</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 120, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20 }}>

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                    <Image source={require('./../../assets/icon/Ellipse.png')}
                                        style={{
                                            height: 30, width: 30, borderRadius: 10, marginLeft: responsiveWidth(4), bottom: 5
                                        }} />
                                    <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.8), bottom: 2 }}>Martha Smith</Text>
                                </View>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 2, width: responsiveWidth(80), borderRadius: 10, marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(4)
                                    }} />

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                                    <Image source={require('./../../assets/icon/Anime.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginLeft: responsiveWidth(3)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8), left: 80 }}>200</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 120, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20 }}>

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                    <Image source={require('./../../assets/icon/Ellipse.png')}
                                        style={{
                                            height: 30, width: 30, borderRadius: 10, marginLeft: responsiveWidth(4), bottom: 5
                                        }} />
                                    <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.8), bottom: 2 }}>Martha Smith</Text>
                                </View>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 2, width: responsiveWidth(80), borderRadius: 10, marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(4)
                                    }} />

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                                    <Image source={require('./../../assets/icon/Anime.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginLeft: responsiveWidth(3)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8), left: 80 }}>200</Text>
                                    </View>
                                </View>
                            </View>


                            <View style={{ height: 120, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20 }}>

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                    <Image source={require('./../../assets/icon/Ellipse.png')}
                                        style={{
                                            height: 30, width: 30, borderRadius: 10, marginLeft: responsiveWidth(4), bottom: 5
                                        }} />
                                    <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.8), bottom: 2 }}>Martha Smith</Text>
                                </View>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 2, width: responsiveWidth(80), borderRadius: 10, marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(4)
                                    }} />

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                                    <Image source={require('./../../assets/icon/Anime.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginLeft: responsiveWidth(3)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8), left: 80 }}>200</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 120, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: 20, marginBottom: 30 }}>

                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                    <Image source={require('./../../assets/icon/Ellipse.png')}
                                        style={{
                                            height: 30, width: 30, borderRadius: 10, marginLeft: responsiveWidth(4), bottom: 5
                                        }} />
                                    <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), fontSize: responsiveFontSize(1.8), bottom: 2 }}>Martha Smith</Text>
                                </View>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 2, width: responsiveWidth(80), borderRadius: 10, marginTop: responsiveHeight(0.2), marginLeft: responsiveWidth(4)
                                    }} />

                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={require('./../../assets/icon/Anime.png')}
                                        style={{
                                            height: 50, width: 52, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(3)
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1), fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Unholy</Text>

                                        <Image source={require('./../../assets/icon/Eee.png')}
                                            style={{
                                                height: 13, width: 13, borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                                            }} />

                                        <Text style={{ color: '#808080', marginLeft: responsiveWidth(9), fontSize: responsiveFontSize(1.5), bottom: 16 }}>Sam Smith - Kim Petras</Text>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', marginRight: responsiveWidth(8), marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.8), left: 80 }}>200</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
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
    }
});

//make this component available to the app
export default OfflineArtist;
