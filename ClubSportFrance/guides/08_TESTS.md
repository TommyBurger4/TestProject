# 🧪 TESTS

> **Guide complet des tests : philosophie, configuration, et exemples**

---

## 🎯 Philosophie des Tests

**Les tests sont OBLIGATOIRES pour toute application professionnelle.**

### Types de Tests

- **Tests unitaires** : Fonctions utilitaires, services, hooks
- **Tests d'integration** : Composants avec interactions
- **Tests E2E** : Parcours utilisateur complets (optionnel, si temps)

---

## 👨‍🏫 Approche : Claude GUIDE, le Dev TESTE

**REGLE IMPORTANTE : Claude ne cree PAS les tests automatiquement.**

Au lieu de ca, Claude doit :

1. **Dire QUOI tester**
2. **Expliquer COMMENT tester**
3. **Indiquer OU regarder pour voir si ca marche**

### Exemple : Apres Creation d'un Service

```
Claude: "J'ai cree authService.ts avec la fonction login().
Pour tester cette fonction, tu peux :

1. Ouvrir l'app et aller sur l'ecran de login
2. Essayer de te connecter avec :
   - Email valide + mot de passe valide → devrait reussir
   - Email invalide → devrait afficher "Email invalide"
   - Mot de passe incorrect → devrait afficher "Mot de passe incorrect"
   - Pas de connexion internet → devrait afficher "Erreur reseau"

Pour verifier que ca marche :
- Tu devrais etre redirige vers HomeScreen apres connexion reussie
- Le token devrait etre stocke dans AsyncStorage
- Tu peux checker les logs avec console.log dans authService.ts

Tu veux que je t'aide a debugger si quelque chose ne marche pas ?"
```

### Exemple : Apres Creation d'un Composant

```
Claude: "J'ai cree le composant CustomButton.tsx.
Pour tester ce bouton, tu peux :

1. Ouvrir LoginScreen.tsx (ou j'ai ajoute le bouton)
2. Verifier que :
   - Le bouton s'affiche correctement
   - Le texte est lisible (contraste suffisant)
   - Le bouton reagit au toucher (changement visuel)
   - Le loading spinner s'affiche pendant l'action
   - Le bouton est desactive quand disabled={true}

Tu veux que j'ajoute des logs pour debugger ?"
```

### Exemple : Tests Unitaires (si le dev veut les creer)

```
User: "Je veux creer des tests unitaires pour validators.ts"

Claude: "Ok ! Voici ce qu'il faut tester pour validators.ts :

1. Creer le fichier : src/utils/__tests__/validators.test.ts

2. Tests a ecrire pour isValidEmail() :
   - Email valide : 'user@example.com' → devrait retourner true
   - Email invalide : 'invalid' → devrait retourner false
   - Email vide : '' → devrait retourner false

3. Tests a ecrire pour isValidPassword() :
   - Mot de passe 8+ caracteres : 'password123' → true
   - Mot de passe court : 'pass' → false
   - Mot de passe vide : '' → false

4. Lancer les tests :
   npm test

5. Voir les resultats dans le terminal :
   - ✓ = test passe
   - ✗ = test echoue

Tu veux que je te montre le code du test ou tu veux essayer toi-meme ?"
```

### Cas Ou le Dev Demande le Code du Test

Si le dev demande explicitement le code :

```
User: "Montre-moi le code du test"

Claude: "Voici le code du test pour validators.ts :

[Claude montre le code complet du test]

Pour lancer ce test :
1. Copier ce code dans src/utils/__tests__/validators.test.ts
2. Lancer : npm test
3. Tous les tests devraient passer ✓

Tu veux que je t'aide a interpreter les resultats ?"
```

### Regle d'Or

✅ **TOUJOURS proposer des tests manuels d'abord**
✅ **EXPLIQUER comment verifier que ca marche**
✅ **DONNER le code du test SI le dev le demande**
❌ **NE PAS creer automatiquement des fichiers de tests sans demander**

---

## ⚙️ Configuration Jest

### jest.config.js

```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|expo|@expo)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,ts}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### jest.setup.js

```javascript
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Firebase
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  NavigationContainer: ({ children }) => children,
}));

