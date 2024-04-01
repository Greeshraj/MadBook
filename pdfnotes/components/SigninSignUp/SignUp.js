import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Alert} from 'react-native';
import client from '../api/client';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: '',
    college: '',
    mobile_number: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }

    // Validate last name
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }

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

    // Validate gender
    const validGenders = ['M', 'F'];
    if (!validGenders.includes(formData.gender.toUpperCase())) {
      errors.gender = 'Gender must be M or F';
    }

    // Validate mobile number
    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(formData.mobile_number)) {
      errors.mobile_number = 'Mobile number must be 10 digits';
    }

    // Validate college
    if (!formData.college.trim()) {
      errors.college = 'College is required';
    }

    setErrors(errors);

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      console.log("Form is valid. Submitting:", formData);
      await client.post('signup', formData)
        .then(response => {
          console.log("Registration successful. Message:", response.data.message);
          Alert.alert('Success', response.data.message)
          navigation.navigate('SignIn');
        //   Alert.alert('Success', response.data.message, [
        //   {
        //     text: 'OK',
        //     onPress: () => {
        //       // Redirect to the login page
        //       navigation.navigate('login'); // Replace 'Login' with the actual name of your login screen
        //     },
        //   },
        // ]);
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
  const handleSignIn = () => {
    // Navigate to Sign Up
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFormData({ ...formData, first_name: text })}
      />
      {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setFormData({ ...formData, last_name: text })}
      />
      {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}
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
      <TextInput
        style={styles.input}
        placeholder="Gender"
        onChangeText={(text) => setFormData({ ...formData, gender: text })}
      />
      {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        onChangeText={(text) => setFormData({ ...formData, mobile_number: text })}
        keyboardType="numeric"
      />
      {errors.mobile_number && <Text style={styles.errorText}>{errors.mobile_number}</Text>}
      <TextInput
        style={styles.input}
        placeholder="College"
        onChangeText={(text) => setFormData({ ...formData, college: text })}
      />
      {errors.college && <Text style={styles.errorText}>{errors.college}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
        <Text style={styles.signUpButtonText}>Aleready Registered. Sign In</Text>
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

export default SignUp;
