import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { student, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [logoutHover, setLogoutHover] = useState(false);
    const [adminHover, setAdminHover] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 56, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
            <Link to={student ? '/home' : '/login'} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <div style={{ width: 30, height: 30, background: '#6366F1', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16 }}>E</div>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {student ? (
                    <>
                        <span style={{ fontSize: 13, color: '#71717A' }}>Hi, <span style={{ color: '#FAFAFA' }}>{student.name}</span></span>
                        <button onClick={handleLogout} onMouseEnter={() => setLogoutHover(true)} onMouseLeave={() => setLogoutHover(false)}
                            style={{ padding: '6px 16px', background: 'transparent', border: `1px solid ${logoutHover ? '#6366F1' : '#27272A'}`, borderRadius: 6, color: '#FAFAFA', fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ fontSize: 13, color: '#71717A', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ fontSize: 13, padding: '6px 16px', background: '#6366F1', color: 'white', borderRadius: 6, textDecoration: 'none' }}>Register</Link>
                    </>
                )}
                <button onClick={toggleTheme} style={{ width: 32, height: 32, background: '#18181B', border: '1px solid #27272A', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FAFAFA' }}>
                    {theme === 'dark' ? (
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    ) : (
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    )}
                </button>
                <Link to="/admin" onMouseEnter={() => setAdminHover(true)} onMouseLeave={() => setAdminHover(false)}
                    style={{ fontSize: 13, color: adminHover ? '#FAFAFA' : '#71717A', textDecoration: 'none', transition: 'all 0.15s' }}>Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
