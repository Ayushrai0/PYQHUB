import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPapers } from '../utils/api';
import Navbar from '../components/Navbar';
import PaperCard from '../components/PaperCard';

const YEARS = ['All', 2020, 2021, 2022, 2023, 2024];
const TYPES = ['All', 'Mid Sem', 'End Sem'];

const Pill = ({ label, active, onClick }) => {
    const [h, setH] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{ padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', background: active ? '#6366F1' : 'transparent', border: active ? 'none' : `1px solid ${h ? '#6366F1' : '#27272A'}`, color: active ? 'white' : h ? '#FAFAFA' : '#71717A' }}>
            {label}
        </button>
    );
};

const SubjectPage = () => {
    const { subjectName } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const decoded = decodeURIComponent(subjectName);

    const [papers, setPapers] = useState([]);
    const [examType, setExamType] = useState('All');
    const [year, setYear] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try { const { data } = await getPapers(decoded, examType === 'All' ? '' : examType, year === 'All' ? '' : year, token); setPapers(data); }
            catch (e) { console.error(e); }
            finally { setLoading(false); }
        })();
    }, [decoded, examType, year, token]);

    return (
        <div style={{ minHeight: '100vh', background: '#09090B' }}>
            <Navbar />
            <main style={{ padding: '32px 40px', maxWidth: 900, margin: '0 auto' }} className="animate-fade-in">
                <div style={{ fontSize: 13, color: '#71717A', marginBottom: 12, display: 'flex', gap: 6 }}>
                    <Link to="/home" style={{ color: '#71717A', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = '#FAFAFA'} onMouseLeave={e => e.target.style.color = '#71717A'}>Home</Link>
                    <span>→</span><span style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>Subjects</span><span>→</span><span style={{ color: '#A1A1AA' }}>{decoded}</span>
                </div>

                <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FAFAFA', marginBottom: 28 }}>{decoded}</h1>

                <div style={{ display: 'flex', gap: 40, marginBottom: 32, padding: '16px 20px', background: '#111113', border: '1px solid #27272A', borderRadius: 10, flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ fontSize: 11, color: '#71717A', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>FILTER</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {TYPES.map(t => <Pill key={t} label={t} active={examType === t} onClick={() => setExamType(t)} />)}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: '#71717A', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>YEAR</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {YEARS.map(y => <Pill key={y} label={String(y)} active={year === y} onClick={() => setYear(y)} />)}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 8 }}>
                    {loading && [...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, marginBottom: 2 }} />)}

                    {!loading && papers.length > 0 && papers.map(p => <PaperCard key={p._id} paper={p} />)}

                    {!loading && papers.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: 80 }}>
                            <p style={{ fontSize: 15, color: '#71717A', marginBottom: 8 }}>No papers found</p>
                            <p style={{ fontSize: 13, color: '#52525B' }}>Try selecting different filters</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SubjectPage;
