import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerStudent } from '../utils/api';

const I = { width: '100%', padding: '12px 14px 12px 42px', background: '#18181B', border: '1px solid #27272A', borderRadius: 8, color: '#FAFAFA', fontSize: 14, outline: 'none', transition: 'border-color 0.15s' };

const RegisterPage = () => {
    const { student, login } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(''); const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
    const [btnHover, setBtnHover] = useState(false);

    if (student) return <Navigate to="/home" />;

    const handleSubmit = async (e) => {
        e.preventDefault(); setError('');
        if (password !== confirmPassword) { setError('Passwords do not match'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        try { const { data } = await registerStudent(name, email, password); login(data.token); navigate('/home'); }
        catch (err) { setError(err.response?.data?.message || 'Registration failed.'); }
        finally { setLoading(false); }
    };

    const icon = (d) => <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#71717A' }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>;

    return (
        <>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <div className="login-left" style={{ width: '50%', background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 40%, #0D0B2E 100%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: 48 }}>
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg"><defs><pattern id="m" width="80" height="80" patternUnits="userSpaceOnUse"><circle cx="40" cy="40" r="1.2" fill="white" /><circle cx="0" cy="0" r="1.2" fill="white" /><circle cx="80" cy="0" r="1.2" fill="white" /><circle cx="0" cy="80" r="1.2" fill="white" /><circle cx="80" cy="80" r="1.2" fill="white" /><line x1="0" y1="0" x2="40" y2="40" stroke="white" strokeWidth="0.4" /><line x1="80" y1="0" x2="40" y2="40" stroke="white" strokeWidth="0.4" /><line x1="0" y1="80" x2="40" y2="40" stroke="white" strokeWidth="0.4" /><line x1="80" y1="80" x2="40" y2="40" stroke="white" strokeWidth="0.4" /></pattern></defs><rect width="100%" height="100%" fill="url(#m)" /></svg>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: 52, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1, marginBottom: 12 }}>EduArchive</h1>
                        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)' }}>Your academic archive, simplified.</p>
                    </div>
                </div>

                <div className="login-right" style={{ flex: 1, background: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
                    <div style={{ width: 380, maxWidth: '100%' }} className="animate-fade-in">
                        <p className="mobile-brand" style={{ display: 'none', fontSize: 22, fontWeight: 800, color: '#6366F1', marginBottom: 12 }}>EduArchive</p>
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FAFAFA', marginBottom: 8 }}>Create Account</h2>
                        <p style={{ fontSize: 14, color: '#71717A', marginBottom: 32 }}>Join EduArchive today</p>

                        {error && <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, color: '#FCA5A5', fontSize: 13 }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                {icon("M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z")}
                                <input id="register-name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Full Name" style={I} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                            </div>
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                {icon("M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z")}
                                <input id="register-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email Address" style={I} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                            </div>
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                {icon("M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z")}
                                <input id="register-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={I} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                            </div>
                            <div style={{ position: 'relative', marginBottom: 16 }}>
                                {icon("M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z")}
                                <input id="register-confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Confirm Password" style={I} onFocus={e => e.target.style.borderColor = '#6366F1'} onBlur={e => e.target.style.borderColor = '#27272A'} />
                            </div>
                            <button id="register-submit" type="submit" disabled={loading} onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)}
                                style={{ width: '100%', padding: 12, background: btnHover ? '#4F46E5' : '#6366F1', border: 'none', borderRadius: 8, color: '#FFFFFF', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 8, boxShadow: '0 0 24px rgba(99,102,241,0.3)', transition: 'all 0.15s', opacity: loading ? 0.6 : 1 }}>
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>
                        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#71717A' }}>
                            Already have an account? <Link to="/login" style={{ color: '#6366F1', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
            <style>{`@media(max-width:768px){.login-left{display:none!important}.login-right{width:100%!important}.mobile-brand{display:block!important}}`}</style>
        </>
    );
};

export default RegisterPage;
