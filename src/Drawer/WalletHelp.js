//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const WalletHelp = ({ navigation }) => {

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
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(27), textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Wallet help</Text>
                    </View>

                    <TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('trouble')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                            <Text style={styles.DeleteText}>I have no idea how to add money</Text>
                            <Image source={require('./../../assets/icon/nexticon.png')}
                                style={{
                                    height: 14, width: 8, marginLeft: 20
                                }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ bottom: 10 }}>
                        <TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('choosesong')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                                <Text style={styles.DeleteText}>Not able to to withdraw money</Text>
                                <Image source={require('./../../assets/icon/nexticon.png')}
                                    style={{
                                        height: 14, width: 8, marginLeft: 20
                                    }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ bottom: 20 }}>

                        <TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('choosesong')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                                <Text style={styles.DeleteText}>Not able to use wallet for transaction</Text>
                                <Image source={require('./../../assets/icon/nexticon.png')}
                                    style={{
                                        height: 14, width: 8, marginLeft: 20
                                    }} />
                            </View>
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
});

//make this component available to the app
export default WalletHelp;
