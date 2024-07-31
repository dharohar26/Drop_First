//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,ScrollView,TouchableOpacity,Image} from 'react-native';
import { responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions';
import { responsiveWidth } from 'react-native-responsive-dimensions';

// create a component
const AddMoney = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <ScrollView>
            <View style={{flexDirection:'row', marginTop: responsiveHeight(3)}}>
                        <TouchableOpacity onPress={() => navigation.navigate('wallet')}>
                        <Image source={require('./../../assets/icon/back.png')}
                            style={{
                                height: 34, width: 34,marginLeft:20
                            }} />
                        </TouchableOpacity>
                        <Text style={{color:'#222',fontSize:responsiveFontSize(2.1),alignSelf:'center',left:responsiveWidth(25),fontWeight:'500'}}>Add Money</Text>
                    </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
});

//make this component available to the app
export default AddMoney;
