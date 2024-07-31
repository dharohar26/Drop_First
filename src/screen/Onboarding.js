//import liraries
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Slides from './Onboarding/Slides.';

// create a component
const Onboarding1 = ({ navigation }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTitle, setCurrentTitle] = useState(Slides[currentIndex]?.title);
    const [currentDescription, setCurrentDescription] = useState(Slides[currentIndex]?.description);
    const ref = useRef();

    const handleNext = () => {
        if (currentIndex < Slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentTitle(Slides[currentIndex + 1]?.title);
            setCurrentDescription(Slides[currentIndex + 1]?.description);
        } else {
            navigation.navigate('choose');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#48260D" barStyle="dark-content" />

            <FlatList
                ref={ref}
                data={Slides}
                scrollEnabled={false}
                pagingEnabled
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}>
                            <ImageBackground source={require('./../../assets/icon/Onboarding.png')}
                                style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>

                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.4), marginTop: responsiveHeight(75), marginLeft: responsiveWidth(8), fontWeight: '500' }}>{currentTitle}</Text>
                                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8), marginLeft: responsiveWidth(8), marginRight: responsiveWidth(5) }}>{currentDescription}</Text>

                                <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: 120 }}>
                                    {Slides.map((item, index) => {
                                        return (
                                            <View key={index} style={{
                                                width: currentIndex === index ? 30 : 8,
                                                height: currentIndex === index ? 10 : 8,
                                                borderRadius: currentIndex === index ? 5 : 4,
                                                backgroundColor: currentIndex === index ? '#FFFFFF' : '#808080',
                                                marginLeft: 5
                                            }} />
                                        );
                                    })}
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, marginTop: responsiveHeight(3) }}>
                                    {currentIndex !== Slides.length - 1 && (
                                        <TouchableOpacity onPress={() => navigation.navigate('choose')}>
                                            <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(2.4) }}>Skip</Text>
                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity onPress={handleNext}>
                                        <Image source={require('./../../assets/icon/Group.png')}
                                            style={{ height: 46, width: 46, marginLeft: responsiveWidth(63), bottom: 22, marginRight: 20 }} />
                                    </TouchableOpacity>
                                </View>

                            </ImageBackground>
                        </View>
                    )
                }}
            />

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
export default Onboarding1;
