const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    pdf_name: {
        type: String,
        required: true,
    },
    subject_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    pdf_file_link: {
        type: String,
        required: true,
    },
    permitted_users: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
});

const PdfDetails = mongoose.model('PdfDetails', pdfSchema);
module.exports = PdfDetails;
