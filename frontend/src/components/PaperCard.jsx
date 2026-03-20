import { useState } from 'react';
import PDFPreviewModal from './PDFPreviewModal';

const PaperCard = ({ paper }) => {
    const [preview, setPreview] = useState(false);
    const [hover, setHover] = useState(false);
    const [prevHover, setPrevHover] = useState(false);
    const [dlHover, setDlHover] = useState(false);

    const isMid = paper.examType === 'Mid Sem';
    const badge = isMid
        ? { background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }
        : { background: 'rgba(99,102,241,0.1)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.2)' };

    return (
        <>
            <div
                onClick={() => setPreview(true)}
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: hover ? '16px 12px' : '16px 4px', borderBottom: hover ? '1px solid #6366F1' : '1px solid #18181B', borderRadius: hover ? 8 : 0, background: hover ? 'rgba(99,102,241,0.04)' : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 38, height: 38, background: '#18181B', border: '1px solid #27272A', borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 8, fontWeight: 800, color: '#6366F1', letterSpacing: 1 }}>PDF</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3, alignItems: 'center' }}>
                            <div style={{ width: 14, height: 1.5, background: '#27272A', borderRadius: 1 }} />
                            <div style={{ width: 10, height: 1.5, background: '#27272A', borderRadius: 1 }} />
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#FAFAFA' }}>{paper.year} — {isMid ? 'Mid Semester Examination' : 'End Semester Examination'}</div>
                        <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, marginTop: 3, ...badge }}>{paper.examType}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={e => { e.stopPropagation(); setPreview(true); }} onMouseEnter={() => setPrevHover(true)} onMouseLeave={() => setPrevHover(false)}
                        style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${prevHover ? '#6366F1' : '#27272A'}`, borderRadius: 6, color: prevHover ? '#FAFAFA' : '#71717A', fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>Preview</button>
                    <button onClick={e => { e.stopPropagation(); const a = document.createElement('a'); a.href = paper.pdfUrl; a.setAttribute('download', `${paper.subject}_${paper.examType}_${paper.year}.pdf`); a.target = '_blank'; document.body.appendChild(a); a.click(); document.body.removeChild(a); }} onMouseEnter={() => setDlHover(true)} onMouseLeave={() => setDlHover(false)}
                        style={{ padding: '7px 14px', background: dlHover ? '#4F46E5' : '#6366F1', border: 'none', borderRadius: 6, color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>Download</button>
                </div>
            </div>
            {preview && <PDFPreviewModal paper={paper} onClose={() => setPreview(false)} />}
        </>
    );
};

export default PaperCard;
