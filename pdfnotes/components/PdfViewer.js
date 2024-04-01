import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
// import RNFS from 'react-native-fs';
const PdfViewer = ({ navigation,route }) => {
  // console.log('pdfUri:', pdfUri); // Log the pdfUri to check its value
  const pdfUri = route.params?.pdfUri || '';
    return <WebView source={{ uri: pdfUri }} style={{ flex: 1 }} />;
};

export default PdfViewer;
