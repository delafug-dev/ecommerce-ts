import { createContext, useState, ReactNode } from 'react';

interface ThemeContextProps {
    theme: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{children : ReactNode}> = ({ children }) => {
    
    const [theme, setTheme] = useState(false);

    const toggleTheme = () => {
        setTheme(!theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default { ThemeProvider, ThemeContext };