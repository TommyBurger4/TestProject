import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from '../theme/colors';

type ThemeMode = 'light' | 'dark' | 'auto';
type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
  // Mode de theme actuel (light, dark, auto)
  mode: ThemeMode;
  // Schema de couleur effectif (light ou dark)
  colorScheme: ColorScheme;
  // Couleurs du theme actuel
  colors: typeof lightColors;
  // Fonction pour changer le mode de theme
  setThemeMode: (mode: ThemeMode) => void;
  // Fonction pour basculer entre clair et sombre
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@clubsportfrance_theme_mode';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Mode de theme (light, dark, auto)
  const [mode, setMode] = useState<ThemeMode>('auto');

  // Detection du theme systeme
  const systemColorScheme = useColorScheme();

  // Schema de couleur effectif
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  // Charger la preference utilisateur au demarrage
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Mettre a jour le schema effectif quand le mode ou le theme systeme change
  useEffect(() => {
    if (mode === 'auto') {
      setColorScheme(systemColorScheme === 'dark' ? 'dark' : 'light');
    } else {
      setColorScheme(mode);
    }
  }, [mode, systemColorScheme]);

  // Charger la preference sauvegardee
  const loadThemePreference = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'auto')) {
        setMode(savedMode as ThemeMode);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la preference de theme:', error);
    }
  };

  // Sauvegarder la preference
  const saveThemePreference = async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la preference de theme:', error);
    }
  };

  // Changer le mode de theme
  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    saveThemePreference(newMode);
  };

  // Basculer entre clair et sombre (ignore auto)
  const toggleTheme = () => {
    const newMode: ThemeMode = colorScheme === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  // Selectionner les couleurs selon le schema actuel
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  const value: ThemeContextType = {
    mode,
    colorScheme,
    colors,
    setThemeMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Hook pour utiliser le theme dans les composants
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit etre utilise dans un ThemeProvider');
  }
  return context;
};
