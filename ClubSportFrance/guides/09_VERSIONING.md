# 🔢 VERSIONING AUTOMATIQUE (SemVer)

> **Guide complet du versioning semantique pour React Native/Expo**

---

## 📚 Regles SemVer

**Le versioning est OBLIGATOIRE et suit Semantic Versioning (MAJOR.MINOR.PATCH).**

```
Version Format: MAJOR.MINOR.PATCH (ex: 1.2.3)

MAJOR (1.x.x) : Breaking changes (incompatibilite avec versions precedentes)
MINOR (x.2.x) : Nouvelles fonctionnalites (retrocompatibles)
PATCH (x.x.3) : Bug fixes (retrocompatibles)

Exemples :
0.1.0 → 0.1.1 : Bug fix
0.1.1 → 0.2.0 : Nouvelle feature
0.9.0 → 1.0.0 : Premiere release stable
1.2.3 → 2.0.0 : Breaking change
```

---

## 📝 Fichiers a Mettre a Jour

Lors d'un changement de version, Claude doit mettre a jour **4 fichiers** :

1. **package.json** - `version`
2. **app.json** - `version` + `ios.buildNumber` + `android.versionCode`
3. **PROJECT.md** - Section version + journal
4. **CHANGELOG.md** (si existe) - Ajout entree

---

## 🔄 Process de Versioning

**Claude DOIT suivre ce process a chaque fois :**

```typescript
/**
 * Process complet de versioning
 *
 * 1. DEMANDER AU DEVELOPPEUR :
 *    "Quel type de changement : MAJOR / MINOR / PATCH ?"
 *    (Expliquer brievement la difference si necessaire)
 *
 * 2. CALCULER LA NOUVELLE VERSION :
 *    - Lire package.json pour version actuelle
 *    - Incrementer selon le type
 *    - Incrementer buildNumber (iOS) et versionCode (Android)
 *
 * 3. PROPOSER LA MISE A JOUR :
 *    "Je vais mettre a jour la version :
 *     - Version actuelle : 1.2.3 (Build 45)
 *     - Nouvelle version : 1.3.0 (Build 46)
 *
 *     Fichiers qui seront modifies :
 *     - package.json
 *     - app.json
 *     - PROJECT.md
 *
 *     Voulez-vous continuer ?"
 *
 * 4. ATTENDRE CONFIRMATION
 *
 * 5. METTRE A JOUR LES 4 FICHIERS
 *
 * 6. PROPOSER LE COMMIT :
 *    "Voulez-vous que je cree un commit pour cette mise a jour ?
 *     Message propose : chore: bump version to 1.3.0"
 *
 * 7. SI OUI, CREER LE COMMIT + TAG
 */
```

---

## 🛠️ Script de Versioning

**scripts/bump-version.js** (a creer si automatisation souhaitee)

```javascript
/**
 * Fichier: scripts/bump-version.js
 *
 * Script pour incrementer automatiquement la version.
 * Usage: node scripts/bump-version.js [major|minor|patch]
 */

const fs = require('fs');
const path = require('path');

const bumpVersion = (type) => {
  // 1. Lire package.json
  const packagePath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageJson.version;

  // 2. Parser version actuelle
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  // 3. Calculer nouvelle version
  let newVersion;
  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    default:
      throw new Error('Type invalide. Utiliser: major, minor ou patch');
  }

  // 4. Mettre a jour package.json
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

  // 5. Mettre a jour app.json
  const appJsonPath = path.join(__dirname, '../app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

  appJson.expo.version = newVersion;

  // Incrementer buildNumber (iOS)
  const currentBuildNumber = parseInt(appJson.expo.ios?.buildNumber || '1');
  appJson.expo.ios = appJson.expo.ios || {};
  appJson.expo.ios.buildNumber = String(currentBuildNumber + 1);

  // Incrementer versionCode (Android)
  const currentVersionCode = parseInt(appJson.expo.android?.versionCode || 1);
  appJson.expo.android = appJson.expo.android || {};
  appJson.expo.android.versionCode = currentVersionCode + 1;

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');

  console.log(`Version bumped: ${currentVersion} → ${newVersion}`);
  console.log(`iOS Build: ${currentBuildNumber} → ${currentBuildNumber + 1}`);
  console.log(`Android versionCode: ${currentVersionCode} → ${currentVersionCode + 1}`);
};

// Execution
const type = process.argv[2];
if (!type) {
  console.error('Usage: node bump-version.js [major|minor|patch]');
  process.exit(1);
}

bumpVersion(type);
```

