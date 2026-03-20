const SearchBar = ({ value, onChange }) => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <input
                id="search-bar"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search subjects, papers... (⌘K)"
                style={{ width: '100%', padding: '14px 48px 14px 48px', background: '#0F0F0F', border: '1px solid #1F1F1F', borderRadius: 10, color: 'white', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                onBlur={(e) => e.target.style.borderColor = '#1F1F1F'}
            />
            {value && (
                <button onClick={() => onChange('')}
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 0 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
