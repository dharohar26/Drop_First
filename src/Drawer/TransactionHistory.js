//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, Modal, FlatList, Dimensions,TouchableWithoutFeedback } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';

// create a component
const TransactionHistory = ({ navigation }) => {
    const [activeButton, setActiveButton] = useState('payment');
    const [showPayment, setShowPayment] = useState(true);
    const [showTransaction, setShowTransaction] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);

    const goBack = () => {
        navigation.goBack();
    };
    const DATA = [
        { label: 'DJ', value: '1' },
        { label: 'Artist', value: '2' },
    ];
    const data = [1, 1, 1, 1, 1]

    const dataList = [1, 1, 1, 1, 1]

    const handlePaymentPress = () => {
        setActiveButton('payment');
        setShowPayment(true);
        setShowTransaction(false);  
    };

    const handleTransactionPress = () => {
        setActiveButton('transaction');
        setShowPayment(false);
        setShowTransaction(true);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ height: 105, width: responsiveWidth(90), borderRadius: 20, backgroundColor: 'rgba(51, 51, 51, 0.6)', alignSelf: 'center', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
                    <Text style={{ color: '#4EDA2C', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>+₹200</Text>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), left: 120 }}>Money Added in Wallet</Text>
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 24, marginTop: 10 }}>
                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.5) }}>08 August 2023</Text>
                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.5), left: 35, marginRight: 20 }}>Transaction ID: 6476576556865h</Text>
                </View>

                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                        <Image source={require('./../../assets/icon/down.png')}
                            style={{
                                height: 12, width: 12, top: 3
                            }} />
                        <Text style={{ color: '#0D6DB2', fontSize: responsiveFontSize(1.6), left: 5, fontWeight: '500' }}>Download Invoice</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderItemList = ({ item }) => {
        return (
            <View style={{ height: 246, width: responsiveWidth(90), borderRadius: 16, backgroundColor: 'rgba(51, 51, 51, 0.6)', alignSelf: 'center', marginTop: 10 }}>
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
                                    <Text style={{ alignSelf: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(1.3), left: 4, top: 2 }}>Sam Smith- Kim Petras</Text>
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

                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>

                        <Image source={require('./../../assets/icon/down.png')}
                            style={{
                                height: 12, width: 12, top: 3
                            }} />
                        <Text style={{ color: '#0D6DB2', fontSize: responsiveFontSize(1.6), left: 5, fontWeight: '500' }}>Download Invoice</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
                    <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34
                            }} />
                    </TouchableOpacity>

                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), alignSelf: 'center', left: 70 }}>Transaction History</Text>
                </View>

                <View style={{
                    justifyContent: 'center',
                    width: responsiveWidth(60),
                    height: responsiveHeight(8),
                    flexDirection: 'row',
                    marginTop: responsiveHeight(3),
                    marginLeft: 40
                }}>

                    <TouchableOpacity onPress={handlePaymentPress} style={{
                        height: 39, width: 123,
                        backgroundColor: activeButton === 'payment' ? '#B200ED' : 'rgba(51, 51, 51, 0.6)',
                        borderRadius: 30, justifyContent: 'center'
                    }}>

                        <Text style={{
                            alignSelf: 'center', fontSize: responsiveFontSize(1.7),
                            color: activeButton === 'payment' ? '#FFFFFF' : '#808080',
                            fontWeight: '600'
                        }}>All Payments</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleTransactionPress} style={{
                        height: 39, width: 155,
                        backgroundColor: activeButton === 'transaction' ? '#B200ED' : 'rgba(51, 51, 51, 0.6)',
                        borderRadius: 30, justifyContent: 'center', marginLeft: 2, left: 5
                    }}>
                        <Text style={{
                            alignSelf: 'center', fontSize: responsiveFontSize(1.7),
                            color: activeButton === 'transaction' ? '#FFFFFF' : '#808080',
                            fontWeight: '600'
                        }}>Song Transactions</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', left: responsiveWidth(75), bottom: 10 }}>

                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Image source={require('./../../assets/icon/Filter.png')}
                            style={{
                                height: 19, width: 17, marginLeft: responsiveWidth(3)
                            }} />
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>

<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
<View style={styles.centeredView2}>
                            <View style={styles.modalView2}>

                                <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(2), fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Filter</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Image source={require('./../../assets/icon/cross.png')}
                                        style={{
                                            height: 14, width: 14, marginTop: responsiveHeight(1), bottom: 22, marginLeft: responsiveWidth(60)
                                        }} />
                                </TouchableOpacity>

                                <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginRight: responsiveWidth(50) }}>By Random text</Text>

                                <TouchableOpacity style={{ height: 48, width: responsiveWidth(80), alignSelf: 'center', marginTop: responsiveHeight(1), borderRadius: 30, justifyContent: 'center', backgroundColor: '#383838', paddingRight: 20 }}>

                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        iconStyle={styles.iconStyle}
                                        data={DATA}
                                        iconColor={'#FFFFFF'}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select item' : '...'}
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            setIsFocus(false);
                                        }}
                                    />
                                </TouchableOpacity>


                                <View style={{ marginTop: responsiveHeight(3), alignSelf: 'center',marginBottom:40 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                        style={{ height: 48, width: responsiveWidth(80), borderRadius: 20, justifyContent: 'center' }}>
                                        <LinearGradient
                                            colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                            start={{ x: 1, y: 0 }} // Gradient start point
                                            end={{ x: 0, y: 0 }} // Gradient end point
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 30
                                            }}
                                        >
                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Apply</Text>
                                        </LinearGradient>
                                        {/* <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), alignSelf: 'center' }}>Apply</Text> */}
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
</TouchableWithoutFeedback>
                     
                    </Modal>


                    <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}>
                        <Image source={require('./../../assets/icon/Subtract.png')}
                            style={{
                                height: 17, width: 22, marginLeft: responsiveWidth(3)
                            }} />
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                            setModalVisible2(!modalVisible2);
                        }}>
                            <TouchableWithoutFeedback onPress={() => setModalVisible2(false)}>

                        <View style={styles.centeredView3}>
                            <View style={{ height: responsiveHeight(16), width: responsiveWidth(35), backgroundColor: '#383838', borderRadius: 12, marginLeft: responsiveWidth(55), marginTop: responsiveHeight(25) }}>

                                <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(2), fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 16 }}>Sort by rendom text</Text>
                                <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(0.2), fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 16 }}>Sort by rendom text</Text>
                                <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(0.2), fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 16 }}>Sort by rendom text</Text>
                                <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(0.2), fontSize: responsiveFontSize(1.5), fontWeight: '500', marginLeft: 16 }}>Sort by rendom text</Text>

                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

                {showPayment && (
                    <View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                        />
                    </View>
                )}

                {showTransaction && (
                    <View style={{ marginBottom: 200 }}>
                        <FlatList
                            data={dataList}
                            renderItem={renderItemList}
                        />
                    </View>
                )}

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
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    centeredView2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    centeredView3: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    modalView2: {
        margin: 20,
        width: responsiveWidth(90),
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        borderRadius: 30,
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
    transaction: {
        color: '#808080',
        fontSize: responsiveFontSize(1.6)
    },
    timeview: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        justifyContent: 'space-between'
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
    ArtistView: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        justifyContent: 'space-between'
    },
});

//make this component available to the app
export default TransactionHistory;
