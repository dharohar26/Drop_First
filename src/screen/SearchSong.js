import React, { Component, useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, ImageBackground, FlatList, Alert,ActivityIndicator} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import SharedPreferences from 'react-native-shared-preferences';

const SearchSong = ({ navigation }) => {

  const [getSong, setGetSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [artistId, setArtistId] = useState("");

  const goBack = () => {
    navigation.goBack();
};

  SharedPreferences.getItem("query", function (value) {
    setQuery(value);
    console.log("query", value);
  })
  
  SharedPreferences.getItem("artistId", function (value) {
    setArtistId(value);
    console.log("artistId", value);
  })

  const getSongList = async (txt) => {
    setIsLoading(true);
    try {
      var SharedPreferences = require('react-native-shared-preferences');
      SharedPreferences.getItem("token", function (value) {
        console.log("homeToken", value);

        if (value && query && artistId) {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", value);

          const queryParams = new URLSearchParams({
            query: query,
            artistId: artistId
          });

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };

          // Main API calling function
          fetch("http://62.72.57.205:8092/search?" + queryParams, requestOptions)
            .then(async response => {
              if (response.status == 200) {
                console.log("API uhusahyudhush:", response.status);
                return response.json();
              } else {
                const data = await response.json();
                console.log("API uhusahyudhush:", response.status);
                throw new Error(data.message || 'Request failed with status ' + response.status);
              }
            })
            .then(responseData => {
              console.log("API Response:", responseData);
              if (responseData.result) {
                setGetSong(responseData.result);
                console.log("set", responseData.result);
                setIsLoading(false);
              }
            })
            .catch(error => {
              console.log("API Error:", error);
              Alert.alert("Error", error.message || "Unknown error occurred");
              setIsLoading(false);
            });
        } else {
          console.log("No token available.");
        }
      });
    } catch (error) {
      console.log("Error retrieving token:", error);
      setIsLoading(false);
    }
  };

  useEffect((item) => {
    getSongList();
  }, [query, artistId]);


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        SharedPreferences.setItem("name",item.name); 
        SharedPreferences.setItem("artist",item.artist); 
        SharedPreferences.setItem("image",item.image);
        SharedPreferences.setItem("id",item.id);  
        SharedPreferences.setItem("artistAmount",item.artistAmount.toString()); 
        console.log("NAME=",item.name)
        navigation.navigate('request')
      }}>
        <View style={{ height: 80, width: responsiveWidth(90), backgroundColor: 'rgba(51, 51, 51, 0.5)', alignSelf: 'center', marginTop: 20, borderRadius: 12, justifyContent: 'center'}}>
          <View style={{ flexDirection: 'row',marginRight:20}}>
            <Image source={{ uri: item.image }}
              style={{
                height: 60, width: 60, marginLeft: 10, marginTop: 20,borderRadius:10
              }} />

            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.6), fontWeight: '400', marginLeft: 14, top: 26 }}>{item.name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./../../assets/icon/Eee.png')}
              style={{
                height: 12, width: 12, marginLeft: 85, bottom: 28
              }} />
            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.6), fontWeight: '400', bottom: 32, left: 7 }}>{item.artist}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
        style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(4), paddingLeft: 20 }}>
          <TouchableOpacity onPress={goBack}>
            <Image source={require('./../../assets/icon/backarrow.png')}
              style={{
                height: 34, width: 34
              }} />
          </TouchableOpacity>

          <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2), alignSelf: 'center', left: 80 }}>Song search results</Text>
        </View>

        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#C70FF7"/>
          </View>
        )}
        {!isLoading && (
          <FlatList
            data={getSong}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}

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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default SearchSong; 
