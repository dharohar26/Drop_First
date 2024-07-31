//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput,ToastAndroid,Alert} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';
import SecCustomDropDown from '../Drawer/SecCustomeDrop';

// create a component
const AddNewBank = ({ navigation }) => {

    const [userId, setUserId] = useState('');
    const [BankName, setBankName] = useState("");
    const [bankList, setBankList] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [token, setTokenVal] = useState('')
    const [selectedValue, setSelectedValue] = useState(null); // Initialize selectedValue state

            SharedPreferences.getItem("token", function (value) {
            setTokenVal(value);
            console.log(value);
        })
            SharedPreferences.getItem("userId", function (value) {
            setUserId(value);
            console.log("userId", value);
        })

    const goBack = () => {
        navigation.goBack();
    };

    const onSelectItem = (item) => {
        console.log("Selected Bank:", item); // Check the selected item
        setSelectedValue(item); // Update selectedValue state with the selected item
    };

    useEffect(() => {
        getBank();
    }, []);

    const getBank = async () => {
        try {
              const requestOptions = {
                method: "GET",
                redirect: "follow"
              };
    
              const apiUrl = "http://62.72.57.205:8092/getBanks";
              console.log(" list apiUrl",apiUrl)
    
              fetch(apiUrl, requestOptions)
                .then(async response => {
                  if (response.status == 200) {
                    return response.json();
                  } else {
                    // Handle unsuccessful response here
                    const data = await response.json();
                    throw new Error(data.message || 'Request failed with status ' + response.status);
                  }
                })
                .then(responseData => {
                  console.log("API Response list:", responseData);
                  if (responseData.result) {
                    setBankList(responseData.result);
                    console.log("set", responseData.result);
                  }
                })
                .catch(error => {
                  console.log("API Error:", error);
                  // Display alert for error
                  Alert.alert("Error", error.message || "Unknown error occurred");
                });
        } catch (error) {
          console.log("Error retrieving token:", error);
        }
      };


    const addBankAccount = async () => {
        try {
        const formdata = new FormData();
        formdata.append('userId', userId);
        formdata.append('BankName', selectedValue.toString());
        formdata.append('accountNumber', accountNumber);
        formdata.append('ifscCode', ifscCode);
        console.log('FormData=', formdata);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);

            const requestOptions = {
                method: 'POST',
                body: formdata,
                headers: myHeaders
            }
                 fetch("http://62.72.57.205:8092/user/addBankDetails", requestOptions)
                    .then(async response => {
                        // Check the status code directly within this block
                        if (response.status === 200) {
                            ToastAndroid.show(response.status + "Added bank" + response.message, ToastAndroid.SHORT);
                            return response.json();
                        } else {
                            throw new Error('Request failed with status ' + response.status);
                        }
                    })
            .then(response => {
                console.log('API response bank=', response);
                // Handle further operations with the response data if needed
                setBankName(selectedValue); // Update BankName with selectedValue
                SharedPreferences.setItem("image", response.result.image);
                console.log("Image",response.result.image)
                navigation.navigate('myprofile')
            })
   
        } catch (error) {
            console.error('Fetch erro:', error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ScrollView>
                <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                    style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34, marginLeft: 20,
                                }} />
                        </TouchableOpacity>

                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), textAlign: 'center', bottom: 30 }}>Add new bank account</Text>
                    </View>  

                    <View>
                    <Text style={{ color: '#C70FF7', marginLeft: 30, fontSize: responsiveFontSize(1.6) }}>Select Bank</Text>

                    <TouchableOpacity style={{ height: 53, width: responsiveWidth(90), alignSelf: 'center', marginTop: responsiveHeight(1), borderRadius: 30, justifyContent: 'center', backgroundColor: 'rgba(51, 51, 51, 0.6)' }}>                   
                    <SecCustomDropDown data={bankList} selectedValue={selectedValue} onSelect={onSelectItem} />

                    <Image source={require('./../../assets/icon/dropdown.png')}
                        style={{
                        height: 6, width: 7.25, marginTop: responsiveHeight(1), marginLeft:responsiveWidth(80),position:'absolute'
                        }} />
                    </TouchableOpacity>
                        </View>


                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#C70FF7', marginLeft: 30, fontSize: responsiveFontSize(1.6),marginTop:10 }}>Account number</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setAccountNumber}
                            value={accountNumber}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={{ flex: 1, bottom: 10 }}>
                        <Text style={{ color: '#C70FF7', marginLeft: 30, fontSize: responsiveFontSize(1.5) }}>IFSC Code</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setIfscCode}
                            value={ifscCode}
                        />
                    </View>

                    <View style={{ flex: 1, bottom: 30 }}>
                        <Text style={{ color: '#C70FF7', marginLeft: 30, fontSize: responsiveFontSize(1.5) }}>Re-Enter Account number</Text>
                        <TextInput
                            style={styles.input}
                        />
                    </View>

                    <View style={{ flex: 3 }}>
                        <TouchableOpacity onPress={addBankAccount} style={{ height: 53, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(18) }}>
                            <LinearGradient
                                colors={['#9A0FDE', '#480FB0']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30
                                }}
                            >
                                <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Add</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </ScrollView>
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
    input: {
        height: 53,
        width: responsiveWidth(90),
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderRadius: 30,
        color: '#FFFFFF',
        marginTop: 5,
        paddingLeft: 20,
        backgroundColor: 'rgba(51, 51, 51, 0.6)',
    },
    dropdown: {
        height: 53,
        width: responsiveWidth(90),
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderRadius: 30,
        color: '#FFFFFF',
        marginTop: 5,
        paddingLeft: 20,
        backgroundColor: 'rgba(51, 51, 51, 0.6)',
    },
    placeholderStyle: {
        fontSize: 15,
        color: '#808080',
        paddingLeft: 5
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#d3d3d3',
    },
});

//make this component available to the app
export default AddNewBank;
