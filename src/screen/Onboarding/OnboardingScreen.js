import React, { Component } from 'react'
import { Text, View, FlatList,StyleSheet} from 'react-native'
import Slides from './Slides.';
import OnboardingItem from './OnboardingItem';

export default OnboardingScreen = () => {

    return (
        <View style={styles.container}>
          <FlatList 
            data={Slides} 
            renderItem={({item}) => <OnboardingItem item={item}/>} />
        </View>
      );
}

const styles = StyleSheet.create ({

    container: {
        flex:1,
        justifyContent:'center',
        alignItem:'center',
        backgroundColor:'pink'
    },

})

