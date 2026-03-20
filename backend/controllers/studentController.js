const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const generateToken = (student) => {
    return jwt.sign(
        { id: student._id, name: student.name, email: student.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// POST /api/students/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingStudent = await Student.findOne({ email: email.toLowerCase() });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await Student.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const token = generateToken(student);

        res.status(201).json({
            token,
            student: { id: student._id, name: student.name, email: student.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// POST /api/students/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email: email.toLowerCase() });
        if (!student) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(student);

        res.json({
            token,
            student: { id: student._id, name: student.name, email: student.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { register, login };
