# 🔥 FIREBASE - FIRESTORE (NEXT.JS)

> **Guide complet pour Firebase Firestore avec Next.js : structure, services CRUD, et regles de securite**

---

## 🌐 Firebase Web SDK pour Next.js

**IMPORTANT** : Next.js utilise le **Firebase Web SDK** (version 9+ modular).

### Differences avec React Native
- **Imports** : `firebase/firestore` au lieu de `@react-native-firebase/firestore`
- **API** : Identique (collection, doc, getDoc, getDocs, etc.)
- **Regles Firestore** : Identiques (independant de la plateforme)
- **Server vs Client** : Attention au SSR (voir section dediee)

### Server Components vs Client Components

```typescript
/**
 * REGLE : Firestore UNIQUEMENT sur Client Components
 *
 * ❌ Server Component - NE PAS faire ca
 * export default async function ProfilePage() {
 *   const user = await getUser('123'); // ERREUR
 * }
 *
 * ✅ Client Component - Correct
 * 'use client';
 * export default function ProfilePage() {
 *   const [user, setUser] = useState(null);
 *   useEffect(() => {
 *     getUser('123').then(setUser);
 *   }, []);
 * }
 *
 * ✅ API Route - Alternative recommandee pour SSR
 * // app/api/users/[id]/route.ts
 * export async function GET(req, { params }) {
 *   const user = await getUser(params.id);
 *   return Response.json(user);
 * }
 */
```

---

## 📊 Detection Automatique des Collections

**Claude DOIT detecter automatiquement les collections necessaires selon les fonctionnalites detectees pendant l'onboarding.**

### Mapping Features → Collections

| Feature detectee | Collections creees | Champs typiques |
|------------------|-------------------|-----------------|
| Authentification | `users` | email, displayName, avatarUrl, createdAt |
| Posts/Recettes/Articles | `posts` ou `recipes` ou `articles` | userId, title, content, imageUrl, createdAt |
| Commentaires | `comments` | userId, postId, content, createdAt |
| Messagerie/Chat | `conversations` + `messages` | participants, senderId, content, timestamp |
| Favoris/Likes | `favorites` ou `likes` | userId, targetId, createdAt |
| Groupes | `groups` + `groups/{id}/members` | name, description, adminIds, members |
| Evenements | `events` | groupId, title, date, location, createdBy |
| Notifications | Pas de collection (Firebase Cloud Messaging) | N/A |
| Geolocalisation | Champs dans collections existantes | location (GeoPoint) |
| Notation/Reviews | `ratings` ou `reviews` | userId, targetId, rating, comment, createdAt |

### Exemple de Detection

**Pendant onboarding, dev repond** :
- ✅ Authentification : Email + Google
- ✅ Partage de recettes avec photos
- ✅ Système de notation
- ✅ Favoris
- ❌ Messagerie/Chat

**Claude detecte automatiquement** :
```
Collections necessaires :
✅ users (car authentification)
✅ recipes (car partage recettes)
✅ ratings (car systeme notation)
✅ favorites (car favoris)
❌ conversations/messages (pas de messagerie)
```

---

## 🎨 Patterns Firestore Types

**Claude DOIT proposer des patterns types pour chaque collection et demander au dev de choisir.**

### Pattern A : CRUD Complet (Reseau social classique)

**Use case** : Posts, recettes, articles que l'auteur peut modifier/supprimer

```javascript
// Firestore Rules
allow read: if true;  // Tous peuvent lire
allow create: if request.auth != null;  // Authentifies peuvent creer
allow update: if request.auth != null &&
              request.auth.uid == resource.data.userId;  // Auteur peut modifier
allow delete: if request.auth != null &&
              request.auth.uid == resource.data.userId;  // Auteur peut supprimer
```

**Champs requis** : `userId` (pour verification owner)

---

### Pattern B : Moderation Admin

**Use case** : Forum, plateforme moderee ou seuls les admins peuvent supprimer

```javascript
// Firestore Rules
allow read: if true;
allow create: if request.auth != null;
allow update: if request.auth != null &&
              request.auth.uid == resource.data.userId;
allow delete: if request.auth != null &&
              request.auth.uid in get(/databases/$(database)/documents/admins/list).data.userIds;
```

**Champs requis** : `userId`, collection `admins` separee

---

### Pattern C : Archive Permanente

**Use case** : Contenu qui ne peut pas etre supprime (soft delete uniquement)

```javascript
// Firestore Rules
allow read: if true;
allow create: if request.auth != null;
allow update: if request.auth != null &&
              request.auth.uid == resource.data.userId &&
              // Autoriser seulement soft delete
              request.resource.data.deleted == true;
allow delete: if false;  // Suppression interdite
```

**Champs requis** : `userId`, `deleted` (boolean)

---

### Pattern D : Prive (Favoris, Preferences utilisateur)

**Use case** : Donnees privees visibles seulement par le proprietaire

