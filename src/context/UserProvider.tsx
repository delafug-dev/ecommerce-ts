import { createContext, useState, ReactNode } from 'react';


interface UserContextProps {
    user: string;
    email: string;
    logout: () => void;
    login: () => void;
    onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserAuthContext = createContext<UserContextProps>({} as UserContextProps);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        

    const [user, setUser] = useState(localStorage.getItem('user') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
  
    const login = () => {
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);

    }
  
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('email');
    };

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    
    return (
        <UserAuthContext.Provider value={{ user,email, login, logout, onChangeUser, onChangeEmail}}>
            {children}
        </UserAuthContext.Provider>
    );
};

export default {UserAuthProvider, UserAuthContext};
