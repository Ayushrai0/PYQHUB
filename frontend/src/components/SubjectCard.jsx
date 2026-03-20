import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ subject }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    const [btnHover, setBtnHover] = useState(false);

    return (
        <div
            onClick={() => navigate(`/subject/${encodeURIComponent(subject)}`)}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            style={{ padding: 20, background: '#111113', border: `1px solid ${hover ? '#6366F1' : '#27272A'}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s', boxShadow: hover ? '0 0 0 1px #6366F1, 0 4px 20px rgba(99,102,241,0.1)' : 'none', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 160 }}
        >
            <span style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', top: 10, right: 14 }} />
            <span style={{ position: 'absolute', width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', top: 18, right: 24 }} />
            <span style={{ position: 'absolute', width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', top: 26, right: 16 }} />

            <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#FAFAFA', marginBottom: 8, lineHeight: 1.4 }}>{subject}</h3>
                <p style={{ fontSize: 12, color: '#71717A', marginBottom: 3 }}>Course: <span style={{ color: '#A1A1AA' }}>B.Tech</span></p>
                <p style={{ fontSize: 12, color: '#71717A', marginBottom: 18 }}>Papers: <span style={{ color: '#A1A1AA' }}>25</span></p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span onClick={e => { e.stopPropagation(); navigate(`/subject/${encodeURIComponent(subject)}`); }}
                    onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)}
                    style={{ padding: '5px 14px', background: 'transparent', border: `1px solid ${btnHover ? '#6366F1' : '#27272A'}`, borderRadius: 6, color: btnHover ? '#FAFAFA' : '#71717A', fontSize: 12, cursor: 'pointer', transition: 'all 0.15s' }}>
                    View Archive →
                </span>
            </div>
        </div>
    );
};

export default SubjectCard;
