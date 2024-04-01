import { StyleSheet } from 'react-native';

export const YearsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Set the background color to a blue shade
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Set the title text color to white
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // Set the button text color to white
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#e74c3c', // Set the button background color to a red shade
    borderRadius: 10,
  },
});
