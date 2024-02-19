import { createContext, useState, ReactNode, useEffect } from 'react';


interface UserContextProps {
    user: {
        username: string;
        email: string;
        admin: boolean;
    };
    logout: () => void;
    login: () => void;
    onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserAuthContext = createContext<UserContextProps>({} as UserContextProps);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        
    // const [perfil, setPerfil] = useState(localStorage.getItem('perfil') || {
    //     user: '',
    //     email: '',
    //     admin: false,
    // });

    // const [user, setUser] = useState(localStorage.getItem('user') || '');
    // const [email, setEmail] = useState(localStorage.getItem('email') || '');
  
    // const login = () => {
    //     setPerfil({user, email, admin: true})
    //     localStorage.setItem('perfil', JSON.stringify(perfil));
    // }
  
    // const logout = () => {
    //   localStorage.removeItem('perfil');
    // };

    // const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUser(e.target.value);
    // }

    // const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value);
    // }

    const [user, setUser] = useState({
        username: '',
        email: '',
        admin: false,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user && setUser(user);
    }, [])

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, username: e.target.value });
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, email: e.target.value });
    }

    const login = () => {
        setUser({ ...user, admin: true });
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
