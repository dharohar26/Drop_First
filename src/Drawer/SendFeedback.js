//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar,ImageBackground,ScrollView,TouchableOpacity,Image,TextInput,Modal,TouchableWithoutFeedback} from 'react-native';
import { responsiveHeight,responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

// create a component
const SendFeedBack = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#120219" barStyle="dark-content" />
            <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                <ScrollView>
                    <View style={{marginTop: responsiveHeight(4)}}>
                        <TouchableOpacity onPress={goBack}>
                        <Image source={require('./../../assets/icon/backarrow.png')}
                            style={{
                                height: 34, width: 34,marginLeft:20
                            }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{bottom:30}}>
                            <Text style={{color:'#FFFFFF',fontSize:responsiveFontSize(2.5),alignSelf:'center',fontWeight:'500'}}>Feedback</Text>
                            <Text style={{color:'#808080',fontSize:responsiveFontSize(1.5),alignSelf:'center',marginTop:5}}>Send us feedbacks that you have in my</Text>
                            <Text style={{color:'#808080',fontSize:responsiveFontSize(1.5),alignSelf:'center'}}>mind. This helps us ipmrove our app</Text>
                    </View>
                    
                    <TextInput
                        placeholder="Random text"
                        placeholderTextColor={"#808080"}
                        style={styles.blurredInput}
                        />


<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
                                style={{ height: 53, width: responsiveWidth(90), backgroundColor: '#808080', alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: responsiveHeight(2) }}>
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
                                    <Text style={{ alignSelf: 'center', color: '#FFFFFF',fontSize:responsiveFontSize(2.2),fontWeight:'500' }}>Send</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                                    <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Image source={require('./../../assets/icon/withdraw.png')}
                                            style={{
                                                height: 72, width: 72, marginTop: responsiveHeight(2), borderRadius: 12,
                                            }} />

                                        <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.4), fontWeight: '500', marginTop: 20 }}>Feedback sent Successfully</Text>
                                        <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500', marginTop: 10 }}>Rendom text lorem ipsum rendom text</Text>
                                        <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500',  }}>dolor sit lorem ipsum rendom text</Text>
                                        <Text style={{ color: '#d3d3d3', fontSize: responsiveFontSize(1.7), fontWeight: '500',}}>lorem dolor</Text>
                                    </View>
                                </View>
                                    </TouchableWithoutFeedback>
                           
                            </Modal>
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
    blurredInput: {
        height: 280,
        width: responsiveWidth(90),
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#FFFFFF',
        marginTop: 10,
        paddingLeft: 20,
        paddingBottom: 230,
        backgroundColor: 'rgba(51, 51, 51, 0.5)', // Keeping the style always blurred
    },
      focusedInput: {
        backgroundColor: '#333333',
      },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.8 here) for the desired transparency
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('screen').width-60,
        height: responsiveHeight(30),
        backgroundColor: 'rgba(51, 51, 51, 0.98)', 
        alignItems: 'center',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});

//make this component available to the app
export default SendFeedBack;
