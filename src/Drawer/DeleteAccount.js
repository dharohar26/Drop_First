//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Dimensions, Image, TouchableOpacity, Modal,TouchableWithoutFeedback } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import CheckBox from 'react-native-check-box'
import LinearGradient from 'react-native-linear-gradient';

// create a component
const DeleteAccount = ({ navigation }) => {
    
    const [acceptCondition, setAcceptCondition] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const goBack = () => {
        navigation.goBack();
    };

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
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(23), textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Delete Account</Text>
                    </View>

                    <View>
                        <Text style={styles.deletetext}>
                            This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum.
                        </Text>
                    </View>
                    <View style={styles.checkbox}>

                        <CheckBox isChecked={acceptCondition} onClick={() => {
                            setAcceptCondition(!acceptCondition)
                        }}
                            checkBoxColor={'#C70FF7'} checkedCheckBoxColor={'#C70FF7'} checkBoxSize={12} />

                        <Text style={styles.accepttext}>I accept the random text</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalDelete(!modalDelete)} style={styles.continuebutton}>
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
                            <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Continue to delete account</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={modalDelete}
                        onRequestClose={() => {
                            setModalDelete(!modalDelete);
                        }}>
                    <TouchableWithoutFeedback onPress={() => setModalDelete(false)}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), fontWeight: '500', marginTop: 20 }}>Are you sure you want to</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>delete your account?</Text>
                                    
                                    <View style={{ flexDirection: 'row', marginBottom:26 }}>

                                        <TouchableOpacity style={styles.nobutton}  onPress={()=> setModalDelete(false)} >
                                            <Text style={styles.notext}>No</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.yesbutton} onPress={()=> setModalDelete(false)} >
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
    deletetext: {
        color: '#FF6161',
        fontSize: responsiveFontSize(1.8),
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        textAlign:'justify'
    },
    checkbox: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 40,
    },
    accepttext: {
        color: '#FFFFFF',
        marginLeft: 10,
        alignSelf: 'center',
        fontSize: responsiveFontSize(1.8)
    },
    continuebutton: {
        height: 50,
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: 20,
        marginBottom:30
    },
    blurredInput: {
        height: 280,
        width: responsiveWidth(90),
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#FFFFFF',
        marginTop: 10,
        paddingLeft: 20,
        paddingBottom: 230,
        backgroundColor: 'rgba(51, 51, 51, 0.5)', // Keeping the style always blurred
    },
    focusedInput: {
        backgroundColor: '#333333',
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
export default DeleteAccount;
