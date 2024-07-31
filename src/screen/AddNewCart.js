//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,StatusBar,ImageBackground,Image,TouchableOpacity,ScrollView,TextInput } from 'react-native';
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

// create a component
const AddNewCart = ({navigation}) => {

    const [isFocused, setIsFocused] = useState(false)

    const handleBlur = () => {
      setIsFocused(false);
      console.log('Input field has been blurred');
    };

    return (
        <View style={styles.container}>
  <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{flexDirection:'row', marginTop: responsiveHeight(4),paddingLeft:20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('wallet')}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34
                            }} />
                        </TouchableOpacity>

                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2),alignSelf:'center',left:50}}>Add new credit/debit card</Text>
                    </View>  

                <Text style={{color:'#C70FF7',marginLeft:30,marginTop:30}}>Card Number</Text>
            
<TextInput
      onBlur={handleBlur}
      onFocus={() => setIsFocused(true)}
      style={[
        styles.input,
        isFocused ? styles.focusedInput : styles.blurredInput,
      ]}
    />

<Text style={{color:'#C70FF7',marginLeft:30,marginTop:12}}>Cardholder name</Text>
            
            <TextInput
                  onBlur={handleBlur}
                  onFocus={() => setIsFocused(true)}
                  style={[
                    styles.input,
                    isFocused ? styles.focusedInput : styles.blurredInput,
                  ]}
                />

<Text style={{color:'#C70FF7',marginLeft:30,marginTop:12}}>Expiry</Text>
            
            <TextInput
                    placeholder="MM-YYYY"
                     placeholderTextColor={"#808080"}
                  onBlur={handleBlur}
                  onFocus={() => setIsFocused(true)}
                  style={[
                    styles.input,
                    isFocused ? styles.focusedInput : styles.blurredInput,
                  ]}
                />

<TouchableOpacity onPress={() => { navigation.navigate('wallet') }} style={{ height: 55, width: responsiveWidth(90), backgroundColor: '#808080',alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop:responsiveHeight(22)}}>
                        <LinearGradient
                            colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                            start={{ x: 0, y: 0 }} // Gradient start point
                            end={{ x: 1, y: 0 }} // Gradient end point
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 30
                            }}
                        >
                            <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Add</Text>
                        </LinearGradient>
                    </TouchableOpacity>

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
    input: {
        height: 55,
        width:responsiveWidth(90),
        alignSelf:'center',
        paddingHorizontal: 10,
        borderRadius: 30,
        color: '#FFFFFF',
        marginTop:10,
        paddingLeft:20
      },
      focusedInput: {
        backgroundColor: '#333333',
      },
      blurredInput: {
        // Styles for blurred input
        backgroundColor: 'rgba(51, 51, 51, 0.5)', 
      },
});

//make this component available to the app
export default AddNewCart;
