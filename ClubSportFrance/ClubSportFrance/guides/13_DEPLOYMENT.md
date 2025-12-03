# 🚀 DEPLOIEMENT APP STORE / PLAY STORE

> **Guide complet pour deployer sur iOS App Store et Google Play Store avec EAS**

---

## 📋 Pre-requis

### App Store (iOS)

```bash
# 1. Compte Apple Developer (99$/an)
# 2. Certificats et provisioning profiles
# 3. App Store Connect configure
# 4. EAS CLI installe
npm install -g eas-cli
eas login
```

### Play Store (Android)

```bash
# 1. Compte Google Play Console (25$ one-time)
# 2. Keystore cree
# 3. Play Console configure
```

---

## ⚙️ Configuration EAS Build

### eas.json

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false,
        "buildConfiguration": "Release"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "buildConfiguration": "Release"
      },
      "android": {
        "buildType": "aab"
      },
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDE12345"
      },
      "android": {
        "serviceAccountKeyPath": "./google-play-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

---

## 📦 Workflow de Deploiement

### Etape 1 : Preparer la Release

```bash
# 1. Mettre a jour la version
# Claude le fait automatiquement avec le systeme de versioning

# 2. Tester en local
npm run test
npm run lint
npm run type-check

# 3. Creer un build preview
eas build --platform ios --profile preview
eas build --platform android --profile preview

# 4. Tester le build preview
# - Installer sur appareil test
# - Verifier toutes les fonctionnalites
# - Tester paiements en sandbox
```

### Etape 2 : Build Production

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production

# Les deux
eas build --platform all --profile production
```

### Etape 3 : Soumettre aux Stores

```bash
# iOS (App Store)
eas submit --platform ios --latest

# Android (Play Store)
eas submit --platform android --latest
```

---

## ✅ Checklist Pre-Soumission

### App Store (iOS)

#### Informations Requises

- [ ] Nom de l'app (30 caracteres max)
- [ ] Sous-titre (30 caracteres max)
- [ ] Description (4000 caracteres max)
- [ ] Mots-cles (100 caracteres max, separes par virgules)
- [ ] URL support
- [ ] URL marketing (optionnel)
- [ ] Email contact

#### Assets Visuels

- [ ] Icone app (1024x1024 px, PNG)
- [ ] Screenshots iPhone 6.7" (1290x2796 px) - Min 3, Max 10
- [ ] Screenshots iPhone 6.5" (1242x2688 px) - Min 3, Max 10
- [ ] Screenshots iPhone 5.5" (1242x2208 px) - Min 3, Max 10
- [ ] Screenshots iPad Pro 12.9" (2048x2732 px) - Min 3, Max 10

#### Informations Legales

- [ ] CGU acceptees
- [ ] Politique de confidentialite URL
- [ ] Classification par age
- [ ] Informations de copyright

#### Test

- [ ] Build teste sur vrais appareils
- [ ] Toutes fonctionnalites testees
- [ ] Paiements testes en sandbox
- [ ] App Review Guidelines respectees

---

### Play Store (Android)

#### Informations Requises

- [ ] Titre app (50 caracteres max)
- [ ] Description courte (80 caracteres max)
- [ ] Description complete (4000 caracteres max)
- [ ] Email contact
- [ ] Site web (optionnel)

#### Assets Visuels

- [ ] Icone app (512x512 px, PNG)
- [ ] Feature Graphic (1024x500 px, JPG ou PNG)
- [ ] Screenshots Phone (min 2, 1080x1920 px recommande)
- [ ] Screenshots Tablet (optionnel, min 2, 1920x1080 px)

#### Informations Legales

- [ ] Politique de confidentialite URL
- [ ] Classification du contenu
- [ ] Public cible defini

#### Test

- [ ] Build AAB teste
- [ ] Toutes fonctionnalites testees
- [ ] Signature verifiee

---

## 🤖 Automatisation avec Claude

```typescript
/**
 * Claude peut automatiser le processus de deploiement :
 *
 * COMMANDE : "Claude, prepare une release version 1.2.0"
 *
 * CLAUDE EXECUTE :
 * 1. Met a jour les versions (package.json, app.json, etc.)
 * 2. Lance les tests
 * 3. Cree le build production
 * 4. Genere le CHANGELOG.md
 * 5. Cree le commit et tag Git
 * 6. (Optionnel) Soumet aux stores
 *
 * VALIDATION DEVELOPPEUR REQUISE A CHAQUE ETAPE
 */
```

---

🤖 _Guide destine a Claude Code - Deploiement systematique et guide_
