
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { hexToHsl } from '../utils/colors';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TypographyStyle {
  fontWeight: '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

interface ThemeColors {
  primary: string; // hex
  background: string; // hex
  card: string; // hex
  border: string; // hex
  textHeading: string; // hex
  textBody: string; // hex
  textMuted: string; // hex
}

interface Theme {
  colors: ThemeColors;
  fontFamily: string;
  typography: {
    heading: TypographyStyle;
    body: TypographyStyle;
  };
}

interface ThemeContextType {
  theme: Theme;
  isEditorOpen: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  toggleEditor: () => void;
  resetTheme: () => void;
}

const DEFAULT_THEME: Theme = {
  colors: {
    primary: '#0ea5e9',
    background: '#111827',
    card: '#000000', // Changed to black for header/footer bars
    border: '#374151',
    textHeading: '#f9fafb',
    textBody: '#d1d5db',
    textMuted: '#9ca3af',
  },
  fontFamily: 'Inter',
  typography: {
    heading: {
      fontWeight: '900',
      textTransform: 'uppercase',
    },
    body: {
      fontWeight: '400',
      textTransform: 'none',
    }
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // FIX: Replaced useState with useLocalStorage to save theme changes in the browser.
  const [theme, setTheme] = useLocalStorage<Theme>('the-shop-theme', DEFAULT_THEME);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', hexToHsl(theme.colors.primary));
    root.style.setProperty('--color-background', hexToHsl(theme.colors.background));
    root.style.setProperty('--color-card', hexToHsl(theme.colors.card));
    root.style.setProperty('--color-border', hexToHsl(theme.colors.border));
    root.style.setProperty('--color-text-heading', hexToHsl(theme.colors.textHeading));
    root.style.setProperty('--color-text-body', hexToHsl(theme.colors.textBody));
    root.style.setProperty('--color-text-muted', hexToHsl(theme.colors.textMuted));
    
    root.style.setProperty('--font-weight-heading', theme.typography.heading.fontWeight);
    root.style.setProperty('--font-transform-heading', theme.typography.heading.textTransform);
    root.style.setProperty('--font-weight-body', theme.typography.body.fontWeight);
    root.style.setProperty('--font-transform-body', theme.typography.body.textTransform);
    
    root.style.setProperty('--font-sans', theme.fontFamily);
    document.body.style.fontFamily = `var(--font-sans), Inter, sans-serif`;
  }, [theme]);

  const toggleEditor = () => setIsEditorOpen(prev => !prev);
  
  // FIX: Resetting the theme now also clears the localStorage value by setting it back to default.
  const resetTheme = () => setTheme(DEFAULT_THEME);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isEditorOpen, toggleEditor, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
