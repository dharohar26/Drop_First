//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const HelpScreen = ({navigation}) => {

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
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(32), alignSelf: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Help</Text>
                    </View>

                    <TouchableOpacity style={styles.requestbutton} onPress={() => navigation.navigate('newhelp')}>
                        <Text style={styles.requesttext}>Request new</Text>
                    </TouchableOpacity>

                    <View style={styles.inprogress}>
                        <View style={styles.requestview}>
                            <Text style={styles.requestviewtext}>Please help me with requesting a song</Text>
                            <TouchableOpacity>
                                <Text style={styles.progresstext}>In Progress</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.date}>23 August 2023</Text>
                    </View>


                    <View style={styles.complete}>
                        <View style={styles.requestview}>
                            <Text style={styles.requestviewtext}>Please help me with requesting a song</Text>
                            <TouchableOpacity>
                                <Text style={styles.completetext}>Completed</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.adminview}>
                            <View style={styles.circle}></View>
                            <Text style={styles.admin}>Admin reply</Text>
                        </View>
                        <Text style={styles.replytext}>Random text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random text</Text>
                        <Text style={styles.completedate}>23 August 2023</Text>
                    </View>


                    <View style={styles.complete}>
                        <View style={styles.requestview}>
                            <Text style={styles.requestviewtext}>Please help me with requesting a song</Text>
                            <TouchableOpacity>
                                <Text style={styles.completetext}>Completed</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.adminview}>
                            <View style={styles.circle}></View>
                            <Text style={styles.admin}>Admin reply</Text>
                        </View>
                        <Text style={styles.replytext}>Random text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random textRandom text, random text</Text>
                        <Text style={styles.completedate}>23 August 2023</Text>
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
    requestbutton: {
        height: 55,
        width: responsiveWidth(90),
        borderWidth: 1.5,
        borderColor: '#C70FF7',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 30,
        justifyContent: 'center'
    },
    requesttext: {
        color: '#C70FF7',
        alignSelf: 'center',
        fontSize: responsiveFontSize(2),
        fontWeight: '500'
    },
    inprogress: {
        height: 77,
        width: responsiveWidth(90),
        borderRadius: 14,
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        marginTop: 30,
        alignSelf: 'center'
    },
    requestview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    requestviewtext: {
        color: '#D535FF',
        fontSize: responsiveFontSize(1.6)
    },
    progresstext: {
        color: '#FFB803',
        fontSize: responsiveFontSize(1.6)
    },
    date: {
        color: '#808080',
        marginLeft: 20,
        marginTop: 5,
        fontSize: responsiveFontSize(1.7)
    },
    complete: {
        height: 240,
        width: responsiveWidth(90),
        borderRadius: 14,
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        marginTop: 30,
        alignSelf: 'center'
    },
    completetext: {
        color: '#1CFB4D',
        fontSize: responsiveFontSize(1.6)
    },
    replytext: {
        color: '#FFFFFF',
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        fontSize: responsiveFontSize(1.8)
    },
    completedate: {
        color: '#808080',
        marginLeft: 20,
        marginTop: 10,
        fontSize: responsiveFontSize(1.7)
    },
    adminview: {
        flexDirection: 'row',
        marginTop: 20
    },
    circle: {
        height: 20,
        width: 20,
        backgroundColor: '#B0B0B0',
        borderRadius: 20,
        marginLeft: 20
    },
    admin: {
        color: '#808080',
        marginLeft: 10,
        fontSize: responsiveFontSize(1.8),
        fontWeight: '500'
    }
});

//make this component available to the app
export default HelpScreen;
