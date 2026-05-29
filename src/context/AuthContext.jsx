import React, { useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';

export const AuthContext = React.createContext(null);

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe;
    }, [])


    const login = () => signInWithPopup(auth, provider);
    const logout = () => signOut(auth);

    const value = { user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

