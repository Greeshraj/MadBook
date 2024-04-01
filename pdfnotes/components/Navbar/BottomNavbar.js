import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { bottomNavbarStyles } from './bottomnavbarstyles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomNavbar = ({navigation}) => {
  const { bottomNavbar, navbarButton, navbarButtonText, activeNavbarButtonText } = bottomNavbarStyles;
  const route = useRoute();
  const styles = {
    Home: navbarButtonText,
    Purchase: navbarButtonText,
    Payment: navbarButtonText,
    Profile: navbarButtonText,
  };

  const setButtonActive = (buttonName) => {
    // Reset all buttons to their default style
    Object.keys(styles).forEach((key) => {
      styles[key] = navbarButtonText;
    });

    // Highlight the active button
    styles[buttonName] = activeNavbarButtonText;
  };

  useFocusEffect(
    useCallback(() => {
      // Highlight the active button based on the current route
      const routeName = route.name;
      // console.log("hello",routeName)
      // You can customize this logic based on your route names
      if (routeName == 'Home') {
        // console.log("we r i ",routeName);
        setButtonActive('Home');
      } else if (routeName == 'Purchase') {
        // console.log("we r i ",routeName);
        setButtonActive('Purchase');
      } else if (routeName == 'Payment') {
        // console.log("we r i ",routeName);
        setButtonActive('Payment');
      } else if (routeName == 'Profile') {
        // console.log("we r i ",routeName);
        setButtonActive('Profile');
      }

      // Cleanup effect when the component is unmounted
      return () => {};
    }, [route])
  );

  return (
    <View style={bottomNavbar}>
      <TouchableOpacity
        style={navbarButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={24} color="#ecf0f1" />
        <Text style={styles.Home}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={navbarButton}
        onPress={() => navigation.navigate('Purchase')}
      >
        <Icon name="shopping-cart" size={24} color="#ecf0f1" />
        <Text style={styles.Purchase}>Purchase</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={navbarButton}
        onPress={() => navigation.navigate('Payment')}
      >
        <Icon name="credit-card" size={24} color="#ecf0f1" />
        <Text style={styles.Payment}>Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={navbarButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="user" size={24} color="#ecf0f1" />
        <Text style={styles.Profile}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
