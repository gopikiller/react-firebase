import React, { FC } from 'react';

import { useAuth } from '../providers/AuthProvider';

export const Dashboard: FC = () => {
    const { signOutUser, sendVerificationEmail, user } = useAuth();
    return (
        <div>
            <button onClick={signOutUser}>sign out</button>
            {!user?.emailVerified && <button onClick={sendVerificationEmail}>send verification mail</button>}
            <div>user id: {user?.uid}</div>
            <div>email: {user?.email}</div>
        </div>
    );
};
