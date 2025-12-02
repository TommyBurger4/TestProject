# 📝 GUIDE ONBOARDING - 16+ Questions

**IMPORTANT :** Avant de commencer TOUT nouveau projet, Claude DOIT poser ces questions au developpeur (16 questions principales + questions complementaires selon le contexte).

**NOUVEAU :** Mettre a jour PROJECT.md et README.md **immediatement apres chaque reponse**. Voir **16_INCREMENTAL_UPDATES.md** pour details.

---

## Question 1 : Nom et Description du Projet
```
🎯 Question 1/16 : Informations de base

1. Quel est le nom du projet ?
2. Description en une phrase ?
3. Public cible (utilisateurs finaux) ?

Exemple :
- Nom : FindMyCourt
- Description : Site web pour trouver et reserver des terrains de sport
- Public : Sportifs amateurs 18-45 ans
```

## Question 2 : Authentification
```
🔐 Question 2/16 : Authentification

Quel type d'authentification souhaitez-vous ?

a) Email/Password uniquement
b) Email + Google + Apple Sign-In
c) Anonyme (pas de compte utilisateur)
d) Autre (preciser)

👉 Ma recommandation : Option b (meilleure UX)
```

## Question 3 : Monétisation
```
💰 Question 3/16 : Monetisation

Votre site aura-t-il un systeme d'abonnement ou d'achats ?

a) Oui, abonnement mensuel/annuel (Stripe)
b) Oui, achats ponctuels
c) Non, site 100% gratuit
d) Freemium (base gratuite + premium payant)

Si oui, preciser :
- Prix envisage ?
- Fonctionnalites premium ?
```

## Question 4 : Fonctionnalités Principales
```
✨ Question 4/16 : Fonctionnalites Principales

Quelles fonctionnalites souhaitez-vous integrer dans votre site ?

COCHEZ TOUTES CELLES QUI S'APPLIQUENT :

📱 FONCTIONNALITES DE BASE :
[ ] Stockage Photos/Videos/Documents (Firebase Storage)
[ ] Geolocalisation & Cartes (Google Maps JavaScript API)
[ ] Recherche & Filtres (simple, avancee, ou full-text)
[ ] Export de Donnees (JSON, PDF, CSV - RGPD)

💬 FONCTIONNALITES SOCIALES :
[ ] Chat / Messagerie (temps reel)
[ ] Systeme de Groupes (creation, invitation, gestion)
[ ] Profils Utilisateurs (publics, amis, followers)
[ ] Partage Social (vers Facebook, Instagram, Twitter)
[ ] Systeme de Notation/Reviews (etoiles, commentaires)

📅 FONCTIONNALITES TEMPORELLES :
[ ] Calendrier & Evenements (creation, modification, rappels)
[ ] Systeme de Reservation/Booking (creneaux horaires)
[ ] Disponibilites & Planning (gestion indisponibilites)

📊 ANALYSE & SUIVI :
[ ] Analytics (Firebase Analytics + Google Analytics 4)
[ ] Tableau de Bord Admin (statistiques, metriques)
[ ] Rapports & Exports (PDF, graphiques)

🔧 TECHNIQUE :
[ ] Backend Automatise (Cloud Functions, cron jobs, emails auto)
[ ] Multi-langue (i18n - OBLIGATOIRE par defaut)
[ ] Theme Clair/Sombre (OBLIGATOIRE par defaut)

🎨 AUTRES FONCTIONNALITES :
[ ] Autre (preciser ci-dessous)

Si "Autre", decrivez vos fonctionnalites custom :
(Claude les ajoutera au TODO du PROJECT.md pour implementation ulterieure)

Exemples de fonctionnalites custom :
- Systeme de gamification (badges, points, classement)
- Scanner QR Code
- Signature electronique
- Appel audio/video (WebRTC)
- etc.
```

## Question 4bis : Focus Plateforme
```
💻 Question 4bis/16+ : Focus Plateforme

Tu as dit vouloir un site web. Quelle est la priorite ?

a) Desktop uniquement (ordinateurs)
b) Mobile + Desktop (responsive design)
c) Mobile d'abord (mobile-first, puis desktop)

Note :
- Next.js permet de creer des sites responsive facilement
- Le responsive design assure une bonne experience sur tous les appareils
- Option b ou c recommandee pour toucher le maximum d'utilisateurs

Si responsive :
- Quelle plateforme prioriser ? Desktop ou Mobile ?
- Besoin d'une PWA (Progressive Web App) installable sur mobile ?
```

