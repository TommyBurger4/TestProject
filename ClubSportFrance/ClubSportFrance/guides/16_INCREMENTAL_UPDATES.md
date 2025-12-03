# 🔄 GUIDE MISES A JOUR INCREMENTALES

**IMPORTANT :** Pendant l'onboarding, mettre a jour les fichiers `.md` **immediatement** apres chaque reponse, plutot que d'attendre la fin.

---

## 🎯 Philosophie

Au lieu de :
```
Poser 16 questions → Generer tous les fichiers a la fin
```

On fait :
```
Question 1 → Mettre a jour PROJECT.md immediatement
Question 2 → Mettre a jour PROJECT.md immediatement
...
Question 16 → Mettre a jour PROJECT.md immediatement
```

**Avantages :**
- ✅ Progression visible en temps reel
- ✅ Sauvegarde progressive (pas de perte si interruption)
- ✅ Experience plus interactive
- ✅ Developpeur voit le fichier se construire

---

## 📋 MAPPING : Questions → Fichiers

### Question 1 : Nom et Description
**Fichiers a creer/mettre a jour :**

#### 1. PROJECT.md (creation initiale)
```markdown
# 📱 [NOM_PROJET]

**Cree le :** [DATE_ACTUELLE]
**Derniere mise a jour :** [DATE_ACTUELLE] [HEURE_ACTUELLE]
**Version actuelle :** 0.1.0 (Build 1 / versionCode 1)

---

## 🎯 RESUME DU PROJET

**Description :** [DESCRIPTION_1_PHRASE]

**Public cible :** [PUBLIC_CIBLE]

**Plateformes :** [A completer selon Q4bis]

**Technologies principales :**
- React Native + Expo v[VERSION_EXPO_ACTUELLE]
- Firebase (details a venir)
- TypeScript
- Zustand (state management)
- React Navigation v7

---

## 📝 REPONSES ONBOARDING

_En cours de collecte..._

---

## 📊 TODOLIST

**Progression globale : En cours d'initialisation...**

_A completer apres toutes les questions_

---

## 📅 JOURNAL DE DEVELOPPEMENT

### [DATE_ACTUELLE] - Debut onboarding
- Collecte des informations projet en cours

---

## 🎯 DECISIONS TECHNIQUES

_A completer apres toutes les questions_

---

## 🐛 PROBLEMES CONNUS

_Aucun probleme connu pour le moment_

---

**Derniere mise a jour par Claude Code le [DATE_ACTUELLE] a [HEURE_ACTUELLE]**

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_
```

#### 2. README.md (creation initiale)
```markdown
# 📱 [NOM_PROJET]

> [DESCRIPTION_1_PHRASE]

**Public cible :** [PUBLIC_CIBLE]

**Status :** 🚧 En cours d'initialisation

---

## 🏗️ Technologies

- React Native + Expo
- TypeScript
- Firebase

_(Plus de details a venir)_

---

## 📝 Documentation

Documentation en cours de creation...

---

**Cree le [DATE_ACTUELLE]**

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_
```

---

### Question 2 : Authentification
**Mettre a jour : PROJECT.md**

Ajouter dans la section `## 📝 REPONSES ONBOARDING` :
```markdown
### Authentification
- **Type :** [Email/Password | Email + Google + Apple | Anonyme | Autre]
- **Details :** [DETAILS_SPECIFIQUES]
```

---

### Question 3 : Monetisation
**Mettre a jour : PROJECT.md**

Ajouter dans la section `## 📝 REPONSES ONBOARDING` :
```markdown
### Monetisation
- **Type :** [Abonnement | Achats in-app | Gratuit | Freemium]
- **Prix :** [PRIX_SI_PAYANT]
- **Features premium :** [LISTE_FEATURES_SI_FREEMIUM]
```

---

### Question 4 : Fonctionnalites Principales
**Mettre a jour : PROJECT.md**

