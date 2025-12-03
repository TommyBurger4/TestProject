# 🧪 TESTS (NEXT.JS)

> **Guide complet des tests Next.js : philosophie, configuration Jest, et Playwright E2E**

---

## 🎯 Philosophie des Tests

**Les tests sont OBLIGATOIRES pour toute application professionnelle.**

### Types de Tests

- **Tests unitaires** : Fonctions utilitaires, services, hooks
- **Tests d'integration** : Composants avec interactions
- **Tests E2E** : Parcours utilisateur complets avec Playwright (optionnel, si temps)

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

1. Ouvrir http://localhost:3000/login dans ton navigateur
2. Essayer de te connecter avec :
   - Email valide + mot de passe valide → devrait reussir
   - Email invalide → devrait afficher "Email invalide"
   - Mot de passe incorrect → devrait afficher "Mot de passe incorrect"
   - Pas de connexion internet → devrait afficher "Erreur reseau"

Pour verifier que ca marche :
- Tu devrais etre redirige vers /dashboard apres connexion reussie
- Le token devrait etre stocke dans localStorage
- Tu peux checker les logs avec console.log dans authService.ts
- Tu peux ouvrir DevTools > Application > Local Storage pour voir le token

Tu veux que je t'aide a debugger si quelque chose ne marche pas ?"
```

### Exemple : Apres Creation d'un Composant

```
Claude: "J'ai cree le composant Button.tsx.
Pour tester ce bouton, tu peux :

1. Ouvrir la page /login (ou j'ai ajoute le bouton)
2. Verifier que :
   - Le bouton s'affiche correctement
   - Le texte est lisible (contraste suffisant)
   - Le bouton reagit au hover (changement visuel)
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

## ⚙️ Configuration Jest pour Next.js

### jest.config.js

**Next.js 13+ inclut une configuration Jest simplifiee :**

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Custom Jest configuration
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,ts}',
    '!src/app/**', // Exclure App Router (teste par Playwright)
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
};

// Export config avec Next.js
module.exports = createJestConfig(customJestConfig);
```

### jest.setup.js

```javascript
import '@testing-library/jest-dom';

// Mock Next.js Router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useParams: jest.fn(() => ({})),
}));

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

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

// Mock window.matchMedia (for responsive tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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

import { renderHook, act } from '@testing-library/react';
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
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should show loading spinner when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
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

## 🎬 Tests E2E avec Playwright

### Qu'est-ce que Playwright ?

**Playwright** est le framework de tests E2E (End-to-End) recommande pour Next.js et applications web.
Il permet de tester l'application complete comme un utilisateur reel, en automatisant les interactions dans de vrais navigateurs (Chrome, Firefox, Safari).

**Avantages** :
- Tests multi-navigateurs (Chromium, Firefox, WebKit)
- Synchronisation automatique avec le DOM
- Execution rapide et parallelisee
- Support TypeScript natif
- Integration parfaite avec Next.js
- Screenshots et videos automatiques
- Mode debug interactif

**Quand utiliser Playwright** :
- Parcours utilisateurs critiques (login, signup, checkout)
- Tests de regression avant release
- Validation des flows complets
- CI/CD pour detecter bugs avant production
- Tests responsive (desktop, tablet, mobile)

---

### Installation Playwright

**1. Installer Playwright**

```bash
npm init playwright@latest
```

**Questions interactives** :

```bash
# Do you want to use TypeScript? → Yes
# Where to put your end-to-end tests? → e2e
# Add a GitHub Actions workflow? → Yes
# Install Playwright browsers? → Yes
```

**2. Structure creee**

```
e2e/
├── example.spec.ts          # Test exemple
└── fixtures/                # Donnees de test (optionnel)

playwright.config.ts         # Configuration Playwright
.github/workflows/           # CI/CD automatique (si choisi)
  └── playwright.yml
```

