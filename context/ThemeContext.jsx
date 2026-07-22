"use client";

import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme1: null,
  setThemeLang: () => {},
});

export function ThemeProvider({ children }) {
  const [theme1, setThemeLang] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme1, setThemeLang }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}