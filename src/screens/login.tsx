import React, { useState } from 'react';

import { useAuth } from '../providers/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signInUser } = useAuth();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await signInUser(email, password);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <h1>Sign up</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">sign up</button>
            </form>
        </div>
    );
};

export default Login;