**3. Configuration `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour Next.js
 * Voir: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',

  // Timeout par test (30s)
  timeout: 30 * 1000,

  // Expect timeout (5s)
  expect: {
    timeout: 5000,
  },

  // Retries sur echec (utile pour CI)
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter (liste de resultats + HTML report)
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // Options partagees par tous les tests
  use: {
    // Base URL de l'app Next.js
    baseURL: 'http://localhost:3000',

    // Screenshots sur echec
    screenshot: 'only-on-failure',

    // Videos sur echec
    video: 'retain-on-failure',

    // Trace (debug detaille) sur echec
    trace: 'on-first-retry',
  },

  // Configuration multi-navigateurs
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Tests responsive
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  // Lancer le serveur Next.js automatiquement avant les tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

---

### Ecrire des Tests E2E

#### Structure d'un Test Playwright

**e2e/auth.spec.ts** :

```typescript
/**
 * Fichier: auth.spec.ts
 *
 * Tests E2E pour l'authentification.
 */

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome screen on first visit', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bienvenue' })).toBeVisible();
    await expect(page.getByText(/Connectez-vous/)).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    // Navigation vers login
    await page.getByRole('link', { name: 'Se connecter' }).click();

    // Remplir formulaire
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Mot de passe').fill('password123');

    // Soumettre
    await page.getByRole('button', { name: 'Se connecter' }).click();

    // Verifier redirection vers dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Mot de passe').fill('wrongpassword');

    await page.getByRole('button', { name: 'Se connecter' }).click();

    // Verifier message d'erreur
    await expect(page.getByText('Identifiants invalides')).toBeVisible();
    await expect(page).toHaveURL('/login'); // Reste sur login
  });

  test('should register new user', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Nom').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Mot de passe').fill('password123');
    await page.getByLabel('Confirmer mot de passe').fill('password123');

    await page.getByRole('button', { name: 'S\'inscrire' }).click();

    // Verifier redirection vers dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Bienvenue John Doe')).toBeVisible();
  });
});
```

---

### Selecteurs Playwright

**Selecteurs recommandes (par priorite)** :

```typescript
// 1. Par role (RECOMMANDE - accessibilite)
page.getByRole('button', { name: 'Se connecter' })
page.getByRole('heading', { name: 'Bienvenue' })
page.getByRole('textbox', { name: 'Email' })
page.getByRole('link', { name: 'Accueil' })

// 2. Par label (formulaires)
page.getByLabel('Email')
page.getByLabel('Mot de passe')

// 3. Par texte
page.getByText('Bienvenue')
page.getByText(/Bienvenue.*/)  // Regex

// 4. Par placeholder
page.getByPlaceholder('Entrez votre email')

// 5. Par data-testid (dernier recours)
page.getByTestId('login-button')

// Selecteurs CSS/XPath (eviter si possible)
page.locator('button.primary')
page.locator('xpath=//button[@type="submit"]')

// Combinaisons
page.getByRole('button').filter({ hasText: 'Envoyer' })
page.locator('form').getByRole('button')
```

---

### Actions Playwright

```typescript
// Click
await page.getByRole('button', { name: 'Submit' }).click();

// Double click
await page.getByRole('button').dblclick();

// Right click
await page.getByRole('button').click({ button: 'right' });

// Saisir du texte
await page.getByLabel('Email').fill('test@example.com');
await page.getByLabel('Email').type('test@example.com', { delay: 100 });

// Clear input
await page.getByLabel('Email').clear();

// Presser des touches
await page.getByLabel('Search').press('Enter');
await page.keyboard.press('Control+A');

// Hover
await page.getByRole('button').hover();

// Scroll
await page.getByRole('article').scrollIntoViewIfNeeded();
await page.mouse.wheel(0, 100);

// Upload fichier
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');

// Select (dropdown)
await page.getByLabel('Country').selectOption('France');

