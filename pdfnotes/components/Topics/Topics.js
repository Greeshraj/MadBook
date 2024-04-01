import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TopicsStyles } from './TopicsStyles';
import BottomNavbar from '../Navbar/BottomNavbar';
import client from '../api/client';
const TopicsList = ({ navigation,route }) => {
  const selectedSubject = route.params?.subject || '';
  const [subjects, setSubjects] = useState([]);
  const topics = route.params?.topics || '';
  console.log(topics," of the subject", selectedSubject);

useEffect(() => {
  }, [selectedSubject, topics]);
  return(
    <View style={TopicsStyles.container}>
    <Text style={TopicsStyles.title}>Select the topic of the {selectedSubject}</Text>
      {topics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={TopicsStyles.button}
          onPress={() => navigation.navigate('PdfScreen', { pdfTitle: topic })}
        >
          <Text style={TopicsStyles.buttonText}>{topic}</Text>
        </TouchableOpacity>
      ))}
    
    <BottomNavbar navigation={navigation} />
    
  </View>
  );
}

export default TopicsList;
