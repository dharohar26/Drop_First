//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions, FlatList,ToastAndroid } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const CancelReservation = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [token, setTokenVal] = useState("");
    const [maleQuantity, setMaleQuantity] = useState('');
    const [femaleQuantity, setFemaleQuantity] = useState('');
    const [coupleQuantity, setCoupleQuantity] = useState('');
    const [maleAmount, setMaleAmount] = useState(0);
    const [femaleAmount, setFemaleAmount] = useState(0);
    const [coupleAmount, setCoupleAmount] = useState(0);
    const [totalMaleAmount, setTotalMaleAmount] = useState(0);
    const [totalFemaleAmount, setTotalFemaleAmount] = useState(0);
    const [totalCoupleAmount, setTotalCoupleAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [date, setDate] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [reservationId, setReservationId] = useState('');
    const [loading, setLoading] = useState(false);
    
    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        SharedPreferences.getItem("token", function (value) {
            setTokenVal(value);
            console.log("ContToken", value);
        });
        SharedPreferences.getItem("maleQuantity", function (value) {
            setMaleQuantity(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("femaleQuantity", function (value) {
            setFemaleQuantity(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("coupleQuantity", function (value) {
            setCoupleQuantity(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("maleAmount", function (value) {
            setMaleAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("femaleAmount", function (value) {
            setFemaleAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("coupleAmount", function (value) {
            setCoupleAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("totalMaleAmount", function (value) {
            setTotalMaleAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("totalFemaleAmount", function (value) {
            setTotalFemaleAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("totalCoupleAmount", function (value) {
            setTotalCoupleAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("totalAmount", function (value) {
            setTotalAmount(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("date", function (value) {
            setDate(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("bookingId", function (value) {
            setBookingId(value);
            console.log("MyNumber", value);
        });
        SharedPreferences.getItem("reservationId", function (value) {
            setReservationId(value);
            console.log("userId", value);
          });
        
    }, []);


    const reservationCancel = async () => {
        try {
            setLoading(true);
            const formdata = new FormData();
            formdata.append('reservationId', reservationId);
            console.log('FormData=', formdata);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);

            const requestOptions = {
                method: 'POST',
                body: formdata,
                headers: myHeaders
            }
            const response = await fetch(`http://62.72.57.205:8092/user/cancelBooking?reservationId=${reservationId}`, requestOptions);
            if (response.status === 200) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show("You've successfully cancel the reservation", ToastAndroid.SHORT);
                    navigation.navigate('Side');
                  } else {
                    AlertIOS.alert("You've pinpointed your location");
                    // navigation.navigate('location')
                    setModalVisible(!modalVisible);
                  }
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        } catch (error) {
            console.error('Fetch erro:', error);
            setLoading(false);
        }
    }

    const toggleReservation = () => {
        setBookReservation(!bookReservation); // Toggle visibility state
        setButtonVisible(false); // Hide the button when reservation is made
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <Image source={require('./../../assets/icon/Rectangle.png')}
                        style={{
                            height: 300, width: responsiveWidth(100), alignSelf: 'center'
                        }} />

                    <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/before.png')}
                            style={{
                                height: 34, width: 34, bottom: 286, marginLeft: 20
                            }} />
                    </TouchableOpacity>

                    <Text style={styles.clubText}>Bottles and Barrels Club</Text>

                    <View style={styles.location}>
                        <Image source={require('./../../assets/icon/locate.png')}
                            style={{
                                height: 13, width: 11.90, top: 5, marginLeft: 5
                            }} />
                        <Text style={styles.Hritik}>Gurugram, Haryana, India</Text>
                    </View>

                    <View style={styles.bookButton}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.need}>Booking ID:<Text style={styles.book}>  {bookingId}</Text></Text>
                            <TouchableOpacity>
                                <Image source={require('./../../assets/icon/copy.png')}
                                    style={{
                                        height: 25, width: 25, marginLeft: 55
                                    }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                        <View style={styles.bookButton2}>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6),marginLeft:20,marginRight:20,textAlign:'center'}}>{date}</Text>
                            <Text style={{  color: '#fff', marginTop: 30, fontSize: responsiveFontSize(1.5), color: '#808080',textAlign:'center'}}>Booking Date</Text>
                        </View>

                        <View style={styles.bookButton2}>
                            <Text style={{ alignSelf: 'center', color: '#fff', fontSize: responsiveFontSize(1.9) }}>₹{totalAmount}</Text>
                            <Text style={{ alignSelf: 'center', color: '#fff', marginTop: 30, fontSize: responsiveFontSize(1.5), color: '#808080' }}>Amount to take</Text>
                        </View>
                    </View>

                    <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: 24, marginTop: 10 }}>Payment Breakdown</Text>

                    <View style={{ height: 174, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 5, borderRadius: 20 }}>
                        <View style={{ height: 50, width: responsiveWidth(90) }}>
                            <LinearGradient
                                colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                start={{ x: 0, y: 0 }} // Gradient start point
                                end={{ x: 1, y: 0 }} // Gradient end point
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20
                                }}
                            >
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Category</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Guests</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 5 }}>Amount</Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Per person</Text>
                                    </View>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6) }}>Total</Text>
                                </View>
                            </LinearGradient>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6) }}>Female Stag</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 24 }}>{femaleQuantity}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 15 }}>₹{femaleAmount}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 5 }}>₹{totalFemaleAmount}</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6) }}>Male Stag</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 15 }}>{maleQuantity}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 8 }}>{maleAmount}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 5 }}>₹{totalMaleAmount}</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6) }}>Couple</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 2 }}>{coupleQuantity}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 2 }}>₹{coupleAmount}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 5 }}>₹{totalCoupleAmount}</Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('guest')}>
                            <Text style={{ color: '#C70FF7', alignSelf: 'center', marginTop: 12, fontSize: responsiveFontSize(1.6), fontWeight: '500' }}>View guest details</Text>
                        </TouchableOpacity>

                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>

                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), fontWeight: '500', marginTop: 20 }}>Are you sure you want to</Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), fontWeight: '500' }}> cancel the reservation?</Text>

                                    <View style={{ flexDirection: 'row',marginTop:10}}>

                                        <TouchableOpacity style={styles.nobutton} onPress={() => setModalVisible(false)  }>
                                            <Text style={styles.notext}>No</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.yesbutton} onPress={() => navigation.navigate('mybooking')}>
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
                                                <Text style={styles.yestext}>Yes</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Modal>

                    </View>

                    <TouchableOpacity 
                    onPress={reservationCancel}
                    // onPress={() => setModalVisible(!modalVisible)}
                        style={{ height: 50, width: responsiveWidth(90), borderWidth: 1.5, borderColor: '#F62626', marginTop: responsiveHeight(6), borderRadius: 30, justifyContent: 'center', alignSelf: 'center', marginBottom: 20 }}>
                        <Text style={{ color: '#F62626', alignSelf: 'center', fontSize: responsiveFontSize(2) }}>Cancel</Text>
                    </TouchableOpacity>
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
    location: {
        flexDirection: 'row',
        alignSelf: 'center',
        bottom: 100,
    },
    Hritik: {
        color: '#E16DFF',
        fontSize: responsiveFontSize(1.7),
        marginLeft: 5,
        fontWeight: '500'
    },
    clubText: {
        color: '#fff',
        bottom: 100,
        alignSelf: 'center',
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500'
    },
    bookButton: {
        height: 55,
        width: responsiveWidth(90),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        bottom: 40
    },
    bookButton2: {
        height: 140,
        width: responsiveWidth(43),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        bottom: 20
    },
    need: {
        color: '#808080',
        marginLeft: 20
    },
    book: {
        color: '#fff',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('screen').width-80,
        height: responsiveHeight(22),
        backgroundColor: '#383838',
        alignItems: 'center',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    nobutton:{
        height:40, 
        width:responsiveWidth(25),
        borderWidth:1.5,
        borderColor:'#FFFFFF',
        borderRadius:20,
        justifyContent:'center',
        marginTop:30,
    },
    notext:{
        color:'#fff',
        alignSelf:'center',
    },
    yesbutton:{
        height:40, 
        width:responsiveWidth(25),
        borderRadius:20,
        justifyContent:'center',
        marginTop:30,
        marginLeft:10
    },
    yestext:{
        color:'#fff',
        alignSelf:'center',
    }

});

//make this component available to the app
export default CancelReservation;
