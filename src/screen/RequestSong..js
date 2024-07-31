import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, Modal, TextInput, Dimensions,ToastAndroid} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';

const RequestSong = ({ navigation }) => {

    const [notes, setNotes] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [image, setImage] = useState('');
    const [token, setTokenVal] = useState('');
    const [id, setId] = useState('');
    const [userId, setUserId] = useState('');
    const [artistId, setArtistId] = useState('');
    const [artistAmount, setArtistAmount] = useState('');
    const [venueId, setVenueId] = useState('');

    const handlePress = (value) => {
        setAmount(value.toString());
        setSelectedValue(value); 
    };

    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        SharedPreferences.getItem("token", function (value) {
            setTokenVal(value);
            console.log(value);
        })
        SharedPreferences.getItem("name", function (value) {
            setName(value);
            console.log(value);
        })
        SharedPreferences.getItem("artist", function (value) {
            setArtist(value);
            console.log(value);
        })
        SharedPreferences.getItem("image", function (value) {
            setImage(value);
            console.log(value);
        })
        SharedPreferences.getItem("artistAmount", function (value) {
            setArtistAmount(value);
            console.log(value);
        })
        SharedPreferences.getItem("notes", function (value) {
            setNotes(value);
            console.log("Notes",value);
        })
        SharedPreferences.getItem("id", function (value) {
            setId(value);
            console.log("Id",value);
        })
        SharedPreferences.getItem("userId", function (value) {
            setUserId(value);
            console.log("userId",value);
        })
        SharedPreferences.getItem("artistId", function (value) {
            setArtistId(value);
            console.log("artistId",value);
        })
        SharedPreferences.getItem("venueId", function (value) {
            setVenueId(value);
            console.log("venueId",value);
        })
      }, []);

    async function requestSong() {

        const myHeaders = new Headers();
            myHeaders.append("Authorization", token);

            const formdata = new FormData();
            formdata.append("userId", userId);
            formdata.append("artistId", artistId);
            formdata.append("songId", id);
            formdata.append("note", notes);
            formdata.append("amount", artistAmount);
            formdata.append("songImage", image);
            formdata.append("venueId", venueId);
            formdata.append("songArtistName",artist);
            formdata.append("songName", name);
            console.log(formdata);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            fetch("http://62.72.57.205:8092/user/requestSong", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    // Alert.alert("You have successfully created a request");
                    ToastAndroid.show("You have successfully created a request", ToastAndroid.SHORT)
                    navigation.navigate('Artist')
                    return response.json();
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then(responseData => {
                console.log('API response=', responseData);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34
                                }} />
                        </TouchableOpacity>

                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), alignSelf: 'center', left: 80 }}>Request Song</Text>
                    </View>

                    <ImageBackground source={require('./../../assets/icon/MyEyes.png')} borderRadius={20}
                        style={{ height: 210, width: 350, alignSelf: 'center', marginTop: responsiveHeight(6)}}>

                        <LinearGradient
                            colors={['#a40fe4', '#28109e']} // Replace these colors with your desired gradient
                            start={{ x: 0, y: 0 }} // Gradient start point
                            end={{ x: 1, y: 1 }} // Gradient end point
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                borderRadius: 24
                            }}>

                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{ height: 90, width: 90, alignSelf: 'center', bottom: 35, borderRadius: 40 }}
                                />
                            )}
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(2.4), fontWeight: '500', bottom: 20,fontSize:responsiveFontSize(1.8),marginLeft:20,marginRight:20}}>{name}</Text>
                            <Text style={{ textAlign: 'center', color: '#d3d3d3', fontSize: responsiveFontSize(2), fontWeight: '400', bottom: 20,fontSize:responsiveFontSize(1.6)}}>{artist}</Text>
                        </LinearGradient>
                    </ImageBackground>

                    <Text style={{ color: '#808080', textAlign: 'center', marginLeft: 30, marginRight: 30, marginTop: 10, fontSize: 12 }}>After your request is approved and you have made the payment, the song should be played within 30 minutes or your money will be refunded.</Text>

                    <View>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(3) }}>Add Notes</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNotes}
                            value={notes}
                            placeholder="Just play this song & I will make you rich"
                            placeholderTextColor="#D4D4D4"
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.7), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(3) }}>Enter amount</Text>
                        <Text style={{ color: '#FF5151', fontSize: responsiveFontSize(1.7), marginRight: responsiveWidth(8), marginTop: responsiveHeight(3) }}>Minimum ₹200</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input2}
                            onChangeText={setAmount}
                            value={amount}
                            placeholder="250"
                            placeholderTextColor="#D4D4D4"
                        />
                        <Text style={{ color: '#808080', fontSize: responsiveFontSize(2), left: 340, bottom: 37 }}>₹</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', marginLeft: 20, marginRight: 20 }}>
                        <TouchableOpacity onPress={() => handlePress(200)}>
                            <View style={{ height: 40, width: 75, borderRadius: 20, justifyContent: 'center', borderWidth: 1, borderColor: selectedValue === 200 ? '#C70FF7' : '#808080' }}>
                                <Text style={{ color: '#fff', alignSelf: 'center' }}>200</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handlePress(250)}>
                            <View style={{ height: 40, width: 75, borderRadius: 20, justifyContent: 'center', borderWidth: 1, borderColor: selectedValue === 250 ? '#C70FF7' : '#808080' }}>
                                <Text style={{ color: '#fff', alignSelf: 'center' }}>250</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handlePress(300)}>
                            <View style={{ height: 40, width: 75, borderRadius: 20, justifyContent: 'center', borderWidth: 1, borderColor: selectedValue === 300 ? '#C70FF7' : '#808080' }}>
                                <Text style={{ color: '#fff', alignSelf: 'center' }}>300</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handlePress(350)}>
                            <View style={{ height: 40, width: 75, borderRadius: 20, justifyContent: 'center', borderWidth: 1, borderColor: selectedValue === 350 ? '#C70FF7' : '#808080' }}>
                                <Text style={{ color: '#fff', alignSelf: 'center' }}>350</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => {
                        SharedPreferences.setItem("amount", amount);
                        SharedPreferences.setItem("notes", notes);
                        console.log("notes", notes);
                        console.log("Amount", amount);
                        setModalVisible(!modalVisible)
                    }}
                        style={{ height: 52, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(6), marginBottom: responsiveHeight(3) }}>
                        <LinearGradient
                            colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                            start={{ x: 0, y: 0 }} // Gradient start point
                            end={{ x: 1, y: 0 }} // Gradient end point
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 30
                            }}>
                            <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.9) }}>Send for request</Text>
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
                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.2), fontWeight: '500', marginTop: 20 }}>Song Request Sent</Text>
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.5), fontWeight: '300', marginTop: 10, marginLeft: 25, marginRight: 25,textAlign:'center'}}>Your request for the following song has been sent to the artist and is In Progress. Once artist approves the request then the proposed amount should have to be paid in order for the song to play. Meanwhile you request another song and can check the status on Previous Requested Song list.</Text>

                                <View style={{ height: 80, width: responsiveWidth(85), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 12, marginTop: responsiveHeight(2), marginTop: 30 }}>
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
                           

