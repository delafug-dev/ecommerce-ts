import { createContext, useState, ReactNode, useEffect } from 'react';


interface UserContextProps {
    user: {
        username: string;
        email: string;
        role: string;
    };
    logout: () => void;
    login: () => void;
    onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserAuthContext = createContext<UserContextProps>({} as UserContextProps);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        

    const [user, setUser] = useState({
        username: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user && setUser(user);
    }, [])

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, username: e.target.value });
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.search('admin') !== -1){
            setUser({ ...user, email: e.target.value ,role: 'admin' });
        }else{
            setUser({ ...user,email: e.target.value ,role: 'user' });
        }
    }

    const login = () => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () => {
        localStorage.removeItem('user');
    }
    
    return (
        <UserAuthContext.Provider value={{user,login, logout, onChangeUsername, onChangeEmail}}>
            {children}
        </UserAuthContext.Provider>
    );
};

export default {UserAuthProvider, UserAuthContext};
