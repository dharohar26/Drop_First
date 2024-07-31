import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions, FlatList } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const GuestInformation = () => {
    const [shownModal, setShowModal] = useState("");
    const [search, setSearch] = useState("");

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3), justifyContent: 'space-between', marginLeft: 20, marginRight: 15 }}>
                            <TouchableOpacity onPress={goBack}>
                                <Image source={require('./../../assets/icon/backarrow.png')}
                                    style={{
                                        height: 34, width: 34
                                    }} />
                            </TouchableOpacity>

                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2) }}>Guest Information</Text>

                            <View style={{ flexDirection: 'row', }}>

                                <TouchableOpacity onPress={() => setShowModal(!shownModal)}>
                                    <Image source={require('./../../assets/icon/Search.png')}
                                        style={{
                                            height: 20, width: 20, marginRight: 20
                                        }} />
                                </TouchableOpacity>

                                <Modal
                                    transparent={true}
                                    visible={shownModal}
                                    onRequestClose={() => {
                                        setShowModal(!shownModal);
                                    }}>

                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={{ width: responsiveWidth(90), height: 50, backgroundColor: '#2E2E2E', borderRadius: 10 }}>
                                                <Image source={require('./../../assets/icon/Search2.png')} style={{ height: 18, width: 18, marginTop: responsiveHeight(2.2), marginLeft: responsiveWidth(4) }} />
                                                <TextInput
                                                    style={styles.input}
                                                    onChangeText={setSearch}
                                                    value={search}
                                                    placeholder="Search here"
                                                    placeholderTextColor={"#808080"}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                </Modal>
                            </View>
                        </View>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: 24, marginTop: 30 }}>Female Stags: 4</Text>

                        <View style={{ height: 174, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 10, borderRadius: 20 }}>
                            <View style={{ height: 50, width: responsiveWidth(90) }}>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Category</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Guests</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 5 }}>Amount</Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Per person</Text>
                                    </View>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Total</Text>
                                </View>
                            </View>

                        </View>

                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: 24, marginTop: 30 }}>Male Stags: 4</Text>

                        <View style={{ height: 174, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 10, borderRadius: 20 }}>
                            <View style={{ height: 50, width: responsiveWidth(90) }}>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Category</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Guests</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 5 }}>Amount</Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Per person</Text>
                                    </View>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Total</Text>
                                </View>
                            </View>

                        </View>


                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: 24, marginTop: 30 }}>Couple: 4</Text>

                        <View style={{ height: 96, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 10, borderRadius: 20 }}>
                            <View style={{ height: 50, width: responsiveWidth(90) }}>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Category</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Guests</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 5 }}>Amount</Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Per person</Text>
                                    </View>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Total</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('screen').width,
        height: responsiveHeight(80),
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    input: {
        width: responsiveWidth(75),
        height: responsiveHeight(6),
        left: 50,
        color: '#FFFFFF',
        position: 'absolute',
    },
    placeholderStyle: {
        fontSize: 15,
        color: '#fff',
        paddingLeft: 20
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#FFFFFF',
        paddingLeft: 20
    },
});

export default GuestInformation
