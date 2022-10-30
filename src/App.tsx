import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';

import { Dashboard } from './screens/Dashboard';
import Login from './screens/login';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route index path="/" element={<>index</>} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
