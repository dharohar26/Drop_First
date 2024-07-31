//import liraries
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screen/Splash';
import Onboarding1 from './src/screen/Onboarding';
import SignUpScreen1 from './src/screen/Signup';
import ChoosePage from './src/screen/ChoosePage';
import OtpVerification from './src/screen/OtpVerifiactaion';
import ChooseGenre from './src/screen/ChooseGenre';
import LoginOtpVerify from './src/screen/LoginOtpVerifify';
import InvalidOTP from './src/screen/InvalidOtp';
import WelcomeScreen from './src/screen/WelcomeScreen';
import ArtistProfile from './src/screen/ArtistProfile';
import Location from './src/screen/Location';
import HomePage from './src/Drawer/HomePage';
import FAQScreen from './src/Drawer/FAQ';
import HelpScreen from './src/Drawer/Help';
import MyBooking from './src/Drawer/MyBooking';
import PrivacyPolicy from './src/Drawer/PrivacyPolicy';
import Security from './src/Drawer/Security';
import SendFeedBack from './src/Drawer/SendFeedback';
import TermsCondition from './src/Drawer/TermsConditions';
import WalletScreen from './src/screen/Wallet';
import AddNewCart from './src/screen/AddNewCart';
import AddMoney from './src/screen/AddMoney';
import WithdrawMoney from './src/screen/WithdrawMoney';
import Notification from './src/screen/Notification';
import PaymentScreen from './src/screen/Payment';
import DeleteAccount from './src/Drawer/DeleteAccount';
import NewHelpRequest from './src/Drawer/NewHelpRequest';
import SongRequestHelp from './src/Drawer/SongRequest';
import TroubleFeedback from './src/Drawer/TroubleRequest';
import ChooseScreen from './src/Drawer/Choose';
import SongProblem from './src/Drawer/SongProblem';
import FacebookScreen from './src/screen/Facebook';
import LoginScreen from './src/screen/Login1';
import MyProfile from './src/Drawer/Myprofile';
import NotificationSetting from './src/Drawer/NotificationSetting';
import SongPay from './src/screen/SongPay';
import PaymentSuccessful from './src/screen/PaymentSuccessful';
import OngoingSongList from './src/screen/Ongoing';
import ClubBooking from './src/screen/Booking';
import ReserveScreen from './src/screen/ReserveScreen';
import BookingConfirmed from './src/screen/ConfirmBooking';
import OfflineArtist from './src/screen/OfflineArtist';
import AddNewBank from './src/screen/AddNewBank';
import EditProfile from './src/screen/EditProfile';
import Referrals from './src/Drawer/Refferals';
import TransactionHistory from './src/Drawer/TransactionHistory';
import WalletHelp from './src/Drawer/WalletHelp';
import ReferralHelp from './src/Drawer/RefferralHelp';
import ArtistBioScreen from './src/screen/ArtistBio';
import DonateScreen from './src/screen/Donate';
import CustomDrawerContent from './src/Drawer/SideDrawer';
import SideDrawer from './src/Drawer/SideDrawer';
import SearchSong from './src/screen/SearchSong';
import RequestSong from './src/screen/RequestSong.';
import CancelReservation from './src/screen/CancelReservation';
import GuestInformation from './src/screen/GuestInformation';
import CustomDropdown from './src/Drawer/CustomDropdown';
import SecCustomDropDown from './src/Drawer/SecCustomeDrop';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="onboard"
          component={Onboarding1}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="signup"
          component={SignUpScreen1}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="choose"
          component={ChoosePage}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="facebook"
          component={FacebookScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="choosegenre"
          component={ChooseGenre}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="OtpVerify"
          component={LoginOtpVerify}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="invalid"
          component={InvalidOTP}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Artist"
          component={ArtistProfile}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="location"
          component={Location}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="FAQ"
          component={FAQScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="help"
          component={HelpScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="mybooking"
          component={MyBooking}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="myprofile"
          component={MyProfile}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="notification"
          component={NotificationSetting}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="policy"
          component={PrivacyPolicy}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="security"
          component={Security}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="feedback"
          component={SendFeedBack}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="condition"
          component={TermsCondition}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="wallet"
          component={WalletScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="addcart"
          component={AddNewCart}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="addmoney"
          component={AddMoney}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="withdraw"
          component={WithdrawMoney}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="notify"
          component={Notification}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="payment"
          component={PaymentScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="delete"
          component={DeleteAccount}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="newhelp"
          component={NewHelpRequest}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="song"
          component={SongRequestHelp}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="trouble"
          component={TroubleFeedback}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="choosesong"
          component={ChooseScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="songproblem"
          component={SongProblem}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="songpay"
          component={SongPay}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="paymentsuccess"
          component={PaymentSuccessful}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="ongoing"
          component={OngoingSongList}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="booking"
          component={ClubBooking}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="reservescreen"
          component={ReserveScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="confirmBooking"
          component={BookingConfirmed}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="offline"
          component={OfflineArtist}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Side"
          component={SideDrawer}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="newbank"
          component={AddNewBank}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="edit"
          component={EditProfile}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="refer"
          component={Referrals}
          options={{ headerShown: false }} />


        <Stack.Screen
          name="transaction"
          component={TransactionHistory}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="wallethelp"
          component={WalletHelp}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="referralhelp"
          component={ReferralHelp}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="artistbio"
          component={ArtistBioScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="donate"
          component={DonateScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="searchsong"
          component={SearchSong}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="request"
          component={RequestSong}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="cancelreserve"
          component={CancelReservation}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="guest"
          component={GuestInformation}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="custom"
          component={CustomDropdown}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="customdrop"
          component={SecCustomDropDown}
          options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>

  );
};

//make this component available to the app
export default App;

