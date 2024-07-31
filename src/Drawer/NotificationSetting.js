//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,StatusBar,ImageBackground,Image,TouchableOpacity,ScrollView,Switch } from 'react-native';
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions';

// create a component
const NotificationSetting = ({navigation}) => {

    const [isOn, setIsOn] = useState(true);
    const [isOn2, setIsOn2] = useState(false);
    const [isOn3, setIsOn3] = useState(true);

    const toggleSwitch = () => setIsOn(isOn => !isOn);
    const toggleSwitch2 = () => setIsOn2(isOn => !isOn);
    const toggleSwitch3 = () => setIsOn3(isOn => !isOn);
    
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    {/* <View style={{flexDirection:'row', marginTop: responsiveHeight(4),paddingLeft:20}}> */}
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34,marginLeft:15,top:20
                            }} />
                        </TouchableOpacity>
            
                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2),textAlign:'center', marginTop:24,marginLeft:responsiveWidth(18)}}>Notification Setting</Text>
                    </View>
                    
                    {/* </View>   */}

                    <View style={{height:206,width:responsiveWidth(93),backgroundColor:'rgba(51, 51, 51, 0.5)',alignSelf:'center',marginTop:30,borderRadius:20}}>
                        <View style={{flexDirection:'row',marginTop:20,justifyContent: 'space-between',marginLeft:20,marginRight:20}}>
                        <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2),}}>In-App Notifications</Text>

                        <View>
                            <TouchableOpacity style={[styles.outter,isOn 
                                    ? {justifyContent:'flex-end',backgroundColor:'#14D010'}
                                    :  {justifyContent:'flex-start',backgroundColor:'#D01010'} ]} 
                                    onPress={toggleSwitch}>
                            <View style={styles.inner}/>
                            </TouchableOpacity>
                        </View>
                        </View>

                            <View style={{marginLeft:20,marginRight:20}}>
                            <Text style={{ color: '#D01010', fontSize: responsiveFontSize(1.6) }}>
                                    Cautions:  
                                    <Text style={{ color: '#808080' }}> When turned off, you won't receive notifications like payment, song statuses, and so on
                                    </Text>
                                    </Text>                            
                            </View>

                            <View style={{flexDirection:'row',marginTop:20,justifyContent: 'space-between',marginLeft:20,marginRight:20}}>
                        <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2),}}>SMS Notifications</Text>
                        <View>
                            <TouchableOpacity style={[styles.outter,isOn2 
                                    ? {justifyContent:'flex-end',backgroundColor:'#14D010'}
                                    :  {justifyContent:'flex-start',backgroundColor:'#D01010'} ]} 
                                    onPress={toggleSwitch2}>
                            <View style={styles.inner}/>
                            </TouchableOpacity>
                        </View>
                        </View>

                        <View style={{flexDirection:'row',marginTop:20,justifyContent: 'space-between',marginLeft:20,marginRight:20}}>
                        <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2),}}>Email Notifications</Text>
                        <View>
                            <TouchableOpacity style={[styles.outter,isOn3 
                                    ? {justifyContent:'flex-end',backgroundColor:'#14D010'}
                                    :  {justifyContent:'flex-start',backgroundColor:'#D01010'} ]} 
                                    onPress={toggleSwitch3}>
                            <View style={styles.inner}/>
                            </TouchableOpacity>
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
    inner:{
        width:23,
        height: 23,
        backgroundColor:'#fff',
        borderRadius: 15,
        elevation:8,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.15,
        shadowRadius: 2
    },
    outter:{
        width:50,
        height: 27,
        backgroundColor:'gray',
        borderRadius: 15,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal: 2,
    }
});

//make this component available to the app
export default NotificationSetting;
