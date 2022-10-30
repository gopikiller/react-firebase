import React, { FC } from 'react';

import { useAuth } from '../providers/AuthProvider';

export const Dashboard: FC = () => {
    const { signOutUser } = useAuth();
    return (
        <div>
            <button onClick={signOutUser}>sign out</button>
        </div>
    );
};
