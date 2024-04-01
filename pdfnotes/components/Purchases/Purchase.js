
import React from 'react';
import { View, Text } from 'react-native';
import { homeStyles } from '../homeStyles';
import BottomNavbar from '../Navbar/BottomNavbar';
 
const Purchase = ({ navigation }) => (
  <View style={homeStyles.container}>
    <Text style={homeStyles.title}>Purchase</Text>
    <Text>Coming Soon</Text>
    <BottomNavbar navigation={navigation}  />
  </View>
);

export default Purchase;
