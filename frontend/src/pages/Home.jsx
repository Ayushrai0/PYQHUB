import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubjects } from '../utils/api';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';

const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; };
const cap = (n) => n ? n.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : 'Student';

const Home = () => {
    const { token, student } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try { const { data } = await getSubjects(token); setSubjects(data); }
            catch (e) { console.error(e); }
            finally { setLoading(false); }
        })();
    }, [token]);

    const filtered = subjects.filter(s => s.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ minHeight: '100vh', background: '#09090B' }}>
            <Navbar />
            <main style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto' }} className="animate-fade-in">
                <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FAFAFA', marginBottom: 20 }}>{greet()}, {cap(student?.name)} 👋</h1>

                <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                    {[{ v: subjects.length || '62', l: 'Subjects' }, { v: '3', l: 'Courses' }, { v: '150+', l: 'Papers' }].map(s => (
                        <div key={s.l} style={{ padding: '10px 20px', background: '#111113', border: '1px solid #27272A', borderRadius: 10, textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: '#FAFAFA' }}>{s.v}</div>
                            <div style={{ fontSize: 11, color: '#71717A', marginTop: 2 }}>{s.l}</div>
                        </div>
                    ))}
                </div>

                <div style={{ position: 'relative', marginBottom: 24 }}>
                    <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#71717A' }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input id="search-bar" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subjects, papers... (⌘K)"
                        style={{ width: '100%', padding: '13px 16px 13px 46px', background: '#111113', border: '1px solid #27272A', borderRadius: 8, color: '#FAFAFA', fontSize: 14, outline: 'none', transition: 'border-color 0.15s' }}
                        onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                </div>

                {!loading && <p style={{ fontSize: 13, color: '#71717A', marginBottom: 16 }}>{search ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found` : `${subjects.length} subjects available`}</p>}

                {loading && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>{[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 160 }} />)}</div>}

                {!loading && filtered.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                        {filtered.map(s => <SubjectCard key={s} subject={s} />)}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div style={{ textAlign: 'center', paddingTop: 80 }}>
                        <p style={{ fontSize: 15, color: '#71717A', marginBottom: 8 }}>No subject found</p>
                        <p style={{ fontSize: 13, color: '#52525B' }}>Try a different search.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
