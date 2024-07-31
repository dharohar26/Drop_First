//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { AirbnbRating } from 'react-native-ratings';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const ArtistBioScreen = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState('');
    const [bio, setBio] = useState(""); // State to manage My Request visibility
    const [status, setStatus] = useState(""); // State to manage Live Song visibility
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [genre, setGenre] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [stars, setStars] = useState("");



    SharedPreferences.getItem("firstName", function (value) {
        setFirstName(value);
        console.log("venueId", value);
    });
    SharedPreferences.getItem("lastName", function (value) {
        setLastName(value);
        console.log("userId", value);
    });
    SharedPreferences.getItem("status", function (value) {
        setStatus(value);
        console.log("artistId=>", value);
    });
    SharedPreferences.getItem("bio", function (value) {
        setBio(value);
        console.log("artistId=>", value);
    });
    SharedPreferences.getItem("type", function (value) {
        setType(value);
        console.log("artistId=>", value);
    });
    SharedPreferences.getItem("genre", function (value) {
        setGenre(value);
        console.log("artistId=>", value);
    });
    SharedPreferences.getItem("profilePicture", function (value) {
        setProfilePicture(value);
        console.log("artistId=>", value);
    });
    SharedPreferences.getItem("stars", function (value) {
        setStars(value);
        console.log("artistId=>", value);
    });

    return (
        <View style={styles.container}>
            <ScrollView>
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{width: responsiveWidth(100), alignSelf: 'center'}}>

                    <View style={{flex:5,}}>
                    <Image source={require('./../../assets/icon/Rectangle.png')}
                        style={{
                            height: 230, width: responsiveWidth(100), alignSelf: 'center'
                        }} />

                      <Image
                                source={profilePicture ? { uri: profilePicture } : require('./../../assets/icon/ProfileMenu.png')}
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

                    </View>

                    <View style={{flex:1,bottom:40}}>

                <View style={{ flexDirection: 'row',marginTop:10}}>
                        <View style={{ height: 8, width: 8, backgroundColor: '#4EDA2C', borderRadius: 20, marginLeft: 165,}}></View>
                        <Text style={{ color: '#4EDA2C', textAlign: 'center',fontSize: responsiveFontSize(1.4) ,left:5,bottom:4}}>{status}</Text>
                    </View>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center', bottom: 20, fontSize: responsiveFontSize(2.2), fontWeight: '400',marginTop:15}}>{firstName} {lastName} {type}</Text>
                    </View>

                    <View style={{flex:1,bottom:10,bottom:50}}>

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

                    <View style={{marginTop:5,bottom:12}}>
              
                        <Text style={{ color: '#808080', marginLeft: 5, fontSize: responsiveFontSize(1.5), fontWeight: '500',textAlign:'center' }}>New Delhi, Delhi</Text>
                    </View>
                    </View>

                    <View style={{flex:1,bottom:40}}>
                    <View style={{ height:50, width: responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12,justifyContent:'center' }}>
                        <Text style={{ color: '#808080', textAlign: 'center',fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>Specialised in: <Text style={{color:'#fff'}}> {genre}</Text></Text>
                    </View>
                    </View>

                    <View style={{flex:2,bottom:30}}>
                    <View style={{ width: responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14}}>
                        <Text style={{ color: '#C70FF7', textAlign: 'center', marginTop: responsiveHeight(1), fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Bio</Text>
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(7), marginRight: responsiveWidth(7), fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1), textAlign:'center',marginBottom:20}}>{bio}</Text>
                    </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{ color: '#C70FF7', textAlign: 'center',fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Follow me here</Text>
                        </View>

                        <View style={{flex:1,alignItems:'center'}}>
                            <View style={{flexDirection:'row',marginTop:responsiveHeight(3),alignSelf:'center',marginRight:20}}>

                            <Image source={require('./../../assets/icon/Vector.png')}
                            style={{
                                height: 29, width: 29,
                            }} />

                                <Image source={require('./../../assets/icon/Insta.png')}
                            style={{
                                height: 32, width: 32,left:10
                            }} />

                            <Image source={require('./../../assets/icon/Spotify.png')}
                                                        style={{
                                                            height: 31, width: 29,left:20
                                                        }} />


                            <Image source={require('./../../assets/icon/twiter.png')}
                                                        style={{
                                                            height: 30, width: 30,left:30
                                                        }} />
                                </View>
                        </View>

                        <View style={{flex:1,marginTop:20}}>
                    <View style={{ height:50, width: responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12,justifyContent:'center' }}>
                        <Text style={{ color: '#808080', textAlign: 'center',fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>Upcoming show: <Text style={{color:'#fff'}}>12 August, 08:00 PM at Bottles & Barrels</Text></Text>
                    </View>
                    </View>

                    <View style={{flex:1,marginTop:40}}>
                    <View style={{ height:85, width: responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14,justifyContent:'center',marginBottom:20 }}>
                        <Text style={{ color: '#808080', textAlign: 'center',fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>Loved my work? Donate me some of your love</Text>

                    <View style={{ flexDirection: 'row',alignSelf:'center'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearch}
                            value={search}
                            placeholder="Enter amount"
                            placeholderTextColor={"#808080"}
                        />
                        <TouchableOpacity style={{ height: 38, width: 80, marginTop: 5, marginLeft: 5 }} onPress={() => navigation.navigate('donate')}>

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
                                    <Text style={{ textAlign: 'center', color: '#FFFFFF',fontSize: responsiveFontSize(1.6) }}>Donate</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    </View>
                    </View>

            </ImageBackground>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        width: 255,
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        borderRadius: 30,
        marginTop: responsiveHeight(1),
        marginLeft: responsiveWidth(0.5),
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
export default ArtistBioScreen;




