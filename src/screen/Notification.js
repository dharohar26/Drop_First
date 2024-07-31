//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
   
// create a component
const Notification = ({ navigation }) => {

    const [notifyModal, setNotifyModal] = useState("");
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center', justifyContent: 'space-between' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{                                                                
                                    height: 34, width: 34
                                }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), alignSelf: 'center', left: responsiveWidth(20) }}>Notification</Text>
                        <Text style={{ color: '#3E5BF1', fontSize: responsiveFontSize(1.4), alignSelf: 'center', marginRight: 20, left: responsiveWidth(34) }}>Mark all as read</Text>
                    </View>

                    <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={{ width: responsiveWidth(90), height: 180, marginTop: 30, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 20, marginTop: 12 }}>

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '400', marginTop: 10 }}>Your song is approved. Please pay to proceed</Text>
                                <TouchableOpacity>
                                    <Image source={require('./../../assets/icon/delete.png')}
                                        style={{
                                            height: 25, width: 25, marginTop: 10, left: responsiveWidth(8.5)
                                        }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 80, width: responsiveWidth(85), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 12, marginTop: responsiveHeight(2) }}>
                                <LinearGradient
                                    colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                    start={{ x: 0, y: 0 }} // Gradient start point
                                    end={{ x: 1, y: 0 }} // Gradient end point
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        borderRadius: 12
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Image source={require('./../../assets/icon/holy.png')}
                                                style={{
                                                    height: 50, width: 51, left: responsiveWidth(3)
                                                }} />
                                        </View>

                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '500', right: 40 }}>Unholy</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('./../../assets/icon/Eee.png')}
                                                    style={{
                                                        height: 12, width: 12, top: 5
                                                    }} />
                                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.3), left: 4, top: 2 }}>Sam Smith- Kim Petras</Text>
                                            </View>

                                        </View>

                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ alignSelf: 'center', color: '#FFB803', fontSize: responsiveFontSize(1.5), fontWeight: '500', left: 20 }}>In Progress</Text>
                                            <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.4) }}>Pay within 00:04:48</Text>
                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.5), left: 35, fontWeight: '500' }}>₹200</Text>
                                        </View>
                                    </View>

                                </LinearGradient>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, paddingRight: 20, marginTop: 8 }}>
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>5 minutes ago</Text>
                                <TouchableOpacity onPress={() => setNotifyModal(!notifyModal)}>
                                    <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>PAY NOW</Text>
                                </TouchableOpacity>
                            </View>

                            <Modal
                                transparent={true}
                                visible={notifyModal}
                                onRequestClose={() => {
                                    setNotifyModal(!notifyModal);
                                }}>

                                <View style={styles.centeredView}>
                                    <View style={{ height: responsiveHeight(50), width: responsiveWidth(80), alignSelf: 'center', marginTop: responsiveHeight(8) }}>
                                        <LinearGradient
                                            colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                            start={{ x: 0, y: 0 }} // Gradient start point
                                            end={{ x: 1, y: 0 }} // Gradient end point
                                            style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                borderRadius: 20
                                            }}
                                        >
                                            <Image source={require('./../../assets/icon/Payment.png')}
                                                style={{ height: 70, width: 70, bottom: 30 }} />

                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '500', bottom: 20 }}>Travis Scott - MY EYES</Text>
                                            <Text style={{ alignSelf: 'center', color: '#808080', fontSize: responsiveFontSize(1.8), fontWeight: '500', bottom: 20 }}>Travis Scott</Text>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('./../../assets/icon/Greenclick.png')}
                                                    style={{ height: 30, width: 30, bottom: 12 }} />
                                                <Text style={{ alignSelf: 'center', color: '#70FF00', fontSize: responsiveFontSize(1.6), fontWeight: '500', bottom: 17 }}>Approved</Text>
                                            </View>

                                            <Image source={require('./../../assets/icon/line.png')}
                                                style={{ height: 1.5, width: responsiveWidth(70) }} />

                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('./../../assets/icon/rupee.png')}
                                                    style={{ height: 32, width: 32, marginTop: responsiveHeight(4) }} />
                                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(4.2), fontWeight: '500', top: 10 }}>200</Text>
                                            </View>
                                            <View style={{ height: 50, width: responsiveWidth(70), backgroundColor: '#787276', marginTop: responsiveHeight(2), borderRadius: 12 }}>
                                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                                    <Text style={{ color: '#EDF112', fontSize: responsiveFontSize(1.6), fontWeight: '500', marginLeft: responsiveWidth(5) }}>In Progress</Text>
                                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), fontWeight: '500', marginLeft: responsiveWidth(13) }}>Pay within 00:04:48</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: responsiveWidth(3) }}>Artist</Text>
                                                    <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: responsiveWidth(3) }}>Venue</Text>
                                                </View>

                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: responsiveWidth(24) }}>DJ Hritik D’Souza</Text>
                                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: responsiveWidth(9) }}>Bottles & Barrels - Gurugram</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3) }}>
                                                <TouchableOpacity onPress={() => setNotifyModal(false)} style={{ height: 42, width: responsiveWidth(30), borderWidth: 1, borderColor: '#d3d3d3', borderRadius: 20, justifyContent: 'center' }}>
                                                    <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontWeight: '600', fontSize: responsiveFontSize(1.5) }}>Dismiss</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => navigation.navigate('payment')}
                                                    style={{ height: 42, width: responsiveWidth(30), borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', marginLeft: 20 }}>
                                                    <Text style={{ color: '#222', alignSelf: 'center', fontWeight: '600', fontSize: responsiveFontSize(1.5) }}>Pay Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </LinearGradient>
                                    </View>
                                </View>

                            </Modal>

                        </ImageBackground>
                    </View>

                    <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={{ width: responsiveWidth(90), height: 110, marginTop: 15, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 12 }}>

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.4), fontWeight: '400', marginTop: 10, left: 20, paddingRight: 60 }}>Someone joined the app using the referral code CODE444, check out</Text>
                                <TouchableOpacity>
                                    <Image source={require('./../../assets/icon/delete.png')}
                                        style={{
                                            height: 25, width: 25, marginTop: 10, right: 10
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginLeft: 34, marginTop: 5 }}>5 minutes ago</Text>

                        </ImageBackground>
                    </View>



                    <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={{ width: responsiveWidth(90), height: 110, marginTop: 15, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 12 }}>

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.4), fontWeight: '400', marginTop: 10, left: 20, paddingRight: 60 }}>Random text lorem ipsum dolor sit. Random text lorem ipsum dolor. Random text lorem ipsum dolor sit. lorem Random text lorem ipsum dolor.</Text>
                                <TouchableOpacity>
                                    <Image source={require('./../../assets/icon/delete.png')}
                                        style={{
                                            height: 25, width: 25, marginTop: 10, right: 20
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginLeft: 34, marginTop: 5 }}>5 minutes ago</Text>

                        </ImageBackground>
                    </View>

                    <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={{ width: responsiveWidth(90), height: 110, marginTop: 15, alignSelf: 'center' }}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 12 }}>

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.4), fontWeight: '400', marginTop: 10, left: 20, paddingRight: 60 }}>Random text lorem ipsum dolor sit. Random text lorem ipsum dolor. Random text lorem ipsum dolor sit. lorem Random text lorem ipsum dolor.</Text>
                                <TouchableOpacity>
                                    <Image source={require('./../../assets/icon/delete.png')}
                                        style={{
                                            height: 25, width: 25, marginTop: 10, right: 20
                                        }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginLeft: 34, marginTop: 5 }}>5 minutes ago</Text>
                        </ImageBackground>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

//make this component available to the app
export default Notification;
