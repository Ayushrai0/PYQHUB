const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Admin = require('../models/Admin');
const Paper = require('../models/Paper');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eduarchive';

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Admin.deleteMany({});
        await Paper.deleteMany({});

        // Create default admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        await Admin.create({ username: 'admin', password: hashedPassword });
        console.log('✅ Admin created → username: admin, password: admin123');

        // Insert sample papers
        const samplePapers = [
            {
                subject: 'Data Structures',
                examType: 'Mid Sem',
                year: 2023,
                pdfUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
            },
            {
                subject: 'Database Management Systems',
                examType: 'End Sem',
                year: 2024,
                pdfUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
            },
            {
                subject: 'Computer Networks',
                examType: 'Mid Sem',
                year: 2022,
                pdfUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
            },
        ];

        await Paper.insertMany(samplePapers);
        console.log('✅ 3 sample papers inserted');

        console.log('\n🎉 Seed complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seed();
