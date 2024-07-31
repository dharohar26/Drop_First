//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions, FlatList, ActivityIndicator, TouchableWithoutFeedback,RefreshControl} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';

// create a component
const MyBooking = ({ navigation }) => {

  const [shownModal, setShowModal] = useState("");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [myBooking, setMyBooking] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [token, setTokenVal] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  SharedPreferences.getItem("userId", function (value) {
    setUserId(value);
    console.log("userId", value);
  });

  const onRefresh = () => {
    // Set refreshing state to true
    setRefreshing(true);
    // Fetch data again
    myBookingList();
    // Set refreshing state to false when done
    setRefreshing(false);
};

  const myBookingList = async () => {
    try {
      var SharedPreferences = require('react-native-shared-preferences');
      SharedPreferences.getItem("token", function (value) {
        setTokenVal(value);
        console.log("RejectToken", value);

        if (value) {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", value);

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };

          const apiUrl = `http://62.72.57.205:8092/user/myBookings?userId=${userId}`;
          console.log("API URL book:", apiUrl);
          
          fetch(apiUrl, requestOptions)

            .then(async responseData => {
              if (responseData.status === 200) {
                return responseData.json();
              } else {
                // Handle unsuccessful response here
                const data = await responseData.json();
                throw new Error(data.message || 'Request failed with status ' + responseData.status);
              }
            })
            .then(responseData => {
              console.log("API Response:", responseData);
              if (responseData.result) {
                setMyBooking(responseData.result);
                console.log("MyBooking", responseData.result);
              }
              setIsLoading(false);
            })
            .catch(error => {
              console.log("API Error:", error);
              // Display alert for error
            });
        } else {
          console.log("No token available.");
        }
      });
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    myBookingList();
  }, [userId,token]);



  const data = [
    { label: 'DJ', value: '1' },
    { label: 'Artist', value: '2' },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() =>{
          SharedPreferences.setItem("reservationId", item.reservationId.toString());
          console.log("reservationId", item.reservationId)
         navigation.navigate('cancelreserve')}}>
        <View style={{ height: 210, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 30, borderRadius: 14}}>
          <Image source={require('./../../assets/icon/bar4.png')}
            style={{
              height: 96, width: responsiveWidth(90), alignSelf: 'center', borderTopLeftRadius: 14, borderTopRightRadius: 14
            }} />

          <View style={{alignSelf: 'center', marginTop: responsiveHeight(2.5) }}>
            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), marginLeft: 5, fontWeight: '500',textAlign:'center' }}>{item.venueName}</Text>
        
            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.4), marginLeft: 5, fontWeight: '400', textAlign:'center'}}>{item.venueLocation}</Text>
          </View>
          <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(1.4), fontWeight: '500', textAlign: 'center', marginTop: responsiveHeight(0.6) }}>{item.bookingId}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#120219" barStyle="dark-content" />
      <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
        style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>        
                   <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}>
              <TouchableOpacity onPress={goBack}>
                <Image source={require('./../../assets/icon/backarrow.png')}
                  style={{
                    height: 34, width: 34
                  }} />
              </TouchableOpacity>

              <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), left:12 }}>My Bookings</Text>


              <View style={{ flexDirection: 'row', }}>

                <TouchableOpacity onPress={() => setShowModal(!shownModal)}>
                  <Image source={require('./../../assets/icon/Search.png')}
                    style={{
                      height: 20, width: 20,
                    }} />
                </TouchableOpacity>

                <Modal
                  transparent={true}
                  visible={shownModal}
                  onRequestClose={() => {
                    setShowModal(!shownModal);
                  }}>
<TouchableWithoutFeedback onPress={()=> setShowModal(false)}> 
<View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{ width: responsiveWidth(90), height: 50, backgroundColor: '#2E2E2E', borderRadius: 10,marginTop:60 }}>
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

</TouchableWithoutFeedback>

                </Modal>


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

<TouchableWithoutFeedback onPress={()=> setModalVisible(false)}> 
                  <View style={styles.centeredView2}>
                    <View style={styles.modalView2}>

                      <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2), fontWeight: '500' }}>Filter</Text>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Image source={require('./../../assets/icon/cross.png')}
                          style={{
                            height: 14, width: 14, marginTop: responsiveHeight(1), bottom: 22, marginLeft: responsiveWidth(60)
                          }} />
                      </TouchableOpacity>

                      <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginRight: responsiveWidth(50) }}>By Venue</Text>

                      <TouchableOpacity style={{ height: 48, width: responsiveWidth(72), alignSelf: 'center', marginTop: 10, borderRadius: 30, justifyContent: 'center', backgroundColor: '#383838', paddingRight: 20 }}>

                        <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={data}
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


                      <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4),marginBottom:30
                       }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                          <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(2), top: 10, left: 80 }}>Clear All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(false);
                          }}
                          style={{ height: 40, width: responsiveWidth(30), borderRadius: 20, justifyContent: 'center', marginLeft: responsiveWidth(29) }}>
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
<TouchableWithoutFeedback onPress={()=> setModalVisible2(false)}> 
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
            </View>
          </View>
<View>
{isLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#C70FF7" />
              </View>
            ) : myBooking.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image source={require('./../../assets/icon/no-data.png')} // Replace with your empty state image
                  style={styles.emptyImage} />
                <Text style={styles.emptyText}>No Bookings Available</Text>
              </View>
            ) : (
              <View style={{ marginBottom: 20 }}>
                <FlatList
                  data={myBooking}
                  renderItem={renderItem}
                  scrollEnabled={false}
                />
              </View>
            )}
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
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
  },
  centeredView2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center'
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
    width: responsiveWidth(86),
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:responsiveHeight(35)
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
  },
  emptyImage: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'contain',
  },

});

//make this component available to the app
export default MyBooking;