// Checkbox / Radio
await page.getByLabel('Accept terms').check();
await page.getByLabel('Refuse').uncheck();
```

---

### Assertions Playwright

```typescript
// Visibilite
await expect(page.getByRole('button')).toBeVisible();
await expect(page.getByRole('button')).toBeHidden();

// Existence dans le DOM
await expect(page.getByRole('button')).toBeAttached();
await expect(page.getByRole('button')).not.toBeAttached();

// Texte
await expect(page.getByRole('heading')).toHaveText('Hello');
await expect(page.getByRole('heading')).toContainText('Hello');

// Valeur (input)
await expect(page.getByLabel('Email')).toHaveValue('test@example.com');

// Attributs
await expect(page.getByRole('button')).toBeDisabled();
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByRole('checkbox')).toBeChecked();
await expect(page.getByRole('link')).toHaveAttribute('href', '/about');

// URL
await expect(page).toHaveURL('http://localhost:3000/dashboard');
await expect(page).toHaveURL(/dashboard/);

// Title
await expect(page).toHaveTitle('Dashboard - MyApp');

// Screenshot comparison (visual regression)
await expect(page).toHaveScreenshot('homepage.png');

// Count
await expect(page.getByRole('listitem')).toHaveCount(5);

// CSS
await expect(page.getByRole('button')).toHaveCSS('color', 'rgb(255, 0, 0)');
```

---

### Attentes et Auto-waiting

**Playwright attend automatiquement** que les elements soient prets (visible, enabled, stable).

```typescript
// Pas besoin d'attentes manuelles - Playwright attend automatiquement
await page.getByRole('button').click();
// ✓ Attend que le bouton existe
// ✓ Attend que le bouton soit visible
// ✓ Attend que le bouton soit enabled
// ✓ Attend que le bouton soit stable (pas d'animation)

// Attente explicite (rarement necessaire)
await page.waitForLoadState('networkidle');
await page.waitForURL('/dashboard');
await page.waitForSelector('.item', { state: 'visible' });

// Attendre condition custom
await page.waitForFunction(() => {
  return document.querySelectorAll('.item').length > 5;
});

// Timeout custom (defaut: 30s)
await expect(page.getByText('Loading...')).toBeHidden({ timeout: 10000 });
```

---

### Lancer les Tests E2E

**1. Lancer tous les tests**

```bash
npx playwright test
```

Playwright lance automatiquement le serveur Next.js (`npm run dev`), execute les tests sur tous les navigateurs configures, puis stoppe le serveur.

**2. Lancer des tests specifiques**

```bash
# Un fichier specifique
npx playwright test e2e/auth.spec.ts

# Un navigateur specifique
npx playwright test --project=chromium

# Mode headed (voir navigateur)
npx playwright test --headed

# Mode debug (step-by-step avec Playwright Inspector)
npx playwright test --debug

