//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,ScrollView,StatusBar,Image,TouchableOpacity} from 'react-native';
import { responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const WalletScreen = ({navigation}) => {
    const goBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{flexDirection:'row', marginTop: responsiveHeight(4),paddingLeft:20}}>
                        <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34
                            }} />
                        </TouchableOpacity>

                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2.2),alignSelf:'center',left:120}}>Wallet</Text>
                    </View>

                    <View style={{alignSelf:'center',marginTop:20}}>
                        <Text style={{color:'#C70FF7',paddingLeft:10,fontSize:responsiveFontSize(1.8),fontWeight:'500'}}>Drop Wallet</Text>
                        <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={styles.imageBackground}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:15,paddingLeft:15,marginTop:20}}>
                            <Image source={require('./../../assets/icon/cart.png')}
                            style={{
                                height: 15, width: 20,marginTop:10
                            }} />
                            <Text style={{color:'#808080',fontSize:responsiveFontSize(1.7)}}>Wallet Balance</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('addmoney')}>
                                <Text style={{color:'#1DA2ED',fontSize:responsiveFontSize(1.7),left:18}}>Add Money</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('withdraw')}>
                                <Text style={{color:'#42FE13',fontSize:responsiveFontSize(1.7)}}>Withdraw</Text>
                            </TouchableOpacity>
                            </View>
                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(1.7),marginLeft:70}}>50</Text>

                            <Image source={require('./../../assets/icon/line.png')}
                            style={{
                                height: 1, width: responsiveWidth(80),marginTop:10,alignSelf:'center'
                            }} />

                    <View style={{flexDirection:'row',paddingRight:15,paddingLeft:15,marginTop:10}}>
                            <Image source={require('./../../assets/icon/cart.png')}
                            style={{
                                height: 15, width: 20,marginTop:10
                            }} />
                            <Text style={{color:'#808080',fontSize:responsiveFontSize(1.7),left:responsiveWidth(7)}}>Referral wallet Balance</Text>
                            </View>
                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(1.7),marginLeft:70}}>200</Text>

                            </ImageBackground>

                        </View>

                        <View style={{alignSelf:'center',marginTop:20}}>
                        <Text style={{color:'#C70FF7',paddingLeft:10,fontSize:responsiveFontSize(1.8),fontWeight:'500'}}>UPI Apps</Text>
                        <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={styles.imageBackground}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:15,paddingLeft:15,marginTop:12}}>
                            <Image source={require('./../../assets/icon/Paytm.png')}
                            style={{
                                height: 27, width: 72,marginTop:10
                            }} />
                            <Text style={{color:'#0F8C94',fontSize:responsiveFontSize(1.8),fontWeight:'500',marginTop:10}}>LINKED</Text>
                            </View>

                            <Image source={require('./../../assets/icon/line.png')}
                            style={{
                                height: 1, width: responsiveWidth(80),marginTop:20,alignSelf:'center'
                            }} />

                    <View style={{flexDirection:'row',paddingRight:15,paddingLeft:15,marginTop:10,justifyContent:'space-between'}}>
                            <Image source={require('./../../assets/icon/PhonePay.png')}
                            style={{
                                height: 32, width: 99,marginTop:10
                            }} />
                            <Text style={{color:'#808080',fontSize:responsiveFontSize(1.8),color:'#940F0F',fontWeight:'500',marginTop:10}}>LINK</Text>
                            </View>

                            </ImageBackground>
                            </View>
                        </View>

                        <View style={{alignSelf:'center',marginTop:20}}>
                        <Text style={{color:'#C70FF7',paddingLeft:10,fontSize:responsiveFontSize(1.8),fontWeight:'500'}}>Credit/Debit Cards</Text>
                        <View>
                        <ImageBackground
                            source={require('./../../assets/icon/walletbutton.png')}
                            style={{width:responsiveWidth(90),height:120,marginTop:10}}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={{flexDirection:'row',paddingRight:15,paddingLeft:15,marginTop:12}}>
                            <Image source={require('./../../assets/icon/Credit.png')}
                            style={{
                                height: 38, width: 38,marginTop:10
                            }} />
                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(1.8),fontWeight:'400',marginTop:10,left:20}}>HDFC Debit Card</Text>
                            <TouchableOpacity>
                                    <Image source={require('./../../assets/icon/delete.png')}
                                    style={{
                                        height: 32, width: 32,marginTop:10,left:responsiveWidth(34)
                                    }} />
                            </TouchableOpacity>
                            </View>
                            <Text style={{color:'#808080',fontSize:responsiveFontSize(1.8),marginLeft:responsiveWidth(18),bottom:16}}>XXXX XXXX X234</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('addcart')}>
                                <Text style={{color:'#C70FF7',alignSelf:'center',fontSize:responsiveFontSize(1.8)}}>Add new card</Text>
                            </TouchableOpacity>
                            </ImageBackground>
                            </View>
                        </View>

                        
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
        height:100,
        width:100,
      },
      imageBackground: {
        height: 150,
        width: responsiveWidth(90), // You might need to define responsiveWidth()
        marginTop: 10,
        borderRadius: 12,
        overflow: 'hidden', // Ensures image respects borderRadius
      },
});

//make this component available to the app
export default WalletScreen;
