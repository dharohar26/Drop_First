//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const SongRequestHelp = ({navigation}) => {

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row'}}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34, marginLeft: 20
                                }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(20), alignSelf: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Song request help</Text>
                    </View>

                    <TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('trouble')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                            <Text style={styles.DeleteText}>I am having trouble requesting a song</Text>
                            <Image source={require('./../../assets/icon/nexticon.png')}
                                style={{
                                    height: 14, width: 8, marginLeft: 20
                                }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ bottom: 10 }}>

                        <TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('choosesong')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

                                <Text style={styles.DeleteText}>I paid the amount but song not played</Text>
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

        <Text style={styles.DeleteText}>Song not played and money not refunded</Text>
        <Image source={require('./../../assets/icon/nexticon.png')}
            style={{
                height: 14, width: 8, marginLeft: 20
            }} />
    </View>
</TouchableOpacity>
</View>


<View style={{ bottom: 30 }}>

<TouchableOpacity style={styles.Deletesecurity} onPress={() => navigation.navigate('choosesong')}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>

        <Text style={styles.DeleteText}>Payment failed while paying for a song</Text>
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
export default SongRequestHelp;
