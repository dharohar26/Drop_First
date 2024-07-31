//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar,ImageBackground,ScrollView,TouchableOpacity,Image,TextInput,Modal} from 'react-native';
import { responsiveHeight,responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const PrivacyPolicy = ({navigation}) => {

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
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(22), alignSelf: 'center', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Privacy Policy</Text>
                    </View>

                    <Text style={styles.policytext}>This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.This is a random text. Lorem ipsum dolor sit lorem ipsum dolor lorem ipsum. This is a random text. Lorem ipsum dolor sit lorem ipsum.</Text>
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
    policytext:{
        color:'#FFFFFF',
        marginTop:30,
        marginLeft:25,
        marginRight:25,
        textAlign:'justify',
        fontSize:responsiveFontSize(1.8)
    }
});

//make this component available to the app
export default PrivacyPolicy;
