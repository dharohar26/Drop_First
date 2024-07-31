//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, StatusBar, Image, TouchableOpacity, Modal } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'
import { RadioButton } from 'react-native-paper';

// create a component
const DonateScreen = ({ navigation }) => {

    const [walletBalanceChecked, setWalletBalanceChecked] = useState(false);
    const [referralWalletChecked, setReferralWalletChecked] = useState(false);
    const [checked, setChecked] = useState('first');
    const [cardCheck, setCardCheck] = useState('');
    const [donateModal, setDonateModal] = useState(false);

    const goBack = () => {
        navigation.goBack();
    };

    const handleCardCheck = (value) => {
        setCardCheck(value);
    };

    const handlePress = () => {
        // Navigate to another screen
        navigation.navigate('artistbio');
        // Show the modal
        setDonateModal(true);
    };

    const closeModal = () => {
        // Close the modal
        setDonateModal(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center'}}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(6), paddingLeft: 20 }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34
                                }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), alignSelf: 'center', left: 90 }}>Donate Money</Text>
                    </View>


                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#C70FF7', paddingLeft: 10, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Drop Wallet</Text>
                        <View>
                            <ImageBackground
                                source={require('./../../assets/icon/walletbutton.png')}
                                style={styles.imageBackground}
                                imageStyle={{ borderRadius: 12 }}
                            >
                                <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 20 }}>

                                    <CheckBox isChecked={walletBalanceChecked} onClick={() => {
                                        setWalletBalanceChecked(!walletBalanceChecked);
                                        if (referralWalletChecked) {
                                            setReferralWalletChecked(false);
                                        }
                                    }}
                                        checkBoxColor={'#C70FF7'} checkedCheckBoxColor={'#C70FF7'} checkBoxSize={12} />
                                    <Image source={require('./../../assets/icon/cart.png')}
                                        style={{
                                            height: 20, width: 25, left: 15
                                        }} />
                                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: 30 }}>Wallet Balance</Text>

                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.7), marginLeft: 100 }}>₹50</Text>

                                <Image source={require('./../../assets/icon/line.png')}
                                    style={{
                                        height: 1, width: responsiveWidth(80), marginTop: 10, alignSelf: 'center'
                                    }} />

                                <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 10 }}>
                                    <CheckBox isChecked={referralWalletChecked}

                                        onClick={() => {
                                            setReferralWalletChecked(!referralWalletChecked);
                                            if (walletBalanceChecked) {
                                                setWalletBalanceChecked(false);
                                            }
                                        }} checkBoxColor={'#FFFFFF'} checkedCheckBoxColor={'#C70FF7'} style={{ top: 8 }} />

                                    <Image source={require('./../../assets/icon/cart.png')}
                                        style={{
                                            height: 20, width: 25, marginTop: 10, left: 15
                                        }} />
                                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), left: responsiveWidth(7) }}>Referral wallet Balance</Text>
                                </View>
                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.7), marginLeft: 100 }}>₹0</Text>

                            </ImageBackground>
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#C70FF7', paddingLeft: 10, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Payment Breakdown</Text>
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
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 18, left: 30 }}>200</Text>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>2</Text>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>2</Text>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), fontWeight: '400', marginTop: 5, left: 30 }}>2</Text>
                                        </View>
                                    </View>

                                    <Image source={require('./../../assets/icon/line.png')}
                                        style={{
                                            height: 1, width: responsiveWidth(84), marginTop: 20, alignSelf: 'center'
                                        }} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.9), fontWeight: '400', marginTop: 10, left: 30 }}>Amount Receivable</Text>
                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), fontWeight: '400', marginTop: 10, left: 180 }}>-₹50</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#C70FF7', paddingLeft: 10, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>UPI Apps</Text>
                            <View>
                                <ImageBackground
                                    source={require('./../../assets/icon/walletbutton.png')}
                                    style={styles.imageBackground}
                                    imageStyle={{ borderRadius: 12 }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15, paddingLeft: 15, marginTop: 12 }}>
                                        <View style={{ marginTop: 8 }}>

                                            <RadioButton
                                                value="first"
                                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('first')}
                                                uncheckedColor={'#FFFFFF'}
                                                color={'#C70FF7'}
                                            />
                                        </View>
                                        <Image source={require('./../../assets/icon/Paytm.png')}
                                            style={{
                                                height: 27, width: 72, marginTop: 10, marginRight: responsiveWidth(55)
                                            }} />
                                    </View>
                                    <Image source={require('./../../assets/icon/line.png')}
                                        style={{
                                            height: 1, width: responsiveWidth(80), marginTop: 10, alignSelf: 'center'
                                        }} />

                                    <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 10, justifyContent: 'space-between' }}>
                                        <View style={{ marginTop: 8 }}>
                                            <RadioButton
                                                value="second"
                                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('second')}
                                                uncheckedColor={'#FFFFFF'}
                                                color={'#C70FF7'}
                                            />
                                        </View>

                                        <Image source={require('./../../assets/icon/PhonePay.png')}
                                            style={{
                                                height: 32, width: 99, marginTop: 10, marginRight: responsiveWidth(40)
                                            }} />
                                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8), color: '#940F0F', fontWeight: '500', marginTop: 10 }}>LINK</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#C70FF7', paddingLeft: 10, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Credit/Debit Cards</Text>
                            <View>
                                <ImageBackground
                                    source={require('./../../assets/icon/walletbutton.png')}
                                    style={{ width: responsiveWidth(90), height: 100, marginTop: 10 }}
                                    imageStyle={{ borderRadius: 12 }}
                                >
                                    <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15, marginTop: 12 }}>

                                        <RadioButton
                                            value="HDFC" // Set a value for the card option (e.g., card name)
                                            status={cardCheck === 'HDFC' ? 'checked' : 'unchecked'}
                                            onPress={() => handleCardCheck('HDFC')} // Update the state when this RadioButton is pressed
                                            uncheckedColor={'#FFFFFF'}
                                            color={'#C70FF7'}
                                        />
                                        <View style={{ height: 43, width: 43, backgroundColor: '#333333', marginTop: 8, borderRadius: 8, marginLeft: 8 }}>
                                            <Image source={require('./../../assets/icon/HDFC.png')}
                                                style={{
                                                    height: 34, width: 34, alignSelf: 'center', top: 4
                                                }} />
                                        </View>

                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), fontWeight: '400', marginTop: 10, left: 15 }}>HDFC Debit Card</Text>
                                        <TouchableOpacity>
                                            <Image source={require('./../../assets/icon/delete.png')}
                                                style={{
                                                    height: 32, width: 32, marginTop: 10, left: responsiveWidth(22)
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(28), bottom: 20 }}>XXXX XXXX X234</Text>

                                </ImageBackground>
                            </View>
                        </View>

                        <TouchableOpacity onPress={handlePress}
                            style={{ height: 52, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(2), marginBottom:responsiveHeight(3)}}>
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
                                <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.9) }}>Pay now</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={donateModal}
                            onRequestClose={closeModal}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {/* Your modal content goes here */}
                                <Text>Your Modal Content</Text>
                                <TouchableOpacity onPress={closeModal}>
                                    <Text>Close Modal</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>

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
    absolute: {
        height: 100,
        width: 100,
    },
    imageBackground: {
        height: 150,
        width: responsiveWidth(90), // You might need to define responsiveWidth()
        marginTop: 10,
        borderRadius: 12,
        overflow: 'hidden', // Ensures image respects borderRadius
    },
    superman: {
        height: 140,
        width: responsiveWidth(90), // You might need to define responsiveWidth()
        marginTop: 10,
        borderRadius: 12,
        overflow: 'hidden', // Ensures image respects borderRadius
    }
});

//make this component available to the app
export default DonateScreen;
