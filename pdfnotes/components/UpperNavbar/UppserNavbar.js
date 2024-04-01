import React, { useEffect ,useState} from 'react';
import { View, Text,Image, TouchableOpacity,StyleSheet } from 'react-native';
// import { UpperNavbarStyles } from './UpperNavbarStyles';
import { UpperNavbarStyles } from './Uppsernavbarstyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import checkUserDetails from '../../checkauth';
// import Icon from 'react-native-vector-icons/FontAwesome';
const UpperNavbar = ({navigation}) => {
  // console.log("we are at uppernavbar",user)
 const [isAuth, setisAuth] = useState(false);
 const[user,setuser] = useState(null);
 const [cls, setcls] = useState('SignIn');
 const [loading, setLoading] = useState(true);
 useEffect(() => {
   const initializeApp = async () => {
     try {
       const userDetailsFound = await checkUserDetails();
       console.log("let we see the useDetails in the app file", userDetailsFound);

       if (userDetailsFound.email !== null) {
         console.log("my email is not null and is ", userDetailsFound.email);
         setcls('Home');
         setisAuth(true);
         setuser(userDetailsFound)
       } else {
         setcls('SignIn');
         setisAuth(false);
       }
     } catch (error) {
       console.error('Error initializing app:', error);
       setcls('SignIn');
       setisAuth(false);
     } finally {
       // Set loading to false when the operation is complete
       setLoading(false);
     }
   };

   initializeApp();
 }, []); 
 if (loading) {
   return (
     <View style={stylesload.loadingContainer}>
       <Text>Loading...</Text>
     </View>
   );
 }

return(
  <View style={UpperNavbarStyles.bottomNavbar}>
    <View style={UpperNavbarStyles.navbarButton}>
      <Text style={UpperNavbarStyles.welcomeText}>Hey {user.first_name},Welcome</Text>
    </View>

    <View style={UpperNavbarStyles.navbarButton}>
    <TouchableOpacity
      style={UpperNavbarStyles.navbarButton}
      onPress={() => navigation.navigate('Profile')}
    >
     <Icon name={user.gender =='M' ? "male" :"female"} size={24} color="#ecf0f1" />
     
    {/* <Image
        source={require('./tt_sem_06.png')} // Replace with the path to your actual profile picture
        style={UpperNavbarStyles.profilePicture}
      /> */}
    </TouchableOpacity>
    </View>
  </View>
);
};
export default UpperNavbar;

  
const stylesload = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});