# Lancer tests qui matchent un pattern
npx playwright test -g "login"
```

**3. Mode UI (interface visuelle interactive)**

```bash
npx playwright test --ui
```

Interface graphique qui permet de :
- Voir tous les tests en temps reel
- Voir traces et screenshots
- Re-run tests en un clic
- Time travel dans l'execution

**4. Mode watch (developpement)**

```bash
npx playwright test --watch
```

Re-lance automatiquement les tests quand les fichiers changent.

---

### Patterns Courants

#### Navigation Complete

```typescript
test('should navigate through all pages', async ({ page }) => {
  await page.goto('/');

  // Page accueil
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'Accueil' })).toBeVisible();

  // Page recherche
  await page.getByRole('link', { name: 'Recherche' }).click();
  await expect(page).toHaveURL('/search');
  await expect(page.getByRole('heading', { name: 'Recherche' })).toBeVisible();

  // Page profil
  await page.getByRole('link', { name: 'Profil' }).click();
  await expect(page).toHaveURL('/profile');
  await expect(page.getByRole('heading', { name: 'Profil' })).toBeVisible();
});
```

#### Scroll et Liste Infinie

```typescript
test('should load more items on scroll', async ({ page }) => {
  await page.goto('/posts');

  // Scroll jusqu'au bas
  await page.getByRole('article').last().scrollIntoViewIfNeeded();

  // Verifier que le loading apparait
  await expect(page.getByText('Chargement...')).toBeVisible();

  // Attendre nouveaux items
  await expect(page.getByRole('article')).toHaveCount(30, { timeout: 5000 });
});
```

#### Test de Formulaire avec Validation

```typescript
test('should validate form fields', async ({ page }) => {
  await page.goto('/contact');

  // Soumettre formulaire vide
  await page.getByRole('button', { name: 'Envoyer' }).click();

  // Verifier erreurs de validation
  await expect(page.getByText('Email requis')).toBeVisible();
  await expect(page.getByText('Message requis')).toBeVisible();

  // Remplir avec donnees invalides
  await page.getByLabel('Email').fill('invalid-email');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByText('Email invalide')).toBeVisible();

  // Remplir correctement
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('Hello world');
  await page.getByRole('button', { name: 'Envoyer' }).click();

  // Verifier succes
  await expect(page.getByText('Message envoye avec succes')).toBeVisible();
});
```

#### Intercepter Requetes API (Mock)

```typescript
test('should display posts from API', async ({ page }) => {
  // Intercepter appel API et retourner donnees mockees
  await page.route('**/api/posts', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ]),
    });
  });

  await page.goto('/posts');

  // Verifier que les posts mockees s'affichent
  await expect(page.getByText('Post 1')).toBeVisible();
  await expect(page.getByText('Post 2')).toBeVisible();
});
```

#### Test de geolocalisation

```typescript
test('should use user location', async ({ page, context }) => {
  // Simuler geolocalisation Paris
  await context.setGeolocation({ latitude: 48.8566, longitude: 2.3522 });
  await context.grantPermissions(['geolocation']);

  await page.goto('/map');

  // Verifier que la carte centre sur Paris
  await expect(page.getByText('Paris, France')).toBeVisible();
});
```

---

### Bonnes Pratiques Playwright

1. **Utiliser roles ARIA** : Preferer `getByRole()` pour accessibilite
2. **Tests independants** : Chaque test doit pouvoir s'executer seul
3. **Auto-waiting** : Faire confiance au auto-waiting de Playwright
4. **Eviter les sleeps** : `await page.waitForTimeout(1000)` = ❌
5. **Mock les APIs** : Utiliser `page.route()` pour mocker les appels API
6. **Nommer clairement** : `should login with valid credentials` > `test login`
7. **Tests critiques seulement** : E2E = lent, donc tester uniquement parcours essentiels
8. **Parallelisation** : Activer `fullyParallel: true` dans config

---

### Debugging Playwright

**Problemes courants** :

```bash
# Element non trouve
# → Verifier selecteur, utiliser Playwright Inspector (--debug)

# Timeout
# → Augmenter timeout, verifier que l'element devient visible

# Flaky tests
# → Utiliser auto-waiting, eviter attentes manuelles
# → Activer retries dans config

# Test echoue sur CI mais pas en local
# → Verifier differences environnement (timezone, viewport, etc.)
```

**Debugging interactif** :

```bash
# Playwright Inspector (step-by-step)
npx playwright test --debug

# Mode headed (voir navigateur)
npx playwright test --headed

# Mode UI (interface graphique)
npx playwright test --ui

# Pause dans le test
await page.pause();

# Console logs du navigateur
page.on('console', (msg) => console.log(msg.text()));
```

**Voir rapport HTML** :

```bash
# Generer rapport
npx playwright test --reporter=html

# Ouvrir rapport
npx playwright show-report
```

---

### Scripts package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:report": "playwright show-report"
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

🤖 _Guide destine a Claude Code - Tests Next.js avec Jest et Playwright_
