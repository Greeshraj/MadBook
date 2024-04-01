// bottomnavbarstyles.js

import { StyleSheet } from 'react-native';

export const bottomNavbarStyles = StyleSheet.create({
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Dark background color
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navbarButtonText: {
    fontSize: 16,
    color: '#ecf0f1', // Light text color
  },
  activeNavbarButtonText: {
    color: '#3498db', // Blue color for the active button
  },
});
