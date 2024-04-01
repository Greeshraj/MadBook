import { StatusBar } from 'expo-status-bar';
import React, { useEffect ,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import PdfScreen from './components/PdfScreen';
import { styles } from './components/styles';
import SubjectList from './components/Yearwise/SubjectList';
import Profile from './components/Navbar/Profile';
import Payment from './components/Payment/Payment';
import Purchase from './components/Purchases/Purchase';
import BottomNavbar from './components/Navbar/BottomNavbar';
import SignIn from './components/SigninSignUp/SignIn';
import SignUp from './components/SigninSignUp/SignUp';
import checkUserDetails from './checkauth';
import TopicsList from './components/Topics/Topics';
import PdfViewer from './components/PdfViewer';
// import Pdf from 'react-native-pdf';

// import PdfForm from './components/PdfUpload/PdfForm';
const Stack = createStackNavigator();
export default function App() {
  
 
  const [isAuth, setisAuth] = useState(false);
  const [cls, setcls] = useState('SignIn');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userDetailsFound = await checkUserDetails();
        console.log("let we see the useDetails in the app file", userDetailsFound.email);

        if (userDetailsFound.email !== null) {
          console.log("my email is not null and is ", userDetailsFound.email);
          setcls('Home');
          setisAuth(true);
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

  return (
   <>
     
     <NavigationContainer>
    <Stack.Navigator initialRouteName={cls}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="PdfScreen"
        component={PdfScreen}
        options={{ title: 'PDF Reader' }}
      />
      <Stack.Screen
        name="SubjectList"
        component={SubjectList}
        options={{ title: 'SubjectList' }}
      />
      <Stack.Screen
        name="TopicsList"
        component={TopicsList}
        options={{ title: 'TopicsList' }}
      />
       {/* <Stack.Screen
        name="PdfForm"
        component={PdfForm}
        options={{ title: 'PdfForm' }}
      /> */}
       <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
      
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: 'Payment' }}
      />
       <Stack.Screen
        name="Purchase"
        component={Purchase}
        // options={{ title: 'Purchases' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'SignIn' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'SignUp' }}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{ title: 'PdfViewer' }}
      />
       
    </Stack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>
   </>
  );
}

  
const stylesload = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

 
  // useEffect(() => {
  //   const initializeApp = async () => {
  //     const userDetailsFound = await checkUserDetails();
  //     console.log("let we see the useDetails in the app file",userDetailsFound.email)
  //     if(userDetailsFound.email !== null){
  //       console.log("my email is not null and is ",userDetailsFound.email)
  //     }
  //     if (userDetailsFound.email !== null) {
  //       // User details found, set cls to 'Home'
  //       setcls('Home');
  //       setisAuth(true);
  //     } else {
  //       // User details not found, cls remains 'SignIn'
  //       setcls('SignIn');
  //       setisAuth(false);
  //     }
  //   };

  //   initializeApp();
  // }, []); 