<View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: image }}
                            style={{
                                height: responsiveHeight(7), width: responsiveWidth(16), borderRadius: 10,  marginLeft: responsiveWidth(2)
                            }} />
    
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: responsiveWidth(2) }}>
                            <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(1), fontWeight: '500', fontSize: responsiveFontSize(1.5), width: '85%' }}>{name}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:responsiveHeight(2.5) }}>
                                <Image source={require('./../../assets/icon/Eee.png')}
                                    style={{
                                        height: responsiveHeight(1.5), width: responsiveWidth(3), borderRadius: 10,bottom:21
                                    }} />
                                <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.4), marginLeft: responsiveWidth(1),bottom:21}}>{artist}</Text>
                            </View>
                        </View>
    
                        <View style={{ flexDirection: 'column', marginRight: responsiveWidth(2), alignItems: 'flex-end' }}>
                            <Text style={{ color: "#FFB803", marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.5),bottom:10}}>Pending Approval</Text>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.3), bottom:6}}>Waiting 00:04:48</Text>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), bottom:5}}>₹{amount}</Text>
                        </View>
                    </View>
    
                                    </LinearGradient>
                                </View>

                                <TouchableOpacity onPress={requestSong}
                                    style={{ height: 50, width: responsiveWidth(80), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(3), marginBottom: responsiveHeight(3) }}>
                                    <LinearGradient
                                        colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                        start={{ x: 0, y: 0 }} // Gradient start point
                                        end={{ x: 1, y: 0 }} // Gradient end point
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 30
                                        }}>
                                        <Text style={{ alignSelf: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.9) }}>Okay</Text>
                                    </LinearGradient>
                                </TouchableOpacity>



{/* <View>
                <View style={{ width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 14, marginTop: responsiveHeight(1) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: image }}
                            style={{
                                height: responsiveHeight(7), width: responsiveWidth(16), borderRadius: 10, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(4)
                            }} />
    
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: responsiveWidth(2) }}>
                            <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(2), fontWeight: '500', fontSize: responsiveFontSize(1.3) }}>{name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('./../../assets/icon/Eee.png')}
                                    style={{
                                        height: responsiveHeight(2), width: responsiveWidth(3), borderRadius: 10, marginTop: responsiveHeight(0.5),
                                    }} />
                                <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.5), marginLeft: responsiveWidth(1) }}>{artist}</Text>
                            </View>
                        </View>
    
                        <View style={{ flexDirection: 'column', marginRight: responsiveWidth(2), alignItems: 'flex-end' }}>
                            <Text style={{ color: "yellow", marginTop: responsiveHeight(2), fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Pending Approval</Text>
                            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.3), marginTop: responsiveHeight(0.5) }}>Waiting 00:04:48</Text>
                        </View>
                    </View>
    
                    <View style={{ width: '94%', backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', borderRadius: 12, marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1.8) }}>
                        <Text style={{ color: '#FFFFFF', marginHorizontal: responsiveWidth(5), fontSize: responsiveFontSize(1.5), marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1), textAlign: 'center' }}>nnote</Text>
                    </View>
                </View>
            </View> */}
            
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </ImageBackground>
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 130,
        width: responsiveWidth(90),
        borderRadius: 18,
        alignSelf: 'center',
        paddingLeft: 20,
        color: '#fff',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        marginTop: 10,
        paddingBottom: 90
    },
    input2: {
        height: 58,
        width: responsiveWidth(90),
        borderRadius: 14,
        alignSelf: 'center',
        paddingLeft: 20,
        color: '#fff',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    modalView: {
        margin: 20,
        width: responsiveWidth(90),
        height: responsiveHeight(44),
        backgroundColor: '#383838',
        alignItems: 'center',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
})
export default RequestSong; 
