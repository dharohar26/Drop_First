//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,StatusBar } from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

// create a component
const FacebookScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
                        <StatusBar backgroundColor="#120219" barStyle="dark-content" />

            <Text style={{ color: '#1E90FF', fontSize: responsiveFontSize(2.6), marginTop: responsiveHeight(4), fontWeight: '600' }}>facebook</Text>

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Mobile number or email address"
                placeholderTextColor={"#808080"}
            />

            <TextInput
                style={styles.input2}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor={"#808080"}
            />

            <TouchableOpacity style={{
                height: responsiveHeight(6),
                width: responsiveWidth(90),
                backgroundColor: '#1E90FF',
                borderRadius: 5,
                marginTop: responsiveHeight(2),
                justifyContent: 'center',
                elevation: 5
            }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), alignSelf: 'center', fontWeight: '600' }}>Log In</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{
                height: responsiveHeight(5),
                width: responsiveWidth(80),
                borderRadius: 5,
                marginTop: responsiveHeight(0.5),
                justifyContent: 'center',
            }}>
                <Text style={{ color: '#1E90FF', fontSize: responsiveFontSize(1.9), alignSelf: 'center', fontWeight: '500' }}>Forgotten Password ?</Text>

            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(4) }}>
                <View style={{ flex: 1, height: 1.4, backgroundColor: '#d3d3d3', marginLeft: responsiveWidth(8) }} />
                <View>
                    <Text style={{ width: 30, textAlign: 'center', color: '#222' }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1.4, backgroundColor: '#d3d3d3', marginRight: responsiveWidth(8) }} />
            </View>

            <TouchableOpacity style={{
                height: responsiveHeight(6),
                width: responsiveWidth(70),
                borderRadius: 5,
                marginTop: responsiveHeight(3),
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: '#d3d3d3',
            }}>
                <Text style={{ color: '#222', fontSize: responsiveFontSize(2), alignSelf: 'center', fontWeight: '600' }}>Create new account</Text>

            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(10) }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#808080' }}>English (UK)</Text>
                    <Text style={{ color: '#808080' }}>ਪੰਜਾਬੀ</Text>
                    <Text style={{ color: '#808080' }}>मराठी</Text>
                    <Text style={{ color: '#808080' }}>मराठी</Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: responsiveWidth(20) }}>
                    <Text style={{ color: '#808080' }}>हिंदी</Text>
                    <Text style={{ color: '#808080' }}>ਪੰਜਾਬੀ</Text>
                    <Text style={{ color: '#808080' }}>اردو</Text>
                    <Text style={{ color: '#808080' }}>বাংলা</Text>
                </View>
            </View>


            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(6), }}>
                <Text style={{ color: '#808080', fontSize: 15 }}>Meta</Text>
                <View style={{ height: 13, width: 13, borderWidth: 1, borderColor: '#808080', borderRadius: 20, justifyContent: 'center', marginLeft: 2, top: 5 }}>
                    <Text style={{ color: '#808080', alignSelf: 'center', fontSize: 10, fontWeight: '400', bottom: 3 }}>c</Text>
                </View>
                <Text style={{ color: '#808080', marginLeft: 2, fontSize: 15 }}>2023</Text>

            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    input: {
        height: responsiveHeight(6),
        width: responsiveWidth(90),
        backgroundColor: '#e9eff7',
        borderRadius: 5,
        marginTop: responsiveHeight(4),
        paddingLeft: 20,
        elevation: 5
    },
    input2: {
        height: responsiveHeight(6),
        width: responsiveWidth(90),
        backgroundColor: '#e9eff7',
        borderRadius: 5,
        marginTop: responsiveHeight(1),
        paddingLeft: 20,
        elevation: 5

    }
});

//make this component available to the app
export default FacebookScreen;
