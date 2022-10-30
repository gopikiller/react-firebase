import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import React, { FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseApp } from '../../config/firebaseWebApp';
import { AuthContext } from './context';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const auth = getAuth(firebaseApp);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, authUser => {
            setUser(authUser);
            setLoading(false);
        });
        return unSubscribe;
    }, [auth]);

    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
        }
    }, [loading, navigate, user]);

    const createUser = useCallback(
        async (email: string, password: string): Promise<UserCredential> => {
            return await createUserWithEmailAndPassword(auth, email, password);
        },
        [auth],
    );

    const signInUser = useCallback(
        async (email: string, password: string): Promise<UserCredential> => {
            return await signInWithEmailAndPassword(auth, email, password);
        },
        [auth],
    );

    const sendVerificationEmail = useCallback(async () => {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
        }
    }, [auth.currentUser]);

    const signOutUser = useCallback(() => signOut(auth), [auth]);

    const authContext = useMemo(
        () => ({
            user,
            createUser,
            signInUser,
            signOutUser,
            sendVerificationEmail,
        }),
        [createUser, sendVerificationEmail, signInUser, signOutUser, user],
    );

    return <AuthContext.Provider value={authContext}>{!loading ? children : <div>loading...</div>}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
