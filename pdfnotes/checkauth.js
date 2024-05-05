import AsyncStorage from '@react-native-async-storage/async-storage';

const checkUserDetails = async (navigation) => {
  try {
    const userDetailsString = await AsyncStorage.getItem('userDetails');
    console.log("let we check the local",userDetailsString)
    const userDetails = JSON.parse(userDetailsString);
    if (userDetails == null) {
      console.log('User details not found in the check auth');
      return false; // User details not found
      
    } else {
      // const userDetails = JSON.parse(userDetailsString);
      console.log('User Details mili:', userDetails.email);
      return userDetails;
    }
  } catch (error) {
    console.error('Error checking user details:', error);
    return false; // Error occurred while checking user details
  }
  return false;
};

export default checkUserDetails;
