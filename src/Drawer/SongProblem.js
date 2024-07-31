//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

// create a component
const SongProblem = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('choosesong')}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34, marginLeft: 20
                                }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(22), alignSelf: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Song problem</Text>
                    </View>

                    <View style={styles.songbox}>
                        <View style={styles.songview}>
                            <Text style={styles.rupay}>-₹200</Text>
                            <Text style={styles.moneytext}>Money deducted from Wallet</Text>
                        </View>

                        <View style={styles.timeview}>
                            <Text style={styles.date}>08 August 2023</Text>
                            <Text style={styles.transaction}>Transaction ID: 6476576556865h</Text>
                        </View>

                        <View style={styles.money}>
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
                                                height: 47, width: 46, left: responsiveWidth(3)
                                            }} />
                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.7), fontWeight: '500', right: 20 }}>Unholy</Text>
                                        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(0.6), right: 20 }}>
                                            <Image source={require('./../../assets/icon/Eee.png')}
                                                style={{
                                                    height: 12, width: 12, top: 5
                                                }} />
                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.3), left: 4, top: 2 }}>Sam Smith- Kim Petras</Text>
                                        </View>

                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ alignSelf: 'center', color: '#3CFF0C', fontSize: responsiveFontSize(1.5), fontWeight: '500', }}>Settled</Text>
                                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.5), fontWeight: '500', marginTop: responsiveHeight(1.2) }}>₹200</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        <View style={styles.ArtistView}>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8) }}>Artist</Text>
                            <Text style={styles.moneytext}>DJ Hritik D’Souza</Text>
                        </View>

                        <View style={styles.timeview}>
                            <Text style={styles.date}>08 August 2023</Text>
                            <Text style={styles.transaction}>Bottles & Barrels - Gurugram</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('songproblem')}
                            style={styles.downloadButton}>
                            <View style={styles.download}>
                                <Image source={require('./../../assets/icon/down.png')}
                                    style={{
                                        height: 14, width: 14, alignSelf: 'center', left: 5
                                    }} />
                                <Text style={styles.downloadText}>Download Invoice</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.concern}>Enter your concern here</Text>

                    <TextInput
                        placeholder="Random text"
                        placeholderTextColor={"#808080"}
                        style={styles.blurredInput}
                    />


                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
                        style={{ height: 55, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(2) }}>
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
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Send</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>

                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Image source={require('./../../assets/icon/withdraw.png')}
                                    style={{
                                        height: 72, width: 72, marginTop: responsiveHeight(2), borderRadius: 12,
                                    }} />

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.4), fontWeight: '500', marginTop: 20 }}>Help sent successfully</Text>
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginTop: 10 }}>We have received your request and we</Text>
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500', }}>will get back to you as soon as</Text>
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500', }}>possible.</Text>
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
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    songbox: {
        height: 250,
        width: responsiveWidth(90),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 12,
    },
    songview: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    rupay: {
        color: '#F53535',
        fontSize: responsiveFontSize(1.9)
    },
    moneytext: {
        color: '#fff',
        fontSize: responsiveFontSize(1.8)
    },
    date: {
        color: '#808080',
        fontSize: responsiveFontSize(1.6)
    },
    money: {
        height: 71,
        width: responsiveWidth(85),
        backgroundColor: '#808080',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: responsiveHeight(2)

    },
    downloadButton: {
        height: 30,
        width: 130,
        justifyContent: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    downloadText: {
        color: '#0D6DB2',
        fontWeight: '500',
        fontSize: responsiveFontSize(1.6),
    },
    download: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeview: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        justifyContent: 'space-between'
    },
    ArtistView: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        justifyContent: 'space-between'
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
    concern: {
        color: '#C70FF7',
        marginLeft: 30,
        marginTop: 20,
        fontSize: responsiveFontSize(1.8)
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('screen').width - 60,
        height: responsiveHeight(30),
        backgroundColor: '#383838',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});

export default SongProblem;
