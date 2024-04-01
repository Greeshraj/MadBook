// homeStyles.js

import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#3498db',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    height:60,
    width:60
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Set the background color for the navbar
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
  },
  navbarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});