**Ajouter dans package.json :**

```json
{
  "scripts": {
    "version:major": "node scripts/bump-version.js major",
    "version:minor": "node scripts/bump-version.js minor",
    "version:patch": "node scripts/bump-version.js patch"
  }
}
```

---

## 🎯 Quand Proposer une Version

**Approche Simple et Flexible :**

Claude propose une nouvelle version **apres chaque ajout de feature terminee**.

```typescript
/**
 * REGLE : Proposer systematiquement apres chaque feature
 *
 * Phrase exacte a utiliser :
 * "J'ai termine l'implementation de [FEATURE].
 *  Veux-tu que je mette a jour la version ? (MINOR: 1.2.0 → 1.3.0)"
 *
 * Si le dev dit NON :
 * → Redemander apres la prochaine feature
 * → Ne pas insister
 *
 * Si le dev dit OUI :
 * → Suivre le process de versioning complet
 */
```

### Phrases Exactes Selon le Type

**MINOR (Nouvelle feature) :**
```
"J'ai termine l'implementation de [FEATURE].
Veux-tu que je mette a jour la version ?
Version actuelle : 1.2.3
Nouvelle version : 1.3.0 (MINOR: ajout feature)
D'accord ?"
```

**PATCH (Bug fix) :**
```
"J'ai corrige le bug [BUG].
Veux-tu que je mette a jour la version ?
Version actuelle : 1.2.3
Nouvelle version : 1.2.4 (PATCH: correction bug)
D'accord ?"
```

**MAJOR (Breaking change) :**
```
"⚠️ Attention : ce changement casse la compatibilite avec l'ancienne version.
Veux-tu que je mette a jour la version ?
Version actuelle : 1.2.3
Nouvelle version : 2.0.0 (MAJOR: breaking change)
D'accord ?"
```

### Cas Particuliers

**1. Deploiement imminent :**
```
"On va deployer sur les stores.
Il faut mettre a jour la version avant le build.
Version actuelle : 1.2.3
Je propose : 1.3.0 (cumul de [X] features depuis derniere release)
D'accord ?"
```

**2. Developpeur demande explicitement :**
```
User: "On peut faire une nouvelle version ?"
Claude: "Oui, base sur les changements recents :
- [FEATURE 1]
- [FEATURE 2]
- [FIX 1]

Je propose : 1.3.0 (MINOR)
D'accord ?"
```

**3. Cumul de changements :**
```
"Il y a eu [X] changements significatifs depuis la derniere version :
- [Liste des changements]

Je propose de faire une release : 1.3.0 (MINOR)
Veux-tu que je mette a jour la version ?"
```

### Regle d'Or

✅ **TOUJOURS demander apres une feature**
❌ **NE JAMAIS mettre a jour sans confirmation**
✅ **Accepter un "non" sans redemander immediatement**
✅ **Reproposer apres la prochaine feature**

---

## 📋 Exemple dans PROJECT.md

```markdown
# 📱 MonApp

**Version actuelle :** 1.3.0 (Build 46 / versionCode 46)
**Derniere mise a jour :** 30/10/2025

## 📅 Historique des Versions

### Version 1.3.0 (30/10/2025) - MINOR
**Build:** 46 (iOS) / versionCode: 46 (Android)

**Nouvelles fonctionnalites :**
- Ajout du mode sombre
- Ajout du selecteur de langue (FR/EN/ES)
- Notifications push pour nouveaux messages

**Ameliorations :**
- Performance de la liste des evenements
- Interface du profil utilisateur

**Correctifs :**
- Aucun

---

### Version 1.2.3 (25/10/2025) - PATCH
**Build:** 45 (iOS) / versionCode: 45 (Android)

**Correctifs :**
- Correction crash au login avec email long
- Correction affichage avatar sur iOS 15
- Correction timezone pour calendrier
```

---

🤖 _Guide destine a Claude Code - Versioning systematique et discipline_
