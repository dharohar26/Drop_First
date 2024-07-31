//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions,ScrollView,Modal } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

// create a component
const WithdrawMoney = ({ navigation }) => {

    const goBack = () => {
        navigation.goBack();
    };
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{height: 34, width: 34}} />
                        </TouchableOpacity>

                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), alignSelf: 'center', left: 80 }}>Withdraw Money</Text>
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#C70FF7', paddingLeft: 10, fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>Money will be withdrawn to th following bank</Text>
                        <View>
                            <ImageBackground
                                source={require('./../../assets/icon/walletbutton.png')}
                                style={{ width: responsiveWidth(90), height: 90, marginTop: 10 }}
                                imageStyle={{ borderRadius: 12 }}
                            >
                                <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 12 }}>
                                    <Image source={require('./../../assets/icon/Credit.png')}
                                        style={{
                                            height: 32, width: 32, marginTop: 10
                                        }} />
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '400', marginTop: 10, left: 20 }}>Bank of America</Text>
                                    <Image source={require('./../../assets/icon/Pee.png')}
                                        style={{
                                            height: 16, width: 16, marginTop: 12, left: 25
                                        }} />
                                </View>
                                <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(17), bottom: 14 }}>XXXX XXXX X234</Text>

                            </ImageBackground>
                        </View>
                    </View>



                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#C70FF7', paddingLeft: 10, fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>Enter amount to withdraw (Min. ₹50)</Text>
                        <View>
                            <ImageBackground
                                source={require('./../../assets/icon/walletbutton.png')}
                                style={{ width: responsiveWidth(90), height: 60, marginTop: 10 }}
                                imageStyle={{ borderRadius: 30 }}
                            >

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '400', marginTop: 18, left: 30 }}>200</Text>
                            </ImageBackground>

                            <Text style={{ color: '#4EDA2C', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 10, alignSelf: 'center' }}>Available balance: ₹200</Text>

                        </View>
                    </View>



                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <View>
                            <ImageBackground
                                source={require('./../../assets/icon/walletbutton.png')}
                                style={{ width: responsiveWidth(90), height: 180, marginTop: 10 }}
                                imageStyle={{ borderRadius: 12 }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 18, left: 30 }}>Amount</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>DROP tax</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>Lorem tax</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>Lorem tax</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', marginLeft: responsiveWidth(55) }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 18, left: 30 }}>200</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>2</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>2</Text>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>2</Text>
                                    </View>
                                </View>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 1, width: responsiveWidth(84), marginTop: 20, alignSelf: 'center'
                                    }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.9), fontWeight: '400', marginTop: 10, left: 30 }}>Amount Receivable</Text>
                                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.9), fontWeight: '400', marginTop: 10, left: 180 }}>50</Text>
                                </View>

                            </ImageBackground>


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
                                    <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Withdraw</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}>

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Image source={require('./../../assets/icon/withdraw.png')}
                                            style={{
                                                height: 72, width: 72, marginTop: responsiveHeight(2), borderRadius: 12,
                                            }} />

                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.4), fontWeight: '500', marginTop: 20 }}>Withdraw Successful</Text>
                                        <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginTop: 10 }}>rendom text lorem ipsum dolor sit.</Text>
                                        <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500',}}>rendom text lorem ipsum dolor</Text>
                                    </View>
                                </View>
                            </Modal>
                        </View>
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
        backgroundColor: '#000000',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('screen').width-60,
        height: responsiveHeight(28),
        backgroundColor: '#383838',
        alignItems: 'center',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});

//make this component available to the app
export default WithdrawMoney;
