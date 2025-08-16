import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Send, CheckCircle, AlertCircle, Sparkles, Users, Zap } from "lucide-react";

function EmailForm() {
    const [emails, setEmails] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [stats, setStats] = useState({ total: 0, valid: 0, invalid: 0 });
    const [particles, setParticles] = useState([]);

    // Generate floating particles for background animation
    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 20,
            duration: 15 + Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    // Real-time email validation and stats
    useEffect(() => {
        const emailList = emails
            .split(/\s|,|\n/)
            .map((e) => e.trim())
            .filter((e) => e);

        const validEmails = emailList.filter(email =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );

        setStats({
            total: emailList.length,
            valid: validEmails.length,
            invalid: emailList.length - validEmails.length
        });
    }, [emails]);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Handle form submission and call backend
    const handleSubmit = async () => {
        if (!emails.trim()) {
            showToast("Please enter at least one email.", "error");
            return;
        }

        const emailList = emails
            .split(/\s|,|\n/)
            .map((e) => e.trim())
            .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

        if (emailList.length === 0) {
            showToast("No valid emails found.", "error");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/emails/save",
                { emails: emailList }
            );

            const { added, skipped } = response.data;

            showToast(
                `✨ ${added} emails added successfully! ${skipped > 0 ? `${skipped} duplicates skipped.` : ""}`,
                "success"
            );

            setEmails("");
        } catch (error) {
            console.error(error);
            showToast("Failed to save emails. Please try again!", "error");
        } finally {
            setLoading(false);
        }
    };

    // ----------------- Styles -----------------
    const containerStyle = {
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #be185d 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };
    const backgroundOverlayStyle = {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))',
        backdropFilter: 'blur(100px)'
    };
    const contentWrapperStyle = {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '24px'
    };
    const mainCardStyle = { width: '100%', maxWidth: '800px' };
    const headerStyle = { textAlign: 'center', marginBottom: '48px' };
    const iconWrapperStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        marginBottom: '24px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    };
    const titleStyle = {
        fontSize: '3rem',
        fontWeight: '700',
        background: 'linear-gradient(45deg, #ffffff, #bfdbfe, #ddd6fe)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '16px',
        lineHeight: '1.1'
    };
    const subtitleStyle = { fontSize: '1.25rem', color: '#d1d5db', maxWidth: '400px', margin: '0 auto' };
    const formCardStyle = {
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.5s ease'
    };
    const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' };
    const statCardStyle = (color) => ({
        textAlign: 'center',
        padding: '16px',
        borderRadius: '16px',
        background: `linear-gradient(45deg, rgba(${color}, 0.2), rgba(${color}, 0.3))`,
        border: `1px solid rgba(${color}, 0.3)`,
        backdropFilter: 'blur(10px)'
    });
    const statNumberStyle = { fontSize: '2rem', fontWeight: '700', color: '#ffffff', margin: '8px 0 4px 0' };
    const statLabelStyle = { fontSize: '0.75rem', color: '#d1d5db' };
    const inputSectionStyle = { marginBottom: '24px' };
    const labelStyle = { display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#ffffff', marginBottom: '12px' };
    const textareaWrapperStyle = { position: 'relative' };
    const textareaStyle = {
        width: '100%',
        height: '160px',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        fontSize: '16px',
        resize: 'none',
        outline: 'none',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit'
    };
    const indicatorStyle = (isActive) => ({
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: isActive ? '#22c55e' : '#6b7280',
        animation: isActive ? 'pulse 2s infinite' : 'none'
    });
    const submitButtonStyle = (disabled) => ({
        width: '100%',
        padding: '16px 32px',
        borderRadius: '16px',
        fontWeight: '600',
        fontSize: '1.125rem',
        color: '#ffffff',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled
            ? 'linear-gradient(45deg, #6b7280, #9ca3af)'
            : 'linear-gradient(45deg, #2563eb, #8b5cf6)',
        boxShadow: disabled ? 'none' : '0 10px 30px rgba(37, 99, 235, 0.3)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    const featurePillsStyle = { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px', justifyContent: 'center' };
    const pillStyle = { padding: '4px 12px', fontSize: '0.75rem', fontWeight: '500', color: '#bfdbfe', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '9999px', border: '1px solid rgba(59, 130, 246, 0.3)' };
    const toastStyle = (type) => ({
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 50,
        padding: '16px',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        backgroundColor: type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        color: type === 'success' ? '#bbf7d0' : '#fecaca',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transform: 'translateX(0)',
        transition: 'all 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
    });

    return (
        <div style={containerStyle}>
            {/* Background Particles */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {particles.map(p => (
                    <div key={p.id} style={{
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        opacity: 0.2,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        animation: `float ${p.duration}s infinite ease-in-out ${p.delay}s`
                    }} />
                ))}
            </div>

            <div style={backgroundOverlayStyle} />

            <div style={contentWrapperStyle}>
                <div style={mainCardStyle}>
                    <div style={headerStyle}>
                        <div style={iconWrapperStyle}><Mail size={40} color="white" /></div>
                        <h1 style={titleStyle}>Email Command Center</h1>
                        <p style={subtitleStyle}>Advanced email management with real-time validation and intelligent processing</p>
                    </div>

                    <div style={formCardStyle}>
                        <div style={statsGridStyle}>
                            <div style={statCardStyle('59, 130, 246')}>
                                <Users size={24} color="#93c5fd" style={{ margin: '0 auto 8px' }} />
                                <div style={statNumberStyle}>{stats.total}</div>
                                <div style={statLabelStyle}>Total</div>
                            </div>
                            <div style={statCardStyle('34, 197, 94')}>
                                <CheckCircle size={24} color="#86efac" style={{ margin: '0 auto 8px' }} />
                                <div style={statNumberStyle}>{stats.valid}</div>
                                <div style={statLabelStyle}>Valid</div>
                            </div>
                            <div style={statCardStyle('239, 68, 68')}>
                                <AlertCircle size={24} color="#fca5a5" style={{ margin: '0 auto 8px' }} />
                                <div style={statNumberStyle}>{stats.invalid}</div>
                                <div style={statLabelStyle}>Invalid</div>
                            </div>
                        </div>

                        <div style={inputSectionStyle}>
                            <label style={labelStyle}><Sparkles size={16} color="#fbbf24" style={{ marginRight: '8px' }} />Enter Email Addresses</label>
                            <div style={textareaWrapperStyle}>
                                <textarea
                                    placeholder="john@company.com, sarah@startup.io&#10;Enter multiple emails separated by commas or new lines..."
                                    value={emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                    style={textareaStyle}
                                />
                                <div style={indicatorStyle(stats.valid > 0)} />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading || stats.valid === 0}
                            style={submitButtonStyle(loading || stats.valid === 0)}
                        >
                            {loading ? (
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '2px solid white',
                                    borderTop: '2px solid transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    marginRight: '12px'
                                }} />
                            ) : (
                                <>
                                    <Send size={20} style={{ marginRight: '12px' }} />
                                    Submit {stats.valid > 0 && `${stats.valid} Email${stats.valid !== 1 ? 's' : ''}`}
                                    <Zap size={16} color="#fbbf24" style={{ marginLeft: '8px' }} />
                                </>
                            )}
                        </button>

                        <div style={featurePillsStyle}>
                            {['Real-time Validation', 'Bulk Processing', 'Smart Deduplication', 'Instant Feedback'].map(f => (
                                <span key={f} style={pillStyle}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {toast && (
                <div style={toastStyle(toast.type)}>
                    {toast.type === 'success' ? <CheckCircle size={20} color="#22c55e" style={{ marginRight: '12px' }} /> : <AlertCircle size={20} color="#ef4444" style={{ marginRight: '12px' }} />}
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Keyframes */}
            <style>{`
                @keyframes float {0%,100%{transform:translateY(0px) rotate(0deg);opacity:0.2}33%{transform:translateY(-30px) rotate(120deg);opacity:0.4}66%{transform:translateY(10px) rotate(240deg);opacity:0.1}}
                @keyframes spin {from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
                @keyframes pulse {0%,100%{opacity:1;}50%{opacity:0.5;}}
                textarea::placeholder {color: rgba(156, 163, 175, 0.8);}
                textarea:focus {outline: none !important; border-color: rgba(59, 130, 246, 0.5) !important; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;}
            `}</style>
        </div>
    );
}

export default EmailForm;
