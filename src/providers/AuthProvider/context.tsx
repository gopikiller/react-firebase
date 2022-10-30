import { User, UserCredential } from 'firebase/auth';
import { createContext } from 'react';

type AuthContextType = {
    user: User | null;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    signInUser: (email: string, password: string) => Promise<UserCredential>;
    signOutUser: () => Promise<void>;
    sendVerificationEmail: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    createUser: Promise.resolve,
    signInUser: Promise.resolve,
    signOutUser: Promise.resolve,
    sendVerificationEmail: Promise.resolve,
});
