// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './Components/AdminPage';
import UserPage from './Components/UserPage';
import LoginPage from './Components/LoginPage';
import DatasetPage from './Components/DatasetPage';

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={isAuthenticated ? (
                        isAdmin ? <Navigate to="/admin" /> : <Navigate to="/user" />
                    ) : (
                        <Navigate to="/login" />
                    )}
                />
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="/user" element={isAuthenticated && !isAdmin ? <UserPage /> : <Navigate to="/login" />} />
                <Route path="/dataset" element={ <DatasetPage /> } />
            </Routes>
        </Router>
    );
}

export default App;