Ajouter dans la section `## 📝 REPONSES ONBOARDING` :
```markdown
### Fonctionnalites Principales

#### Fonctionnalites de base
[✅ Notifications Push]
[✅ Stockage Photos/Videos]
[✅ Geolocalisation]
... (toutes celles cochees)

#### Fonctionnalites sociales
[✅ Chat / Messagerie]
... (toutes celles cochees)

#### Fonctionnalites temporelles
[✅ Calendrier]
... (toutes celles cochees)

#### Analyse & Suivi
[✅ Analytics]
... (toutes celles cochees)

#### Technique
[✅ Backend Automatise]
[✅ Multi-langue] (OBLIGATOIRE par defaut)
[✅ Theme Clair/Sombre] (OBLIGATOIRE par defaut)

#### Autres fonctionnalites custom
- [LISTE_FEATURES_CUSTOM]
```

---

### Question 4bis : Plateforme Cible
**Mettre a jour : PROJECT.md**

Modifier dans la section `## 🎯 RESUME DU PROJET` :
```markdown
**Plateformes :** iOS, Android[, Web] (selon reponse)
```

Et ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Plateforme Cible
- **Plateformes :** [iOS | Android | iOS + Android | iOS + Android + Web]
- **Priorite :** [Mobile-first | Traitement egal mobile/web]
- **Version Web :** [Complete | Limitee (consultation)]
```

---

### Question 5 : Notifications Push
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Notifications Push
- **Active :** [Oui | Non]
- **Types :** [Automatiques (evenements, rappels) | Marketing | Les deux]
- **Exemples :** [LISTE_EXEMPLES_NOTIFICATIONS]
```

---

### Question 6 : Stockage de Fichiers
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Stockage Fichiers
- **Active :** [Oui | Non]
- **Types :** [Photos/avatars | Photos + videos | Documents | Tout]
- **Limite taille par fichier :** [TAILLE_MAX]
- **Limite totale par user :** [LIMITE_USER]
```

---

### Question 7 : Geolocalisation
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Geolocalisation
- **Active :** [Oui | Non]
- **Type :** [Temps reel avec carte | Detection ville | Non]
- **Tracking arriere-plan :** [Oui | Non]
- **Integration :** [Google Maps | Apple Maps]
```

---

### Question 8 : Recherche et Filtres
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Recherche
- **Active :** [Oui | Non]
- **Type :** [Simple (texte) | Avancee + filtres | Full-text (Algolia)]
- **Donnees :** [utilisateurs, produits, evenements, etc.]
```

---

### Question 9 : Analytics
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Analytics
- **Active :** [Oui | Non]
- **Outil :** [Firebase Analytics | Mixpanel | Amplitude | Autre]
- **Evenements a tracker :** [inscription, achat, partage, etc.]
```

---

### Question 10 : Mode Hors-Ligne
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Mode Offline
- **Active :** [Oui | Non]
- **Type :** [Offline complet avec sync | Lecture seule | Non]
- **Donnees offline :** [LISTE_DONNEES_DISPONIBLES_OFFLINE]
```

---

### Question 11 : Backend Automatise (Cloud Functions)
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Cloud Functions
- **Active :** [Oui | Non]
- **Functions prevues :**
  - [Envoi emails automatiques]
  - [Nettoyage donnees obsoletes]
  - [Webhooks vers services tiers]
  - [Traitement images]
  - [AUTRES]
```

---

### Question 12 : Export de Donnees
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Export Donnees (RGPD)
- **Active :** Oui (OBLIGATOIRE)
- **Formats :** [JSON | PDF | CSV | Tous]
```

---

### Question 13 : Pagination des Listes
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Pagination
- **Active :** [Oui | Non]
- **Type :** [Infinite scroll | Pagination classique | Load More button | Pas de pagination]
- **Collections concernees :** [LISTE_COLLECTIONS_LONGUES]
```

---

