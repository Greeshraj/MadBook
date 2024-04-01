// ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavbar from './BottomNavbar';
import checkUserDetails from '../../checkauth';
import { profileStyles } from './ProfileStyles';

const Profile = ({ navigation }) => {
  const [isAuth, setisAuth] = useState(false);
  const [user, setuser] = useState(null);
  const [cls, setcls] = useState('SignIn');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userDetailsFound = await checkUserDetails();

        if (userDetailsFound.email !== null) {
          setcls('Home');
          setisAuth(true);
          setuser(userDetailsFound);
        } else {
          setcls('SignIn');
          setisAuth(false);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setcls('SignIn');
        setisAuth(false);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleLogout = async () => {
    // Remove data from local storage
    try {
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.removeItem('usertoken');
    } catch (error) {
      console.error('Error removing data from local storage:', error);
    }

    navigation.navigate('SignIn');
  };

  if (loading) {
    return (
      <View style={stylesload.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.profileInfo}>
        <Image
          source={require('../UpperNavbar/tt_sem_06.png')} // Replace with the path to your actual profile picture
          style={profileStyles.profileImage}
        />
        <Text style={profileStyles.userName}>{user.first_name} {user.last_name}</Text>
        <Text style={profileStyles.userEmail}>{user.email}</Text>
      </View>

      <View style={profileStyles.userDetails}>
        <View style={profileStyles.detailItem}>
          <Text style={profileStyles.detailLabel}>College:</Text>
          <Text style={profileStyles.detailValue}>{user.college}</Text>
        </View>

        <View style={profileStyles.detailItem}>
          <Text style={profileStyles.detailLabel}>Gender:</Text>
          <Text style={profileStyles.detailValue}>{user.gender}</Text>
        </View>
      </View>

      <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
        <Text style={profileStyles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
          onPress={() => navigation.navigate('PdfForm')}
        >
          <Text >PdfForm Button</Text>
        </TouchableOpacity> */}

      <BottomNavbar navigation={navigation} />
    </View>
  );
};

export default Profile;

const stylesload = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
