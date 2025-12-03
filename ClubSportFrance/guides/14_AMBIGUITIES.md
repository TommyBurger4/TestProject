# ❓ GESTION DES AMBIGUITES

> **Que faire quand Claude ne comprend pas la demande du developpeur ?**

---

## 🎯 Principe Fondamental

**TOUJOURS demander clarification plutot que deviner**

❌ **MAUVAIS** : Deviner ce que le dev veut et coder sans confirmer
✅ **BON** : Demander explicitement ce qui n'est pas clair

---

## 💬 Phrases a Utiliser

### 1. Demande Ambigue

```
User: "Ajoute un truc pour les utilisateurs"

Claude: "Je ne suis pas sur de comprendre exactement ce que tu veux.
Peux-tu preciser :
- Quel type de fonctionnalite pour les utilisateurs ?
- Est-ce lie au profil, a l'authentification, ou autre chose ?
- Ou cette fonctionnalite devrait-elle apparaitre sur le site ?"
```

### 2. Plusieurs Interpretations Possibles

```
User: "Change le bouton"

Claude: "Il y a plusieurs boutons sur le site. Tu parles de :
1. Le bouton de connexion sur la page login ?
2. Le bouton d'envoi sur la page chat ?
3. Un autre bouton ?

Et quel changement veux-tu : couleur, taille, texte, comportement ?"
```

### 3. Technologie Non Specifiee

```
User: "Ajoute une base de donnees"

Claude: "On utilise deja Firestore pour Firebase.
Tu veux :
1. Ajouter une nouvelle collection dans Firestore ?
2. Utiliser une autre base de donnees (PostgreSQL, MongoDB) ?
3. Modifier la structure Firestore existante ?

Peux-tu preciser ?"
```

### 4. Feature Complexe Sans Details

```
User: "Implemente un systeme de notifications"

Claude: "Le systeme de notifications peut inclure plusieurs choses.
Veux-tu :
- Notifications push navigateur (Web Push API) ?
- Notifications par email ?
- Les deux ?

Et pour quel type d'evenements :
- Nouveaux messages ?
- Rappels calendrier ?
- Alertes systeme ?
- Autre ?

Dis-moi ce que tu veux exactement, je vais tout mettre en place."
```

---

## 🔍 Quand Demander Clarification

### ✅ TOUJOURS demander si :

- La demande est vague ou ambigue
- Plusieurs interpretations sont possibles
- Des choix techniques doivent etre faits
- L'impact sur l'architecture est significatif
- Le dev utilise des termes generiques ("truc", "machin", "ca")

### ❌ NE PAS demander si :

- La demande est claire et specifique
- C'est une correction evidente de bug
- C'est un changement de style trivial
- Le contexte rend la demande non ambigue

---

## 🔄 Reformuler pour Verifier Comprehension

**Technique : Resumer ce qui va etre fait AVANT de le faire**

```
User: "Je veux que les users puissent partager leur profil"

Claude: "Ok, je comprends. Je vais implementer :
1. Un bouton 'Partager' sur la page profil
2. Generation d'un lien de partage (URL unique)
3. Copie du lien dans le presse-papier + option partage natif

C'est bien ce que tu veux ?"
```

---

## 📋 Template de Question de Clarification

```typescript
/**
 * Template a utiliser quand Claude ne comprend pas
 */

"Je veux m'assurer de bien comprendre ta demande avant de commencer.

Tu veux : [REFORMULATION DE CE QUE CLAUDE A COMPRIS]

Est-ce correct ? Si non, peux-tu preciser :
- [QUESTION SPECIFIQUE 1] ?
- [QUESTION SPECIFIQUE 2] ?
- [QUESTION SPECIFIQUE 3] ?"
```

---

## 📚 Exemples Complets

### Exemple 1 : Feature vague

```
User: "Ameliore le chat"

Claude: "Je veux ameliorer le chat, mais j'ai besoin de plus de details.
Qu'est-ce qui doit etre ameliore exactement ?

- Performance (messages lents a charger) ?
- UI/UX (design, ergonomie) ?
- Fonctionnalites manquantes (reactions, repondre, edit) ?
- Bugs specifiques ?

Dis-moi ce qui te gene et je vais le corriger."
```

### Exemple 2 : Demande technique floue

```
User: "Optimise le site"

Claude: "L'optimisation peut concerner plusieurs aspects.
Qu'est-ce qui te semble lent ou problematique actuellement ?

- Temps de chargement initial ?
- Scroll dans les listes ?
- Chargement des images ?
- Appels Firebase ?
- Autre chose ?

Une fois que tu me dis ce qui pose probleme, je vais optimiser precisement ca."
```

### Exemple 3 : Contradiction apparente

```
User: "Rends le bouton plus gros mais discret"

Claude: "Je veux m'assurer de bien comprendre.
'Plus gros mais discret' peut sembler contradictoire.

Tu veux :
1. Bouton plus grand en taille MAIS avec couleur discrete (gris clair) ?
2. Bouton avec plus de padding MAIS sans bordure voyante ?
3. Autre chose ?

Peux-tu preciser l'effet visuel que tu cherches ?"
```

---

## 🏆 Regle d'Or

**"Mieux vaut poser 3 questions de trop que coder 1 feature de travers."**

Claude doit TOUJOURS privilegier la clarte plutot que la rapidite.

---

🤖 _Guide destine a Claude Code - Clarte avant action_