### Question 14 : Chat / Messagerie
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Chat
- **Active :** [Oui | Non]
- **Type :** [1-to-1 | Groupes | Les deux]
- **Medias :** [Texte uniquement | Texte + photos + videos]
- **Notifications push :** [Oui | Non]
```

---

### Question 15 : Calendrier / Evenements
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Calendrier
- **Active :** [Oui | Non]
- **Type :** [Calendrier complet | Affichage dates | Non]
- **Integration calendrier natif :** [Oui | Non]
- **Rappels automatiques :** [Oui | Non]
```

---

### Question 15bis : Accessibilite WCAG 2.1
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Accessibilite WCAG 2.1
- **Active :** [Oui | Non]
- **Niveau conformite :** [AA (standard) | AAA (maximale) | Base uniquement]
- **Implementations prevues :**
  - Props accessibilite (Label, Hint, Role)
  - Contrastes couleurs conformes
  - Tailles tactiles minimales (44x44 iOS / 48x48 Android)
  - Support VoiceOver / TalkBack
  - Annonces dynamiques lecteurs ecran
  - Tests accessibilite automatises
```

---

### Question 16 : Permissions Speciales
**Mettre a jour : PROJECT.md**

Ajouter dans `## 📝 REPONSES ONBOARDING` :
```markdown
### Permissions
- [✅ Camera (photos/videos)]
- [✅ Galerie photos]
- [✅ Contacts]
- [✅ Calendrier natif]
- [✅ Microphone]
- [✅ Bluetooth]
```

---

## 🔄 APRES TOUTES LES QUESTIONS

### Etape 1 : Finaliser PROJECT.md

#### Completer la section `## 📊 TODOLIST`

Generer la TodoList complete en fonction des reponses :

