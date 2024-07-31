//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// create a component
const ReserveScreen = ({ navigation, route }) => {

    const { quantity } = route.params;
    const [token, setTokenVal] = useState("");
    const [userId, setUserId] = useState("");
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [venueName, setVenueName] = useState('');
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
    const [venueId, setVenueId] = useState('');
    const [maleCoupleNames, setMaleCoupleNames] = useState(Array(quantity.male).fill(''));
    const [femaleCoupleNames, setFemaleCoupleNames] = useState(Array(quantity.female).fill(''));
    const [male, setMale] = useState(Array(quantity.malename).fill(''));
    const [female, setFemale] = useState(Array(quantity.femalename).fill(''));
    
    const goBack = () => {
        navigation.goBack();
    };

    const renderStageInputs = (stageType) => {
        const stageInputs = [];
        for (let i = 1; i <= quantity[stageType]; i++) {
            if (stageType === 'Couple') {
                stageInputs.push(
                    <View key={`${stageType}${i}`}>
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: 10 }}>Name of {stageType} {i}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.6), marginTop: 10, right: responsiveWidth(18) }}>Male</Text>
                            <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.6), marginTop: 10, right: responsiveWidth(6) }}>Female</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 15, marginRight: 15 }}>
                            <TextInput
                                style={styles.inputCouple}
                                placeholder="Joseph"
                                placeholderTextColor="#d3d3d3"
                                // onChangeText={(text) => handleCoupleFemaleChange(i, text)}
                                onChangeText={(text) => handleMaleNameChange(i - 1, text)} // Subtract 1 from index as arrays are zero-indexed
                            />
                            <TextInput
                                style={styles.inputCouple}
                                placeholder="Maria"
                                placeholderTextColor="#d3d3d3"
                                // onChangeText={(text) => handleCoupleMaleChange(i, text)}
                                onChangeText={(text) => handleFemaleNameChange(i - 1, text)} // Subtract 1 from index as arrays are zero-indexed
                            />
                        </View>
                    </View>
                );
            } else {
                stageInputs.push(
                    <View key={`${stageType}${i}`}>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.6), marginLeft: responsiveWidth(8), marginTop: 20 }}>Name of {stageType} Stage {i}</Text>
                        <TextInput
                            style={styles.input3}
                            placeholder="Enter name"
                            placeholderTextColor="#d3d3d3"
                            onChangeText={(text) => {
                                if (stageType === 'Male') {
                                    setMale(prevState => [...prevState.slice(0, i - 1), text, ...prevState.slice(i)]);
                                } else if (stageType === 'Female') {
                                    setFemale(prevState => [...prevState.slice(0, i - 1), text, ...prevState.slice(i)]);
                                }
                            }}
                        />
                    </View>
                );
            }
        }
        return stageInputs;
    };

    const handleMaleNameChange = (index, text) => {
        const updatedMaleNames = [...maleCoupleNames];
        updatedMaleNames[index] = text;
        setMaleCoupleNames(updatedMaleNames);
    };
    
    const handleFemaleNameChange = (index, text) => {
        const updatedFemaleNames = [...femaleCoupleNames];
        updatedFemaleNames[index] = text;
        setFemaleCoupleNames(updatedFemaleNames);
    };

    useEffect(() => {

        SharedPreferences.getItem("date", function (value) {
            // Format the date
            const formattedDate = new Date(value);
            const formattedDateString = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
            setDate(formattedDateString);
            console.log("date", formattedDateString);
        });
        SharedPreferences.getItem("time", function (value) {
            // Format the time
            const formattedTime = new Date(value);
            const hours = formattedTime.getHours();
            const minutes = formattedTime.getMinutes();
            const formattedTimeString = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'pm' : 'am'}`;
            setTime(formattedTimeString);
            console.log("time", formattedTimeString);
        });

    SharedPreferences.getItem("maleQuantity", function (value) {
        setMaleQuantity(value);
        console.log("maleQuantity", value);
    });
    SharedPreferences.getItem("femaleQuantity", function (value) {
        setFemaleQuantity(value);
        console.log("femaleQuantity", value);
    });
    SharedPreferences.getItem("coupleQuantity", function (value) {
        setCoupleQuantity(value);
        console.log("coupleQuantity", value);
    });
    SharedPreferences.getItem("maleAmount", function (value) {
        setMaleAmount(value);
        console.log("maleAmount", value);
    });
    SharedPreferences.getItem("femaleAmount", function (value) {
        setFemaleAmount(value);
        console.log("femaleAmount", value);
    });
    SharedPreferences.getItem("coupleAmount", function (value) {
        setCoupleAmount(value);
        console.log("coupleAmount", value);
    });
    SharedPreferences.getItem("totalMaleAmount", function (value) {
        setTotalMaleAmount(value);
        console.log("totalMaleAmount", value);
    });
    SharedPreferences.getItem("totalFemaleAmount", function (value) {
        setTotalFemaleAmount(value);
        console.log("totalFemaleAmount", value);
    });
    SharedPreferences.getItem("totalCoupleAmount", function (value) {
        setTotalCoupleAmount(value);
        console.log("totalCoupleAmount", value);
    });
    SharedPreferences.getItem("totalAmount", function (value) {
        setTotalAmount(value);
        console.log("totalAmount", value);
    });
    SharedPreferences.getItem("token", function (value) {
        setTokenVal(value);
        console.log("token", value);
    })
    SharedPreferences.getItem("userId", function (value) {
        setUserId(value);
        console.log("userId", value);
    })
    SharedPreferences.getItem("venueId", function (value) {
        setVenueId(value);
        console.log("venueId", value);
    });
    SharedPreferences.getItem("venueName", function (value) {
        setVenueName(value);
        console.log("venueId", value);
    });
}, []);

    async function bookYourReservation() {

            try {
                var formdata = new FormData();

                        // Concatenate male names into a single string
                        const maleNamesString = male.join(",");
                        // Concatenate female names into a single string
                        const femaleNamesString = female.join(",");
                        // Concatenate couple names into a single string
                        const coupleNamesString = maleCoupleNames.concat(femaleCoupleNames).join(",");
                        
                        formdata.append("male", maleNamesString);
                        formdata.append("female", femaleNamesString);
                        formdata.append("couples", coupleNamesString);
                        formdata.append('venueId', venueId);
                        formdata.append("userId", userId);
                        formdata.append('date', date);
                        formdata.append('time', time);
                        formdata.append('totalMale', maleQuantity);
                        formdata.append('totalFemale', femaleQuantity);
                        formdata.append('totalCouple', coupleQuantity);

                console.log('FormData=', formdata);
    
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    headers: myHeaders,
                    redirect: "follow"
                };
    
                fetch("http://62.72.57.205:8092/user/doReservation", requestOptions)
                    .then(response => {
                        if (response.status === 200) {
                            ToastAndroid.show(response.status + ": You have been reserved your seat successfully " + response.message, ToastAndroid.SHORT);
                            return response.json();
                        } else {
                            throw new Error('Request failed with status ' + response.status);
                        }
                    })
                    .then(response => {
                        console.log('API response all=', response);
                        SharedPreferences.setItem("bookingId", response.result.bookingId.toString());
                        SharedPreferences.setItem("totalGuest", response.result.totalGuest.toString());
                        SharedPreferences.setItem("time", response.result.time.toString());
                        SharedPreferences.setItem("date", response.result.date.toString());
                        SharedPreferences.setItem("totalAmount", response.result.totalAmount.toString());
                        SharedPreferences.setItem("venueName", response.result.venueName);
                        SharedPreferences.setItem("venueLocation", response.result.venueLocation);
                        console.log("venueLocation",response.result.venueLocation)
                        console.log("venueName",response.result.venueName)

                        navigation.navigate('confirmBooking')
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            }
            catch (error) {
                console.error('Fetch error:', error);
            }   
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <KeyboardAwareScrollView
                        // style={{ flex: 1}}
                        enableOnAndroid={true}
                        extraScrollHeight={10}
                        enableAutomaticScroll={true}
                        keyboardOpeningTime={0}>    
              
                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34
                                }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), alignSelf: 'center', left: 70 }}>Reservation Details</Text>
                    </View>

                    <View>
                        {renderStageInputs('Male')}

                        {renderStageInputs('Female')}

                        {renderStageInputs('Couple')}
                    </View>

                    <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: 20 }}>Booking Summary</Text>
                    <View style={{ height: 147, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 20, marginTop: 10 }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.7), marginLeft: 30, marginTop: 20 }}>{date}, {time}</Text>
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: 30, marginTop: 4 }}>Date & Time</Text>

                        <Image source={require('./../../assets/icon/line.png')}
                            style={{
                                height: 2, width: responsiveWidth(80), alignSelf: 'center', marginTop: 10
                            }} />

                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), marginLeft: 30, marginTop: 10 }}>{venueName}</Text>
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: 30, marginTop: 4 }}>Venue</Text>
                    </View>

                    <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: 20 }}>Payment Breakdown</Text>
                    <View style={{ height: 154, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 10, borderRadius: 20 }}>
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
                                }}>

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
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6),width:110 }}>Female Stag</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 24,width:50 }}>{femaleQuantity}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 15,width:50  }}>₹{femaleAmount}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 10,width:50  }}>₹{totalFemaleAmount}</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6),width:95 }}>Male Stag</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 15,width:50 }}>{maleQuantity}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 8,width:50  }}>₹{maleAmount}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 10,width:50 }}>₹{totalMaleAmount}</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6),width:80 }}>Couple</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 2,width:50  }}>{coupleQuantity}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), right: 2,width:50 }}>₹{coupleAmount}</Text>
                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.6), left: 10,width:50  }}>₹{totalCoupleAmount}</Text>
                        </View>
                    </View>

                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginLeft: 40, marginTop: 5 }}>Total Guests: 12</Text>

                    <Text style={{ color: '#C70FF7', marginLeft: 30, marginTop: 20, fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>₹{totalAmount}</Text>
                    <Text style={{ color: '#808080', marginLeft: 30, fontSize: responsiveFontSize(1.4), }}>Amount to be paid at venue</Text>

                    <TouchableOpacity
                        onPress={bookYourReservation}
                        //  onPress={() => navigation.navigate('confirmBooking')}
                        style={{ height: 51, width: 180, backgroundColor: '#808080', alignSelf: 'flex-end', justifyContent: 'center', borderRadius: 30, bottom: 45, marginRight: 15 }}>
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
                            <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Book now</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>
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
    input3: {
        height: 50,
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        paddingLeft: 20,
        color: '#fff'
    },
    input: {
        height: 50,
        width: responsiveWidth(42),
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        paddingLeft: 20,
        color: '#fff',
    },
    input2: {
        height: 50,
        width: responsiveWidth(42),
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        paddingLeft: 20,
        color: '#fff',
        marginLeft: 7
    },
    inputCouple: {
        height: 50,
        width: responsiveWidth(43),
        alignSelf: 'center',
        marginTop: 5,
        borderRadius: 30,
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        paddingLeft: 20,
        color: '#fff',
    }
});

//make this component available to the app
export default ReserveScreen;