// Silence console errors during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
```

---

## 📋 Exemples de Tests

### Tests de Fonctions Utilitaires

**src/utils/__tests__/validators.test.ts**

```typescript
/**
 * Fichier: validators.test.ts
 *
 * Tests unitaires pour les fonctions de validation.
 */

import { isValidEmail, isValidPassword, isValidPhone } from '../validators';

describe('validators', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user+tag@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should return true for passwords with 8+ characters', () => {
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('verylongpassword')).toBe(true);
    });

    it('should return false for passwords with less than 8 characters', () => {
      expect(isValidPassword('pass')).toBe(false);
      expect(isValidPassword('1234567')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });
});
```

### Tests de Services

**src/features/auth/services/__tests__/authService.test.ts**

```typescript
/**
 * Fichier: authService.test.ts
 *
 * Tests pour le service d'authentification.
 */

import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser, registerUser, logoutUser } from '../authService';

// Mock Firebase
jest.mock('firebase/auth');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const result = await loginUser('test@example.com', 'password123');

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw error for invalid credentials', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error('auth/wrong-password')
      );

      await expect(
        loginUser('test@example.com', 'wrongpassword')
      ).rejects.toThrow();
    });
  });
});
```

### Tests de Hooks

**src/hooks/__tests__/useDebounce.test.ts**

```typescript
/**
 * Fichier: useDebounce.test.ts
 *
 * Tests pour le hook useDebounce.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'changed', delay: 500 });

    // Should still be initial before delay
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now should be changed
    expect(result.current).toBe('changed');
  });
});
```

### Tests de Composants

**src/components/ui/__tests__/Button.test.tsx**

```typescript
/**
 * Fichier: Button.test.tsx
 *
 * Tests pour le composant Button.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with title', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} disabled />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

---

## 🚀 Commandes de Test

```bash
# Lancer tous les tests
npm test

# Mode watch (re-run sur changements)
npm run test:watch

# Coverage report
npm run test:coverage

# Tests en mode CI (sans watch, avec coverage)
npm run test:ci

# Lancer un fichier specifique
npm test validators.test.ts

# Lancer avec verbose
npm test -- --verbose

# Update snapshots
npm test -- -u
```

---

## 🎬 Tests E2E avec Detox

### Qu'est-ce que Detox ?

**Detox** est le framework de tests E2E (End-to-End) recommande pour React Native.
Il permet de tester l'application complete comme un utilisateur reel, en simulant les interactions (taps, swipes, texte) sur un simulateur ou appareil reel.

**Avantages** :
- Tests sur vrais simulateurs iOS/Android (pas de WebView)
- Synchronisation automatique avec React Native
- Execution rapide comparee a Appium
- Support TypeScript natif

**Quand utiliser Detox** :
- Parcours utilisateurs critiques (login, signup, checkout)
- Tests de regression avant release
- Validation des flows complets
- CI/CD pour detecter bugs avant production

---

### Installation Detox

**1. Installer Detox CLI**

```bash
npm install -g detox-cli
npm install --save-dev detox jest
```

**2. Initialiser la configuration**

```bash
detox init
```

Ceci cree :
- `.detoxrc.js` (configuration Detox)
- `e2e/` (dossier pour tests E2E)

**3. Configuration `.detoxrc.js`**

```javascript
/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/YourApp.app',
      build: 'xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/YourApp.app',
      build: 'xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug'
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15 Pro'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_5_API_33'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
```

**4. Configuration Jest pour E2E**

**e2e/jest.config.js** :

```javascript
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
```

---

### Ecrire des Tests E2E

#### Structure d'un Test Detox

**e2e/auth.test.ts** :

```typescript
/**
 * Fichier: auth.test.ts
 *
 * Tests E2E pour l'authentification.
 */

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display welcome screen on first launch', async () => {
    await expect(element(by.id('welcome-screen'))).toBeVisible();
    await expect(element(by.text('Bienvenue'))).toBeVisible();
  });

  it('should login with valid credentials', async () => {
    // Navigation vers login
    await element(by.id('login-button')).tap();

    // Remplir formulaire
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');

    // Soumettre
    await element(by.id('submit-button')).tap();

    // Verifier redirection vers home
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show error for invalid credentials', async () => {
    await element(by.id('login-button')).tap();

    await element(by.id('email-input')).typeText('wrong@example.com');
    await element(by.id('password-input')).typeText('wrongpassword');

    await element(by.id('submit-button')).tap();

    // Verifier message d'erreur
    await expect(element(by.text('Identifiants invalides'))).toBeVisible();
  });

  it('should register new user', async () => {
    await element(by.id('register-button')).tap();

    await element(by.id('name-input')).typeText('John Doe');
    await element(by.id('email-input')).typeText('john@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('confirm-password-input')).typeText('password123');

    await element(by.id('register-submit-button')).tap();

    // Verifier redirection vers home
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
```

---

### Selecteurs Detox

**Identifiants testID recommandes** :

```typescript
// Ajouter testID aux composants React Native
<View testID="welcome-screen">
  <Text testID="welcome-title">Bienvenue</Text>
  <TouchableOpacity testID="login-button" onPress={handleLogin}>
    <Text>Se connecter</Text>
  </TouchableOpacity>
</View>
```

**Types de selecteurs** :

```typescript
// Par testID (RECOMMANDE)
element(by.id('login-button'))

// Par texte
element(by.text('Se connecter'))

// Par label (accessibilite)
element(by.label('Bouton de connexion'))

// Par type
element(by.type('RCTTextInput'))

// Combinaisons
element(by.id('user-list').and(by.text('John Doe')))

// Elements parents/enfants
element(by.id('parent')).atIndex(0)
```

---

### Actions Detox

```typescript
// Tap
await element(by.id('button')).tap();

// Multiple taps
await element(by.id('button')).multiTap(3);

// Long press
await element(by.id('button')).longPress();

// Saisir du texte
await element(by.id('input')).typeText('Hello');

// Remplacer texte
await element(by.id('input')).replaceText('New text');

// Clear texte
await element(by.id('input')).clearText();

// Scroll
await element(by.id('scrollview')).scroll(100, 'down');
await element(by.id('scrollview')).scrollTo('bottom');

// Swipe
await element(by.id('card')).swipe('left');
await element(by.id('card')).swipe('right', 'fast', 0.8);
```

---

### Assertions Detox

```typescript
// Visibilite
await expect(element(by.id('element'))).toBeVisible();
await expect(element(by.id('element'))).toBeNotVisible();

// Existence (dans le DOM meme si invisible)
await expect(element(by.id('element'))).toExist();
await expect(element(by.id('element'))).toNotExist();

// Texte
await expect(element(by.id('label'))).toHaveText('Hello');

// Valeur (input)
await expect(element(by.id('input'))).toHaveValue('text');

// Focus
await expect(element(by.id('input'))).toBeFocused();
await expect(element(by.id('input'))).toBeNotFocused();
```

---

### Attentes et Timeouts

```typescript
// Attendre qu'un element apparaisse
await waitFor(element(by.id('element')))
  .toBeVisible()
  .withTimeout(5000);

// Attendre qu'un element disparaisse
await waitFor(element(by.id('loading')))
  .toBeNotVisible()
  .withTimeout(10000);

// Condition while
await waitFor(element(by.id('message')))
  .toBeVisible()
  .whileElement(by.id('scrollview'))
  .scroll(50, 'down');
```

---

### Lancer les Tests E2E

**1. Build l'app pour tests**

```bash
# iOS Debug
detox build --configuration ios.sim.debug

# Android Debug
detox build --configuration android.emu.debug
```

**2. Lancer les tests**

```bash
# iOS
detox test --configuration ios.sim.debug

# Android
detox test --configuration android.emu.debug

# Lancer un fichier specifique
detox test e2e/auth.test.ts --configuration ios.sim.debug

# Mode debug (avec logs detailles)
detox test --configuration ios.sim.debug --loglevel trace

# Re-run failed tests uniquement
detox test --configuration ios.sim.debug --reuse
```

**3. Mode watch (developpement)**

```bash
# Lancer l'app sans tests
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug --debug-synchronization 500

# Dans un autre terminal, lancer tests en watch
npm run test:e2e:watch
```

---

### Patterns Courants

#### Navigation Complete

```typescript
describe('Navigation Flow', () => {
  it('should navigate through all tabs', async () => {
    await device.launchApp();

    // Tab Home
    await expect(element(by.id('home-screen'))).toBeVisible();

    // Tab Recherche
    await element(by.id('tab-search')).tap();
    await expect(element(by.id('search-screen'))).toBeVisible();

    // Tab Profil
    await element(by.id('tab-profile')).tap();
    await expect(element(by.id('profile-screen'))).toBeVisible();
  });
});
```

#### Scroll et Liste Infinie

```typescript
it('should load more items on scroll', async () => {
  await element(by.id('list')).scrollTo('bottom');

  await waitFor(element(by.id('loading-more')))
    .toBeVisible()
    .withTimeout(2000);

  await waitFor(element(by.id('item-21')))
    .toBeVisible()
    .whileElement(by.id('list'))
    .scroll(100, 'down');
});
```

#### Gestion Permissions

```typescript
it('should request camera permission', async () => {
  await element(by.id('take-photo-button')).tap();

  // iOS : Autoriser l'acces a la camera
  await device.launchApp({
    permissions: { camera: 'YES' }
  });

  await expect(element(by.id('camera-view'))).toBeVisible();
});
```

#### Deep Links

```typescript
it('should open app from deep link', async () => {
  await device.launchApp({
    url: 'myapp://product/123'
  });

  await expect(element(by.id('product-screen'))).toBeVisible();
  await expect(element(by.id('product-title'))).toHaveText('Product 123');
});
```

---

### Bonnes Pratiques Detox

1. **Utiliser testID partout** : Ajouter systematiquement `testID` aux elements interactifs
2. **Tests independants** : Chaque test doit pouvoir s'executer seul (beforeEach pour reset)
3. **Attendre explicitement** : Toujours utiliser `waitFor` pour elements asynchrones
4. **Eviter les sleeps** : `await new Promise(resolve => setTimeout(resolve, 1000))` = ❌
5. **Mock les APIs** : Utiliser Detox server mock ou MSW pour APIs externes
6. **Nommer clairement** : `should login with valid credentials` > `test login`
7. **Tests critiques seulement** : E2E = lent, donc tester uniquement parcours essentiels
8. **CI/CD optimisation** : Utiliser `--reuse` pour accelerer, paralleliser si possible

---

### Debugging Detox

**Problemes courants** :

```bash
# Element non trouve
# → Verifier testID, utiliser waitFor, checker hierarchie

# Synchronisation (app ne repond pas)
detox test --debug-synchronization 200
# → Augmenter timeout, checker animations infinies

# Build echoue
# → Clean :
rm -rf ios/build android/app/build
detox clean-framework-cache && detox build-framework-cache

# Simulateur crash
# → Reset simulateur :
xcrun simctl erase all  # iOS
emulator -avd Pixel_5_API_33 -wipe-data  # Android
```

**Logs detailles** :

```bash
# Activer logs complets
detox test --loglevel trace --record-logs all

# Screenshots sur echec
detox test --take-screenshots failing
```

---

### Scripts package.json

```json
{
  "scripts": {
    "detox:build:ios": "detox build --configuration ios.sim.debug",
    "detox:test:ios": "detox test --configuration ios.sim.debug",
    "detox:build:android": "detox build --configuration android.emu.debug",
    "detox:test:android": "detox test --configuration android.emu.debug",
    "detox:test:ios:watch": "detox test --configuration ios.sim.debug --watch",
    "detox:clean": "detox clean-framework-cache && detox build-framework-cache"
  }
}
```

---

## ✅ Bonnes Pratiques Tests

1. **AAA Pattern** : Arrange, Act, Assert
2. **Un test = un concept** : Ne pas tester plusieurs choses dans un seul test
3. **Noms descriptifs** : `should return true for valid emails`
4. **Mock les dependances externes** : Firebase, API, AsyncStorage
5. **Tester les cas limites** : valeurs nulles, tableaux vides, etc.
6. **Coverage ≠ Qualite** : 100% de coverage ne garantit pas l'absence de bugs

---

🤖 _Guide destine a Claude Code - Tests guides par Claude, executes par le dev_
