const PdfDetails = require('../models/pdf.model');
const fs = require('fs');

exports.createPdf = async (req, res) => {
    try {
        const { pdf_name, subject_name, description, price,pdf_file_link } = req.body;
     console.log("creating the pdf",req.body);
       
        if (!pdf_file_link) {
            return res.status(400).json({ message: 'PDF file Link is required.' });
        }
        const pdfDetails = new PdfDetails({
            pdf_name,
            subject_name,
            description,
            price,
            pdf_file_link, // Save the PDF file as a Buffer
            permitted_users: [],
          });

        const savedPdf = await pdfDetails.save();
        res.status(201).json(savedPdf);
    } catch (error) {
        console.error('Error creating PDF:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getPdf = async (req, res) => {
    // console.log(req.body);
    try {
        // const {topic_name } = req.params;
        // const email = 
        const pdf_name = req.body.pdf_name;
        console.log("topic name is in get pdf",pdf_name)
        const pdfDetails = await PdfDetails.findOne({
            pdf_name,
        });

        if (!pdfDetails) {
            return res.status(404).json({ message: 'PDF not found for the given subject and topic.' });
        }
        res.status(200).json(pdfDetails);
    } 
    catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.checkaccess = async (req, res) => {
    // console.log(req.body);
    try {
        const pdf_name = req.body.pdf_name;
        console.log("topic name is in access ",pdf_name)
        const pdfDetails = await PdfDetails.findOne({
            pdf_name,
        });

        if (!pdfDetails) {
            return res.status(404).json({ message: 'PDF not found for the given subject and topic.' });
        }
        console.log(pdfDetails.permitted_users);
        const userEmail = req.body.userDetailsFound.email; 
        const permittedUsers = pdfDetails.permitted_users;
        // if (permittedUsers.includes(userEmail)) {
            return true;
        // } else {
            // return false;
        // }
    } 
    catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


