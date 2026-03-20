import { useState, useEffect } from 'react';
import { adminLogin, adminAddPaper, adminGetPapers, adminDeletePaper } from '../utils/api';

const SUBJECTS = ['Programming for Problem Solving', 'Data Structures', 'Computer Organization and Architecture', 'Discrete Mathematics', 'Introduction to Java Programming', 'Operating Systems', 'Database Management Systems', 'Advanced Java Programming', 'Software Engineering', 'Design and Analysis of Algorithms', 'Computer Networks', 'Artificial Intelligence', 'Theory of Computation', 'Compiler Design', 'Engineering Mathematics I', 'Engineering Mathematics II', 'Probability and Statistics', 'Engineering Physics', 'Engineering Chemistry', 'Fundamental of Electronics Engineering', 'Basic Electrical Engineering', 'Engineering Graphics', 'Engineering Mechanics', 'Machine Learning', 'Deep Learning', 'R Programming', 'Fuzzy Logic and Neural Network', 'Evolutionary Computing', 'Robotics', 'Introduction to Data Science', 'Data Mining and Data Warehousing', 'Big Data Analytics', 'Cloud Computing', 'Internet of Things', 'Mobile Application Programming using Android', 'Wireless and Mobile Systems', 'Advanced Computer Networks', 'Mobile and Wireless Network Security', 'Number Theory and Cryptology', 'Foundation of Cyber Security', 'Data Encryption and Network Security', 'Cyber Crime and Investigation', 'Ethical Hacking and Digital Forensics', 'Digital Image Processing', 'Computer Vision', 'Satellite Image Processing', 'Information Retrieval', 'Biometrics Security', 'Introduction to Blockchain Technologies', 'Design and Development of Blockchain Technologies', 'Blockchain Ecosystems and Governance', 'Container Technologies', 'Front-End Engineering', 'Advanced Topics in Front-End Engineering', 'Server Side Engineering', 'DevOps', 'Professional Communication', 'Environmental Science', 'Indian Constitution', 'Engineering Economics', 'Entrepreneurship and Start-ups', 'Intellectual Property Rights'];
const YEARS = [2020, 2021, 2022, 2023, 2024];

const I = { width: '100%', padding: '10px 14px', background: '#111113', border: '1px solid #27272A', borderRadius: 6, color: '#FAFAFA', fontSize: 14, outline: 'none', transition: 'border-color 0.15s' };
const L = { fontSize: 13, color: '#71717A', marginBottom: 6, fontWeight: 500, display: 'block' };

