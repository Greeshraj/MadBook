import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Alert} from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
 
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Validate password format
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must have at least one uppercase & min length 6';
    }
    setErrors(errors);

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      console.log("Form is valid. Submitting:", formData);
      await client.post('signin', formData)
        .then(response => {
          console.log("SignIn Done:", response.data.message);
          Alert.alert('Success', response.data.message);
          const userData = response.data.user; 
          const usertoken = response.data.token;// Adjust this based on your API response structure
          console.log(usertoken);
        AsyncStorage.setItem('userDetails', JSON.stringify(userData));
        AsyncStorage.setItem('usertoken', JSON.stringify(usertoken));


        // Redirect to the Home screen or any other screen after successful sign-in
        navigation.navigate('Home');
        })
        .catch(error => {
          if (error.response) {
            console.log("Error response data message:", error.response.data.message);
            console.log("Error response status:", error.response.status);
            Alert.alert('Error', error.response.data.message);
          } else if (error.request) {
            console.log("Error request:", error.request);
            Alert.alert('Error', 'An unexpected error occurred');
          } else {
            console.log("Error message:", error.message);
            Alert.alert('Error', 'An unexpected error occurred');
          }
        });
    } else {
      console.log("Form validation failed. Please correct the errors.");
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
    }
  };
  const handleSignUp = () => {
    // Navigate to Sign Up
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
        <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
       
       
      {errors.college && <Text style={styles.errorText}>{errors.college}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>New User? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
 