import { useEffect, useRef } from 'react';

const PDFPreviewModal = ({ paper, onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClick = (e) => {
            if (!modalRef.current) return;

            // close if click is outside modal
            if (!modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKey);
        document.addEventListener('mousedown', handleClick);

        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.removeEventListener('mousedown', handleClick);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const getViewerUrl = (url) => {
        if (url.includes('drive.google.com')) {
            const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
            if (fileId) {
                return `https://drive.google.com/file/d/${fileId}/preview`;
            }
        }
        return url;
    };

    const handleDownload = () => {
        let url = paper.pdfUrl;

        if (url.includes('drive.google.com')) {
            const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1];
            if (fileId) {
                url = `https://drive.google.com/uc?export=download&id=${fileId}`;
            }
        }

        const a = document.createElement('a');
        a.href = url;
        a.download = `${paper.subject}-${paper.year}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
            }}
        >
            <div
                ref={modalRef}
                onMouseDown={(e) => e.stopPropagation()}
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: '#FFFFFF',
                    borderRadius: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Top Bar */}
                <div style={{
                    background: '#F9FAFB',
                    borderBottom: '1px solid #E5E7EB',
                    padding: '12px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>
                        {paper.subject} | {paper.examType} | {paper.year}
                    </span>

                    <div style={{ display: 'flex', gap: 8 }}>
                        <button
                            onClick={handleDownload}
                            style={{
                                padding: '7px 16px',
                                background: '#6366F1',
                                color: 'white',
                                borderRadius: 6,
                                fontSize: 13,
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Download ↓
                        </button>

                        <button
                            onClick={onClose}
                            style={{
                                padding: '7px 12px',
                                background: 'transparent',
                                border: '1px solid #E5E7EB',
                                color: '#6B7280',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 16
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <iframe
                    src={getViewerUrl(paper.pdfUrl)}
                    title="PDF Preview"
                    style={{
                        flex: 1,
                        width: '100%',
                        border: 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default PDFPreviewModal;