## Question 5 : Notifications
```
🔔 Question 5/16 : Notifications

Avez-vous besoin de notifications ?

a) Non, pas de notifications
b) Oui, notifications par email uniquement
c) Oui, notifications push navigateur (Web Push API)
d) Les deux (email + push navigateur)

Si oui, exemples de notifications souhaitees ?
```

## Question 6 : Stockage de Fichiers
```
📁 Question 6/16 : Stockage de Fichiers

Votre site va-t-il stocker des fichiers (photos, videos, documents) ?

a) Oui, photos/avatars utilisateurs
b) Oui, photos + videos
c) Oui, documents (PDF, etc.)
d) Tout ce qui precede
e) Non, donnees texte uniquement

Si oui, taille max par fichier ? Limite totale par user ?
```

## Question 7 : Géolocalisation
```
📍 Question 7/16 : Geolocalisation

Avez-vous besoin de la geolocalisation ?

a) Oui, localisation utilisateur avec carte interactive
b) Oui, juste pour detecter la ville de l'utilisateur
c) Non

Si oui, preciser :
- Besoin de tracking position en temps reel ?
- Integration Google Maps JavaScript API ?
```

## Question 8 : Recherche et Filtres
```
🔍 Question 8/16 : Recherche et Filtres

Votre site aura-t-il un systeme de recherche ?

a) Oui, recherche simple (texte)
b) Oui, recherche avancee + filtres multiples
c) Oui, recherche full-text (Algolia)
d) Non

Si oui, sur quelles donnees ? (utilisateurs, produits, evenements, etc.)
```

## Question 9 : Analytics
```
📊 Question 9/16 : Analytics

Voulez-vous tracker l'utilisation de votre site ?

a) Oui, Firebase Analytics + Google Analytics 4 (gratuit, standard)
b) Oui, Analytics avance (Mixpanel, Amplitude)
c) Non

Si oui, evenements importants a tracker ?
(ex: inscription, achat, partage, etc.)
```

## Question 10 : Mode Hors-Ligne
```
📴 Question 10/16 : Mode Hors-Ligne

Votre site doit-il fonctionner sans connexion ?

a) Oui, mode offline complet avec sync automatique (PWA + Service Worker)
b) Oui, mais fonctionnalites limitees (lecture seule en cache)
c) Non, connexion internet obligatoire

Si oui, quelles donnees doivent etre disponibles offline ?
```

## Question 11 : Backend Automatisé (Cloud Functions)
```
⚡ Question 11/16 : Backend Automatise

Avez-vous besoin d'automatisations cote serveur ?

Exemples :
- Envoi d'emails automatiques (bienvenue, rappels)
- Nettoyage de donnees obsoletes (cron jobs)
- Webhooks vers services tiers (Stripe, SendGrid)
- Traitement d'images (compression, miniatures)

a) Oui (preciser lesquelles)
b) Non, pas pour l'instant
```

## Question 12 : Export de Données
```
📤 Question 12/16 : Export de Donnees

Les utilisateurs doivent-ils pouvoir exporter leurs donnees ?

Note : Fonction OBLIGATOIRE pour conformite RGPD.

Types d'export souhaites :
a) JSON (toutes les donnees brutes)
b) PDF (format lisible)
c) CSV (tableur)
d) Tous les formats ci-dessus (recommande)

👉 Par defaut, Claude implementera option d automatiquement.
```

## Question 13 : Pagination des Listes
```
📜 Question 13/16 : Pagination

Votre site affichera-t-il des listes longues ?
(ex: liste de produits, messages, evenements)

Si oui, detectees automatiquement, mais quel type preferer ?

a) Infinite scroll (chargement automatique en scrollant)
b) Pagination classique (boutons Precedent/Suivant + numeros)
c) Load More button (bouton "Voir plus")
d) Pas de pagination (toutes les donnees chargees d'un coup)

👉 Ma recommandation : Option a ou b selon le cas d'usage
```

## Question 14 : Chat / Messagerie
```
💬 Question 14/16 : Chat / Messagerie

Votre site necessite-t-il un systeme de chat ?

a) Oui, chat 1-to-1 (prive)
b) Oui, chat de groupe
c) Oui, les deux
d) Non

Si oui :
- Messages texte uniquement ou avec medias (photos, videos) ?
- Notifications pour nouveaux messages ?
```

