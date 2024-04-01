import React, { useEffect ,useState} from 'react';
import { View, Text, TouchableOpacity,StyleSheet,ImageBackground } from 'react-native';
import { homeStyles } from './homeStyles';
import BottomNavbar from './Navbar/BottomNavbar';
import UpperNavbar from './UpperNavbar/UppserNavbar';
const temp = "Home";
import checkUserDetails from '../checkauth';
// const item ;
const HomeScreen = ({ navigation }) =>{

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
   
  
  const renderButton = (year) => (
    <TouchableOpacity
      style={homeStyles.button}
      onPress={() => navigation.navigate('SubjectList',{selectedYear:year})}
    >
      <Text style={homeStyles.buttonText}>{`${year}st`}</Text>
    </TouchableOpacity>
  );

 return(  
  // <View style={homeStyles.container}>
  <ImageBackground
      source={require('../assets/bg.jpg')} // Replace with the path to your background image
      style={homeStyles.container}
    >
    <Text style={homeStyles.title}>Select Your Year</Text>
    {[1, 2, 3, 4].map((year) => renderButton(year))}  
    <Text style={homeStyles.buttonText}>{user.first_name}</Text>

    <UpperNavbar navigation={navigation}/>
    <BottomNavbar navigation={navigation} route={temp} />
    </ImageBackground>
);
 };
export default HomeScreen;





// <TouchableOpacity
// style={homeStyles.button}
// onPress={() => navigation.navigate('PdfScreen', { pdfTitle: 'PDF 4' })}
// >
// <Text style={homeStyles.buttonText}>4th</Text>
// </TouchableOpacity>
const stylesload = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});