const sideItems = [
    { label: 'Dashboard', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
    { label: 'Uploads', d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', active: true },
    { label: 'Users', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Settings', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

const AdminPanel = () => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
    const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState(''); const [loginLoad, setLoginLoad] = useState(false);
    const [subject, setSubject] = useState(''); const [subjectSearch, setSubjectSearch] = useState('');
    const [showDrop, setShowDrop] = useState(false);
    const [examType, setExamType] = useState('Mid Sem'); const [year, setYear] = useState(2024);
    const [pdfUrl, setPdfUrl] = useState('');
    const [msg, setMsg] = useState({ t: '', k: '' }); const [addLoad, setAddLoad] = useState(false);
    const [papers, setPapers] = useState([]); const [papLoad, setPapLoad] = useState(false);
    const [uploadHover, setUploadHover] = useState(false);
    const [loginBtnHover, setLoginBtnHover] = useState(false);
    const [sideHover, setSideHover] = useState(null);
    const [logoutHover, setLogoutHover] = useState(false);

    useEffect(() => { if (isLoggedIn) fetchPapers(); }, [isLoggedIn]);

    const fetchPapers = async () => { setPapLoad(true); try { const { data } = await adminGetPapers(adminToken); setPapers(data); } catch (e) { console.error(e); } finally { setPapLoad(false); } };
    const handleLogin = async (e) => { e.preventDefault(); setLoginErr(''); setLoginLoad(true); try { const { data } = await adminLogin(username, password); localStorage.setItem('adminToken', data.token); setAdminToken(data.token); setIsLoggedIn(true); } catch (e) { setLoginErr(e.response?.data?.message || 'Login failed'); } finally { setLoginLoad(false); } };
    const handleLogout = () => { localStorage.removeItem('adminToken'); setAdminToken(''); setIsLoggedIn(false); setPapers([]); };
    const handleAdd = async (e) => { e.preventDefault(); setMsg({ t: '', k: '' }); if (!subject) { setMsg({ t: 'Select a subject', k: 'e' }); return; } if (!pdfUrl) { setMsg({ t: 'Enter PDF URL', k: 'e' }); return; } setAddLoad(true); try { await adminAddPaper({ subject, examType, year, pdfUrl }, adminToken); setMsg({ t: 'Paper added!', k: 's' }); setSubject(''); setSubjectSearch(''); setPdfUrl(''); fetchPapers(); } catch (e) { setMsg({ t: e.response?.data?.message || 'Failed', k: 'e' }); } finally { setAddLoad(false); } };
    const handleDel = async (id) => { if (!window.confirm('Delete?')) return; try { await adminDeletePaper(id, adminToken); fetchPapers(); } catch (e) { console.error(e); } };
    const filteredSub = SUBJECTS.filter(s => s.toLowerCase().includes(subjectSearch.toLowerCase()));

    // LOGIN
    if (!isLoggedIn) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090B', padding: 24 }}>
            <div className="animate-fade-in" style={{ width: 380, maxWidth: '100%', background: '#111113', border: '1px solid #27272A', borderRadius: 12, padding: 32 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FAFAFA', marginBottom: 4 }}>Admin Access Only</h1>
                <p style={{ fontSize: 14, color: '#71717A', marginBottom: 28 }}>Enter credentials to continue</p>
                {loginErr && <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, color: '#FCA5A5', fontSize: 13 }}>{loginErr}</div>}
                <form onSubmit={handleLogin}>
                    <input id="admin-username" type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" style={{ ...I, marginBottom: 16 }} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                    <input id="admin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={{ ...I, marginBottom: 16 }} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                    <button id="admin-login-submit" type="submit" disabled={loginLoad} onMouseEnter={() => setLoginBtnHover(true)} onMouseLeave={() => setLoginBtnHover(false)}
                        style={{ width: '100%', padding: 12, background: loginBtnHover ? '#4F46E5' : '#6366F1', border: 'none', borderRadius: 8, color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', opacity: loginLoad ? 0.6 : 1 }}>
                        {loginLoad ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );

    // DASHBOARD
    return (
        <div style={{ minHeight: '100vh', background: '#09090B', display: 'flex' }}>
            {/* Sidebar */}
            <aside style={{ width: 220, flexShrink: 0, background: '#0C0C0E', borderRight: '1px solid #27272A', height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, background: '#6366F1', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>E</div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#FAFAFA' }}>EduArchive</span>
                </div>
                <nav style={{ flex: 1, paddingTop: 12 }}>
                    {sideItems.map((it, i) => (
                        <div key={it.label} onMouseEnter={() => setSideHover(i)} onMouseLeave={() => setSideHover(null)}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', fontSize: 14, cursor: 'pointer', transition: 'all 0.15s', color: it.active ? '#FAFAFA' : sideHover === i ? '#FAFAFA' : '#71717A', background: it.active ? '#18181B' : sideHover === i ? '#111113' : 'transparent', borderRight: it.active ? '2px solid #6366F1' : '2px solid transparent' }}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={it.d} /></svg>
                            {it.label}
                        </div>
                    ))}
                </nav>
                <div style={{ padding: 20 }}>
                    <button onClick={handleLogout} onMouseEnter={() => setLogoutHover(true)} onMouseLeave={() => setLogoutHover(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: logoutHover ? '#FAFAFA' : '#71717A', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s', width: '100%' }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                    </button>
                </div>
            </aside>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                {/* Top bar */}
                <header style={{ padding: '16px 24px', borderBottom: '1px solid #27272A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 18 }}><span style={{ color: '#71717A' }}>Admin: </span><span style={{ color: '#FAFAFA', fontWeight: 700 }}>Sidebar Management</span></span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#71717A" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>AU</div>
                        <div>
                            <div style={{ fontSize: 13, color: '#FAFAFA', fontWeight: 500 }}>Admin User</div>
                            <div style={{ fontSize: 11, color: '#71717A' }}>admin@edu.ac</div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div style={{ display: 'flex', gap: 24, padding: 24, flexWrap: 'wrap' }}>
                    {/* Form */}
                    <div style={{ width: 360, flexShrink: 0 }}>
                        {msg.t && <div style={{ marginBottom: 12, padding: '10px 14px', borderRadius: 6, fontSize: 13, background: msg.k === 's' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: msg.k === 's' ? '#4ADE80' : '#FCA5A5', border: `1px solid ${msg.k === 's' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }}>{msg.t}</div>}
                        <form onSubmit={handleAdd}>
                            <label style={L}>Document Title</label>
                            <input type="text" placeholder="e.g., CS101 Midsem 2023" style={{ ...I, marginBottom: 16 }} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />

                            <label style={L}>Subject</label>
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                <input type="text" value={subject || subjectSearch} onChange={e => { setSubjectSearch(e.target.value); setSubject(''); setShowDrop(true); }} onFocus={() => setShowDrop(true)} onBlur={() => setTimeout(() => setShowDrop(false), 200)} placeholder="Search subjects..." style={I} />
                                {showDrop && !subject && (
                                    <div style={{ position: 'absolute', zIndex: 20, width: '100%', top: '100%', marginTop: 4, maxHeight: 160, overflowY: 'auto', background: '#111113', border: '1px solid #27272A', borderRadius: 6 }}>
                                        {filteredSub.length ? filteredSub.map(s => (
                                            <div key={s} onMouseDown={(e) => { e.preventDefault(); setSubject(s); setSubjectSearch(''); setShowDrop(false); }} style={{ padding: '8px 14px', fontSize: 13, color: '#A1A1AA', cursor: 'pointer', transition: 'all 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#18181B'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{s}</div>
                                        )) : <p style={{ padding: '8px 14px', fontSize: 12, color: '#71717A' }}>No match</p>}
                                    </div>
                                )}
                            </div>

                            <label style={L}>Year</label>
                            <select value={year} onChange={e => setYear(Number(e.target.value))} style={{ ...I, marginBottom: 16, appearance: 'auto' }}>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}</select>

                            <label style={L}>Exam Type</label>
                            <select value={examType} onChange={e => setExamType(e.target.value)} style={{ ...I, marginBottom: 16, appearance: 'auto' }}><option value="Mid Sem">Mid Sem</option><option value="End Sem">End Sem</option></select>

                            <label style={L}>File Upload</label>
                            <div style={{ border: '1.5px dashed #27272A', borderRadius: 8, padding: '32px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: 8, transition: 'border-color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#6366F1'} onMouseLeave={e => e.currentTarget.style.borderColor = '#27272A'}>
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#71717A" strokeWidth={1.5} style={{ margin: '0 auto 8px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <p style={{ fontSize: 14, color: '#71717A' }}>Drag or drop here</p>
                                <p style={{ fontSize: 12, color: '#52525B', marginTop: 4 }}>Or paste URL below</p>
                            </div>
                            <input type="url" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} placeholder="https://res.cloudinary.com/..." style={{ ...I, marginBottom: 16 }} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />

                            <button type="submit" disabled={addLoad} onMouseEnter={() => setUploadHover(true)} onMouseLeave={() => setUploadHover(false)}
                                style={{ width: '100%', padding: 12, background: uploadHover ? '#4F46E5' : '#6366F1', border: 'none', borderRadius: 8, color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', opacity: addLoad ? 0.6 : 1 }}>
                                {addLoad ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </form>
                    </div>

                    {/* Table */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#FAFAFA', marginBottom: 16 }}>Data Table</h2>
                        {papLoad ? [...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 40, marginBottom: 4 }} />) : papers.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#0C0C0E' }}>
                                            {['Title', 'Subject', 'Year', 'Type', 'Uploaded By', 'Actions'].map(h => (
                                                <th key={h} style={{ padding: '10px 16px', fontSize: 11, color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.8, textAlign: h === 'Actions' ? 'right' : 'left', borderBottom: '1px solid #27272A', fontWeight: 500 }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {papers.map(p => (
                                            <tr key={p._id} onMouseEnter={e => e.currentTarget.style.background = '#111113'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: '12px 16px', fontSize: 13, color: '#FAFAFA', borderBottom: '1px solid #111113' }}>{p.subject.split(' ').map(w => w[0]).join('').slice(0, 5)} {p.examType === 'Mid Sem' ? 'Midsem' : 'Endsem'} {p.year}</td>
                                                <td style={{ padding: '12px 16px', fontSize: 13, color: '#FAFAFA', borderBottom: '1px solid #111113', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.subject}</td>
                                                <td style={{ padding: '12px 16px', fontSize: 13, color: '#FAFAFA', borderBottom: '1px solid #111113' }}>{p.year}</td>
                                                <td style={{ padding: '12px 16px', fontSize: 13, color: '#FAFAFA', borderBottom: '1px solid #111113' }}>{p.examType}</td>
                                                <td style={{ padding: '12px 16px', fontSize: 13, color: '#FAFAFA', borderBottom: '1px solid #111113' }}>Admin</td>
                                                <td style={{ padding: '12px 16px', borderBottom: '1px solid #111113', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                                        <button onClick={() => window.open(p.pdfUrl, '_blank')} style={{ padding: 4, background: 'none', border: 'none', color: '#6366F1', cursor: 'pointer', borderRadius: 4, transition: 'all 0.15s' }}
                                                            onMouseEnter={e => e.target.style.background = 'rgba(99,102,241,0.1)'} onMouseLeave={e => e.target.style.background = 'none'}>
                                                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                        </button>
                                                        <button onClick={() => handleDel(p._id)} style={{ padding: 4, background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', borderRadius: 4, transition: 'all 0.15s' }}
                                                            onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.target.style.background = 'none'}>
                                                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                                    <span style={{ fontSize: 13, color: '#71717A' }}>Page 1 of 1</span>
                                    {['|«', '‹', '1', '›', '»|'].map((b, i) => (
                                        <button key={i} style={{ padding: '5px 10px', background: b === '1' ? '#6366F1' : 'transparent', border: b === '1' ? 'none' : '1px solid #27272A', borderRadius: 6, color: b === '1' ? 'white' : '#71717A', fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>{b}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', paddingTop: 60 }}><p style={{ fontSize: 14, color: '#71717A' }}>No papers yet. Add one using the form.</p></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
