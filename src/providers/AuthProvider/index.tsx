import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import React, { FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseApp } from '../../config/firebaseWebApp';
import { AuthContext } from './context';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const auth = getAuth(firebaseApp);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const setUserPersistence = useCallback(async () => await setPersistence(auth, browserLocalPersistence), [auth]);

    const onAuthStateChange = useCallback(
        () =>
            onAuthStateChanged(auth, authUser => {
                setUser(authUser);
                setLoading(false);
            }),
        [auth],
    );

    useEffect(() => {
        onAuthStateChange();
        return onAuthStateChange();
    }, [onAuthStateChange]);

    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
        } else if (!loading) {
            navigate('/dashboard');
        }
    }, [loading, navigate, user]);

    useEffect(() => {
        (async () => setUserPersistence())();
    }, [setUserPersistence, user]);

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

    const signOutUser = useCallback(() => signOut(auth), [auth]);

    const authContext = useMemo(
        () => ({
            user,
            createUser,
            signInUser,
            signOutUser,
        }),
        [createUser, signInUser, signOutUser, user],
    );

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
