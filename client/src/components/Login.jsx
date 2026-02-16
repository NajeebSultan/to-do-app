import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, signup, googleSignIn } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            if (isLogin) {
                await login(emailRef.current.value, passwordRef.current.value);
            } else {
                await signup(emailRef.current.value, passwordRef.current.value);
            }
            navigate('/');
        } catch {
            setError('Failed to ' + (isLogin ? 'log in' : 'create an account'));
        }

        setLoading(false);
    }

    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await googleSignIn();
            navigate('/');
        } catch {
            setError('Failed to sign in with Google');
        }
        setLoading(false);
    }

    return (
        <div className="login-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
            color: '#e0e0e0'
        }}>
            <div className="login-card" style={{
                backgroundColor: '#2d2d2d',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ff4d4d' }}>
                    {isLogin ? 'Log In' : 'Sign Up'}
                </h2>

                {error && <div style={{
                    backgroundColor: 'rgba(255, 77, 77, 0.1)',
                    color: '#ff4d4d',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            ref={emailRef}
                            required
                            style={{
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: '1px solid #404040',
                                backgroundColor: '#1a1a1a',
                                color: '#e0e0e0'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            ref={passwordRef}
                            required
                            style={{
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: '1px solid #404040',
                                backgroundColor: '#1a1a1a',
                                color: '#e0e0e0'
                            }}
                        />
                    </div>
                    <button disabled={loading} type="submit" style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#404040' }}></div>
                    <span style={{ padding: '0 0.5rem', color: '#888' }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#404040' }}></div>
                </div>

                <button onClick={handleGoogleSignIn} disabled={loading} style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    color: '#333',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path d="M17.64 9.2c0-.637-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path>
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"></path>
                        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path>
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.27C4.672 5.14 6.656 3.58 9 3.58z" fill="#EA4335"></path>
                    </svg>
                    Sign in with Google
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff4d4d',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}>
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>
        </div>
    );
}
