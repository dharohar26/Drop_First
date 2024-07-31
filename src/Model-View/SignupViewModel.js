import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const SignUpViewModel = {

  openCameraLib: async (setModalVisible, setProfilePicture) => {
    // // Handle opening camera library
    setModalVisible(false);
    const result = await launchCamera({ mediaType: 'photo', quality: 0 });
    await AsyncStorage.setItem('cameraResult', JSON.stringify(result));
    setProfilePicture(result.assets[0].uri); // Set the selected image URI in state
    console.log("profile=", setProfilePicture);
    setModalVisible(false); // Close the modal
    requestCameraPermission();
  },

  openGallery: async (setModalVisible, setProfilePicture) => {
    // // Handle opening image gallery
    setModalVisible(false);
    const resultGallery = await launchImageLibrary({ mediaType: 'photo', quality: 0 });
    await AsyncStorage.setItem('cameraResult', JSON.stringify(resultGallery));
    setProfilePicture(resultGallery.assets[0].uri); // Set the selected image URI in state
    console.log("profile=", setProfilePicture)
    setModalVisible(false); // Close the modal
    requestCameraPermission();
  },
  // Other functions for date selection, form validations, etc.
};

export default SignUpViewModel;


// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PermissionsAndroid } from 'react-native';

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: "App Camera Permission",
//         message: "App needs access to your camera ",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK"
//       }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   } catch (err) {
//     console.warn(err);
//     return false;
//   }
// };

// const SignUpViewModel = {
//   openCameraLib: async (setModalVisible, setProfilePicture) => {
//     setModalVisible(false);
//     const permissionGranted = await requestCameraPermission();

//     if (permissionGranted) {
//       const result = await launchCamera({ mediaType: 'photo', quality: 0 });
//       await AsyncStorage.setItem('cameraResult', JSON.stringify(result));
//       setProfilePicture(result.assets[0].uri);
//     } else {
//       console.log("Camera permission denied");
//       // Handle denial of camera permission (show an alert or take alternative action)
//     }
//   },

//   openGallery: async (setModalVisible, setProfilePicture) => {
//     setModalVisible(false);
//     const permissionGranted = await requestCameraPermission();

//     if (permissionGranted) {
//       const resultGallery = await launchImageLibrary({ mediaType: 'photo', quality: 0 });
//       await AsyncStorage.setItem('cameraResult', JSON.stringify(resultGallery));
//       setProfilePicture(resultGallery.assets[0].uri);
//     } else {
//       console.log("Camera permission denied");
//       // Handle denial of camera permission (show an alert or take alternative action)
//     }
//   },
// };

// export default SignUpViewModel;