```javascript
// Firestore Rules
allow read: if request.auth != null &&
            request.auth.uid == resource.data.userId;
allow create: if request.auth != null &&
              request.auth.uid == request.resource.data.userId;
allow update: if request.auth != null &&
              request.auth.uid == resource.data.userId;
allow delete: if request.auth != null &&
              request.auth.uid == resource.data.userId;
```

**Champs requis** : `userId`

---

### Pattern E : Lecture Restreinte (Groupes, Conversations)

**Use case** : Contenu visible seulement par les membres/participants

```javascript
// Firestore Rules (exemple pour groupes)
allow read: if request.auth != null &&
            request.auth.uid in resource.data.members;
allow create: if request.auth != null &&
              request.auth.uid in request.resource.data.members;
allow update: if request.auth != null &&
              request.auth.uid in resource.data.adminIds;
allow delete: if request.auth != null &&
              request.auth.uid in resource.data.adminIds;
```

**Champs requis** : `members` (array), `adminIds` (array)

---

### Pattern F : One-per-User (Ratings)

**Use case** : Un utilisateur ne peut creer qu'un seul document par cible (ex: 1 note par recette)

```javascript
// Firestore Rules
allow read: if true;
allow create: if request.auth != null &&
              // ID du document = userId_targetId
              request.resource.id == request.auth.uid + '_' + request.resource.data.targetId;
allow update: if request.auth != null &&
              request.auth.uid == resource.data.userId;
allow delete: if request.auth != null &&
              request.auth.uid == resource.data.userId;
```

**Convention ID** : `{userId}_{targetId}` pour garantir unicite

---

## 💬 Workflow de Proposition

**Apres detection automatique, Claude propose les patterns :**

**Exemple pour collection `recipes` :**

```
Moi (Claude) :
"J'ai detecte les collections suivantes selon tes fonctionnalites :

### 📦 Collection `recipes`
**Champs** : userId, title, description, imageUrl, ingredients, steps, createdAt

**Regles Firestore - Choisis un pattern :**

**A) Reseau social classique** (recommande)
- Lecture : Tous
- Creation : Authentifies
- Modification : Auteur uniquement
- Suppression : Auteur uniquement

**B) Plateforme moderee**
- Lecture : Tous
- Creation : Authentifies
- Modification : Auteur uniquement
- Suppression : Admins uniquement

**C) Archive permanente**
- Lecture : Tous
- Creation : Authentifies
- Modification : Auteur (soft delete seulement)
- Suppression : Interdite

**D) Personnalise**
- Tu me dis exactement ce que tu veux

Quel pattern veux-tu pour `recipes` ? (A, B, C ou D)"
```

**Dev repond** : "A"

**Claude applique Pattern A et passe a la collection suivante.**

---

## ⚠️ IMPORTANT : Patterns vs Personnalisation

### ✅ Ce que Claude DOIT faire :

- Detecter automatiquement les collections necessaires
- Proposer des patterns types (A, B, C, D, E, F)
- Demander au dev de choisir pour chaque collection
- Permettre personnalisation si pattern "D" choisi
- Expliquer clairement chaque pattern

### ❌ Ce que Claude NE DOIT PAS faire :

- Appliquer automatiquement un pattern sans validation
- Deviner les permissions specifiques
- Ignorer les nuances metier
- Supposer qu'un pattern convient a tout

### Cas Particuliers

**Si le dev dit "D) Personnalise"** :

```
Claude : "Parfait ! Pour la collection `recipes`, definis exactement :

1. Qui peut LIRE ?
   - Tous (non authentifies inclus)
   - Authentifies uniquement
   - Membres d'un groupe
   - Auteur uniquement
   - Autre ?

2. Qui peut CREER ?
   - Tous authentifies
   - Certains roles uniquement
   - Autre ?

3. Qui peut MODIFIER ?
   - Auteur uniquement
   - Auteur + Admins
   - Tous authentifies
   - Autre ?

4. Qui peut SUPPRIMER ?
   - Auteur uniquement
   - Admins uniquement
   - Interdit
   - Autre ?"
```

---

## 🔧 Patterns Firestore

### Service CRUD Complet

**Exemple : Service pour la collection `users`**

