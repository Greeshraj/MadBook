import AsyncStorage from '@react-native-async-storage/async-storage';

const usertoken = async (navigation) => {
  try {
    const usertoken = await AsyncStorage.getItem('usertoken');
    if (usertoken !== null) {
      return usertoken;
    } else {
      console.log('User details not found in the check auth');
      return false; // User details not found
    }
  } catch (error) {
    console.error('Error checking user details:', error);
    return false; // Error occurred while checking user details
  }
  return false;
};

export default usertoken;
