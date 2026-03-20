import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// ─── Student Auth ────────────────────────────────────────────
export const registerStudent = (name, email, password) =>
    API.post('/api/students/register', { name, email, password });

export const loginStudent = (email, password) =>
    API.post('/api/students/login', { email, password });

// ─── Papers ──────────────────────────────────────────────────
export const getSubjects = (token) =>
    API.get('/api/papers/subjects', {
        headers: { Authorization: `Bearer ${token}` },
    });

export const getPapers = (subject, examType, year, token) => {
    const params = {};
    if (subject) params.subject = subject;
    if (examType) params.examType = examType;
    if (year) params.year = year;
    return API.get('/api/papers', {
        params,
        headers: { Authorization: `Bearer ${token}` },
    });
};

// ─── Admin ───────────────────────────────────────────────────
export const adminLogin = (username, password) =>
    API.post('/api/admin/login', { username, password });

export const adminAddPaper = (data, token) =>
    API.post('/api/admin/papers', data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const adminGetPapers = (token) =>
    API.get('/api/admin/papers', {
        headers: { Authorization: `Bearer ${token}` },
    });

export const adminDeletePaper = (id, token) =>
    API.delete(`/api/admin/papers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export default API;
