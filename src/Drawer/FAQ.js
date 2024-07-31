//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Collapsible from 'react-native-collapsible';

// create a component
const FAQScreen = ({navigation}) => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [collapsed, setCollapsed] = useState(true); // state to manage 

    const [collapse1, setCollapse1] = useState(true);
    const [collapse2, setCollapse2] = useState(true);
    const [collapse3, setCollapse3] = useState(true);
    const [collapse4, setCollapse4] = useState(true);

    // Add more collapse states as needed

    const goBack = () => {
        navigation.goBack();
    };
    
    const toggleCollapse1 = () => {
        setCollapse1(!collapse1);
    };

    const toggleCollapse2 = () => {
        setCollapse2(!collapse2);
    };

    const toggleCollapse3 = () => {
        setCollapse3(!collapse3);
    };

    const toggleCollapse4 = () => {
        setCollapse4(!collapse4);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row' }}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require('./../../assets/icon/backarrow.png')}
                                style={{
                                    height: 34, width: 34, marginLeft: 20
                                }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#FFFFFF', marginLeft: responsiveWidth(30), alignSelf: 'center', fontWeight: '500', fontSize: responsiveFontSize(2) }}>FAQ's</Text>
                    </View>

                    <TouchableOpacity onPress={toggleCollapse1} style={{marginTop:20}}>
                        <View style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20}}>
                            <Text style={styles.placeholderStyle}>How to do lorem ipsum dolro?</Text>
                            <Image source={require('./../../assets/icon/purpledrop.png')}
                                style={{
                                    height: 6.2, width: 12,top:6
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse1}>
                        <View style={{height:200,width:responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)',alignSelf:'center',marginTop:10,borderRadius:12}}>
                            <Text style={{color:'#FFFFFF',marginLeft:25,marginRight:25,marginTop:20,textAlign:'justify'}}>Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appear Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random.</Text>
                        </View>
                    </Collapsible>

                    <TouchableOpacity onPress={toggleCollapse2}>
                    <View style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20}}>
                            <Text style={styles.placeholderStyle}>How to do lorem ipsum dolro?</Text>
                            <Image source={require('./../../assets/icon/purpledrop.png')}
                                style={{
                                    height: 6.2, width: 12,top:6
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse2}>
                    <View style={{height:200,width:responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)',alignSelf:'center',marginTop:10,borderRadius:12}}>
                            <Text style={{color:'#FFFFFF',marginLeft:25,marginRight:25,alignSelf:'center',marginTop:20}}>Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appear Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random.</Text>
                        </View>
                    </Collapsible>

                    <TouchableOpacity onPress={toggleCollapse3}>
                    <View style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20}}>
                            <Text style={styles.placeholderStyle}>How to do lorem ipsum dolro?</Text>
                            <Image source={require('./../../assets/icon/purpledrop.png')}
                                style={{
                                    height: 6.2, width: 12,top:6
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse3}>
                    <View style={{height:200,width:responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)',alignSelf:'center',marginTop:10,borderRadius:12}}>
                            <Text style={{color:'#FFFFFF',marginLeft:25,marginRight:25,alignSelf:'center',marginTop:20}}>Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appear Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random.</Text>
                        </View>
                    </Collapsible>


                    <TouchableOpacity onPress={toggleCollapse4}>
                    <View style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20}}>
                            <Text style={styles.placeholderStyle}>How to do lorem ipsum dolro?</Text>
                            <Image source={require('./../../assets/icon/purpledrop.png')}
                                style={{
                                    height: 6.2, width: 12,top:6
                                }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse4}>
                    <View style={{height:200,width:responsiveWidth(90),backgroundColor: 'rgba(51, 51, 51, 0.5)',alignSelf:'center',marginTop:10,borderRadius:12}}>
                            <Text style={{color:'#FFFFFF',marginLeft:25,marginRight:25,alignSelf:'center',marginTop:20}}>Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appear Random text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random is the basic structure of how text will be gr appearRandom text lorem ipsum dolor sit lorem ipsum random.</Text>
                        </View>
                    </Collapsible>


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
    dropdown: {
        height: 55,
        width: responsiveWidth(90),
        borderRadius: 12,
        paddingHorizontal: 8,
        alignSelf: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        marginTop: 12,
        justifyContent:'center'
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: responsiveWidth(5)
    },
    placeholderStyle: {
        fontSize: responsiveFontSize(1.9),
        color: '#C70FF7',
        paddingLeft: 15
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#FFFFFF',
        paddingLeft: 30
    },
    blur: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default FAQScreen;
