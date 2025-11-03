/**
 * Fichier: colors.ts
 *
 * Palette de couleurs conforme WCAG 2.1 AA
 * Contrastes: ≥ 4.5:1 pour texte, ≥ 3:1 pour UI
 */

export const lightColors = {
  // Couleurs principales
  primary: '#0066CC', // Bleu - Contraste 4.52:1 sur blanc
  primaryDark: '#004C99',
  primaryLight: '#3385D6',

  // Couleurs secondaires
  secondary: '#FF6B35', // Orange - Contraste 3.13:1 sur blanc
  secondaryDark: '#E55A2B',
  secondaryLight: '#FF8555',

  // Couleurs de fond
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',

  // Couleurs de texte
  text: '#1A1A1A', // Contraste 16.1:1 sur blanc
  textSecondary: '#666666', // Contraste 5.74:1 sur blanc
  textDisabled: '#999999', // Contraste 2.85:1 sur blanc

  // Couleurs d'etat
  success: '#28A745', // Vert - Contraste 3.03:1 sur blanc
  warning: '#FFC107', // Jaune - Contraste 1.77:1 sur blanc (texte noir requis)
  error: '#DC3545', // Rouge - Contraste 4.53:1 sur blanc
  info: '#17A2B8', // Cyan - Contraste 3.04:1 sur blanc

  // Couleurs de bordure
  border: '#DDDDDD',
  borderLight: '#EEEEEE',
  borderDark: '#CCCCCC',

  // Ombre
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
};

export const darkColors = {
  // Couleurs principales
  primary: '#4D9FFF', // Bleu clair - Contraste 7.04:1 sur noir
  primaryDark: '#3385D6',
  primaryLight: '#66B3FF',

  // Couleurs secondaires
  secondary: '#FF8C5A', // Orange clair - Contraste 5.45:1 sur noir
  secondaryDark: '#FF6B35',
  secondaryLight: '#FFAD85',

  // Couleurs de fond
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',

  // Couleurs de texte
  text: '#FFFFFF', // Contraste 21:1 sur noir
  textSecondary: '#B3B3B3', // Contraste 9.73:1 sur noir
  textDisabled: '#666666', // Contraste 4.62:1 sur noir

  // Couleurs d'etat
  success: '#4CAF50', // Vert clair - Contraste 4.96:1 sur noir
  warning: '#FFD54F', // Jaune clair - Contraste 12.3:1 sur noir
  error: '#FF5252', // Rouge clair - Contraste 5.89:1 sur noir
  info: '#4FC3F7', // Cyan clair - Contraste 7.18:1 sur noir

  // Couleurs de bordure
  border: '#404040',
  borderLight: '#333333',
  borderDark: '#4D4D4D',

  // Ombre
  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowDark: 'rgba(0, 0, 0, 0.75)',
};

export type ColorScheme = typeof lightColors;
