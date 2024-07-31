//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,StatusBar,ImageBackground,Image,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions';
import Share from 'react-native-share';

// create a component
const Referrals = ({navigation}) => {

    const data = [1,1,1,1]
    const goBack = () => {
        navigation.goBack();
    };

    const share = () => {
        const options = {
            message:'Hello dharohar'
        }
        Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }
  
    const renderItem = ({ item }) => {
        return (
          <View style={{ height: 104, width: responsiveWidth(90), borderRadius: 20, backgroundColor: 'rgba(51, 51, 51, 0.6)',alignSelf:'center',marginTop:10}}>
            <View style={{flexDirection:'row',marginLeft:20,marginTop:10}}>
                <Image source={require('./../../assets/icon/Maddy.png')}
                                style={{
                                    height: 24, width: 24
                                }} />
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8),left:10}}>Patrick Bateman</Text>
            </View>

            <View style={{flexDirection:'row',marginLeft:53,marginTop:10}}>
                <Image source={require('./../../assets/icon/right.png')}
                                style={{
                                    height: 15, width: 15
                                }} />
                <Text style={{ color: '#4EDA2C', fontSize: responsiveFontSize(1.8),left:8,bottom:5}}>Registered</Text>
                <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8),left:90,bottom:5,marginRight:20}}>08 August 2023</Text>
            </View>


            <View style={{flexDirection:'row',marginLeft:53,marginTop:10}}>
                <Image source={require('./../../assets/icon/clock.png')}
                                style={{
                                    height: 15, width: 15
                                }} />
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8),left:8,bottom:5}}>Amount Spent ₹50</Text>
                <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.8),left:90,bottom:5,marginRight:20}}>Pending</Text>
            </View>
          </View>
        );
      };
      

    return (
        <View style={styles.container}>
 <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                    <View style={{flexDirection:'row', marginTop: responsiveHeight(4),paddingLeft:20}}>
                    <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34
                            }} />
                        </TouchableOpacity>
            
                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2),alignSelf:'center',left:110}}>Referrals</Text>
                    </View> 
                    
                    <TouchableOpacity
                        onPress={share} 
                        style={{height:52,width:responsiveWidth(90),borderWidth:1,borderColor:'#C70FF7',alignSelf:'center',borderRadius:30,marginTop:20,justifyContent:'center'}}>
                        <Text style={{color:'#C70FF7',fontSize:responsiveFontSize(1.9),alignSelf:'center'}}>Refer Now</Text>
                    </TouchableOpacity>

<Text style={{color:'#0A6FE4',fontSize:responsiveFontSize(1.8),marginLeft:30,marginTop:20,fontWeight:'500'}}>History</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        />
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Referrals;
