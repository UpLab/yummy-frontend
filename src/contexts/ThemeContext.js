import React, { useContext, useState } from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: () => {},
});

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';
export const DEFAULT_THEME = LIGHT_THEME;

export const availableThemes = [LIGHT_THEME, DARK_THEME];

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
