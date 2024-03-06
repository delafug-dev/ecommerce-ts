import React, { createContext, useState, ReactNode, useEffect } from 'react';


interface UserContextProps {
    user: {
        username: string;
        email: string;
        role: string;
    };
    logout: () => void;
    login: () => void;
    onChangeUser: (username :string, email: string) => void;
}

export const UserAuthContext = createContext<UserContextProps>({} as UserContextProps);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const contieneAdminExpRegular = (str:string) => /admin/i.test(str);

    const [user, setUser] = useState({
        username: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user && setUser(user);
    }, [])


    const onChangeUser = (username: string, email: string) => {
        setUser({ ...user, username: username });
        if (contieneAdminExpRegular(email)) {
            setUser(prevUser => ({ ...prevUser, email: email, role: 'admin' }));
        } else {
            setUser(prevUser => ({ ...prevUser, email: email, role: 'user' }));
        }
    }

    const login = () => {
        if (user.email !== '' && user.username !== '') localStorage.setItem('user', JSON.stringify(user));
        console.log('user', user)
    }

    const logout = () => {
        setUser({ username: '', email: '', role: '' });
        localStorage.removeItem('user');
    }
    
    return (
        <UserAuthContext.Provider value={{user,login, logout, onChangeUser}}>
            {children}
        </UserAuthContext.Provider>
    );
};

export default {UserAuthProvider, UserAuthContext};
