const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    examType: { type: String, enum: ['Mid Sem', 'End Sem'], required: true },
    year: { type: Number, enum: [2020, 2021, 2022, 2023, 2024], required: true },
    pdfUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Paper', paperSchema);