```typescript
/**
 * Fichier: src/services/user/userService.ts
 *
 * Service CRUD pour la collection 'users'.
 * Gere toutes les operations Firestore sur les utilisateurs.
 *
 * IMPORTANT : Ce service utilise Firebase Web SDK (version 9+).
 * A utiliser dans Client Components ou API Routes uniquement.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  Timestamp,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/services/firebase/firebase';
import { User, UserData } from '@/types/user.types';

const COLLECTION_NAME = 'users';

/**
 * Recupere un utilisateur par son ID
 */
export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return {
      id: userSnap.id,
      ...userSnap.data(),
    } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Impossible de charger l\'utilisateur');
  }
};

/**
 * Cree un nouvel utilisateur
 */
export const createUser = async (userId: string, data: UserData): Promise<User> => {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    const user: User = {
      id: userId,
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(userRef, user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Impossible de creer l\'utilisateur');
  }
};

/**
 * Met a jour un utilisateur
 */
export const updateUser = async (
  userId: string,
  updates: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Impossible de mettre a jour l\'utilisateur');
  }
};

/**
 * Supprime un utilisateur
 * ATTENTION: Implementer cascade delete si necessaire
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await deleteDoc(userRef);

    // TODO: Cascade delete (posts, comments, likes, etc.)
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Impossible de supprimer l\'utilisateur');
  }
};

/**
 * Ecoute les changements d'un utilisateur en temps reel
 *
 * @param userId - ID de l'utilisateur
 * @param callback - Fonction appelee a chaque changement
 * @returns Fonction de nettoyage (unsubscribe)
 */
export const subscribeToUser = (
  userId: string,
  callback: (user: User | null) => void
): (() => void) => {
  const userRef = doc(db, COLLECTION_NAME, userId);

  const unsubscribe = onSnapshot(
    userRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }

      const user: User = {
        id: snapshot.id,
        ...snapshot.data(),
      } as User;

      callback(user);
    },
    (error) => {
      console.error('Error in user subscription:', error);
    }
  );

  return unsubscribe;
};

/**
 * Recherche des utilisateurs avec pagination
 *
 * @param pageSize - Nombre de resultats par page
 * @param lastDoc - Dernier document de la page precedente (pour pagination)
 * @returns Liste d'utilisateurs + dernier document
 */
export const getUsersPaginated = async (
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ users: User[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    const usersRef = collection(db, COLLECTION_NAME);
    let q = query(
      usersRef,
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    // Si lastDoc fourni, continuer depuis ce point
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const users: User[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    // Recuperer le dernier document pour la prochaine page
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { users, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error fetching paginated users:', error);
    throw new Error('Impossible de charger les utilisateurs');
  }
};

/**
 * Recherche des utilisateurs par nom
 */
export const searchUsersByName = async (searchTerm: string): Promise<User[]> => {
  try {
    const usersRef = collection(db, COLLECTION_NAME);

    // Firestore ne supporte pas LIKE, donc on utilise >= et <=
    // Pour full-text search, utiliser Algolia
    const q = query(
      usersRef,
      where('displayName', '>=', searchTerm),
      where('displayName', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Impossible de rechercher les utilisateurs');
  }
};
```

---

## 🔒 Regles Firestore - Generation Automatique

**Claude DOIT generer automatiquement les regles Firestore basees sur les collections definies.**

### Detection Automatique

- Si un champ `userId` existe → regle : l'utilisateur ne peut acceder qu'a ses propres donnees
- Si un champ `isPublic` existe → regle : lecture publique si true
- Si un champ `members` (array) existe → regle : acces reserve aux membres

### Template `firestore.rules`

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    /**
     * Helper: Verifie si l'utilisateur est authentifie
     */
    function isAuthenticated() {
      return request.auth != null;
    }

    /**
     * Helper: Verifie si l'utilisateur est le proprietaire
     */
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    /**
     * Collection: users
     * Chaque utilisateur ne peut lire/ecrire que son propre document
     */
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId);
      allow update, delete: if isOwner(userId);
    }

    /**
     * Collection: posts (exemple avec isPublic)
     * Lecture publique si isPublic == true, sinon reserve au proprietaire
     */
    match /posts/{postId} {
      allow read: if resource.data.isPublic == true || isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update, delete: if isOwner(resource.data.userId);
    }

    /**
     * Collection: groups (exemple avec members array)
     * Seuls les membres peuvent lire/ecrire
     */
    match /groups/{groupId} {
      allow read: if isAuthenticated() &&
                     request.auth.uid in resource.data.members;
      allow create: if isAuthenticated() &&
                       request.auth.uid in request.resource.data.members;
      allow update, delete: if isAuthenticated() &&
                               request.auth.uid in resource.data.members;

      // Sous-collection messages (herite des permissions du groupe parent)
      match /messages/{messageId} {
        allow read, write: if isAuthenticated() &&
                              request.auth.uid in get(/databases/$(database)/documents/groups/$(groupId)).data.members;
      }
    }

    /**
     * Par defaut: DENY ALL
     * Toute collection non definie ci-dessus est inaccessible
     */
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Process de Generation

1. Claude detecte toutes les collections utilisees dans le code
2. Pour chaque collection, analyse les champs pour detecter les patterns (userId, isPublic, members)
3. Generate automatiquement firestore.rules
4. **DEMANDE VALIDATION** au developpeur avant de deployer
5. Cree un fichier `docs/FIRESTORE_RULES.md` expliquant chaque regle

---

🤖 _Guide destine a Claude Code - Firestore patterns et regles de securite_
