import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HomePage from './HomePage';

const CustomDrawerContent = ({ navigation, ...props }) => {

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View style={styles.drawerHeader}>
        <ImageBackground source={require('./../../assets/icon/Mask.png')}
          style={{ height: responsiveHeight(100), width: responsiveWidth(70) }}>
          <Image source={require('./../../assets/icon/DROP.png')}
            style={{
              height: 100, width: 80, alignSelf: 'center', marginTop: responsiveHeight(4)
            }} />
          <View>
            <TouchableOpacity onPress={() => 
              navigation.navigate('myprofile')} >
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>My Profile</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                    style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('mybooking')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>My Bookings</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('notification')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Notification Setting</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('refer')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Referrals</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('transaction')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Transaction History</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('help')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Help</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('condition')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Term & Conditions</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('policy')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Privacy Policy</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('security')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Security & Privacy</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>FAQ's</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('feedback')}>
              <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 20, marginTop: responsiveHeight(4), justifyContent: 'space-between' }}>
                <Text style={{ color: '#FFFFFF', fontSize: responsiveFontSize(1.8) }}>Send Feedback</Text>

                <Image source={require('./../../assets/icon/Next.png')}
                  style={{ height: 16, width: 7 }}
                />
              </View>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
      {/* Default drawer items */}
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

export default function SideDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000000',
          width: responsiveWidth(70),
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#A0A0A0',
        drawerActiveBackgroundColor: '#C70FF7',
        drawerInactiveBackgroundColor: '#000000',
      }}>


      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false, drawerItemStyle: {
            display: 'none',
          }
        }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  bottomComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  drawerHeader: {
    flex: 1,
    backgroundColor: '#000000',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderRightWidth: 1.5,
    borderColor: '#C70FF7',
    overflow: 'hidden', // Clip overflow to make sure borderRadius is applied
  },
});


// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomePage from './HomePage';
// import MyProfile from './Myprofile';


// const Drawer = createDrawerNavigator();

// export default function SideDrawer() {
//   return (
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="home" component={HomePage}  options={{
//           headerShown: false, drawerItemStyle: {
//             display: 'none',
//           }
//         }} />
//         <Drawer.Screen name="myprofile" component={MyProfile} />
//       </Drawer.Navigator>
//   );
// }