## Question 15 : Calendrier / Événements
```
📅 Question 15/16 : Calendrier / Evenements

Votre site gere-t-il des evenements avec dates ?

a) Oui, calendrier complet avec creation/modification evenements
b) Oui, simple affichage de dates importantes
c) Non

Si oui :
- Integration avec Google Calendar / Outlook ?
- Rappels automatiques avant evenements ?
```

## Question 15bis : Accessibilité WCAG 2.1
```
♿ Question 15bis/16+ : Accessibilite WCAG 2.1

Votre site doit-il respecter les normes d'accessibilite WCAG 2.1 ?

a) Oui, conformite niveau AA (recommande - standard international)
b) Oui, conformite niveau AAA (accessibilite maximale)
c) Non, pas de conformite stricte (accessibilite de base seulement)

Note :
- WCAG 2.1 AA est le standard international pour l'accessibilite web
- Rend le site accessible aux personnes en situation de handicap (visuel, moteur, auditif, cognitif)
- Inclut : lecteurs d'ecran, contrastes couleurs, navigation clavier, ARIA labels

Si oui, Claude implementera automatiquement :
- HTML semantique (nav, main, section, article, etc.)
- Attributs ARIA (labels, roles, states)
- Contrastes couleurs conformes (≥ 4.5:1 pour texte, ≥ 3:1 pour UI)
- Navigation clavier complete (focus visible, tab order)
- Support lecteurs ecran (NVDA, JAWS, VoiceOver)
- Tests d'accessibilite automatises (axe-core)

Voir guide complet : 15_ACCESSIBILITY.md
```

## Question 16 : Permissions Spéciales
```
🔑 Question 16/16 : Permissions Speciales

Votre site a-t-il besoin d'acces speciaux ?

a) Camera (photos/videos via webcam)
b) Microphone (enregistrement audio)
c) Geolocalisation (position utilisateur)
d) Notifications navigateur (Web Push API)
e) Clipboard (copier/coller)
f) Aucune permission speciale

Cochez toutes celles necessaires.
```

---

## ⚠️ APPROCHE INCREMENTALE

**IMPORTANT :** Ne PAS attendre la fin pour generer les fichiers MD.

**Voir guide 16_INCREMENTAL_UPDATES.md pour details complets.**

**Principe :**
```
Question 1 → CREER PROJECT.md et README.md immediatement
Question 2 → METTRE A JOUR PROJECT.md section Auth immediatement
Question 3 → METTRE A JOUR PROJECT.md section Monetisation immediatement
...
Question 16 → METTRE A JOUR PROJECT.md section Permissions immediatement
```

**Avantages :**
- ✅ Sauvegarde progressive (pas de perte si interruption)
- ✅ Progression visible en temps reel
- ✅ Experience plus interactive
- ✅ Feedback immediat

---

## Après les Réponses

Une fois toutes les questions repondues ET les fichiers MD mis a jour progressivement, Claude doit :

1. **Completer la TodoList detaillee dans PROJECT.md** (voir 16_INCREMENTAL_UPDATES.md section "APRES TOUTES LES QUESTIONS")
2. **Finaliser README.md et CHANGELOG.md** avec toutes les informations collectees
3. **Reformuler et resumer CLAIREMENT les reponses** avec structure organisee :
   - Informations generales (nom, description, public)
   - Plateforme ciblee (Desktop, Mobile+Desktop, responsive)
   - Fonctionnalites detectees automatiquement
   - Accessibilite (WCAG 2.1 AA/AAA ou non)
   - Architecture technique prevue
   **DEMANDER CONFIRMATION explicite** avant de continuer
4. **Créer le dossier projet** avec la structure complète
5. **Copier les fichiers MD deja generes** dans le dossier projet
6. **Finaliser CHANGELOG.md** avec version 0.1.0 et date
7. **Initialiser Git** avec premier commit
8. **Installer Next.js + dépendances** nécessaires selon les réponses
9. **Configurer Firebase** (créer .env.local + firebase config)
10. **Présenter un plan de développement** en phases prioritaires
11. **Attendre validation** avant de commencer à coder

---

🤖 _Ce guide est destiné à Claude Code pour l'initialisation automatique de projets Next.js_
