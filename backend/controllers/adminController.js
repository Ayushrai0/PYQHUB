const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Paper = require('../models/Paper');

const SUBJECTS = [
    'Programming for Problem Solving', 'Data Structures', 'Computer Organization and Architecture',
    'Discrete Mathematics', 'Introduction to Java Programming', 'Operating Systems',
    'Database Management Systems', 'Advanced Java Programming', 'Software Engineering',
    'Design and Analysis of Algorithms', 'Computer Networks', 'Artificial Intelligence',
    'Theory of Computation', 'Compiler Design',
    'Engineering Mathematics I', 'Engineering Mathematics II', 'Probability and Statistics',
    'Engineering Physics', 'Engineering Chemistry',
    'Fundamental of Electronics Engineering', 'Basic Electrical Engineering', 'Engineering Graphics',
    'Engineering Mechanics',
    'Machine Learning', 'Deep Learning', 'R Programming', 'Fuzzy Logic and Neural Network',
    'Evolutionary Computing', 'Robotics', 'Introduction to Data Science',
    'Data Mining and Data Warehousing', 'Big Data Analytics', 'Cloud Computing',
    'Internet of Things', 'Mobile Application Programming using Android',
    'Wireless and Mobile Systems', 'Advanced Computer Networks',
    'Mobile and Wireless Network Security', 'Number Theory and Cryptology',
    'Foundation of Cyber Security', 'Data Encryption and Network Security',
    'Cyber Crime and Investigation', 'Ethical Hacking and Digital Forensics',
    'Digital Image Processing', 'Computer Vision', 'Satellite Image Processing',
    'Information Retrieval', 'Biometrics Security', 'Introduction to Blockchain Technologies',
    'Design and Development of Blockchain Technologies', 'Blockchain Ecosystems and Governance',
    'Container Technologies', 'Front-End Engineering', 'Advanced Topics in Front-End Engineering',
    'Server Side Engineering', 'DevOps',
    'Professional Communication', 'Environmental Science', 'Indian Constitution',
    'Engineering Economics', 'Entrepreneurship and Start-ups', 'Intellectual Property Rights',
];

// POST /api/admin/login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.json({ token, admin: { id: admin._id, username: admin.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// POST /api/admin/papers
const addPaper = async (req, res) => {
    try {
        const { subject, examType, year, pdfUrl } = req.body;

        if (!SUBJECTS.includes(subject)) {
            return res.status(400).json({ message: 'Invalid subject. Must be from predefined list.' });
        }

        const paper = await Paper.create({ subject, examType, year, pdfUrl });
        res.status(201).json({ message: 'Paper added successfully', paper });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE /api/admin/papers/:id
const deletePaper = async (req, res) => {
    try {
        const paper = await Paper.findByIdAndDelete(req.params.id);
        if (!paper) {
            return res.status(404).json({ message: 'Paper not found' });
        }
        res.json({ message: 'Paper deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/admin/papers
const getAllPapers = async (req, res) => {
    try {
        const papers = await Paper.find().sort({ uploadedAt: -1 });
        res.json(papers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { login, addPaper, deletePaper, getAllPapers };
