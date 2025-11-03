/**
 * Fichier: index.ts
 *
 * Configuration i18n pour multi-langue (francais + anglais)
 */

import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import fr from './fr';
import en from './en';

// Configuration i18n
const i18n = new I18n({
  fr,
  en,
});

// Detection automatique de la langue
i18n.locale = Localization.locale;

// Fallback sur francais si langue non supportee
i18n.enableFallback = true;
i18n.defaultLocale = 'fr';

export default i18n;