```markdown
## 📊 TODOLIST

**Progression globale : 0/[TOTAL_TACHES] (0%)**

### ⏳ EN COURS (0)
_Aucune tache en cours_

### ⬜ A FAIRE ([TOTAL_TACHES])

#### 🚀 PHASE 1 : INITIALISATION (0/10) ⬜
- [ ] [FEATURE] Creer structure dossiers | Added: [DATE]
- [ ] [FEATURE] Installer dependances | Added: [DATE]
- [ ] [FEATURE] Configurer Firebase | Added: [DATE]
- [ ] [FEATURE] Setup Git et premier commit | Added: [DATE]
- [ ] [FEATURE] Creer theme (colors, typography, spacing) | Added: [DATE]
- [ ] [FEATURE] Setup i18n (fr, en) | Added: [DATE]
- [ ] [FEATURE] Configurer navigation | Added: [DATE]
- [ ] [FEATURE] Creer composants UI de base (Button, Input, Card) | Added: [DATE]
- [ ] [FEATURE] Setup tests (Jest config) | Added: [DATE]
- [ ] [DOCS] Creer README.md | Added: [DATE]

#### 🔐 PHASE 2 : AUTHENTIFICATION (0/X) ⬜
[SI AUTHENTIFICATION ACTIVEE]
- [ ] [FEATURE] Creer AuthContext | Added: [DATE]
- [ ] [FEATURE] Creer authService.ts | Added: [DATE]
- [ ] [FEATURE] Ecran Login | Added: [DATE]
- [ ] [FEATURE] Ecran Register | Added: [DATE]
[SI GOOGLE SIGN-IN]
- [ ] [FEATURE] Configurer Google Sign-In | Added: [DATE]
[SI APPLE SIGN-IN]
- [ ] [FEATURE] Configurer Apple Sign-In | Added: [DATE]

#### 📸 PHASE 3 : STOCKAGE FICHIERS (0/X) ⬜
[SI STOCKAGE ACTIVE]
- [ ] [FEATURE] Setup Firebase Storage | Added: [DATE]
- [ ] [FEATURE] Creer uploadService.ts | Added: [DATE]
- [ ] [FEATURE] Composant ImagePicker | Added: [DATE]
[SI VIDEOS]
- [ ] [FEATURE] Composant VideoPicker | Added: [DATE]
- [ ] [FEATURE] Compression videos | Added: [DATE]

#### 🗺️ PHASE 4 : GEOLOCALISATION (0/X) ⬜
[SI GEOLOCALISATION ACTIVEE]
- [ ] [FEATURE] Setup expo-location | Added: [DATE]
- [ ] [FEATURE] Creer locationService.ts | Added: [DATE]
- [ ] [FEATURE] Composant MapView | Added: [DATE]
[SI TRACKING ARRIERE-PLAN]
- [ ] [FEATURE] Setup tracking arriere-plan | Added: [DATE]

#### 🔍 PHASE 5 : RECHERCHE (0/X) ⬜
[SI RECHERCHE ACTIVEE]
- [ ] [FEATURE] Composant SearchBar | Added: [DATE]
- [ ] [FEATURE] Creer searchService.ts | Added: [DATE]
[SI FILTRES AVANCES]
- [ ] [FEATURE] Composant FilterPanel | Added: [DATE]
[SI ALGOLIA]
- [ ] [FEATURE] Setup Algolia | Added: [DATE]

#### 🔔 PHASE 6 : NOTIFICATIONS (0/X) ⬜
[SI NOTIFICATIONS ACTIVEES]
- [ ] [FEATURE] Setup Expo Notifications | Added: [DATE]
- [ ] [FEATURE] Creer notificationService.ts | Added: [DATE]
- [ ] [FEATURE] Gestion permissions | Added: [DATE]
- [ ] [FEATURE] Cloud Function onUserCreated (email bienvenue) | Added: [DATE]

#### 💬 PHASE 7 : CHAT (0/X) ⬜
[SI CHAT ACTIVE]
- [ ] [FEATURE] Collection messages Firestore | Added: [DATE]
- [ ] [FEATURE] Creer chatService.ts | Added: [DATE]
- [ ] [FEATURE] Ecran ChatList | Added: [DATE]
- [ ] [FEATURE] Ecran ChatRoom | Added: [DATE]
[SI MEDIAS CHAT]
- [ ] [FEATURE] Envoi photos dans chat | Added: [DATE]
- [ ] [FEATURE] Envoi videos dans chat | Added: [DATE]

#### 📅 PHASE 8 : CALENDRIER (0/X) ⬜
[SI CALENDRIER ACTIF]
- [ ] [FEATURE] Setup react-native-calendars | Added: [DATE]
- [ ] [FEATURE] Collection events Firestore | Added: [DATE]
- [ ] [FEATURE] Creer eventService.ts | Added: [DATE]
- [ ] [FEATURE] Ecran Calendrier | Added: [DATE]
[SI INTEGRATION NATIVE]
- [ ] [FEATURE] Integration calendrier natif (expo-calendar) | Added: [DATE]

#### 💳 PHASE 9 : MONETISATION (0/X) ⬜
[SI ABONNEMENT OU ACHATS]
- [ ] [FEATURE] Setup RevenueCat | Added: [DATE]
- [ ] [FEATURE] Creer subscriptionService.ts | Added: [DATE]
- [ ] [FEATURE] Ecran Paywall | Added: [DATE]
- [ ] [FEATURE] Gestion acces features premium | Added: [DATE]

#### 📊 PHASE 10 : ANALYTICS (0/X) ⬜
[SI ANALYTICS ACTIVE]
- [ ] [FEATURE] Setup [NOM_OUTIL_ANALYTICS] | Added: [DATE]
- [ ] [FEATURE] Creer analyticsService.ts | Added: [DATE]
- [ ] [FEATURE] Tracker evenements cles | Added: [DATE]

#### 📴 PHASE 11 : MODE OFFLINE (0/X) ⬜
[SI MODE OFFLINE ACTIF]
- [ ] [FEATURE] Setup AsyncStorage | Added: [DATE]
- [ ] [FEATURE] Creer offlineService.ts | Added: [DATE]
- [ ] [FEATURE] Detecter connexion (NetInfo) | Added: [DATE]
- [ ] [FEATURE] Sync automatique au retour en ligne | Added: [DATE]

#### ⚡ PHASE 12 : CLOUD FUNCTIONS (0/X) ⬜
[SI CLOUD FUNCTIONS ACTIVEES]
[LISTER CHAQUE FUNCTION PREVUE]
- [ ] [BACKEND] Cloud Function: [NOM_FUNCTION] | Added: [DATE]

#### 🌍 PHASE 13 : INTERNATIONALISATION (0/3) ⬜
- [ ] [FEATURE] Setup i18n | Added: [DATE]
- [ ] [FEATURE] Fichiers traduction (fr, en[, AUTRES]) | Added: [DATE]
- [ ] [FEATURE] Detecteur langue automatique | Added: [DATE]

#### ♿ PHASE 14 : ACCESSIBILITE (0/X) ⬜
[SI WCAG 2.1 AA/AAA]
- [ ] [FEATURE] Audit accessibilite initial | Added: [DATE]
- [ ] [FEATURE] Props accessibilite sur tous composants | Added: [DATE]
- [ ] [FEATURE] Contrastes couleurs conformes | Added: [DATE]
- [ ] [FEATURE] Tailles tactiles minimales | Added: [DATE]
- [ ] [FEATURE] Tests VoiceOver / TalkBack | Added: [DATE]
- [ ] [FEATURE] Tests automatises accessibilite | Added: [DATE]

#### 📤 PHASE 15 : EXPORT DONNEES (0/X) ⬜
- [ ] [FEATURE] Export JSON | Added: [DATE]
[SI PDF]
- [ ] [FEATURE] Export PDF | Added: [DATE]
[SI CSV]
- [ ] [FEATURE] Export CSV | Added: [DATE]

#### 🔒 PHASE 16 : SECURITE (0/X) ⬜
- [ ] [SECURITY] Generer Firestore Rules | Added: [DATE]
- [ ] [SECURITY] Validation donnees cote serveur | Added: [DATE]
- [ ] [SECURITY] Rate limiting Cloud Functions | Added: [DATE]
- [ ] [SECURITY] Setup environnement variables (.env) | Added: [DATE]
- [ ] [DOCS] Generer CGU | Added: [DATE]
- [ ] [DOCS] Generer Politique Confidentialite | Added: [DATE]

#### 🧪 PHASE 17 : TESTS (0/X) ⬜
- [ ] [TEST] Tests unitaires services | Added: [DATE]
- [ ] [TEST] Tests integration | Added: [DATE]
- [ ] [TEST] Tests E2E (Detox) | Added: [DATE]

#### 🚀 PHASE 18 : DEPLOIEMENT (0/X) ⬜
- [ ] [DEPLOY] Setup EAS Build | Added: [DATE]
- [ ] [DEPLOY] Build iOS | Added: [DATE]
- [ ] [DEPLOY] Build Android | Added: [DATE]
- [ ] [DEPLOY] TestFlight (iOS) | Added: [DATE]
- [ ] [DEPLOY] Internal Testing (Android) | Added: [DATE]

### ✅ TERMINE (0)
_Aucune tache terminee_
```

