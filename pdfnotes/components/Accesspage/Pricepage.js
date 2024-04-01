import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
import { styles } from './styles';
import client from './api/client';
import { Buffer } from 'buffer';
import axios from 'axios';
import PdfViewer from './PdfViewer';
import { base64 } from 'base64-js';
import checkUserDetails from '../checkauth';
// import usertoken from '../usertoken';
import usertoken from '../usertoken';
const PriceScreen = ({ route, navigation }) => {

  const [isAuth, setisAuth] = useState(false);
  const[user,setuser] = useState(null);
  const [cls, setcls] = useState('SignIn');
  const [loading, setLoading] = useState(true);
  const { pdfTitle } = route.params;
  const [pdfUri, setPdfUri] = useState(null);
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userDetailsFound = await checkUserDetails();
        const token = await usertoken();

        console.log("let we see the useDetails in the app file", userDetailsFound);

        if (userDetailsFound.email !== null) {
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
            console.log("we get the response ", response.data);
            setPdfUri(response.data.pdf_file_link);
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
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
      <View >
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
      <PdfViewer pdfUri={pdfUri} />
  );
};

export default PriceScreen;
