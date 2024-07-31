//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const Security = ({ navigation }) => {
    const [logoutModal, setLogoutModal] = useState(false);

    const goBack = () => {
        navigation.goBack();
    };

    const handleLogout = () => {
        // Your logout logic
        SharedPreferences.removeItem('isLoggedIn');
        navigation.navigate('choose');
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row' }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34, marginLeft: 20
                                }} />
                        </TouchableOpacity>

                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(20), alignSelf: 'center', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Security & Privacy</Text>
                    </View>

                    <TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('delete')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                            <Text style={styles.DeleteText}>Delete Account</Text>
                            <Image source={require('./../../assets/icon/nexticon.png')}
                                style={{
                                    height: 14, width: 8, marginLeft: 20
                                }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ bottom: 10 }}>
                        <TouchableOpacity style={styles.Deletesecurity} onPress={() => setLogoutModal(!logoutModal)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                                <Text style={styles.DeleteText}>Logout</Text>
                                <Image source={require('./../../assets/icon/nexticon.png')}
                                    style={{
                                        height: 14, width: 8, marginLeft: 20
                                    }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent={true}
                        visible={logoutModal}
                        onRequestClose={() => {
                            setLogoutModal(!logoutModal);
                        }}>

                        <TouchableWithoutFeedback onPress={() => setLogoutModal(false)}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), fontWeight: '500', marginTop: 20 }}>Are you sure you want to</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>logout?</Text>

                                    <View style={{ flexDirection: 'row', marginBottom: 26 }}>
                                        <TouchableOpacity style={styles.nobutton}
                                            onPress={() => {
                                                setLogoutModal(false)
                                            }}>
                                            <Text style={styles.notext}>No</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.yesbutton} onPress={handleLogout}>
                                            <LinearGradient
                                                colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                                start={{ x: 0, y: 0 }} // Gradient start point
                                                end={{ x: 1, y: 0 }}
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 30
                                                }}>
                                                <Text style={styles.yestext}>Yes</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

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
    Deletesecurity: {
        height: 58,
        width: responsiveWidth(90),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 12,
        justifyContent: 'center'
    },
    DeleteText: {
        fontSize: responsiveFontSize(1.8),
        color: '#FFFFFF',
        marginLeft: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('screen').width - 80,
        backgroundColor: '#333333',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    nobutton: {
        height: 40,
        width: responsiveWidth(25),
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 30,
    },
    notext: {
        color: '#fff',
        alignSelf: 'center',
    },
    yesbutton: {
        height: 40,
        width: responsiveWidth(25),
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 10
    },
    yestext: {
        color: '#fff',
        alignSelf: 'center',
    }

});

//make this component available to the app
export default Security;
