import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, initializeAuth } from '../Features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(initializeAuth()); // Initialize auth state from localStorage
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(isAdmin ? '/admin' : '/user');
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const handleLogin = () => {
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (isAdmin) {
            const adminExists = admins.find(admin => admin.name === username && admin.password === password);
            if (adminExists) {
                dispatch(login({ isAdmin: true, username }));
                setError('');
                navigate('/admin');
            } else {
                setError('Invalid admin credentials');
            }
        } else {
            const userExists = users.find(user => user.name === username && user.password === password);
            if (userExists) {
                dispatch(login({ isAdmin: false, username }));
                setError('');
                navigate('/user');
            } else {
                setError('Invalid user credentials');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                />
                Admin
            </label>
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default LoginPage;
