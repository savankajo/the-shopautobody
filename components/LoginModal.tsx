import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal: React.FC = () => {
    const { showLoginModal, closeLoginModal, login } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(credentials.username, credentials.password);
        if (!success) {
            setError('Invalid username or password.');
        } else {
            setError('');
            setCredentials({ username: '', password: '' });
        }
    };

    if (!showLoginModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-brand-gray p-8 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl font-bold text-text-heading text-center mb-6">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-text-body mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className="w-full px-3 py-2 bg-brand-light-gray text-text-heading rounded focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            autoFocus
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-text-body mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="w-full px-3 py-2 bg-brand-light-gray text-text-heading rounded focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            Login
                        </button>
                        <button type="button" onClick={closeLoginModal} className="ml-4 text-text-muted hover:text-text-heading">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;