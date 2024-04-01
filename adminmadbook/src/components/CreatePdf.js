// src/components/CreatePdf.js
import React, { useState, useEffect } from "react";
import client from "../client";
const CreatePdf = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [years] = useState([1, 2, 3, 4, 5]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);

  const [pdfName, setPdfName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pdf_file_link, setPdfFile] = useState("");

 

  // pdfName,selectedSubject,description,price,pdfFile)


  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear) {
        try {
          console.log(selectedYear);
          const response = await client.get(
            `subject/getsubjects?year=${selectedYear}`
          );

          const data = await response.data;
          console.log("let we check the", data);
          // console.log()
          setSubjects(data);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleSubjectChange = async (subject) => {
    setSelectedSubject(subject);
    const selectedSubjectData = subjects.find((s) => s.subject_name === subject);
    if (selectedSubjectData) {
      const { topics } = selectedSubjectData;
      setTopics(topics);
      console.log("we are in the handlesubject change",topics);
    } else {
      // Handle the case where the selected subject is not found
      console.error(`Topics not found for subject: ${subject}`);
    }
 
  };

 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!pdfName || !description || !price || !selectedYear || !selectedSubject || !selectedTopic || !pdf_file_link) {
      alert("All fields are required");
      return;
    }
  
    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('pdf_file_link', pdf_file_link); // Make sure the name matches the field expected by the backend
  
    // Add other form fields to FormData
    formData.append('pdf_name', pdfName);
    formData.append('subject_name', selectedSubject);
    formData.append('description', description);
    formData.append('price', price);
  
    try {
      // Make the API request using FormData for file upload
      const response = await client.post('/pdf/createpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Successful. Message:", response.data.message);
      // Handle success, reset form, etc.
      alert("PDF created successfully");
      setPdfName("");
      setDescription("");
      setPrice("");
      setPdfFile(null);
      setSelectedYear("");
      setSelectedSubject("");
      setSelectedTopic("");
    } catch (error) {
      console.error("Error creating PDF:", error);
  
      if (error.response) {
        console.log("Error response data message:", error.response.data.message);
        console.log("Error response status:", error.response.status);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
  
      // Handle error
      alert("Failed to create PDF. Check console for details.");
    }
  };
  

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!pdfName || !description || !price || !selectedYear || !selectedSubject || !selectedTopic || !pdfFile) {
  //     alert("All fields are required");
  //     return;
  //   }
  
  //   const pdfData = {
  //     pdf_name: pdfName,
  //     subject_name: selectedSubject,
  //     description: description,
  //     price: price,
      
  //     // Add other fields as needed
  //   };
  
  //   try {
  //     const response = await client.post('/pdf/createpdf', pdfData);
  
  //     console.log("Successful. Message:", response.data.message);
  //     // Handle success, reset form, etc.
  //     alert("PDF created successfully");
  //     setPdfName("");
  //     setDescription("");
  //     setPrice("");
  //     setPdfFile(null);
  //     setSelectedYear("");
  //     setSelectedSubject("");
  //     setSelectedTopic("");
  //   } catch (error) {
  //     if (error.response) {
  //       console.log("Error response data message:", error.response.data.message);
  //       console.log("Error response status:", error.response.status);
  //     } else if (error.request) {
  //       console.log("Error request:", error.request);
  //     } else {
  //       console.log("Error message:", error.message);
  //     }
  //     // Handle error
  //     alert("Failed to create PDF. Check console for details.");
  //   }
  // };
  
 

  return (
    <div>
      <h1>Create PDF Page</h1>

      <label>
        Choose Year:
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      {selectedYear && (
        <>
          <label> Choose Subject 
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.subject_name} value={subject.subject_name}>
                  {subject.subject_name}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {selectedSubject && (
        <>
          <label>
            Choose Topic:
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      <label>
        PDF Name:
        <input
          type="text"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label>
        PDF link:
        <input
          type="text"
          value={pdf_file_link}
          onChange={(e) => setPdfFile(e.target.value)}
        />
      </label>

     

      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default CreatePdf;
