const Paper = require('../models/Paper');

const SUBJECTS = [
    // DISCIPLINE CORE
    'Programming for Problem Solving',
    'Data Structures',
    'Computer Organization and Architecture',
    'Discrete Mathematics',
    'Introduction to Java Programming',
    'Operating Systems',
    'Database Management Systems',
    'Advanced Java Programming',
    'Software Engineering',
    'Design and Analysis of Algorithms',
    'Computer Networks',
    'Artificial Intelligence',
    'Theory of Computation',
    'Compiler Design',
    // CORE SCIENCES & MATHS
    'Engineering Mathematics I',
    'Engineering Mathematics II',
    'Probability and Statistics',
    'Engineering Physics',
    'Engineering Chemistry',
    // ENGINEERING SCIENCES
    'Fundamental of Electronics Engineering',
    'Basic Electrical Engineering',
    'Engineering Graphics',
    'Engineering Mechanics',
    // DISCIPLINE ELECTIVES
    'Machine Learning',
    'Deep Learning',
    'R Programming',
    'Fuzzy Logic and Neural Network',
    'Evolutionary Computing',
    'Robotics',
    'Introduction to Data Science',
    'Data Mining and Data Warehousing',
    'Big Data Analytics',
    'Cloud Computing',
    'Internet of Things',
    'Mobile Application Programming using Android',
    'Wireless and Mobile Systems',
    'Advanced Computer Networks',
    'Mobile and Wireless Network Security',
    'Number Theory and Cryptology',
    'Foundation of Cyber Security',
    'Data Encryption and Network Security',
    'Cyber Crime and Investigation',
    'Ethical Hacking and Digital Forensics',
    'Digital Image Processing',
    'Computer Vision',
    'Satellite Image Processing',
    'Information Retrieval',
    'Biometrics Security',
    'Introduction to Blockchain Technologies',
    'Design and Development of Blockchain Technologies',
    'Blockchain Ecosystems and Governance',
    'Container Technologies',
    'Front-End Engineering',
    'Advanced Topics in Front-End Engineering',
    'Server Side Engineering',
    'DevOps',
    // HUMANITIES & OTHERS
    'Professional Communication',
    'Environmental Science',
    'Indian Constitution',
    'Engineering Economics',
    'Entrepreneurship and Start-ups',
    'Intellectual Property Rights',
];

// GET /api/papers/subjects
const getSubjects = (req, res) => {
    res.json(SUBJECTS);
};

// GET /api/papers
const getPapers = async (req, res) => {
    try {
        const { subject, examType, year } = req.query;
        const query = {};

        if (subject) query.subject = subject;
        if (examType) query.examType = examType;
        if (year) query.year = Number(year);

        const papers = await Paper.find(query).sort({ year: -1 });
        res.json(papers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getSubjects, getPapers };
