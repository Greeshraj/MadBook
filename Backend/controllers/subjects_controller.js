const express = require('express');
const router = express.Router();
const Subjects = require("../models/subjects.model")

// Get all subjects for a given year
exports.getsubjects= async (req, res) => {
    console.log("welcome");
    const year = req.query.year;
    console.log("year is ",year);

    try {
        const subjects = await Subjects.find({ year });
        const subjectsWithTopics = subjects.map((subject) => {
            const { subject_name, topics } = subject;
            return { subject_name, topics };
        });

        res.json(subjectsWithTopics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new subject
exports.createsubject= async (req, res) => {
    const { subject_name, year, topics } = req.body;
    console.log(req.body);
    try {
        const newSubject = new Subjects({
            subject_name,
            year,
            topics,
        });

        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

 
