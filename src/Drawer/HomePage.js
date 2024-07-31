import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, PermissionsAndroid, ImageBackground, Image, TouchableOpacity, FlatList, Modal, RefreshControl, Dimensions, Alert, TextInput, TouchableWithoutFeedback, BackHandler, ActivityIndicator, ScrollView, Button } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Slider from '@react-native-community/slider';
import DatePicker from 'react-native-date-picker';
import SharedPreferences from 'react-native-shared-preferences';
import CustomDropdown from './CustomDropdown';
import { useFocusEffect } from '@react-navigation/native';

// create a component
const HomePage = ({ navigation }) => {

  // This is all states
  const [activeButton, setActiveButton] = useState('artist');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [shownModal, setShownModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showArtist, setShowArtist] = useState(true);
  const [showVenue, setShowVenue] = useState(false);
  const [rangeValue, setRangeValue] = useState("");
  const [artistData, setArtistData] = useState([]);
  const [filteredArtistData, setFilteredArtistData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [filteredVenueData, setFilteredVenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [artistId, setArtistId] = useState("");
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [allArtist, setAllArtist] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [modalBack, setModalBack] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  // Get data from localsession
  useEffect(() => {
    SharedPreferences.getItem("artistId", function (value) {
      setArtistId(value);
      console.log("artistId=", value);
    });
    SharedPreferences.getItem("userId", function (value) {
      setUserId(value);
      console.log("userId=", value);
    });
    SharedPreferences.getItem("profilePicture", function (value) {
      setProfilePicture(value);
      console.log(value);
    });
  }, []);

  // Convert Distannce 
  const distanceFrom = 0;
  const distanceTo = distanceFrom + Math.round(rangeValue);
  const distanceFromStr = distanceFrom.toString() + " km";
  const distanceToStr = distanceTo.toString() + " km";
  const pointValue = `${distanceFrom} Km - ${distanceTo} Km`;

  // This is for select artist from dropdown 
  const onSelectItem = (item) => {
    setSelectedValue(item);
  };

  // Backhandler for exit the app 
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setModalBack(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  )

  // This is for filter artist list accordinng to distance 
  const handleApply = () => {
    getArtist();
    setModalVisible(false)
  };

  // This is artist tab bar button
  const handleArtistPress = () => {
    setActiveButton('artist');
    setShowArtist(true);
    setShowVenue(false);
  };

  // This is Venue tab bar button
  const handleVenuesPress = () => {
    setActiveButton('venues');
    setShowArtist(false);
    setShowVenue(true);
  };

  // Change formate of date 
  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
    const year = dateObj.getFullYear();

    // Pad single digit day or month with a leading zero if necessary
    const formattedDay = (day < 10 ? '0' : '') + day;
    const formattedMonth = (month < 10 ? '0' : '') + month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  // This is a filter artist list api 
  const getArtist = async () => {
    try {
      SharedPreferences.getItem("token", function (value) {
        console.log("venueToken", value);

        if (value) {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", value);

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };

          console.log("distanceFrom", distanceFromStr);
          console.log("fromDate", formatDate(fromDate));
          console.log("userId", userId);

          const apiUrl = `http://62.72.57.205:8092/user/getAllArtistByFilter?fromDate=${formatDate(fromDate)}&toDate=${formatDate(toDate)}&artistId=${artistId}&userId=${userId}`;
          console.log("FilterApiUrl", apiUrl);

          fetch(apiUrl, requestOptions)
            .then(async response => {
              if (response.status == 200) {
                return response.json();
              } else {
                const data = await response.json();
                throw new Error(data.message || 'Request failed with status ' + response.status);
              }
            })
            .then(responseData => {
              console.log("API Response list:", responseData);
              if (responseData.result) {
                setArtistData(responseData.result);

              }
            })
            .catch(error => {
              console.log("API Error:", error);
              // Alert.alert("Error", error.message || "Unknown error occurred");
            });
        } else {
          console.log("No token available.");
        }
      });
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  // This is a artist list for dropdown list 
  const getAllArtist = async () => {
    try {
      var SharedPreferences = require('react-native-shared-preferences');
      SharedPreferences.getItem("token", function (value) {
        console.log("homeToken", value);

        if (value) {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", value);
          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          const apiUrl = `http://62.72.57.205:8092/user/getAllArtist?userId=${userId}`;
          console.log("API URL:", apiUrl);
          fetch(apiUrl, requestOptions)
            .then(async response => {
              if (response.status === 200) {
                return response.json();
              } else {
                const data = await response.json();
                throw new Error(data.message || 'Request failed with status ' + response.status);
              }
            })
            .then(response => {
              console.log("API Response allartist:", response);
              if (response.result) {
                setAllArtist(response.result);
                console.log("all artist", response.result);
              }
            })
            .catch(error => {
              console.log("API Error:", error);
            });
        } else {
          console.log("No token available.");
        }
      });
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };
  // call getAllArtist function 
  useEffect(() => {
    getAllArtist();
  }, [userId]);

  const fetchArtistData = async () => {
    try {
      SharedPreferences.getItem('token', async (token) => {
        if (token) {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', token);

          const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          };

          const apiUrl = `http://62.72.57.205:8092/user/getAllArtistByFilter?userId=${userId}`;
          const response = await fetch(apiUrl, requestOptions);
          if (response.status === 200) {
            const responseData = await response.json();
            if (responseData.result) {
              setArtistData(responseData.result);
              setFilteredArtistData(responseData.result);
              setLoading(false);
            }
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
          }
        } else {
          console.log('No token available.');
        }
      });
    } catch (error) {
      console.log('API Error:', error);
      Alert.alert('Error', error.message || 'Unknown error occurred');
    }
  };

  // call getArtistList function 
  useEffect(() => {
    if (userId) {
      fetchArtistData();
    }
  }, [userId, search]);

  // useEffect(() => {
  //   const filteredData = artistData.filter((artist) =>
  //     `${artist.artistFirstName} ${artist.artistLastName}`.toLowerCase().includes(search.toLowerCase())
  //   );
  //   setFilteredArtistData(filteredData);
  // }, [search, artistData]);


  useEffect(() => {
    if (activeButton === 'artist') {
      setFilteredArtistData(artistData.filter(artist => artist.name && artist.name.toLowerCase().includes(search.toLowerCase())));
    } else if (activeButton === 'venues') {
      setFilteredVenueData(venueData.filter(venue => venue.name && venue.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, artistData, venueData, activeButton]);



  // This is all venues list api function
  useEffect(() => {
    if (userId) {
      const getVenue = async () => {
        try {
          SharedPreferences.getItem("token", function (value) {
            console.log("venueToken", value);

            if (value) {
              const myHeaders = new Headers();
              myHeaders.append("Authorization", value);

              const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
              };

              const apiUrl = `http://62.72.57.205:8092/user/getVenues?userId=${userId}`;
              fetch(apiUrl, requestOptions)
                .then(async response => {
                  if (response.status === 200) {
                    return response.json();
                  } else {
                    const data = await response.json();
                    throw new Error(data.message || 'Request failed with status ' + response.status);
                  }
                })
                .then(responseData => {
                  console.log("API Response Venue:", responseData);

                  if (responseData.result) {
                    // Filter venues based on the search query
                    const filteredData = responseData.result.filter(venue => {
                      // Check if venueName exists and is a string
                      if (venue.name && typeof venue.name === 'string') {
                        return venue.name.toLowerCase().includes(search.toLowerCase());
                      }
                      return false;
                    });
                    setVenueData(responseData.result); // Set all venues data
                    setFilteredVenueData(responseData.result); // Set filtered venues data
                    console.log("Filtered Venues", responseData.result);
                  }
                  setIsLoading(false); // Stop loader
                })
                .catch(error => {
                  console.log("API Error:", error);
                  Alert.alert("Error", error.message || "Unknown error occurred");
                });
            } else {
              console.log("No token available.");
            }
          });
        } catch (error) {
          console.log("Error retrieving token:", error);
        }
      };
      getVenue();
    }
  }, [userId, search]);

  //renderItem for Artist list
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          SharedPreferences.setItem("artistId", item.artistId.toString());
          console.log("artistId Dharo", item.artistId.toString());

          SharedPreferences.setItem("venueId", item.venueId.toString());
          console.log("venueId", item.venueId.toString());
          navigation.navigate('Artist');
        }}
      >
        <View style={styles.itemContainer}>
          <Image source={require('./../../assets/icon/bar1.png')} style={styles.topImage} />
          <Image source={{ uri: item.artistProfilePicture }} style={styles.profilePicture} />
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <View style={styles.statusDot}></View>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.artistInfoContainer}>
            <View style={styles.artistInfoRow}>
              <Text style={styles.artistName}>DJ {item.artistFirstName} {item.artistLastName}</Text>
              <Image source={require('./../../assets/icon/locate.png')} style={styles.locateIcon} />
              <Text style={styles.distanceText}>{item.distance}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingRow}>
              <Image source={require('./../../assets/icon/Sitara.png')} style={styles.ratingIcon} />
              <Text style={styles.ratingText}>4.4</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.locationText}>
              {item.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // renderItem for Venue List
  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        const venueId = item.id.toString()
        SharedPreferences.setItem("venueId", venueId);
        console.log("Venue Dharo", venueId);
        navigation.navigate('booking');
      }}>

        <View style={{ height: 210, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 20, borderRadius: 14 }}>
          <Image source={require('./../../assets/icon/bar5.png')}
            style={{
              height: 96, width: responsiveWidth(90), alignSelf: 'center', borderTopLeftRadius: 14, borderTopRightRadius: 14
            }} />

          <View style={{ flex: 1, alignItems: 'center' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), marginLeft: 5, fontWeight: '500', textAlign: 'center' }}>{item.name}</Text>
              <Image source={require('./../../assets/icon/locate.png')}
                style={{
                  height: 12, width: 11.6, left: 4
                }} />
              <Text style={{ color: '#E16DFF', fontSize: responsiveFontSize(1.6), marginLeft: 7, fontWeight: '500', textAlign: 'center' }}>{item.distance}</Text>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', bottom: 20 }}>
            <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.4), fontWeight: '500', textAlign: 'center' }}>{item.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
        style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

        <View>
          <View style={{ flexDirection: 'row', paddingLeft: 20, height: 60, justifyContent: 'space-between', paddingRight: 20, paddingTop: 15 }}>

            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: profilePicture }}
                  style={{
                    height: 34, width: 34, borderRadius: 17,
                  }} />
                <Image source={require('./../../assets/icon/menu.png')}
                  style={{
                    height: 14, width: 19, left: 5, top: 10
                  }} />
              </View>
            </TouchableOpacity>

            <Image source={require('./../../assets/icon/Location.png')}
              style={{
                height: 15, width: 15, marginTop: 9, left: 17
              }} />

            <View style={{ width: responsiveWidth(30), height: 50 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.5), top: 8, left: 5 }}>
                  Noida, Uttar Pradesh
                </Text>
              </ScrollView>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('notify')}>
              <Image source={require('./../../assets/icon/Notification.png')}
                style={{
                  height: 28, width: 25
                }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('wallet')}>
              <Image source={require('./../../assets/icon/Twenty.png')}
                style={{
                  height: 31, width: 54,
                }} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ alignSelf: 'center', marginTop: responsiveHeight(2) }}>
          <View style={{
            justifyContent: 'center',
            width: responsiveWidth(60),
            height: responsiveHeight(8),
            flexDirection: 'row',
          }}>

            <TouchableOpacity onPress={handleArtistPress} style={{
              height: 37, width: responsiveWidth(20),
              backgroundColor: activeButton === 'artist' ? '#5638AC' : 'transparent',
              borderRadius: 30, justifyContent: 'center'
            }}>

              <Text style={{
                textAlign: 'center', fontSize: responsiveFontSize(1.7),
                color: activeButton === 'artist' ? '#FFFFFF' : '#808080',
                fontWeight: '600'
              }}>Artist</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleVenuesPress} style={{
              height: 37, width: responsiveWidth(20),
              backgroundColor: activeButton === 'venues' ? '#5638AC' : 'transparent',
              borderRadius: 30, justifyContent: 'center', marginLeft: 2
            }}>
              <Text style={{
                textAlign: 'center', fontSize: responsiveFontSize(1.7),
                color: activeButton === 'venues' ? '#FFFFFF' : '#808080',
                fontWeight: '600'
              }}>Venues</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row', left: responsiveWidth(66), marginTop: 10, bottom: 30 }}>
            <TouchableOpacity onPress={() => setShownModal(!shownModal)}>
              <Image source={require('./../../assets/icon/Search.png')}
                style={{
                  height: 22, width: 22, marginLeft: responsiveWidth(4)
                }} />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={shownModal}
              onRequestClose={() => {
                setShownModal(!shownModal);
              }}>
              <TouchableWithoutFeedback onPress={() => setShownModal(false)}>

                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={{ width: responsiveWidth(90), height: 50, backgroundColor: '#333333', borderRadius: 10, marginTop: responsiveHeight(16) }}>
                      <Image source={require('./../../assets/icon/Search2.png')} style={{ height: 18, width: 18, marginTop: responsiveHeight(2.2), marginLeft: responsiveWidth(4) }} />

                      <TextInput
                        style={styles.input}
                        placeholder="Search by artist name"
                        placeholderTextColor={'#808080'}
                        value={search}
                        onChangeText={(text) => {
                          setSearch(text);
                          fetchArtistData(); // Call getArtistList to filter the data as you type
                        }}
                      />

                      {activeButton === 'artist' ? (
                        <FlatList
                          data={filteredArtistData}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                        />
                      ) : (
                        <FlatList
                          data={filteredVenueData}
                          renderItem={renderItems}
                          keyExtractor={item => item.id}
                        />
                      )}


                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image source={require('./../../assets/icon/Filter.png')}
                style={{
                  height: 21, width: 19, marginLeft: responsiveWidth(4)
                }} />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.centeredView2}>
                  <View style={styles.modalView2}>

                    <Text style={{ color: '#FFFFFF', marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2), fontWeight: '500' }}>Filter</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Image source={require('./../../assets/icon/cross.png')}
                        style={{
                          height: 14, width: 14, marginTop: responsiveHeight(1), bottom: 22, marginLeft: responsiveWidth(60)
                        }} />
                    </TouchableOpacity>

                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginRight: responsiveWidth(54) }}>By Artist</Text>

                    <TouchableOpacity style={{ height: 50, width: responsiveWidth(76), alignSelf: 'center', marginTop: responsiveHeight(1), borderRadius: 30, justifyContent: 'center', backgroundColor: '#383838' }}>
                      <CustomDropdown data={allArtist} selectedValue={selectedValue} onSelect={onSelectItem} />

                      <Image source={require('./../../assets/icon/dropdown.png')}
                        style={{
                          height: 6, width: 7.25, marginTop: responsiveHeight(1), marginLeft: responsiveWidth(65), position: 'absolute'
                        }} />
                    </TouchableOpacity>

                    <View>
                      <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginTop: responsiveHeight(1.5), right: 15 }}>By date</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <DatePicker
                            modal
                            mode="date"
                            open={fromDateOpen}
                            date={fromDate || new Date()} // Ensure date is a Date object
                            onConfirm={(selectedDate) => {
                              setFromDateOpen(false);
                              setFromDate(selectedDate);
                            }}
                            onCancel={() => {
                              setFromDateOpen(false);
                            }}
                            customStyles={{
                              dateText: {
                                color: '#FFFFFF',
                                fontSize: 20, // adjust the font size as needed
                                fontWeight: 'bold', // adjust the font weight as needed
                              },
                            }}
                          />

                          <TouchableOpacity
                            onPress={() => setFromDateOpen(true)} style={{ justifyContent: 'center', height: 46, width: 122, marginTop: responsiveHeight(0.5), borderRadius: 30, backgroundColor: '#383838', right: 25 }}>
                            <Text style={{ marginLeft: 20, color: fromDate ? "#fff" : '#d3d3d3' }}>{fromDate ? fromDate.toLocaleDateString() : "From date"}</Text>
                          </TouchableOpacity>
                        </View>

                        <View>
                          <DatePicker
                            modal
                            mode="date"
                            open={toDateOpen}
                            date={toDate || new Date()} // Ensure date is a Date object
                            onConfirm={(selectedDate) => {
                              setToDateOpen(false);
                              setToDate(selectedDate);
                            }}
                            onCancel={() => {
                              setToDateOpen(false);
                            }}
                            customStyles={{
                              dateText: {
                                color: '#FFFFFF',
                                fontSize: 20,
                                fontWeight: 'bold',
                              },
                            }}
                          />

                          <TouchableOpacity
                            onPress={() => setToDateOpen(true)} style={{ justifyContent: 'center', height: 46, width: 122, marginTop: responsiveHeight(0.5), borderRadius: 30, backgroundColor: '#383838', right: 20 }}>
                            <Text style={{ marginLeft: 20, color: toDate ? "#fff" : '#d3d3d3' }}>{toDate ? toDate.toLocaleDateString() : "To date"}</Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                    <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.7), marginRight: responsiveWidth(50), marginTop: responsiveHeight(2) }}>By Distance</Text>

                    <Slider
                      style={{ height: 50, width: responsiveWidth(76) }}
                      minimumValue={0} // Adjusted minimumValue to start from 0 to make the calculation easier
                      maximumValue={49} // Adjusted maximumValue to end at 49 instead of 50
                      minimumTrackTintColor="#C70FF7"
                      maximumTrackTintColor="#d3d3d3"
                      thumbTintColor='#C70FF7'
                      value={rangeValue}
                      onValueChange={(value) => setRangeValue(value)}
                    />
                    <Text style={{ color: '#d3d3d3', bottom: 12, fontSize: responsiveFontSize(1.6) }}>{distanceFrom} Km - {distanceTo} Km</Text>

                    <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1) }}>
                      <TouchableOpacity onPress={() => {
                        setModalVisible(false)
                      }}>
                        <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(16), top: 10 }}>Clear All</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={handleApply} style={{ height: 40, width: responsiveWidth(30), backgroundColor: '#C70FF7', borderRadius: 20, justifyContent: 'center', marginLeft: responsiveWidth(6) }}>
                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), alignSelf: 'center' }}>Apply</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}>
              <Image source={require('./../../assets/icon/Subtract.png')}
                style={{
                  height: 20, width: 25, marginLeft: responsiveWidth(4)
                }} />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={modalVisible2}
              onBackdropPress={() => this.setModalVisible(false)} // Corrected this line
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
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalBack}
          onRequestClose={() => {
            setModalBack(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalBack(false)}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <View style={{ backgroundColor: '#333333', padding: 20, width: responsiveWidth(85), borderRadius: 20 }}>
                <Text style={{ color: '#C70FF7', fontSize: responsiveFontSize(2.2), fontWeight: '500', marginTop: 10 }}>Confirm Exit!</Text>
                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), marginTop: 10 }}>Are you sure you want to exit?</Text>
                <View style={{ flexDirection: 'row', marginTop: 30, left: responsiveWidth(22), marginBottom: 10 }}>
                  <TouchableOpacity style={{ borderColor: '#830FD1', width: responsiveWidth(25), borderRadius: 20, borderWidth: 2 }} onPress={() => setModalBack(false)}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), marginTop: 10, marginBottom: 10, textAlign: 'center', fontWeight: '500' }}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: '#830FD1', width: responsiveWidth(25), borderRadius: 20, left: 10 }} onPress={() => BackHandler.exitApp()}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), marginTop: 10, marginBottom: 10, textAlign: 'center', fontWeight: '500' }}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View>

          {showArtist && (
            <View>
              {/* Render ActivityIndicator if artistData is empty */}
              {isLoading ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                </View>
              ) : (
                <View>
                  {artistData.length === 0 ? (
                    <Image source={require('./../../assets/icon/no-data.png')}
                      style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(20) }} />
                  ) : (
                    <View style={{ marginBottom: responsiveHeight(20), bottom: 26 }}>
                      <FlatList
                        data={artistData}
                        renderItem={renderItem}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          )}


          {showVenue && (
            <View>
              {/* Render ActivityIndicator if artistData is empty */}
              {isLoading ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color="#C70FF7" style={styles.loader} />
                </View>
              ) : (
                <View>
                  {venueData.length === 0 ? (
                    <Image source={require('./../../assets/icon/no-data.png')}
                      style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(20) }} />
                  ) : (
                    <View style={{ marginBottom: responsiveHeight(20), bottom: 26 }}>
                      <FlatList
                        data={venueData}
                        renderItem={renderItems}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

        </View>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#E16DFF',
  },
  itemContainer: {
    width: '90%',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 14,
  },
  topImage: {
    height: 96,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  profilePicture: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#910BB3',
    position: 'absolute',
    marginTop: responsiveHeight(8)
  },
  statusContainer: {
    flex: 1,
    marginTop: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  statusDot: {
    height: 8,
    width: 8,
    backgroundColor: '#4EDA2C',
    borderRadius: 20,
    top: 4,
  },
  statusText: {
    color: '#d3d3d3',
    fontSize: 13, // Use appropriate responsive font size
    marginLeft: 5,
  },
  artistInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  artistInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 15, // Use appropriate responsive font size
    marginLeft: 5,
    fontWeight: '500',
  },
  locateIcon: {
    height: 12,
    width: 11.6,
    marginLeft: 5,
  },
  distanceText: {
    color: '#E16DFF',
    fontSize: 12, // Use appropriate responsive font size
    marginLeft: 5,
    fontWeight: '500',
  },
  ratingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
  },
  ratingIcon: {
    height: 10,
    width: 10,
    top: 5,
  },
  ratingText: {
    color: '#d3d3d3',
    fontSize: 14, // Use appropriate responsive font size
    marginLeft: 5,
    fontWeight: '500',
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  locationText: {
    color: '#d3d3d3',
    fontSize: 11, // Use appropriate responsive font size
    fontWeight: '500',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080', // Semi-transparent background
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
  backModalView: {
    margin: 20,
    width: Dimensions.get('screen').width,
    height: responsiveHeight(80),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    borderRadius: 20,
    padding: 10,
    left: 120,
    height: 40,
    width: 50,
    bottom: 120,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha value (0.8 here) for the desired transparency
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
  input: {
    width: responsiveWidth(75),
    height: responsiveHeight(6),
    left: 50,
    color: '#FFFFFF',
    position: 'absolute',

  },
  modalView2: {
    margin: 20,
    width: responsiveWidth(85),
    height: 410,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(5)
  },
  wrapper: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  dropdownContainer: {
    position: 'relative',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 5,
    zIndex: 1,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default HomePage;

