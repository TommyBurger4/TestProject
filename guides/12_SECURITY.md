# 🔒 SECURITE ET AUTHENTIFICATION (NEXT.JS)

> **Guide complet de securite Next.js : Firestore Rules reactives, validation, secrets, documents legaux**

---

## 🔥 Regles Firestore - Approche Reactive

**REGLE D'OR : Ne PAS demander la structure Firestore pendant l'onboarding**

✅ **Generer les rules PROGRESSIVEMENT au fur et a mesure du developpement**

### Workflow Reactif

```
┌─────────────────────────────────────────────────┐
│ DECLENCHEUR : User demande une fonctionnalite  │
│ Exemple : "Je veux ajouter des favoris"        │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ DETECTION AUTOMATIQUE par Claude               │
│ "Cette fonctionnalite necessite de stocker     │
│  des donnees dans Firestore"                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ PROPOSITION AU DEV                              │
│ "Je vais creer la collection 'favorites' et    │
│  mettre a jour les Firestore Rules. D'accord ?" │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ CREATION SIMULTANEE                             │
│ 1. Creer le service (favoritesService.ts)      │
│ 2. Mettre a jour firestore.rules               │
│ 3. Documenter dans PROJECT.md                   │
└─────────────────────────────────────────────────┘
```

### ⚠️ IMPORTANT : Proposition de Patterns, Pas d'Automatisation

**Claude NE DOIT PAS appliquer automatiquement des regles sans validation du dev.**

#### ✅ Approche CORRECTE :

1. **Detecter** automatiquement qu'une collection est necessaire
2. **Proposer** des patterns types (A, B, C, D...) avec explications claires
3. **Demander** au dev de choisir le pattern approprie
4. **Permettre** personnalisation si aucun pattern ne convient

#### ❌ Approche INCORRECTE :

- Appliquer un pattern par defaut sans demander
- Deviner les permissions specifiques
- Supposer qu'un pattern convient a tous les cas
- Ignorer les nuances metier du projet

#### Patterns Disponibles :

Voir **07_FIREBASE.md** pour la liste complete des patterns types :
- **Pattern A** : CRUD Complet (reseau social)
- **Pattern B** : Moderation Admin
- **Pattern C** : Archive Permanente
- **Pattern D** : Prive (owner only)
- **Pattern E** : Lecture Restreinte (groupes)
- **Pattern F** : One-per-User (ratings)

**Exemple de proposition** :

```
Claude : "Je vais creer la collection 'favorites'.

Regles Firestore - Choisis un pattern :

D) Prive (recommande pour favoris)
   - Lecture : Owner uniquement
   - Creation : Owner
   - Modification : Owner
   - Suppression : Owner

Autre) Personnalise
   - Tu me dis exactement ce que tu veux

Quel pattern ? (D ou Autre)"
```

---

### Exemples de Detection

```typescript
/**
 * EXEMPLE 1 : Favoris
 * User : "Je veux que les users puissent ajouter des terrains en favoris"
 * Claude detecte : Besoin collection 'favorites'
 * Claude propose : "Je vais creer favoritesService.ts et ajouter les rules
 *                   Firestore : lecture/ecriture par owner uniquement"
 */

/**
 * EXEMPLE 2 : Evenements
 * User : "Les utilisateurs doivent pouvoir creer des evenements"
 * Claude detecte : Besoin collection 'events'
 * Claude propose : "Je vais creer eventsService.ts et ajouter les rules
 *                   Firestore : lecture publique, ecriture authentifiee"
 */

/**
 * EXEMPLE 3 : Chat groupe
 * User : "Ajouter un chat dans les groupes"
 * Claude detecte : Besoin collections 'conversations' + 'messages'
 * Claude propose : "Je vais creer chatService.ts et ajouter les rules
 *                   Firestore : acces reserve aux participants"
 */
```

---

## 📋 Template firestore.rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Fonction helper : verification authentification
    function isAuthenticated() {
      return request.auth != null;
    }

    // Fonction helper : verification ownership
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Fonction helper : verification membre groupe
    function isGroupMember(groupId) {
      return isAuthenticated() &&
        request.auth.uid in get(/databases/$(database)/documents/groups/$(groupId)).data.members;
    }

    // Collection users
    match /users/{userId} {
      // Lecture : soi-meme ou utilisateurs publics
      allow read: if isAuthenticated();

      // Creation : seulement son propre document
      allow create: if isOwner(userId);

      // Mise a jour : seulement son propre document
      allow update: if isOwner(userId);

      // Suppression : seulement son propre document
      allow delete: if isOwner(userId);
    }

    // Collection groups
    match /groups/{groupId} {
      // Lecture : membres du groupe uniquement
      allow read: if isGroupMember(groupId);

      // Creation : utilisateur authentifie
      allow create: if isAuthenticated() &&
        request.auth.uid in request.resource.data.members;

      // Mise a jour : admin du groupe
      allow update: if isAuthenticated() &&
        request.auth.uid in resource.data.admins;

      // Suppression : admin du groupe
      allow delete: if isAuthenticated() &&
        request.auth.uid in resource.data.admins;

      // Sous-collection members
      match /members/{memberId} {
        allow read: if isGroupMember(groupId);
        allow write: if isAuthenticated() &&
          request.auth.uid in get(/databases/$(database)/documents/groups/$(groupId)).data.admins;
      }
    }

    // Collection events
    match /events/{eventId} {
      // Lecture : membres du groupe lie
      allow read: if isAuthenticated() &&
        isGroupMember(resource.data.groupId);

      // Creation : membres du groupe
      allow create: if isAuthenticated() &&
        isGroupMember(request.resource.data.groupId);

      // Mise a jour : createur ou admin groupe
      allow update: if isAuthenticated() &&
        (isOwner(resource.data.createdBy) ||
         isGroupMember(resource.data.groupId));

      // Suppression : createur ou admin groupe
      allow delete: if isAuthenticated() &&
        (isOwner(resource.data.createdBy) ||
         isGroupMember(resource.data.groupId));
    }

    // Collection conversations (si chat actif)
    match /conversations/{conversationId} {
      // Lecture : participants uniquement
      allow read: if isAuthenticated() &&
        request.auth.uid in resource.data.participants;

      // Creation : si utilisateur dans participants
      allow create: if isAuthenticated() &&
        request.auth.uid in request.resource.data.participants;

      // Mise a jour : participants uniquement
      allow update: if isAuthenticated() &&
        request.auth.uid in resource.data.participants;

      // Sous-collection messages
      match /messages/{messageId} {
        allow read: if isAuthenticated() &&
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;

        allow create: if isAuthenticated() &&
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants &&
          request.auth.uid == request.resource.data.senderId;
      }
    }

    // Regles par defaut : tout refuse
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## ✅ Validation des Donnees

