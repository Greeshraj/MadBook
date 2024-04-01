// UpperNavbarStyles.js

import { StyleSheet } from 'react-native';

export const UpperNavbarStyles = StyleSheet.create({
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Dark background color
    height: 60,
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  navbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#ecf0f1', // Light text color
    fontSize: 16,
    marginRight: 'auto',
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