#### Completer la section `## 🎯 DECISIONS TECHNIQUES`

```markdown
## 🎯 DECISIONS TECHNIQUES

### Architecture
- **State Management :** Zustand pour global, Context API pour features specifiques
- **Navigation :** React Navigation Stack + Bottom Tabs ([NOMBRE_TABS] tabs)
- **Styling :** StyleSheet natif + theme system centralise
- **Animations :** React Native Reanimated 3

### Firebase
- **Auth :** [METHODES_AUTH_UTILISEES]
- **Firestore Collections prevues :**
  - users/ (profils utilisateurs)
  [AUTRES_COLLECTIONS_SELON_FONCTIONNALITES]
- **Storage Structure :**
  [STRUCTURE_STORAGE_PREVUE]
- **Cloud Functions prevues :**
  [LISTE_FUNCTIONS]

### Performance
- **Optimisations prevues :**
  - React.memo pour composants couteux
  - useCallback pour handlers dans listes
  - FlatList avec windowSize optimise
- **Images :** Compression a 70%, max 1000px largeur
- **Cache :** AsyncStorage avec TTL 1h

### Accessibilite
[SI WCAG 2.1 AA/AAA]
- **Niveau conformite :** WCAG 2.1 [AA | AAA]
- **Props accessibilite systematiques**
- **Contrastes conformes :** ≥ 4.5:1 (texte), ≥ 3:1 (UI)
- **Tailles tactiles minimales :** 44x44 iOS / 48x48 Android
- **Tests automatises accessibilite**

### Regles Firestore
_Les regles seront generees progressivement apres creation des collections_
```

