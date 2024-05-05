import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView,Linking ,StyleSheet} from 'react-native';
// import { styles } from './styles';
import client from './api/client';
import { Buffer } from 'buffer';
import axios from 'axios';
import PdfViewer from './PdfViewer';
import { base64 } from 'base64-js';
import checkUserDetails from '../checkauth';
// import usertoken from '../usertoken';
import usertoken from '../usertoken';
const PdfScreen = ({ route, navigation }) => {

  const [isAuth, setisAuth] = useState(false);
  const[user,setuser] = useState(null);
  const [cls, setcls] = useState('SignIn');
  const [loading, setLoading] = useState(true);
  const [purchase,setpurchase] = useState(false);
  const url = 'https://drive.google.com/file/d/15OZeJVAFEeFw9wtK96TG_8cf7_S5PHKK/view';

  const { pdfTitle } = route.params;
  const [pdfDetails, setpdfDetails] = useState(null);
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userDetailsFound = await checkUserDetails();
        const token = await usertoken();

        console.log("let we see the useDetails in the app file", userDetailsFound);

        if (userDetailsFound == null) {
          setcls('SignIn');
          setisAuth(false);
        } else {
          console.log("my email is not null and is ", userDetailsFound.email);
          setcls('Home');
          setisAuth(true);
          setuser(userDetailsFound)
          try {
            console.log("let's try to fetch the PDF ", pdfTitle,token);
            const response = await client.post(`pdf/getpdf`, { pdf_name: pdfTitle, userDetailsFound }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("get pdf ", response.data);
            setpdfDetails(response.data);
            const permittedUsers = response.data.permitted_users;
            const userEmail = userDetailsFound.email;
        if (permittedUsers.includes(userEmail)) {
          setpurchase(true);
        }   
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
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
      <View >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pdfDetails.pdf_name}</Text>
      <Text style={styles.description}>Description: {pdfDetails.description}</Text>
      <Text style={styles.price}>Price: ${pdfDetails.price}</Text>
      {purchase ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PdfViewer', { pdfUri: pdfDetails.pdf_file_link })}
        >
          <Text style={styles.buttonText}>Open PDF</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          // onPress={handleBuyNow} // Implement handleBuyNow function to handle purchase
        >
          <Text style={styles.buttonText}>Purchase Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default PdfScreen;
