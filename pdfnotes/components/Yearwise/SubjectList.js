import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { YearsStyles } from './YearsStyles';
import BottomNavbar from '../Navbar/BottomNavbar';
import client from '../api/client';
const SubjectList = ({ navigation,route }) => {
  const selectedYear = route.params?.selectedYear || '1';
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    // Fetch subjects for the selected year from the backend
    const fetchSubjects = async () => {
      try {
        console.log(selectedYear);
        const response = await client.get(`subject/getsubjects?year=${selectedYear}`);

        const data = await response.data;
        console.log("let we check the",data);
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [selectedYear]);
  return(
    <View style={YearsStyles.container}>
<Text style={YearsStyles.title}>Select the Subject for {selectedYear}st Year</Text>
       {subjects.map((subject) => (
        <TouchableOpacity
          key={subject.subject_name}
          style={YearsStyles.button}
          onPress={() => navigation.navigate('TopicsList', { subject: subject.subject_name,topics:subject.topics })}
        >
          <Text style={YearsStyles.buttonText}>{subject.subject_name}</Text>
        </TouchableOpacity>
      ))}
    
    <BottomNavbar navigation={navigation} />
    
  </View>
  );
}

export default SubjectList;