---

### Etape 2 : Generer CHANGELOG.md complet

Remplacer tous les placeholders du template avec les vraies valeurs collectees.

---

### Etape 3 : Finaliser README.md

Remplacer tous les placeholders et ajouter sections completes :
- Features
- Architecture
- Installation
- Configuration
- Documentation
- Technologies
- etc.

---

## 💬 Exemple de Dialogue avec Mises a Jour Incrementales

```
DEV: "Je veux creer une nouvelle app"

CLAUDE: "Parfait ! Je vais te poser 16 questions pour comprendre ton projet.

🎯 Question 1/16 : Informations de base

1. Quel est le nom du projet ?
2. Description en une phrase ?
3. Public cible (utilisateurs finaux) ?"

DEV: "RecipeShare - Une app de partage de recettes - Grand public 25-55 ans"

CLAUDE:
[CREE PROJECT.md avec nom, description, public]
[CREE README.md initial]

"✅ PROJECT.md et README.md crees avec ces informations.

🔐 Question 2/16 : Authentification

Quel type d'authentification souhaitez-vous ?
a) Email/Password uniquement
b) Email + Google + Apple Sign-In
c) Anonyme
d) Autre"

DEV: "b"

CLAUDE:
[MET A JOUR PROJECT.md section Authentification]

"✅ PROJECT.md mis a jour avec authentification Email + Google + Apple.

💰 Question 3/16 : Monetisation

Votre app aura-t-elle un systeme d'abonnement ou d'achats ?
..."

[... Et ainsi de suite pour TOUTES les questions ...]
```

**Resultat :** A la fin de la Question 16, PROJECT.md et README.md sont deja quasi complets, il ne reste qu'a generer la TodoList detaillee.

---

## 🎯 Avantages de cette Approche

1. **Transparence :** Le dev voit le fichier se construire en temps reel
2. **Sauvegarde incrementale :** Pas de perte si interruption
3. **Experience interactive :** Plus engageant qu'un long questionnaire suivi d'un gros batch de generation
4. **Feedback immediat :** Le dev peut voir si les infos sont bien interpretees
5. **Validation progressive :** Possibilite de corriger en cours de route

---

## ⚠️ Points d'Attention

1. **Toujours afficher confirmation apres mise a jour**
   ```
   ✅ PROJECT.md mis a jour avec authentification Email + Google + Apple.
   ```

2. **Ne pas ralentir le questionnaire**
   - Mise a jour en arriere-plan
   - Confirmation courte (1 ligne max)

3. **Gerer les erreurs proprement**
   - Si erreur d'ecriture, continuer le questionnaire
   - Regenerer le fichier a la fin si necessaire

4. **Permettre corrections**
   - Si dev dit "Ah non en fait je voulais...", mettre a jour immediatement

---

🤖 _Guide destine a Claude Code - Approche incrementale pour generation fichiers MD_

**Derniere mise a jour :** 01/11/2025