### Validation Cote Client

```typescript
// src/utils/validation.ts

/**
 * Schemas de validation avec Yup
 */
import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  displayName: Yup.string()
    .min(2, 'Nom trop court')
    .max(50, 'Nom trop long')
    .required('Nom requis'),
  phoneNumber: Yup.string()
    .matches(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numero invalide')
    .optional(),
});

export const groupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nom trop court')
    .max(100, 'Nom trop long')
    .required('Nom requis'),
  description: Yup.string()
    .max(500, 'Description trop longue')
    .optional(),
});
```

### Validation Cote Serveur (Cloud Functions)

```typescript
// functions/src/validation.ts

/**
 * Validation des donnees avant ecriture Firestore
 */
import * as admin from 'firebase-admin';

export const validateUserData = (data: any): boolean => {
  // Verifier les champs requis
  if (!data.email || !data.displayName) {
    return false;
  }

  // Verifier les types
  if (typeof data.email !== 'string' || typeof data.displayName !== 'string') {
    return false;
  }

  // Verifier le format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }

  return true;
};

export const sanitizeInput = (input: string): string => {
  // Supprimer les caracteres dangereux
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
};
```

---

## 🔐 Gestion des Secrets

### Variables d'Environnement (.env)

```bash
# .env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:ios:abc123

REVENUECAT_API_KEY_IOS=your_ios_key
REVENUECAT_API_KEY_ANDROID=your_android_key

# NE JAMAIS COMMITER CE FICHIER !
```

### Configuration .env.local (Next.js)

**Next.js charge automatiquement les variables depuis `.env.local`**

Pas besoin de configuration supplementaire, juste ajouter `NEXT_PUBLIC_` prefix pour variables accessibles cote client :

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# NE JAMAIS COMMITER CE FICHIER !
```

**Variables server-only** (sans `NEXT_PUBLIC_`) ne sont accessibles que dans :
- API Routes
- Server Components
- Server Actions

### Acces aux Variables

```typescript
// src/config/env.ts

/**
 * Configuration des variables d'environnement Next.js
 *
 * Variables avec NEXT_PUBLIC_ sont accessibles cote client
 * Variables sans prefix sont server-only
 */

export const env = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
};

// Validation au demarrage (Client Components uniquement)
if (typeof window !== 'undefined') {
  Object.entries(env.firebase).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Variable d'environnement manquante : ${key}`);
    }
  });
}
```

---

## 📄 Documents Legaux (OBLIGATOIRE)

### Generation Automatique par Claude

**IMPORTANT : Claude genere AUTOMATIQUEMENT les documents legaux suivants :**

1. **CGU (Conditions Generales d'Utilisation)**
2. **Politique de Confidentialite**
3. **Mentions Legales**
4. **Politique de Cookies** (si applicable)

### Informations Requises

```typescript
/**
 * Informations a collecter pour la generation des documents legaux
 */
interface LegalInfo {
  // Entreprise
  companyName: string;          // Ex: "SARL Catimini"
  companyAddress: string;       // Adresse complete
  companyEmail: string;         // Email de contact
  companyPhone?: string;        // Telephone (optionnel)
  legalRepresentative: string;  // Nom du representant legal
  siret?: string;               // Numero SIRET (France)

  // Application
  appName: string;              // Nom de l'app
  appDescription: string;       // Description courte

  // Hebergement
  hostingProvider: string;      // Ex: "Firebase by Google"
  hostingAddress: string;       // Adresse hebergeur

  // DPO (si RGPD)
  dpoName?: string;             // Delegue a la Protection des Donnees
  dpoEmail?: string;            // Email DPO

  // Fonctionnalites
  hasUserAccounts: boolean;     // Comptes utilisateurs ?
  hasPayments: boolean;         // Paiements ?
  hasGeolocation: boolean;      // Geolocalisation ?
  hasPhotos: boolean;           // Photos/Camera ?
  hasAnalytics: boolean;        // Analytics ?
  hasNotifications: boolean;    // Notifications push ?
  hasSocialLogin: boolean;      // Login social (Google, etc.) ?
}
```

**Declenchement :**
- Lors de la phase d'initialisation du projet
- Claude demande les informations necessaires
- Generation automatique basee sur les fonctionnalites detectees

---

🤖 _Guide destine a Claude Code - Securite proactive et reactive_
